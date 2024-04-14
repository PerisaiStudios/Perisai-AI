// Imports
const express = require(`express`);
const AccessTokens = require(`../../models/AccessTokens.js`);
const AuthenticatedUsers = require(`../../models/AuthenticatedUsers.js`);
const axios = require(`axios`).default;
const client = require(`../../client.js`);

// Initialization
const router = express.Router();
let client_id;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.DISCORD_CALLBACK_URL;

client.on(`ready`, () => {
  client_id = client.user.id;
});

// Main
router.get(`/`, async (req, res) => {
  const { code } = req.query;
  const { sessionID } = req.cookies;
  
  if (!code) return res.status(400).json({ error: `Auth Code Required.` });

  let grant_type = `authorization_code`;
  let formData = { client_id, client_secret, grant_type, code, redirect_uri };
  const tokenReq = await axios.post(`https://discord.com/api/v10/oauth2/token`, formData, {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`
    }
  });

  if (tokenReq.status >= 400) return res.status(tokenReq.status).json(tokenReq.data);

  const { access_token, token_type, expires_in, refresh_token, scope } = tokenReq.data;
  const tokenDoc = await AccessTokens.findOne({ sessionID }) || new AccessTokens({ sessionID });
  tokenDoc.accessToken = access_token;
  tokenDoc.tokenType = token_type;
  tokenDoc.scope = scope;

  await tokenDoc.save();

  const user = await axios.get(`https://discord.com/api/v10/users/@me`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  console.log(user.data);
  const userDoc = await AuthenticatedUsers.findOne({ sessionID }) || new AuthenticatedUsers({ sessionID });

  for (const i in user.data) {
    userDoc[i] = user.data[i];
  };

  await userDoc.save();

  return res.status(201).redirect(`../`);
});

// Exports
module.exports = router;