// Imports
const mongoose = require(`mongoose`);

// Main
const schema = new mongoose.Schema({
  sessionID: String,
  accessToken: String,
  tokenType: String,
  scope: String
}, {
  collection: `AccessTokens`,
  expireAfterSeconds: 604800,
  timestamps: true
});

// Exports
module.exports = mongoose.model(`AccessTokens`, schema);
