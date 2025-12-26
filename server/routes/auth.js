const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validateRegister, validateLogin } = require('../middleware/validation');

// @route   POST /api/auth/register
router.post('/register', validateRegister, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /api/auth/login
router.post('/login', validateLogin, async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login request received for:', email);
        let user = await User.findOne({ email });
        console.log('DB User lookup result:', user ? 'Found' : 'Not Found');

        if (!user) {
            console.log('Login attempt: User not found for email:', email);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('Comparing passwords...');
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Login attempt: Password mismatch for user:', email);
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        console.log('Login success for:', email);

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                console.log('DEBUG Login: Generated token for user role:', user.role);
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
