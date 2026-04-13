const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjlkZDFkODYyNDhiZDZiOWNjNjRjNDQ0In0sImlhdCI6MTc3NjA5ODg2NCwiZXhwIjoxNzc2MTAyNDY0fQ._H4lZRXRwC3mGVlMiLAdMjSERfqgcavZ-7kkrZ8dGRM"
