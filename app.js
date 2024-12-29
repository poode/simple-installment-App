const path = require('path');
const express = require('express');
const session = require('express-session');
const i18n = require('i18n');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts'); // Require express-ejs-layouts

const db = require('./config/database');
const InstallmentRoutes = require('./routes/installments');
const userRoutes = require('./routes/users');
const isAuthenticated = require('./middleware/auth'); // Import the authentication middleware

const runMigrations = require('./config/migrate');
dotenv.config();

const app = express();

// Middleware setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Provide a default secret for development
    resave: false,
    saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the directory for views

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // Make sure this path matches your layout file's location

app.use(express.static('public')); // Ensure static files can be served from the public folder

// Localization setup
i18n.configure({
    locales: ['ar'],
    directory: path.join(__dirname, 'locales'), // Use path.join for cross-platform compatibility
    defaultLocale: 'ar',
});

app.use(i18n.init);

// Routes
app.use('/', userRoutes);

// Apply authentication middleware only to the routes after the login and register
app.use(isAuthenticated);

// Ensure that this is below your authentication middleware
app.use('/installments', InstallmentRoutes);

// Start the application
const PORT = process.env.PORT || 3000;
runMigrations().then(() => {
    console.log('Migrations complete.');

    app.listen(PORT, async () => {
        console.log(`Server running on http://localhost:${PORT}`);

        // Sync database
        await db.sequelize.sync(); // Consider using migrations for production
    });
});

module.exports = app

