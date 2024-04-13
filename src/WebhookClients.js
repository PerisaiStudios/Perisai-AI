// Imports
const { WebhookClient } = require(`discord.js`);

// Main
const YouTubeHook = new WebhookClient({ url: process.env.YT_HOOK });

// Exports
module.exports = { YouTubeHook };