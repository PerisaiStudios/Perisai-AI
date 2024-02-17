// Imports
const express = require(`express`);

// Initialization
const router = express.Router();

// Main
router.get(`/`, (req, res) => {
    res.send(`Hello World!`)
});

// Exports
module.exports = router;