// Imports
const { Schema, model } = require(`mongoose`);

// Main
const schema = new Schema({
    access_token: String,
    code: String,
    created_at: Date,
    expires_in: Number,
    refresh_token: String,
    scope: String,
    token_type: String,
});

// Exports
module.exports = model(`Tokens`, schema);