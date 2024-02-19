// Imports
const { Client } = require(`discord.js`);
const { TwitterApi } = require(`twitter-api-v2`);

// Initialization
const { 
    DC_TOKEN,
    X_API_KEY: appKey,
    X_API_SECRET: appSecret,
    X_ACCESS_TOKEN: accessToken,
    X_ACCESS_SECRET: accessSecret
 } = process.env;

const DiscordClient = new Client({
    intents: [`Guilds`, `GuildMembers`, `GuildMessages`, `MessageContent`, `GuildWebhooks`]
});

const XClient = new TwitterApi({ appKey, appSecret, accessToken, accessSecret });

// Main
DiscordClient.login(DC_TOKEN);

// Exports
module.exports = { DiscordClient, XClient };