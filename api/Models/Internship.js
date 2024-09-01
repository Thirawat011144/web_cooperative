const connect = require('../connect');
const { DataTypes } = require("sequelize");

const InternshipModel = connect.define("internships", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
  
    company: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(255),
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
    },
    branch: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
