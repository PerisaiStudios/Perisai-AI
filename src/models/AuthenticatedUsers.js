// Imports
const mongoose = require(`mongoose`);

// Main
const schema = new mongoose.Schema({
  sessionID: String,
  id: String,
  username: String,
  discriminator: String,
  global_name: String,
  avatar: String,
  bot: Boolean,
  system: Boolean,
  mfa_enabled: Boolean,
  banner: String,
  accent_color: Number,
  locale: String,
  verified: Boolean,
  email: String,
  flags: Number,
  premium_type: Number,
  public_flags: Number,
  avatar_decoration: String
}, {
  collection: `AuthenticatedUsers`,
  expireAfterSeconds: 604800,
  timestamps: true
});

// Exports
module.exports = mongoose.model(`AuthenticatedUsers`, schema);