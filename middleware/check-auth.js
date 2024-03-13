const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
    try {
        // Get the token from the Authorization header
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token and decode the user data
        const decodedToken = jwt.verify(token, 'secret');
        req.userData = decodedToken;
        // Call the next middleware function or route handler
        next();
    } catch (error) {
        // If the token is invalid or expired, return a 401 Unauthorized response
        res.status(401).json({
            message: 'Invalid or expired token',
            error: error
        });
    }
}

module.exports = {
    checkAuth : checkAuth
}