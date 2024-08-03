const connect = require('../connect');
const { DataTypes } = require("sequelize");

const dataEvaluationInternshipForUniversity = connect.define("dataEvaluationInternshipForUniversity", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    evaluatorName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    studentId: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    evaluatorStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    criteria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hrGuidance: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employeeSupport: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignedWorkload: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taskRelevanceToMajor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    taskMatchesProposal: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    assignedTaskInterestMatch: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reportTopicSuitability: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    initialSupervisor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisorKnowledgeAndExperience: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisionTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reportWritingSupervisionTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisorInterestInGuidance: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    supervisorEvaluationPriority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    workPlanDevelopment: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    personality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    maturity: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adaptation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    learning: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expressingOpinions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    humanRelations: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    attitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    organizationEngagement: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    meetingFeedbackAndIdeas: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ethicsAndDiscipline: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    integrityAndResponsibility: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    basicKnowledgeAndSkills: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    applicationOfKnowledgeAndSkills: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reportProgressAndCompletion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clearAndSystematicCommunication: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studentOverallEvaluation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    other: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    idCard: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},);

// dataEvaluationInternshipForUniversity.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = dataEvaluationInternshipForUniversity;
