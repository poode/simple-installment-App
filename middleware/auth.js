// middleware/auth.js

function isAuthenticated(req, res, next) {
    res.locals.session = req.session || {};
    if (req.session.userId) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;
