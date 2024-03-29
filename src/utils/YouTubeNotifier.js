// Imports
const Notification = require(`../models/youtube_notification.js`);
const Parser = require(`rss-parser`);

// Initialization
const parser = new Parser();

// Main
class YouTubeNotifier {
    constructor(channel_id, interval = 10000) {
        Reflect.set(this, `events`, { videoAdded: [] });

        const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`;
        
        async function checkVideo(self) {
            const feed = await parser.parseURL(url);

            if (!feed || feed.items.length) return;

            const { link: channel_link, title: channel_name } = feed;
            const data = await Notification.findOne({ channel_id }) || new Notification({
                channel_name,
                channel_link,
                channel_id,
                last_checked: new Date()
            });
            const latestVideo = feed.items[0];
            const latestVideoID = latestVideo.id.split(`:`)[2];
            latestVideo.link = `https://youtu.be/${latestVideoID}`;

            if (
                (!data?.checked_video || latestVideo.id !== data?.checked_video.id) &&
                ( new Date(latestVideo.pubDate) > new Date(data.checked_video.pubDate) )
            ) {
                data.checked_video = latestVideo;

                await data.save().then(() => self.emit(`videoAdded`, data));
            };
        };

        // (async () => {
        //     const feed = await parser.parseURL(url);

        //     if (!feed || !feed.items.length) return;

        //     const { link: channel_link, title: channel_name } = feed;

        //     const data = await Notification.findOne({ channel_id }) || new Notification({
        //         channel_id,
        //         channel_link,
        //         channel_name,
        //         last_checked: new Date()
        //     });

        //     const latestVideo = feed.items[0];
        //     const latestVideoID = latestVideo.id.split(`:`)[2];
        //     latestVideo.link = `https://youtu.be/${latestVideoID}`;

        //     data.checked_video = latestVideo;

        //     await data.save()
        //         .then(() => this.emit(`videoAdded`, { feed, latestVideo }));

        //     async function checkVideo(self) {
        //         const feed = await parser.parseURL(url);

        //         if (!feed || !feed.items.length) return;

        //         const latestVideo = feed.items[0];
        //         const latestVideoID = latestVideo.id.split(`:`)[2];
        //         latestVideo.link = `https://youtu.be/${latestVideoID}`;

        //         if ((!data.checked_video || latestVideo.id !== data.checked_video.id) && (new Date(latestVideo.pubDate) > new Date(data.checked_video.published_date))) {
        //             data.checked_video = {
        //                 id: latestVideo.id,
        //                 published_date: latestVideo.pubDate
        //             };

        //             await data.save()
        //                 .then(() => self.emit(`videoAdded`, { feed, latestVideo }));
        //         };
        //     };

        //     setInterval(checkVideo, interval, this);
        // })();
    };

    on(event, listener) {
        this.events[event].push(listener);
    };

    emit(event, ...data) {
        this.events[event].forEach(listener => listener(...data));
    };
};

// Exports
module.exports = YouTubeNotifier;