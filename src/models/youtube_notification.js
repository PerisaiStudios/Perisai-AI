// Imports
const mongoose = require(`mongoose`);

// Main
const schema = new mongoose.Schema({
    channel_name: String,
    channel_link: String,
    channel_id: String,
    latest_video: {
        title: String,
        link: String,
        pubDate: Date,
        author: String,
        id: String,
        isoDate: String
    },
    last_checked: Date
});

// Exports
module.exports = mongoose.model(`youtube_notifications`, schema);