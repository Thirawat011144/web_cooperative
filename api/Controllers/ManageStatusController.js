const express = require('express');
const router = express.Router();
const UserModel = require('../Models/Users'); // ปรับเส้นทางให้ตรงกับโมเดลของคุณ
const EvaluationModel = require('../Models/DataEvaluationInternship');
const UniversityEvaluationModel = require('../Models/DataEvaluationInternshipForUniversity');
const dataEvaluation = require('../Models/DataEvaluation')

router.put('/check-evaluations', async (req, res) => {
    try {
        // ค้นหานักเรียนในทุกระดับชั้นที่ต้องการ
        const users = await UserModel.findAll({
            where: {
                year: ['ปวช 3', 'ปวส 2', 'ป.ตรี ปีที่ 2', 'ป.ตรี ปีที่ 4'] // เพิ่มระดับชั้นที่ต้องการ
            }
        });

        for (const user of users) {
            const userEvaluations = await EvaluationModel.findAll({ where: { studentId: user.studentID } });
            const userUniversityEvaluations = await UniversityEvaluationModel.findAll({ where: { studentId: user.studentID } });

            if (userEvaluations.length > 0 && userUniversityEvaluations.length > 0) {
                await UserModel.update({ status: 'ประเมินเสร็จสิ้น' }, { where: { id: user.id } });
            }
        }

        res.status(200).json({ message: 'Student status updated successfully' });
    } catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ message: 'Error updating student status', error: error.message });
    }
});

router.put('/check-evaluations-teaching', async (req, res) => {
    try {
        // ค้นหานักเรียนในทุกระดับชั้นที่ต้องการ
        const users = await UserModel.findAll({
            where: {
                year: ['ปวช 3', 'ปวส 2', 'ป.ตรี ปีที่ 2', 'ป.ตรี ปีที่ 4'] // เพิ่มระดับชั้นที่ต้องการ
            }
        });

        for (const user of users) {
            // ค้นหาข้อมูลการประเมินจาก dataEvaluation โดยใช้ studentId
            const userEvaluations = await dataEvaluation.findAll({
                where: { studentId: user.studentID }
            });

            // ตรวจสอบว่ามีการประเมินครบ 10 ครั้งหรือไม่
            if (userEvaluations.length >= 13) {
                await UserModel.update({ status: 'ประเมินเสร็จสิ้น' }, { where: { id: user.id } });
            }
        }

        res.status(200).json({ message: 'Student status updated successfully' });
    } catch (error) {
        console.error('Error updating student status:', error);
        res.status(500).json({ message: 'Error updating student status', error: error.message });
    }
});

module.exports = router;
