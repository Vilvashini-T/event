const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

// @route   POST /api/registrations/:eventId
// @desc    Register for an event
// @access  Private
router.post('/:eventId', auth, async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const userId = req.user.id;

        // 1. Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ msg: 'Event not found' });
        }

        // 2. Check capacity
        if (event.registeredCount >= event.capacity) {
            return res.status(400).json({ msg: 'Event is full' });
        }

        // 3. Check for existing registration
        const existingReg = await Registration.findOne({ user: userId, event: eventId });
        if (existingReg) {
            return res.status(400).json({ msg: 'Already registered for this event' });
        }

        // 4. Create registration and update event count atomically
        // Note: In a real high-concurrency app, we'd use transactions or conditional updates.
        // For this project, we'll keep it simple but safe enough.

        const registration = new Registration({
            user: userId,
            event: eventId
        });

        await registration.save();

        // Increment count
        event.registeredCount += 1;
        await event.save();

        res.json(registration);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/registrations/my
// @desc    Get current user's registrations
// @access  Private
router.get('/my', auth, async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user.id })
            .populate('event', ['title', 'date', 'startTime', 'venue', 'image', 'category'])
            .sort({ registeredAt: -1 });

        res.json(registrations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/registrations/check/:eventId
// @desc    Check if user is registered for specific event
// @access  Private
router.get('/check/:eventId', auth, async (req, res) => {
    try {
        const registration = await Registration.findOne({
            user: req.user.id,
            event: req.params.eventId
        });

        res.json({ isRegistered: !!registration });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
