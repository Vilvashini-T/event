const validateEvent = (req, res, next) => {
    const { title, date, venue } = req.body;

    if (!title || title.trim().length === 0) {
        return res.status(400).json({ msg: 'Title is required' });
    }

    if (!date) {
        return res.status(400).json({ msg: 'Date is required' });
    }

    if (!venue || venue.trim().length === 0) {
        return res.status(400).json({ msg: 'Venue is required' });
    }

    next();
};

const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ msg: 'Please include a valid email' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    if (!name) {
        return res.status(400).json({ msg: 'Name is required' });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide email and password' });
    }
    next();
};

module.exports = { validateEvent, validateRegister, validateLogin };
