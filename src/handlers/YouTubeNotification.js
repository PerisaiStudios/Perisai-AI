// Imports
const { DiscordClient: client } = require(`../client.js`);
const YTNotifier = require(`../utils/YouTubeNotifier.js`);

// Main
function checkVideo({ youtubeChannel, guildID, channelID, message }) {
    const notifier = new YTNotifier(youtubeChannel);
    const guild = client.guilds.cache.get(guildID);
    const channel = guild.channels.cache.get(channelID);

    notifier.on(`videoAdded`, async video => {
        const { feed, latestVideo } = video;
        const params = message
            ?.replace(`{{VIDEO_URL}}`, latestVideo.link)
            ?.replace(`{{VIDEO_TITLE}}`, latestVideo.title)
            ?.replace(`{{CHANNEL_URL}}`, feed.link)
            ?.replace(`{{CHANNEL_TITLE}}`, feed.title)
            ||
            `Video uploaded by ${feed.title}\n${latestVideo.link}`;

        await channel.send(params);
    });
}

// Exports
module.exports = checkVideo