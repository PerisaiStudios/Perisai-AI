// Imports
const YTNotifier = require(`../utils/YouTubeNotifier.js`);
const { YouTubeHook: client } = require(`../WebhookClients.js`);

// Main
function checkVideo({ youtubeChannel, message }) {
    const notifier = new YTNotifier(youtubeChannel);

    notifier.on(`videoAdded`, async video => {
        const { channel_link, latest_video } = video;
        const username = video.channel_name;
        const avatarURL = video.channel_thumbnail;
        const content = message
            ?.replace(`{{VIDEO_URL}}`, latest_video.link)
            ?.replace(`{{VIDEO_TITLE}}`, latest_video.title)
            ?.replace(`{{CHANNEL_URL}}`, channel_link)
            ?.replace(`{{CHANNEL_NAME}}`, username)
            ||
            `Video uploaded by ${username}\n${latest_video.link}`;

        await client.send({ username, avatarURL, content });
    });
}

// Exports
module.exports = checkVideo;