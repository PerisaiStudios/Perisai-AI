// Imports
const { Client } = require(`discord.js`);

// Initialization
const Token = process.env.CLIENT_TOKEN

const client = new Client({
    intents: [`Guilds`, `GuildMembers`, `GuildMessages`, `MessageContent`, `GuildWebhooks`]
});

// Main
client.login(Token);

// Exports
module.exports = client;