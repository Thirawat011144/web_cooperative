const connect = require('../connect')
const { DataTypes } = require("sequelize")

const UsersModel = connect.define("users", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    userName: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,  // ห้ามว่าง
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,  // ห้ามว่าง
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    idCard: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,  // ห้ามว่าง
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    year: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    branch: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,  // ห้ามว่าง
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,  // ห้ามว่าง
    },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user',
        allowNull: false,  // ห้ามว่าง
    },
})

module.exports = UsersModel;