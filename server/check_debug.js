const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust path if needed
const dotenv = require('dotenv');

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({ email: 'admin@kec.edu' });
        if (user) {
            console.log('User found:', user.email, 'Role:', user.role);
            // We can't see the password, but we know it exists.
        } else {
            console.log('User admin@kec.edu NOT FOUND');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUser();
