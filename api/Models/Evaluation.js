const connect = require('../connect');
const { DataTypes } = require("sequelize");

const EvaluationModel = connect.define("evaluation", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    idCard: {
        type: DataTypes.STRING(50),
        // allowNull: false,
    },
    schoolName: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    department: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    schoolSize: {
        type: DataTypes.STRING(50),
        // allowNull: false,
    },
    courseRelation: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    evaluatorStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    currentStudyField: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },


});


// EvaluationModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created/updated successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating/updating table:", err);
//     });

module.exports = EvaluationModel;
