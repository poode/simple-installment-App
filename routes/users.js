const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login', session: res.locals.session }); // Render the register.ejs file
});

router.get('/register', (req, res) => {
    res.render('register',{ title: 'Register', session: res.locals.session }); // Render the register.ejs file
});

// User Registration
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await User.hashPassword(password);
        await User.create({ username, password: hashedPassword });
        res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user.');
    }
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', session: res.locals.session }); // Render the login.ejs file
});

// User Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && await User.verifyPassword(password, user.password)) {
        req.session.userId = user.id; // Store user ID in session
        res.redirect('/installments');
    } else {
        res.status(401).send('Invalid credentials.');
    }
});

// User Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
