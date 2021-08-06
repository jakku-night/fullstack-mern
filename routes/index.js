const express = require('express');
const router = express.Router();

router.post('/login', async (req, res) => {
    console.log('Logged in!');
    const { username, password } = req.body;
    const new_user = {
        username,
        id: '0',
        token: password,
        status: 'OK'
    };
    const data = await JSON.stringify(new_user);
    res.json(data);
});

module.exports = router;