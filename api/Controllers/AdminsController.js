const express = require("express");
const bcrypt = require('bcryptjs');
const AdminsModel = require("../Models/Admins");  // นำเข้าโมเดล Admins
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();



router.post('/reset-password-admin', async (req, res) => {
  const { idCard, newPassword } = req.body;

  try {
    // ค้นหาผู้ใช้ในโมเดล Admins ตาม idCard
    const admin = await AdminsModel.findOne({ where: { idCard: idCard } });

    if (!admin) {
      return res.status(404).send({ message: 'Admin not found' });
    }

    // สร้าง salt และ hash รหัสผ่านใหม่
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // อัพเดตรหัสผ่านในฐานข้อมูล
    admin.password = hashedPassword;
    await admin.save();

    res.send({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
});

// Dynamic Forgot Password Route
router.post('/forgot-password/admin', async (req, res) => {
  const { idCard } = req.body;
  // const { userType } = req.params; // ลบออกหากไม่ต้องการใช้งาน

  try {
    // ใช้ findOne ของ Sequelize เพื่อค้นหาผู้ใช้โดยใช้เฉพาะ idCard
    const user = await AdminsModel.findOne({ where: { idCard: idCard } });

    if (!user) {
      return res.status(404).send({ redirectToReset: false, message: 'User not found' });
    }
    res.send({ redirectToReset: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



router.post("/admin", async (req, res) => {
  try {
    // ตรวจสอบว่ามี userName หรือ idCard อยู่แล้วหรือไม่
    const existingAdmin = await AdminsModel.findOne({
      where: { userName: req.body.userName, idCard: req.body.idCard },
    });

    if (existingAdmin) {
      res.status(400).send({ message: "ชื่อผู้ใช้นี้ถูกใช้งานไปแล้วหรือเลขบัตรประชาชนนี้ถูกใช้งานไปแล้ว" });
    } else {
      // เข้ารหัสรหัสผ่าน
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // สร้างข้อมูล admin ใหม่
      const result = await AdminsModel.create({
        prefix: req.body.prefix,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
        idCard: req.body.idCard,
        gender: req.body.gender,
        branch: req.body.branch,
        statusStart: req.body.statusStart,
        role: req.body.role
      });

      // บันทึกข้อมูลลงฐานข้อมูล
      await result.save();
      res.json({ message: "Success", result: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});




router.post('/login/admin', async (req, res) => {
  try {
    const User = await AdminsModel.findOne({
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

    // ตรวจสอบบทบาทของผู้ใช้
    if (User.role !== 'admin') {
      return res.status(403).json({ message: "Unauthorized: You do not have admin access" });
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

module.exports = router;


// GET: ดึงข้อมูลทั้งหมดของ admins
router.get("/admins", async (req, res) => {
  try {
    const admins = await AdminsModel.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// GET: ดึงข้อมูลผู้ใช้ตาม ID
router.get("/admin/:id", async (req, res) => {
  try {
    const user = await AdminsModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


router.put('/admin/:id', async (req, res) => {
  try {
    const user = await AdminsModel.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // ตรวจสอบและอัปเดตเฉพาะฟิลด์ที่มีใน req.body
    const { prefix, firstName, lastName, userName, password, phoneNumber, idCard, gender, branch, statusStart, role } = req.body;

    if (prefix !== undefined) user.prefix = prefix;
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (userName !== undefined) user.userName = userName;
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);  // เข้ารหัสรหัสผ่านก่อนอัปเดต
    }
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (idCard !== undefined) user.idCard = idCard;
    if (gender !== undefined) user.gender = gender;
    if (branch !== undefined) user.branch = branch;
    if (statusStart !== undefined) user.statusStart = statusStart;
    if (role !== undefined) user.role = role;

    await user.save();

    res.json({ data: user, message: "Success" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


module.exports = router;
