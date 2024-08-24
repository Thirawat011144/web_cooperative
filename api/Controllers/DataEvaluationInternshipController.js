const express = require("express");
const {dataEvaluationInternshipModel,UsersModel,EvaluatorsModels } = require("../Models/index");
// const {EvaluatorsModels} = require('../Models/Relationship')

const router = express.Router();

router.post("/data-evaluation-internship", async (req, res) => {
    try {
        const {
             studentId, criteria, time, 
            qualityOfWork, academicAbility, abilityToLearn, practicalAbility,
            judgmentAndDecision, managementAndPlanning, communicationSkills,
            foreignLanguage, suitabilityForJob, responsibilityAndDependability,
            interestInWork, initiative, dependability, personality,
            interpersonalSkills, discipline, ethicsAndMorality, strength,
            improvement, jobOffer, other, averageScore, totalScore,
            idCard
        } = req.body;

        console.log("Criteria Length:", criteria.length); // เพิ่มดีบักเพื่อดูจำนวนข้อ
        console.log("Criteria:", criteria); // เพิ่มดีบักเพื่อดูข้อมูลที่ส่งมา

        const newEvaluation = await dataEvaluationInternshipModel.create({
           
            studentId: studentId,
            idCard: idCard,
            criteria: criteria,
            qualityOfWork: qualityOfWork,
            academicAbility: academicAbility,
            abilityToLearn: abilityToLearn,
            practicalAbility: practicalAbility,
            judgmentAndDecision: judgmentAndDecision,
            managementAndPlanning: managementAndPlanning,
            communicationSkills: communicationSkills,
            foreignLanguage: foreignLanguage,
            suitabilityForJob: suitabilityForJob,
            responsibilityAndDependability: responsibilityAndDependability,
            interestInWork: interestInWork,
            initiative: initiative,
            dependability: dependability,
            personality: personality,
            interpersonalSkills: interpersonalSkills,
            discipline: discipline,
            ethicsAndMorality: ethicsAndMorality,
            totalScore: totalScore,
            averageScore: averageScore,
            time: time,
            strength: strength,
            improvement: improvement,
            jobOffer: jobOffer,
            other: other,
        });

        await newEvaluation.save();
        res.json({ message: "Success", result: newEvaluation });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/data-evaluation-internship", async (req, res) => {
    try {
        const evaluations = await dataEvaluationInternshipModel.findAll({
            include: [
                {
                    model: UsersModel,
                    as: 'userDetails'  // ต้องตรงกับ 'as' ที่กำหนดใน association ของ UsersModel
                },
                {
                    model: EvaluatorsModels,
                    as: 'internshipEvaluator'  // ใช้ 'as' ที่ตรงกับการตั้งค่า association ใน DataEvaluationInternship
                }
            ]
        });
        res.json(evaluations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


// API สำหรับดึงข้อมูลการประเมินของนักเรียนคนเดียวโดยใช้ studentId
router.get("/data-evaluation-internship/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const evaluation = await dataEvaluationInternshipModel.findAll({ where: { studentId: studentId } });

        if (evaluation) {
            res.json(evaluation);
        } else {
            res.status(404).send({ message: "Evaluation not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับอัปเดต totalScore และ averageScore
router.put("/data-evaluation-internship/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const { totalScore, averageScore } = req.body;

        const evaluations = await dataEvaluationInternshipModel.findAll({ where: { studentId } });

        if (evaluations.length === 0) {
            return res.status(404).send({ message: "Evaluations not found" });
        }

        for (let evaluation of evaluations) {
            evaluation.totalScore = totalScore;
            evaluation.averageScore = averageScore;
            await evaluation.save();
        }

        res.json({ message: "Success", data: evaluations });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับลบข้อมูลการประเมินโดยใช้ studentId
router.delete("/data-evaluation-internship", async (req, res) => {
    try {
        const { studentID } = req.body; // ตรวจสอบชื่อฟิลด์ให้ตรงกัน

        const result = await dataEvaluationInternshipModel.destroy({
            where: { studentId: studentID } // ใช้ studentID
        });

        if (result) {
            res.json({ message: "Evaluations deleted successfully" });
        } else {
            res.status(404).send({ message: "Evaluations not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
