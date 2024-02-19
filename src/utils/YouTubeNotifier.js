// Imports
const Model = require(`../models/youtube_notification.js`);
const Parser = require(`rss-parser`);

// Initialization
const parser = new Parser();

// Main
class YouTubeNotifier {
    constructor(youtube_channel, interval = 10000) {
        Reflect.set(this, `events`, { videoAdded: [] });

        const url = `https://www.youtube.com/feed/videos.xml?channel_id=${youtube_channel}`
        const feed = parser.parseURL(url);

        if (!feed) return;

        const channelName = feed.title;
        const data = new Model({
            youtube_channel,
            last_checked: new Date(),
            checked_video: null
        });

        if (!feed.items.length) return;
        
        const latestVideo = feed.items[0];

        data.checked_video = {
            id: latestVideo.id,
            published_date: latestVideo.pubDate
        };

        data.save().catch(e => console.error(e));

        async function checkVideo() {
            const feed = await parser.parseURL(url);

            if (!feed.items.length) return;

            const latestVideo = feed.items[0];
            const { checked_video} = data;

            if ((!checked_video || latestVideoID !== checked_video.id) && (new Date(latestVideo.pubDate) > new Date(checked_video.published_date))) {
                this.emit(`videoAdded`, latestVideo);
            };
        };

        setInterval(checkVideo, interval);
    };

    emit(event, ...data) {
        event.forEach(listener => listener(...data));
    };

    on(event, listener) {
        this.event.push(listener);
    };
};

// Exports
module.exports = YouTubeNotifier;