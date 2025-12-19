const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { validateEvent } = require('../middleware/validation');

// @desc    Get all events
// ... (GET routes unchanged) ...

// @desc    Create an event
// @route   POST /api/events
// @access  Public (for now)
router.post('/', validateEvent, async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @desc    Create an event
// @route   POST /api/events
// @access  Public (for now)
router.post('/', async (req, res) => {
    const { title, description, date, startTime, endTime, venue, category, organizer, image, registrationLink, venueLocation } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            startTime,
            endTime,
            venue,
            category,
            organizer,
            image,
            registrationLink,
            venueLocation
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
