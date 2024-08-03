const connect = require('../connect');
const { DataTypes } = require("sequelize");

const DownloadsModel = connect.define("downloads", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    pdfFile: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    docFile: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
});

// DownloadsModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = DownloadsModel;