const axios = require('axios');

const testLogin = async () => {
    try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'admin@kec.edu',
            password: 'admin123'
        });
        console.log('Login Successful!');
        console.log('Token:', res.data.token ? 'Received' : 'Missing');
        console.log('User Role:', res.data.user.role);
    } catch (err) {
        console.error('Login Failed:', err.response ? err.response.data : err.message);
    }
};

testLogin();
