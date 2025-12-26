const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = 'mongodb://localhost:27017/kec-smart-campus';

const checkAdmin = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected');

        // Check for common admin emails or just list all with role admin
        const admins = await User.find({ role: 'admin' });
        console.log('Users with role "admin":', admins);

        const allUsers = await User.find({});
        console.log('All users count:', allUsers.length);
        console.log('Sample user:', allUsers[0]);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkAdmin();
