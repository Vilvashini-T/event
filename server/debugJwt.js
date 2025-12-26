const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

console.log('JWT_SECRET form env:', process.env.JWT_SECRET);

if (!process.env.JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is missing!');
    process.exit(1);
}

const payload = {
    user: {
        id: '12345dummyid'
    }
};

try {
    console.log('Attempting to sign token...');
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
            if (err) {
                console.error('Callback Error:', err);
                throw err;
            }
            console.log('Token generated successfully:', token);
        }
    );
} catch (err) {
    console.error('Synchronous Error:', err);
}
