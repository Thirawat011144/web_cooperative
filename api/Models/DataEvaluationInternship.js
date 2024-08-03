const connect = require('../connect');
const { DataTypes } = require("sequelize");

const dataEvaluationInternship = connect.define("dataEvaluationInternship", {
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
    criteria: {
        type: DataTypes.STRING,
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
    strength: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    improvement: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    jobOffer: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    other: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    qualityOfWork: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    academicAbility: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    abilityToLearn: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    practicalAbility: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    judgmentAndDecision: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    managementAndPlanning: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    communicationSkills: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    foreignLanguage: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    suitabilityForJob: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    responsibilityAndDependability: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    interestInWork: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    initiative: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    dependability: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    personality: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    interpersonalSkills: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    discipline: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ethicsAndMorality: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    totalScore: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    averageScore: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    idCard: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
});

module.exports = dataEvaluationInternship;


// dataEvaluationInternship.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = dataEvaluationInternship;
