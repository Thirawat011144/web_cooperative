const connect = require('../connect');
const { DataTypes } = require("sequelize");

const InternshipModel = connect.define("internships", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    position: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    vacancies: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    salary: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    educationLevel: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    contactPerson: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contactPosition: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contactEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contactTel: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    otherContact: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
});

// InternshipModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = InternshipModel;
