const connect = require('../connect'); // สมมติว่าคุณเชื่อมต่อฐานข้อมูลเรียบร้อยแล้ว
const queryInterface = connect.getQueryInterface();
const { DataTypes } = require('sequelize');

async function updateBranchColumn() {
    try {
        // ลบคอลัมน์ branch ที่เก่า
        await queryInterface.removeColumn('admins', 'branch');

        // สร้างคอลัมน์ branch ใหม่เป็น JSON
        await queryInterface.addColumn('admins', 'branch', {
            type: DataTypes.JSON,
            allowNull: true,
        });

        console.log("Column 'branch' updated successfully!");
    } catch (error) {
        console.error("Error updating column 'branch':", error);
    }
}

updateBranchColumn();