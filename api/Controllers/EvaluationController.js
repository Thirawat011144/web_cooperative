const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Evaluation = require("../Models/Evaluation");
require('dotenv').config();

const router = express.Router();

// Register Route
router.post("/evaluation", async (req, res) => {
    try {
        const existingUser = await Evaluation.findOne({
            where: { userName: req.body.userName },
        });
        if (existingUser) {
            return res.status(400).send({ message: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const result = await Evaluation.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            password: hashedPassword,
            phoneNumber: req.body.phoneNumber,
            idCard: req.body.idCard,
            // schoolName: req.body.schoolName,
            // department: req.body.department,
            // schoolSize: req.body.schoolSize,
            // courseRelation: req.body.courseRelation,
            evaluatorStatus: req.body.evaluatorStatus,
            currentStudyField: req.body.currentStudyField
        });

        await result.save();
        return res.json({ message: "Success", result: result });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Login Route
router.post("/evaluation/login", async (req, res) => {
    try {
        const user = await Evaluation.findOne({
            where: { userName: req.body.userName },
        });
        if (!user) {
            return res.status(400).send({ message: "Invalid username or password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: "Invalid username or password" });
        }

        // Generate a JWT token
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            phoneNumber: user.phoneNumber,
            idCard: user.idCard,
            // schoolName: user.schoolName,
            // department: user.department,
            // schoolSize: user.schoolSize,
            // courseRelation: user.courseRelation,
            evaluatorStatus: user.evaluatorStatus,
            currentStudyField: user.currentStudyField,
            role: 'evaluator'
        };

        const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.json({
            message: "Success",
            token: token,
            data: data
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// Get user data by ID
router.get("/evaluation/:id", async (req, res) => {
    try {
        const user = await Evaluation.findByPk(req.params.id, {
            attributes: { exclude: ['password'] } // Exclude password from response
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update current study field
router.put("/evaluation/:id", async (req, res) => {
    try {
        const user = await Evaluation.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        
        user.currentStudyField = req.body.currentStudyField;
        await user.save();

        res.json({ message: "Current study field updated successfully", user });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
