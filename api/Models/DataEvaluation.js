const connect = require('../connect');
const { DataTypes } = require("sequelize");

const DataEvaluation = connect.define("dataevaluation", {
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
    idCard: {
        type: DataTypes.STRING(50),
        // allowNull: false,
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
    phoneNumber: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    additionalComments: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    innovationAlignment: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    learningPlan: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    innovativeLearningPlan: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    joyfulLearningActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    learnerWellbeingActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    individualStudentDevelopment: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    systematicQualityReporting: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    studentProblemResearch: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    digitalLearningTools: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    collaborativeCreativity: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    professionalGrowthActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    parentCollaboration: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    parentCollab: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    parentNetwork: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    communityNetwork: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    communityContextReport: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    communityEngagement: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    culturalStudyReport: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    culturalIntegration: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    studentGrowth: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    studentCare: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    continuousLearning: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    inclusivity: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    positiveReinforcement: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    creativeExpression: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    currentAffairsIntegration: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    innovativeTeaching: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    ethicalRoleModel: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    fairnessAndHarmony: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    complianceAndCommitment: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    adaptiveProfessional: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    professionalIntegrity: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    professionalMembership: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    sincereService: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    ethicalConduct: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    dedicatedSupport: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    teamHarmony: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    communityLeadership: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    democraticCompliance: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    }
});

// Uncomment the following lines to create the table or sync the model with the database
// DataEvaluation.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = DataEvaluation;
