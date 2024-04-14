// Imports
const { Client } = require(`discord.js`);

// Initialization
const Token = process.env.CLIENT_TOKEN;

const client = new Client({
  intents: [
    `Guilds`,
    `GuildMembers`,
    `GuildMessages`,
    `MessageContent`,
    `GuildWebhooks`,
  ],
});

// Main
client.login(Token);

client.on(`interactionCreate`, (interaction) => {
  const channelID = interaction.options.getString(`channelID`);
  const message =
    interaction.options.getString(`message`) ||
    `Video uploaded by {{ChannelName}}\n{{VideoLink}}`;
  const webhookURL = interaction.options.getString(`webhookURL`);

  
})

// Exports
module.exports = client;
