// Imports
const express = require(`express`);
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
  
  if (!code) return res.status(400).json({ error: `Auth Code Required.` });

  let grant_type = `authorization_code`;
  let formData = { client_id, client_secret, grant_type, code, redirect_uri };
  const tokenReq = await axios.post(`https://discord.com/api/v10/oauth2/token`, formData, {
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`
    }
  });

  if (tokenReq.status === 400) return res.status(tokenReq.status).json(tokenReq.data);

  console.log(tokenReq.data);

  const { access_token, expires_in, refresh_token } = tokenReq.data;

  res.cookie(`access_token`, access_token);
  res.cookie(`created_at`, Date.now());
  res.cookie(`expires_in`, expires_in);
  res.cookie(`refresh_token`, refresh_token);

  const user = await axios.get(`https://discord.com/api/v10/users/@me`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  return res.status(201).json(user.data);
});

// Exports
module.exports = router;