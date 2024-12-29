// middleware/auth.js

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    res.redirect('/login'); // Redirect to login if not authenticated
}

module.exports = isAuthenticated;
