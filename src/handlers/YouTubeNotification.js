// Imports
const { WebhookClient } = require(`discord.js`);
const YTNotifier = require(`../utils/YouTubeNotifier.js`);

// Main
const client = new WebhookClient({ url: process.env.YT_HOOK_URL });

// Main
function checkVideo({ youtubeChannel, message }) {
    const notifier = new YTNotifier(youtubeChannel);

    notifier.on(`videoAdded`, async video => {
        const { channel_name, channel_link, checked_video: latestVideo } = video;
        const params = message
            ?.replace(`{{VIDEO_URL}}`, latestVideo.link)
            ?.replace(`{{VIDEO_TITLE}}`, latestVideo.title)
            ?.replace(`{{CHANNEL_URL}}`, channel_link)
            ?.replace(`{{CHANNEL_NAME}}`, channel_name)
            ||
            `Video uploaded by ${channel_name}\n${latestVideo.link}`;

        await client.send({
            username: channel_name,
            avatarURL: 
        })
    });
}

// Exports
module.exports = checkVideo;