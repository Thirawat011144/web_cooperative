const connect = require('../connect')
const { DataTypes } = require("sequelize")

const TeachersModel = connect.define("teachers", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    prefix: {
        type: DataTypes.STRING(50),    
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    idCard: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    branch: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    statusStart: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
})

// TeachersModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = TeachersModel;
