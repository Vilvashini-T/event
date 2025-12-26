const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path as necessary
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'admin@kec.edu';
        const password = 'admin123';
        const name = 'Admin User';
        const role = 'admin';

        let user = await User.findOne({ email });

        if (user) {
            console.log('User already exists');
            // Optimally, we could reset password here if needed, but let's stick to creation if missing for now, 
            // or force reset if that was the plan. The plan said "if exists, reset".
            // Let's reset it to be sure.
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            console.log('Password reset for admin@kec.edu');
        } else {
            user = new User({
                name,
                email,
                password,
                role
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();
            console.log('Admin user created');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAdmin();
