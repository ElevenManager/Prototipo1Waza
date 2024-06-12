// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (requiredPermission) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (requiredPermission && !req.user.permisos.includes(requiredPermission)) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
