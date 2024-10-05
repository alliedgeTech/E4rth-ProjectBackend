// middleware/authenticate.js
const jwt = require('../utils/jwt');
const permissions = require('../config/permissions.json');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Authorization header missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verifyJwtToken(token);
        req.user = decoded; // Attach user data to request
        const userRole = decoded.role;
        const method = req.method.toLowerCase();
        const route = req.baseUrl + req.path;

        // Check if the user's role is allowed to access the route
        const allowedRoutes = permissions.find(p => p.roles.includes(userRole))?.method[method] || [];
        const hasPermission = allowedRoutes.some(endpoint => route.startsWith(endpoint));

        if (!hasPermission) {
            return res.status(403).json({ error: 'Access denied: You do not have the necessary permissions' });
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
