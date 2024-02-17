// Imports
const { Client } = require(`discord.js`);

// Initialization
const client = new Client({
    intents: [`Guilds`, `GuildMembers`, `GuildMessages`, `MessageContent`, `GuildWebhooks`]
});

// Main
client.login(process.env.DC_TOKEN)

// Exports
module.exports = client;