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

const adminAuth = require('../middleware/adminAuth');

// @route   GET /api/registrations/analytics
// @desc    Get registration analytics (Admin only)
// @access  Private (Admin)
router.get('/analytics', [auth, adminAuth], async (req, res) => {
    try {
        const totalRegistrations = await Registration.countDocuments();

        const registrationsByEvent = await Registration.aggregate([
            {
                $group: {
                    _id: '$event',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'events',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'eventDetails'
                }
            },
            {
                $unwind: '$eventDetails'
            },
            {
                $project: {
                    eventTitle: '$eventDetails.title',
                    count: 1
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.json({
            total: totalRegistrations,
            breakdown: registrationsByEvent
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/registrations/export/:eventId
// @desc    Export registrations for an event as CSV
// @access  Private (Admin)
router.get('/export/:eventId', [auth, adminAuth], async (req, res) => {
    try {
        const registrations = await Registration.find({ event: req.params.eventId })
            .populate('user', ['name', 'email']);

        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ msg: 'Event not found' });

        // CSV Header
        let csv = 'Name,Email,Registration Date\n';

        // CSV Rows
        registrations.forEach(reg => {
            const name = reg.user ? reg.user.name : 'Unknown';
            const email = reg.user ? reg.user.email : 'Unknown';
            const date = new Date(reg.registeredAt).toLocaleDateString();
            csv += `"${name}","${email}","${date}"\n`;
        });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="registrations-${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv"`);
        res.status(200).send(csv);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
