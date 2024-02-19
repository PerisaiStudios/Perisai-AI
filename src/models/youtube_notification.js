// Imports
const mongoose = require(`mongoose`);

// Main
const schema = new mongoose.Schema({
    youtube_channel: String,
    last_checked: Date,
    checked_video: {
        id: String,
        published_date: Date
    },
});

// Exports
module.exports = mongoose.model(`youtube_notifications`, schema);