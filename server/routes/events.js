const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { validateEvent } = require('../middleware/validation');

// @desc    Get all events
// ... (GET routes unchanged) ...

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
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

const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// ...

// @desc    Create an event
// @route   POST /api/events
// @access  Private (Admin)
router.post('/', [auth, adminAuth], async (req, res) => {
    const { title, description, date, startTime, endTime, venue, type, organizer, image, registrationLink, venueLocation } = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            startTime,
            endTime,
            venue,
            type,
            organizer,
            image,
            registrationLink,
            venueLocation
        });

        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        console.error('Event Creation Error:', err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
});


// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private (Admin)
router.put('/:id', [auth, adminAuth], async (req, res) => {
    const { title, description, date, startTime, endTime, venue, type, organizer, image, registrationLink, venueLocation } = req.body;

    // Build event object
    const eventFields = {};
    if (title) eventFields.title = title;
    if (description) eventFields.description = description;
    if (date) eventFields.date = date;
    if (startTime) eventFields.startTime = startTime;
    if (endTime) eventFields.endTime = endTime;
    if (venue) eventFields.venue = venue;
    if (type) eventFields.type = type;
    if (organizer) eventFields.organizer = organizer;
    if (image) eventFields.image = image;
    if (registrationLink) eventFields.registrationLink = registrationLink;
    if (venueLocation) eventFields.venueLocation = venueLocation;

    try {
        let event = await Event.findById(req.params.id);

        if (!event) return res.status(404).json({ msg: 'Event not found' });

        event = await Event.findByIdAndUpdate(
            req.params.id,
            { $set: eventFields },
            { new: true }
        );

        res.json(event);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        // Find event by ID
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        await event.deleteOne();

        res.json({ msg: 'Event removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Event not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
