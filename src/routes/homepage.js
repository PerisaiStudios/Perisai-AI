// Imports
const express = require(`express`);
const { uuidv7 } = require(`uuidv7`);

// Initialization
const router = express.Router();

// Main
router.get(`/`, (req, res) => {
    if (!req.cookies.sessionID) res.cookie(`sessionID`, uuidv7());

    res.send(`Hello World!`);
});

// Exports
module.exports = router;