// Imports
const axios = require(`axios`).default;
const cookieParser = require(`cookie-parser`);
const Discord = require(`discord.js`);
const dotenv = require(`dotenv`);
const express = require(`express`);
const fs = require(`fs`);
const mongoose = require(`mongoose`);
const twitter = require(`twitter-api-v2`);

// Initialization
dotenv.config();

// Express
const app = express();
const homepageRoute = require(`./routes/homepage.js`);
const authRoute = require(`./routes/auth/index.js`);

app.use(cookieParser());
app.use(`/`, homepageRoute);
app.use(`/auth`, authRoute);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}.`));

// MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => {
//         console.log(`Successfully connected to MongoDB.`);
//     });

// Discord
const client = require(`./client`);
const checkVideo = require(`./handlers/YouTubeNotification.js`);
const rest = new Discord.REST().setToken(process.env.CLIENT_TOKEN);

client.commands = new Discord.Collection();
const commands = [];
const commandFiles = fs.readdirSync(`./src/commands`).filter(file => file.endsWith(`.js`));

commandFiles.forEach(file => {
    const command = require(`./commands/${file}`);

    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
});

client.on(`ready`, async () => {
    console.log(`${client.user.tag} is Ready!`);

    // const commandData = await rest.put(Discord.Routes.applicationCommands(client.user.id), { body: commands });

    // console.log(`Successfully loaded ${commandData.length} application (/) commands.`);

    // checkVideo({
    //     youtubeChannel: process.env.YT_CHANNEL_ID,
    //     guildID: process.env.YT_GUILD_ID,
    //     channelID: process.env.YT_POST_CHANNEL_ID,
    //     message: `@everyone\nA new video had just been uploaded. Check it out!\n{{VIDEO_URL}}`
    // });
});