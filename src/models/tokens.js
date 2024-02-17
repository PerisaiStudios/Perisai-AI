// Imports
const { Schema, model } = require(`mongoose`);

// Main
const schema = new Schema({
    access_token: String,
    expires_in: Number,
    refresh_token: String
});

// Exports
module.exports = model(`Tokens`, schema);