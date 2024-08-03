const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require("../Models/Users");
require('dotenv').config();

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const User = await UsersModel.findOne({
            where: {
                userName: req.body.userName
            },
        });

        if (!User) {
            return res.status(400).json({ message: "Username or Password Invalid" });
        }
        const isMatch = await bcrypt.compare(req.body.password, User.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Username or Password Invalid" });
        }

        const data = {
            id: User.id,
            firstName: User.firstName,
            lastName: User.lastName,
            userName: User.userName,
            phoneNumber: User.phoneNumber,
            gender: User.gender,
            year: User.year,
            branch: User.branch,
            status: User.status,
            studentID: User.studentID,
            email:User.email,
            role: User.role,
            idCard:User.idCard
        };

        jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
            if (error) {
                throw error;
            }
            res.json({ token, data, message: "Success" });
        });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})



module.exports = router;