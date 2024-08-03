// const connect = require('../connect');
// const { DataTypes } = require("sequelize");

// const PracticeTeachingModel = connect.define("practiceTeaching", {
//     id: {
//         type: DataTypes.BIGINT,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     company: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     location: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     tel: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     zipCode: {
//         type: DataTypes.STRING(10),
//         allowNull: true,
//     },
//     mail: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     vacancies: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     salary: {
//         type: DataTypes.STRING(50),
//         allowNull: true,
//     },
//     gender: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     educationLevel: {
//         type: DataTypes.STRING(50),
//         allowNull: false,
//     },
//     contactPerson: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     contactPosition: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//     },
//     contactEmail: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//     },
//     contactTel: {
//         type: DataTypes.STRING(20),
//         allowNull: false,
//     },
//     otherContact: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//     }
// });

// // PracticeTeachingModel.sync({ alter: true })
// //     .then(() => {
// //         console.log("Table created successfully!");
// //     })
// //     .catch((err) => {
// //         console.error("Error creating table:", err);
// //     });

// module.exports = PracticeTeachingModel;


const connect = require('../connect');
const { DataTypes } = require("sequelize");

const PracticeTeachingModel = connect.define("practiceTeaching", {
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
    tel: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    salary: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    gender: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    educationLevel: {
        type: DataTypes.STRING(50),
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
    branches: {
        type: DataTypes.JSON, // ใช้ JSON สำหรับเก็บข้อมูลสาขาและจำนวนคนที่รับ
        allowNull: true,
    }
});

// การซิงค์โมเดลกับฐานข้อมูล
// PracticeTeachingModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = PracticeTeachingModel;
