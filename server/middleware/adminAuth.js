const adminAuth = (req, res, next) => {
    // Expect auth middleware to have run first and populated req.user
    console.log('DEBUG AdminAuth: req.user:', req.user);
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        console.log(`DEBUG AdminAuth Failed: Role is '${req.user ? req.user.role : 'undefined'}'`);
        return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
};

module.exports = adminAuth;
