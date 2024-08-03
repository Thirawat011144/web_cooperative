const connect = require('../connect')
const { DataTypes } = require("sequelize")

const CompaniesModel = connect.define("companies", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    companyName: {
        type: DataTypes.STRING(255),
    },
    companyDepartment: {
        type: DataTypes.STRING(255),
    },
    contactFirstName: {
        type: DataTypes.STRING(255),
    },
    contactLastName: {
        type: DataTypes.STRING(255),
    },
    companyPhone: {
        type: DataTypes.STRING(255),
    },
    companyAddress: {
        type: DataTypes.STRING(500),
    },
    companyEmail: {
        type: DataTypes.STRING(255),
    },
    studentID: {
        type: DataTypes.STRING(50),
        // unique: true
    }
    ,
    valueStatus: {
        type: DataTypes.STRING(50),
       
    }
    ,
    status: {
        type: DataTypes.STRING(50),
       
    }
    
    
})

module.exports = CompaniesModel;