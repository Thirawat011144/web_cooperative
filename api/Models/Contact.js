const connect = require('../connect');
const { DataTypes } = require("sequelize");

const ContactModel = connect.define("contact", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.STRING, // เก็บ URL ของรูปภาพ
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
});

// Uncomment the following lines to synchronize the model with the database
// ContactModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = ContactModel;
