const axios = require('axios');

const URL = 'http://localhost:5000/api/auth/login';

const runTest = async () => {
    for (let i = 1; i <= 10; i++) {
        try {
            const res = await axios.post(URL, {
                username: 'test',
                password: '123456'
            });

            console.log(`Request ${i}: SUCCESS`, res.data);

        } catch (err) {
            if (err.response) {
                console.log(`Request ${i}: ERROR`, err.response.data);
            } else {
                console.log(`Request ${i}: FAILED`, err.message);
            }
        }
    }
};

runTest();