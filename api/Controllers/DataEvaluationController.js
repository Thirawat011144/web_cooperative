const express = require("express");
// const DataEvaluation = require("../Models/DataEvaluation");
const { dataEvaluation, TeachersModels, EvaluatorsModels } = require("../Models/index");

const router = express.Router();

router.post("/data-evaluation", async (req, res) => {
    try {
        const {

            studentId,
            idCard,
            criteria,
            time,
            evaluatorStatus,

            additionalComments,
            innovationAlignment,
            learningPlan,
            innovativeLearningPlan,
            joyfulLearningActivities,
            learnerWellbeingActivities,
            individualStudentDevelopment,
            systematicQualityReporting,
            studentProblemResearch,
            digitalLearningTools,
            collaborativeCreativity,
            professionalGrowthActivities,
            parentCollaboration,
            parentCollab,
            parentNetwork,
            communityNetwork,
            communityContextReport,
            communityEngagement,
            culturalStudyReport,
            culturalIntegration,
            studentGrowth,
            studentCare,
            continuousLearning,
            inclusivity,
            positiveReinforcement,
            creativeExpression,
            currentAffairsIntegration,
            innovativeTeaching,
            ethicalRoleModel,
            fairnessAndHarmony,
            complianceAndCommitment,
            adaptiveProfessional,
            professionalIntegrity,
            professionalMembership,
            sincereService,
            ethicalConduct,
            dedicatedSupport,
            teamHarmony,
            communityLeadership,
            democraticCompliance
        } = req.body;

        const newEvaluation = await dataEvaluation.create({

            studentId: studentId,
            idCardTeacher: evaluatorStatus === 'อาจารย์นิเทศ' ? idCard : null,
            idCardEvaluator: evaluatorStatus === 'ครูพี่เลี้ยง' || evaluatorStatus === 'หัวหน้าแผนกวิชา' || evaluatorStatus === 'ผู้บริหารสถานศึกษา/ผู้ได้รับมอบหมาย' || evaluatorStatus === 'กรรมการบริหารสถานศึกษา/ตัวแทนชุมชน' ? idCard : null,
            criteria: criteria,
            time: time,
            evaluatorStatus: evaluatorStatus,
            additionalComments: additionalComments,
            innovationAlignment: innovationAlignment,
            learningPlan: learningPlan,
            innovativeLearningPlan: innovativeLearningPlan,
            joyfulLearningActivities: joyfulLearningActivities,
            learnerWellbeingActivities: learnerWellbeingActivities,
            individualStudentDevelopment: individualStudentDevelopment,
            systematicQualityReporting: systematicQualityReporting,
            studentProblemResearch: studentProblemResearch,
            digitalLearningTools: digitalLearningTools,
            collaborativeCreativity: collaborativeCreativity,
            professionalGrowthActivities: professionalGrowthActivities,
            parentCollaboration: parentCollaboration,
            parentCollab: parentCollab,
            parentNetwork: parentNetwork,
            communityNetwork: communityNetwork,
            communityContextReport: communityContextReport,
            communityEngagement: communityEngagement,
            culturalStudyReport: culturalStudyReport,
            culturalIntegration: culturalIntegration,
            studentGrowth: studentGrowth,
            studentCare: studentCare,
            continuousLearning: continuousLearning,
            inclusivity: inclusivity,
            positiveReinforcement: positiveReinforcement,
            creativeExpression: creativeExpression,
            currentAffairsIntegration: currentAffairsIntegration,
            innovativeTeaching: innovativeTeaching,
            ethicalRoleModel: ethicalRoleModel,
            fairnessAndHarmony: fairnessAndHarmony,
            complianceAndCommitment: complianceAndCommitment,
            adaptiveProfessional: adaptiveProfessional,
            professionalIntegrity: professionalIntegrity,
            professionalMembership: professionalMembership,
            sincereService: sincereService,
            ethicalConduct: ethicalConduct,
            dedicatedSupport: dedicatedSupport,
            teamHarmony: teamHarmony,
            communityLeadership: communityLeadership,
            democraticCompliance: democraticCompliance
        });

        await newEvaluation.save();
        res.json({ message: "Success", result: newEvaluation });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับดึงข้อมูลการประเมินทั้งหมด
router.get("/data-evaluation", async (req, res) => {
    try {
        const evaluations = await dataEvaluation.findAll({
            include: [
                {
                    model: TeachersModels,
                    as: 'teacher'
                },
                {
                    model: EvaluatorsModels,
                    as: 'evaluator'
                }
            ]
        });

        const results = evaluations.map(evaluation => {
            const evaluatorName = evaluation.teacher ? `${evaluation.teacher.firstName} ${evaluation.teacher.lastName}` :
                evaluation.evaluator ? `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}` : '';

            const idCard = evaluation.teacher ? evaluation.teacher.idCard :
                evaluation.evaluator ? evaluation.evaluator.idCard : '';

            const phoneNumber = evaluation.teacher ? evaluation.teacher.phoneNumber :
                evaluation.evaluator ? evaluation.evaluator.phoneNumber : '';
            return {
                ...evaluation.toJSON(),
                evaluatorName,
                idCard,
                phoneNumber
            };
        });

        res.json(results);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});
// API สำหรับดึงข้อมูลการประเมินของนักเรียนคนเดียวโดยใช้ studentId
router.get("/data-evaluation/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const evaluation = await dataEvaluation.findAll({ where: { studentId: studentId } });

        if (evaluation) {
            res.json(evaluation);
        } else {
            res.status(404).send({ message: "Evaluation not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// API สำหรับลบข้อมูลการประเมินโดยใช้ studentId
router.delete("/data-evaluation", async (req, res) => {
    try {
        const { studentID } = req.body; // ตรวจสอบชื่อฟิลด์ให้ตรงกัน

        const result = await dataEvaluation.destroy({
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
