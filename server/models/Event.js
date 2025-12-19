const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
    },
    venue: {
        type: String, // e.g., "Convention Center"
        required: true,
    },
    venueLocation: {
        // For navigation: could be a node ID or coordinates
        // mocking as a string ID for now
        type: String,
    },
    capacity: {
        type: Number,
        default: 100,
    },
    registeredCount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String, // e.g., "Workshop", "Symposium"
        required: true,
    },
    organizer: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL
    },
    registrationLink: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Event', eventSchema);
