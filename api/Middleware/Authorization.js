const jwt = require("jsonwebtoken");
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send({ message: 'Invalid Token' });
    }
};

module.exports = authenticateToken;