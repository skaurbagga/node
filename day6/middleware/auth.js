//for 2nd
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    const token = req.header('Authorization');

    // 1. No token
    if (!token) {
        return res.status(401).json({ msg: "No token, access denied" });
    }

    try {
        // 2. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Attach user to request
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};