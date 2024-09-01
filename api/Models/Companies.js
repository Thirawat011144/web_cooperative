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
        allowNull: false,
    },
    contactName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    contactPosition: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    companyPhone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    companyAddress: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    companyEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false, // กำหนดให้ค่านี้ต้องไม่เป็น NULL
    }
    // ,
    // status: {
    //     type: DataTypes.STRING(50),
       
    // }
    
    
})

module.exports = CompaniesModel;