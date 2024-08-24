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


// const express = require("express");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const AdminsModel = require("../Models/Admins");
// const TeachersModel = require("../Models/Teachers");
// require('dotenv').config();

// const router = express.Router();

// router.post('/login', async (req, res) => {
//     try {
//         let User = await AdminsModel.findOne({
//             where: {
//                 userName: req.body.userName
//             },
//         });

//         // ตรวจสอบบทบาทที่ถูกคาดหวัง (หน้าแอดมิน)
//         let expectedRole = 'admin';

//         // ถ้าไม่พบใน AdminsModel ให้ค้นหาใน TeachersModel
//         if (!User) {
//             User = await TeachersModel.findOne({
//                 where: {
//                     userName: req.body.userName
//                 },
//             });
//             expectedRole = 'teacher'; // กำหนดบทบาทที่ถูกคาดหวังเป็นครู
//         }

//         // ถ้าไม่พบทั้งใน AdminsModel และ TeachersModel
//         if (!User) {
//             return res.status(400).json({ message: "Username or Password Invalid" });
//         }

//         // ตรวจสอบว่าบทบาทของผู้ใช้ตรงกับบทบาทที่ควรจะเป็น
//         if (User.role !== expectedRole) {
//             return res.status(400).json({ message: "Unauthorized: Incorrect role for this page" });
//         }

//         const isMatch = await bcrypt.compare(req.body.password, User.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Username or Password Invalid" });
//         }

//         const data = {
//             id: User.id,
//             prefix: User.prefix,
//             firstName: User.firstName,
//             lastName: User.lastName,
//             userName: User.userName,
//             phoneNumber: User.phoneNumber,
//             idCard: User.idCard,
//             gender: User.gender,
//             branch: User.branch,
//             statusStart: User.statusStart,
//             role: User.role
//         };

//         jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' }, (error, token) => {
//             if (error) {
//                 throw error;
//             }
//             res.json({ token, data, message: "Success" });
//         });

//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// module.exports = router;
