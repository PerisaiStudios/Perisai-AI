// Imports
const axios = require(`axios`).default;
const Discord = require(`discord.js`);
const dotenv = require(`dotenv`);
const express = require(`express`);
const fs = require(`fs`);
const mongoose = require(`mongoose`);

// Initialization
dotenv.config();

// Discord
const client = require(`./client`);
const rest = new Discord.REST().setToken(process.env.DC_TOKEN);

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
});

// Express
const app = express();
const homepageRoute = require(`./routes/homepage`);
const authRoute = require(`./routes/auth/index`);

app.use(`/`, homepageRoute);
app.use(`/auth`, authRoute);

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}.`));

// MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log(`Successfully connected to MongoDB.`);
    });