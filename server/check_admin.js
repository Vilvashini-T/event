const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check for common admin emails or just list all with role admin
        const admins = await User.find({ role: 'admin' });
        console.log('Users with role "admin":', admins);

        // Also check specific user if known, e.g., admin@kec.edu
        const specificAdmin = await User.findOne({ email: 'admin@kec.edu' });
        console.log('User "admin@kec.edu":', specificAdmin);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAdmin();
