const connect = require('../connect');
const { DataTypes } = require("sequelize");

const EvaluationModel = connect.define("evaluators", {
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
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,  
    },

    evaluatorStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    currentStudyField: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    statusStart: {
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
