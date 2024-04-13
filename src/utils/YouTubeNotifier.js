// Imports
const axios = require("axios").default;
const Notification = require(`../models/youtube_notification.js`);
const EventEmitter = require(`events`);
const Parser = require(`rss-parser`);

// Initialization
const parser = new Parser();

// Main
class YouTubeNotifier extends EventEmitter {
  constructor(channel_id, interval = 10000) {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`;

    async function checkVideo(self) {
      const feed = await parser.parseURL(url);
      if (!feed || feed.items.length) return;

      const { title: channel_name, link: channel_link } = feed;
      const channel_thumbnail = (await axios.get(
        `https://www.googleapis.com/youtube/v3/channels`,
        {
          params: {
            id: channel_id,
            part: `snippet`,
            key: process.env.GOOGLE_API_KEY,
          },
        }
      )).data.items[0].thumbnails.high.url;
      const data =
        (await Notification.findOne({ channel_id })) ||
        new Notification({
          channel_id,
          last_checked: new Date(),
        });
      const args = { channel_id, channel_link, channel_name, channel_thumbnail }
      const latestVideo = feed.items[0];
      const latestVideoID = latestVideo.id.split(`:`)[2];
      latestVideo.link = `https://youtu.be/${latestVideoID}`;

      if (
        (!data?.latest_video || latestVideo.id !== data?.latest_video.id) &&
        new Date(latestVideo.pubDate) > new Date(data.latest_video.pubDate)
      ) {
        args.latest_video = latestVideo;
        args.last_checked = new Date();
        data.latest_video = latestVideo;
        data.last_checked = new Date();
        

        await data.save().then(() => self.emit(`videoAdded`, args));
      }
    }

    setInterval(checkVideo, interval, this);
  }
}

// Exports
module.exports = YouTubeNotifier;
