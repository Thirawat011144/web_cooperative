const express = require("express");
const bcrypt = require('bcryptjs');
// const TeachersModel = require("../Models/Teachers"); 
const { TeachersModels, dataEvaluationInternshipForUniversityMode } = require("../Models/index");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();


router.post('/reset-password-teacher', async (req, res) => {
    const { idCard, newPassword } = req.body;

    try {
        // ค้นหาผู้ใช้ในโมเดล Teachers ตาม idCard
        const teacher = await TeachersModels.findOne({ where: { idCard: idCard } });

        if (!teacher) {
            return res.status(404).send({ message: 'Teacher not found' });
        }

        // สร้าง salt และ hash รหัสผ่านใหม่
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // อัพเดตรหัสผ่านในฐานข้อมูล
        teacher.password = hashedPassword;
        await teacher.save();

        res.send({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: error.message });
    }
});

router.post('/forgot-password/teacher', async (req, res) => {
    const { idCard } = req.body;

    try {
        // ใช้ TeachersModels ในการค้นหาผู้ใช้โดยใช้เฉพาะ idCard
        const user = await TeachersModels.findOne({ where: { idCard: idCard } });

        if (!user) {
            return res.status(404).send({ redirectToReset: false, message: 'User not foundบ่อพ้ออ' });
        }

        res.send({ redirectToReset: true });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// GET: ดึงข้อมูลทั้งหมดของ teachers
router.get("/teachers", async (req, res) => {
    try {
        const teachers = await TeachersModels.findAll();
        res.json(teachers);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// GET: ดึงข้อมูลผู้ใช้ครูตาม ID
router.get("/teacher/:id", async (req, res) => {
    try {
        const user = await TeachersModels.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// POST: สร้าง teacher ใหม่
// router.post("/teacher", async (req, res) => {
//     try {
//         const existingTeacher = await TeachersModels.findOne({
//             where: { userName: req.body.userName},
//         });

//         if (existingTeacher) {
//             res.status(400).send({ message: "ชื่อผู้ใช้นี้ถูกใช้งานไปแล้วหรือเลขบัตรประชาชนนี้ถูกใช้งานไปแล้ว" });
//         } else {
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(req.body.password, salt);

//             const newTeacher = await TeachersModels.create({
//                 prefix: req.body.prefix,
//                 firstName: req.body.firstName,
//                 lastName: req.body.lastName,
//                 userName: req.body.userName,
//                 password: hashedPassword,
//                 phoneNumber: req.body.phoneNumber,
//                 idCard: req.body.idCard,
//                 gender: req.body.gender,
//                 branch: req.body.branch,
//                 statusStart: req.body.statusStart,  // สมมติว่ามีฟิลด์ department สำหรับ teachers
//                 role: req.body.role
//             });

//             await newTeacher.save();
//             res.json({ message: "Success", result: newTeacher });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// POST: เพิ่มอีเมลของครู
router.post('/teacher', async (req, res) => {
    try {
        const { userName, password } = req.body;

        if (!userName || !password) {
            return res.status(400).json({ message: 'UserName and Password are required' });
        }

        // เข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้างครูใหม่ในฐานข้อมูล โดยไม่รวมฟิลด์ statusStart
        const newTeacher = await TeachersModels.create({
            userName,
            password: hashedPassword,  // เก็บรหัสผ่านที่เข้ารหัสแล้ว
            role: 'teacher'  // กำหนดบทบาทเป็น teacher
        });

        res.status(201).json({ message: 'Teacher added successfully', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/login/teacher', async (req, res) => {
    try {
        console.log(req.body.userName)
        const User = await TeachersModels.findOne({
            where: {
                userName: req.body.userName
            },
        });
        console.log(User)

        if (!User) {
            return res.status(400).json({ message: "Username or Password Invalids" });
        }

        const isMatch = await bcrypt.compare(req.body.password, User.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Username or Password Invalid" });
        }

        // ตรวจสอบบทบาทของผู้ใช้
        if (User.role !== 'teacher') {
            return res.status(403).json({ message: "Unauthorized: You do not have teacher access" });
        }

        const data = {
            id: User.id,
            prefix: User.prefix,
            firstName: User.firstName,
            lastName: User.lastName,
            userName: User.userName,
            phoneNumber: User.phoneNumber,
            idCard: User.idCard,
            gender: User.gender,
            branch: User.branch,
            statusStart: User.statusStart,
            role: User.role
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
});


// PUT: อัปเดตข้อมูล teacher โดยใช้ ID
router.put('/teacher/:id', async (req, res) => {
    try {
        const teacher = await TeachersModels.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).send({ message: "User not found" });
        }

        // ตรวจสอบและอัปเดตเฉพาะฟิลด์ที่มีใน req.body
        const { prefix, firstName, lastName, userName, password, phoneNumber, idCard, gender, branch, statusStart, role } = req.body;

        if (prefix !== undefined) teacher.prefix = prefix;
        if (firstName !== undefined) teacher.firstName = firstName;
        if (lastName !== undefined) teacher.lastName = lastName;
        if (userName !== undefined) teacher.userName = userName;
        if (password !== undefined) {
            const salt = await bcrypt.genSalt(10);
            teacher.password = await bcrypt.hash(password, salt);  // เข้ารหัสรหัสผ่านก่อนอัปเดต
        }
        if (phoneNumber !== undefined) teacher.phoneNumber = phoneNumber;
        if (idCard !== undefined) teacher.idCard = idCard;
        if (gender !== undefined) teacher.gender = gender;
        if (branch !== undefined) teacher.branch = branch;
        if (statusStart !== undefined) teacher.statusStart = statusStart;
        if (role !== undefined) teacher.role = role;

        await teacher.save();

        res.json({ data: teacher, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// DELETE: ลบข้อมูลครูตาม ID
router.delete('/teacher/:id', async (req, res) => {
    try {
        const teacher = await TeachersModels.findByPk(req.params.id);
        if (!teacher) {
            return res.status(404).send({ message: "Teacher not found" });
        }

        // ลบครูนี้ซึ่งจะลบข้อมูลที่เกี่ยวข้องทั้งหมดตามความสัมพันธ์ที่กำหนด (onDelete: 'CASCADE')
        await teacher.destroy();

        res.json({ message: "Teacher and related data deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
