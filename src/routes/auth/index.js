// Imports
const express = require(`express`);
const callback = require(`./callback.js`);

// Initialization
const router = express.Router();
const authURL = process.env.DISCORD_AUTH_URL;
router.use(`/callback`, callback);

// Main
router.get(`/`, (req, res) => {
  return res.redirect(authURL);
});

// Exports
module.exports = router;