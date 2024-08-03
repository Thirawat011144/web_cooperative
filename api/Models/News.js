const connect = require('../connect')
const { DataTypes } = require("sequelize")

const NewsModel = connect.define("news", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
    },
    detail: {
        type: DataTypes.TEXT // ใช้ TEXT แทน STRING เพื่อไม่จำกัดความยาวของข้อความ
    },
    pdfFile: {
        type: DataTypes.STRING, // หรือตามประเภทของไฟล์ที่คุณจะใช้
    },
    docFile: {
        type: DataTypes.STRING, // หรือตามประเภทของไฟล์ที่คุณจะใช้
    },
    imageFile: {
        type: DataTypes.STRING, // เพิ่มคอลัมน์สำหรับการจัดเก็บ URL ของรูปภาพ
    }
})

// NewsModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = NewsModel;