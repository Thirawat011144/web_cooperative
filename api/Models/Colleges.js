const connect = require('../connect');
const { DataTypes } = require("sequelize");

const CollegesModel = connect.define("colleges", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    collegeName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contactFirstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contactLastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    collegePhone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    collegeAddress: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    collegeEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    department: { 
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    schoolSize:{
        type:DataTypes.STRING(500),
        allowNull: false,
    }

});

module.exports = CollegesModel;
