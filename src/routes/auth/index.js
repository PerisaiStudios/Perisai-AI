// Imports
const callbackRoute = require(`./callback`);
const express = require(`express`);

// Initialization
const router = express.Router();

// Main
router.use(`/callback`, callbackRoute);

router.get(`/`, (req, res) => {
    res.redirect(process.env.DC_AUTH_URL);
});

// Exports
module.exports = router;