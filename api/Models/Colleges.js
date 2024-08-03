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
    },
    contactFirstName: {
        type: DataTypes.STRING(255),
    },
    contactLastName: {
        type: DataTypes.STRING(255),
    },
    collegePhone: {
        type: DataTypes.STRING(255),
    },
    collegeAddress: {
        type: DataTypes.STRING(500),
    },
    collegeEmail: {
        type: DataTypes.STRING(255),
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true
    },
    department: { 
        type: DataTypes.STRING(255),
    },
    schoolSize:{
        type:DataTypes.STRING(500)
    }

});

module.exports = CollegesModel;
