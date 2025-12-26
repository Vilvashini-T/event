const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path if needed
const dotenv = require('dotenv');

dotenv.config();

const debugAuth = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'admin@kec.edu';
        const passwordInput = 'admin123';

        const user = await User.findOne({ email });

        if (!user) {
            console.log('CRITICAL: User admin@kec.edu NOT FOUND');
            process.exit(1);
        }

        console.log('User found:', user.email);
        console.log('Stored Hash:', user.password);

        const isMatch = await bcrypt.compare(passwordInput, user.password);
        console.log('Bcrypt Compare Result:', isMatch);

        if (isMatch) {
            console.log('Password MATCHES against DB hash.');
        } else {
            console.log('Password DOES NOT MATCH. Hash might be corrupted or salt/rounds issue.');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugAuth();
