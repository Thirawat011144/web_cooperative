const connect = require('../connect')
const { DataTypes } = require("sequelize")

const UsersModel = connect.define("users", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    prefix: {
        type: DataTypes.STRING(50),
    },
    firstName: {
        type: DataTypes.STRING(50),
    },
    lastName: {
        type: DataTypes.STRING(50),
    },
    userName: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING(255),
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
    },
    idCard: {
        type: DataTypes.STRING(50),
    },
    gender: {
        type: DataTypes.STRING(50)
    },
    year: {
        type: DataTypes.STRING(50)
    },
    branch: {
        type: DataTypes.STRING(50)
    },
    status: {
        type: DataTypes.STRING(50)
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true
    },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user'
    },
    college: {
        type: DataTypes.STRING(255),
        // defaultValue: 'user'
    }
})

module.exports = UsersModel;


