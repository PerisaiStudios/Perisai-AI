// Imports
const { Schema, model } = require(`mongoose`);

// Main
const schema = new Schema({
    user_id: String,
    value: Number
});

// Exports
module.exports = model(`XP`, schema);