const express = require("express");
const bcrypt = require('bcryptjs');
const UsersModel = require("../Models/Users");
const EvaluationModel = require ('../Models/Evaluation')

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const existingUser = await UsersModel.findOne({
      where: { userName: req.body.userName },
    });
    if (existingUser) {
      res.status(400).send({ message: "Username already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const result = await UsersModel.create({
        prefix: req.body.prefix,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hashedPassword,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        idCard: req.body.idCard,
        gender: req.body.gender,
        year: req.body.year,
        branch: req.body.branch,
        status: req.body.status,
        studentID: req.body.studentID,
      });
      await result.save();
      res.json({ message: "Success", result: result });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { idCard } = req.body;

  try {
    // ใช้ findOne ของ Sequelize เพื่อค้นหาผู้ใช้
    const user = await UsersModel.findOne({ where: { idCard: idCard } });

    if (!user) {
      return res.status(404).send({ redirectToReset: false, message: 'User not found' });
    }
    res.send({ redirectToReset: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Forgot Password Route
router.post('/forgot-password-evaluator', async (req, res) => {
  const { idCard } = req.body;

  try {
    // ใช้ findOne ของ Sequelize เพื่อค้นหาผู้ใช้
    const user = await EvaluationModel.findOne({ where: { idCard: idCard } });

    if (!user) {
      return res.status(404).send({ redirectToReset: false, message: 'User not found' });
    }
    res.send({ redirectToReset: true });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post('/reset-password', async (req, res) => {
  const { idCard, newPassword } = req.body;

  try {
    // ค้นหาผู้ใช้ตาม idCard
    const user = await UsersModel.findOne({ where: { idCard: idCard } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // สร้าง salt และ hash รหัสผ่านใหม่
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // อัพเดตรหัสผ่านในฐานข้อมูล
    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
});

router.post('/reset-password-evaluator', async (req, res) => {
  const { idCard, newPassword } = req.body;

  try {
    // ค้นหาผู้ใช้ตาม idCard
    const user = await EvaluationModel.findOne({ where: { idCard: idCard } });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // สร้าง salt และ hash รหัสผ่านใหม่
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // อัพเดตรหัสผ่านในฐานข้อมูล
    user.password = hashedPassword;
    await user.save();

    res.send({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;