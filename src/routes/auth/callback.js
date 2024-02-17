const express = require(`express`);
const client = require(`../../client`);
const axios = require("axios").default;
const router = express.Router();
const TokenModel = require(`../../models/tokens`);

router.get(`/`, async (req, res) => {
    const { code } = req.query;

    if (!code) {
        res.json({ message: `Hello from /auth/callback!` });
        return;
    };

    const formData = {
        client_id: client.user.id,
        client_secret: process.env.DC_CLIENT_SECRET,
        grant_type: `authorization_code`,
        code,
        redirect_uri: process.env.DC_AUTH_CALLBACK
    };

    const token = await axios.post(
        `https://discord.com/api/v10/oauth2/token`,
        formData,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    if (!token.data) {
        res.status(400).json({ error: `Failed to retrieve token data.` });
        return;
    };

    const { access_token, expires_in, refresh_token } = token.data;
    const userInfo = await axios.get(
        `https://discord.com/api/v10/users/@me`,
        { headers: { "Authorization": `Bearer ${access_token}` } }
    );

    if (!userInfo) {
        res.status(400).json({ error: `Failed to retrieve user information.` });
        return;
    };

    const Tokens = new TokenModel({ access_token, expires_in, refresh_token });

    await Tokens.save();

    res.sendStatus(201);
    console.log(token.data, userInfo.data);
});

module.exports = router;