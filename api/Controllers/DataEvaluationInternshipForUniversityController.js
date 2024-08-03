const express = require("express");
const DataEvaluationInternshipForUniversity = require("../Models/DataEvaluationInternshipForUniversity");

const router = express.Router();

router.post("/data-evaluation-internship-university", async (req, res) => {
    try {
        const {
            evaluatorStatus, time, evaluatorName, studentId, criteria, hrGuidance, employeeSupport, phoneNumber,
            assignedWorkload, taskRelevanceToMajor, taskMatchesProposal, assignedTaskInterestMatch, reportTopicSuitability,
            initialSupervisor, supervisorKnowledgeAndExperience, supervisionTime, reportWritingSupervisionTime, supervisorInterestInGuidance,
            supervisorEvaluationPriority, workPlanDevelopment, personality, maturity, adaptation, learning, expressingOpinions,
            humanRelations, attitude, organizationEngagement, meetingFeedbackAndIdeas, ethicsAndDiscipline,
            integrityAndResponsibility, basicKnowledgeAndSkills, applicationOfKnowledgeAndSkills, reportProgressAndCompletion,
            clearAndSystematicCommunication, studentOverallEvaluation, other, idCard
        } = req.body;

        // สร้าง payload และแปลงค่าที่จำเป็นให้เป็น string
        const payload = {
            evaluatorStatus,
            time,
            evaluatorName,
            studentId,
            criteria,
            hrGuidance,
            employeeSupport,
            phoneNumber,
            assignedWorkload,
            taskRelevanceToMajor,
            taskMatchesProposal,
            assignedTaskInterestMatch,
            reportTopicSuitability,
            initialSupervisor,
            supervisorKnowledgeAndExperience,
            supervisionTime,
            reportWritingSupervisionTime,
            supervisorInterestInGuidance,
            supervisorEvaluationPriority,
            workPlanDevelopment,
            personality: String(personality),
            maturity: String(maturity),
            adaptation: String(adaptation),
            learning: String(learning),
            expressingOpinions: String(expressingOpinions),
            humanRelations: String(humanRelations),
            attitude: String(attitude),
            organizationEngagement: String(organizationEngagement),
            meetingFeedbackAndIdeas: String(meetingFeedbackAndIdeas),
            ethicsAndDiscipline: String(ethicsAndDiscipline),
            integrityAndResponsibility: String(integrityAndResponsibility),
            basicKnowledgeAndSkills: String(basicKnowledgeAndSkills),
            applicationOfKnowledgeAndSkills: String(applicationOfKnowledgeAndSkills),
            reportProgressAndCompletion: String(reportProgressAndCompletion),
            clearAndSystematicCommunication: String(clearAndSystematicCommunication),
            studentOverallEvaluation: String(studentOverallEvaluation),
            other: String(other),
            idCard:idCard
        };

        console.log("payload:", payload); // เพิ่มดีบักเพื่อดูข้อมูลที่ส่งมา

        const newEvaluation = await DataEvaluationInternshipForUniversity.create(payload);

        res.json({ message: "Success", result: newEvaluation });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับดึงข้อมูลการประเมินทั้งหมด
router.get("/data-evaluation-internship-university", async (req, res) => {
    try {
        const evaluations = await DataEvaluationInternshipForUniversity.findAll();
        res.json(evaluations);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับลบข้อมูลการประเมินโดยใช้ studentId
router.delete("/data-evaluation-internship-university", async (req, res) => {
    try {
        const { studentID } = req.body; // ตรวจสอบชื่อฟิลด์ให้ตรงกัน

        const result = await DataEvaluationInternshipForUniversity.destroy({
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
