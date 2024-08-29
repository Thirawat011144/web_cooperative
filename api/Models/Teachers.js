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
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    userName: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    idCard: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    branch: {
        type: DataTypes.STRING(255),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    role: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    },
    statusStart: {
        type: DataTypes.STRING(50),
        allowNull: true,  // สามารถมีค่าว่างได้
    }
});

module.exports = TeachersModel;
