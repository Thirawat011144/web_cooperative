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
        allowNull: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    userName: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    idCard: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    branch: {
        type: DataTypes.JSON,  // เปลี่ยนเป็น JSON
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    // statusStart: {
    //     type: DataTypes.STRING(50),
    //     allowNull: true,
    // }
});
module.exports = TeachersModel;
