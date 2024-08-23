const express = require("express");
const { Op, Sequelize } = require('sequelize');
const { UsersModel, CompaniesModel, CollegesModel, dataEvaluationInternshipForUniversity,dataEvaluation } = require("../Models/index");
const dataEvaluationInternshipModel =require("../Models/DataEvaluationInternship")
// const authenticateToken = require('../Middleware/Authorization');

const router = express.Router();

router.get("/users", async (req, res) => {
    try {
        const users = await UsersModel.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: CompaniesModel,
                    as: 'companyDetails',
                    // attributes: ['companyName']
                },
                {
                    model: CollegesModel,
                    as: 'collegeDetails',
                    // attributes: ['collegeName']
                }
            ]
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id, {
            include: [
                {
                    model: CompaniesModel,
                    as: 'companyDetails'
                },
                {
                    model: CollegesModel,
                    as: 'collegeDetails'
                }
            ]
        });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/users/search", async (req, res) => {
    try {
        const { firstName, lastName, studentID, year, branch, location, status } = req.query;
        let whereClause = {};

        if (firstName) {
            whereClause.firstName = { [Op.like]: `%${firstName}%` };
        }

        if (lastName) {
            whereClause.lastName = { [Op.like]: `%${lastName}%` };
        }

        if (studentID) {
            if (studentID.length === 2) {
                // ถ้ามีความยาว 2 ตัวอักษร ให้ค้นหาที่ขึ้นต้นด้วย 2 ตัวอักษรนี้
                whereClause.studentID = { [Op.like]: `${studentID}%` };
            } else {
                // ถ้ามีความยาวมากกว่า 2 ตัวอักษร ให้ค้นหาตามที่กรอก
                whereClause.studentID = { [Op.like]: `%${studentID}%` };
            }
        }

        if (year) {
            whereClause.year = { [Op.like]: `%${year}%` };
        }

        if (branch) {
            whereClause.branch = { [Op.like]: `%${branch}%` };
        }

        if (location) {
            whereClause.location = { [Op.like]: `%${location}%` };
        }

        if (status) {
            whereClause.status = { [Op.eq]: status };
        }

        console.log(whereClause);

        const users = await UsersModel.findAll({
            where: whereClause,
            include: [
                {
                    model: CompaniesModel,
                    as: 'companyDetails',
                    // attributes: ['companyName']
                },
                {
                    model: CollegesModel,
                    as: 'collegeDetails',
                    // attributes: ['companyName']
                },
                {
                    model: dataEvaluationInternshipModel,
                    as: 'evaluationDetails',
                    // attributes: ['score', 'comments'] // เลือกฟิลด์ที่ต้องการส่งออก
                },
                {
                    model: dataEvaluationInternshipForUniversity,
                    as: 'evaluationUniversityDetails',
                    // attributes: ['score', 'comments'] // เลือกฟิลด์ที่ต้องการส่งออก
                },
                {
                    model: dataEvaluation,
                    as: 'evaluationHightDetails',
                    // attributes: ['score', 'comments'] // เลือกฟิลด์ที่ต้องการส่งออก
                }
            ]
        });

        if (users.length === 0) {
            return res.status(404).send({ message: "ไม่พบข้อมูลผู้ใช้" });
        }

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "เกิดข้อผิดพลาดในการค้นหาผู้ใช้" });
    }
});
// router.get("/users/search", async (req, res) => {
//     try {
//         const { query } = req.query;
//         if (!query) {
//             return res.status(400).send({ message: "Query parameter is required" });
//         }

//         // แยกคำโดยใช้วิธี split เพื่อให้ได้คำทั้งหมด
//         const terms = query.split(/\s+/).filter(term => term.trim() !== '');

//         let whereClause = {
//             [Op.and]: terms.map(term => ({
//                 [Op.or]: [
//                     { firstName: { [Op.like]: `%${term}%` } },
//                     { lastName: { [Op.like]: `%${term}%` } },
//                     { userName: { [Op.like]: `%${term}%` } },
//                     { year: { [Op.like]: `%${term}%` } },
//                     { studentID: { [Op.like]: `%${term}%` } },
//                     { branch: { [Op.like]: `%${term}%` } },
//                     // { degree: { [Op.like]: `%${term}%` } },
//                     // เพิ่มฟิลด์อื่นๆ ที่ต้องการค้นหา
//                 ]
//             }))
//         };

//         // ดึงข้อมูลโดยจำกัดจำนวนผลลัพธ์
//         const users = await UsersModel.findAll({
//             where: whereClause,
//             limit: 100 // จำกัดผลลัพธ์ที่ 100 รายการ
//         });

//         if (users.length === 0) {
//             return res.status(404).send({ message: "No users found" });
//         }

//         res.send(users);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get("/users/search", async (req, res) => {
//     try {
//         const { query } = req.query;
//         if (!query) {
//             return res.status(400).send({ message: "Query parameter is required" });
//         }

//         const terms = query.split(' ');

//         let whereClause = {
//             [Op.or]: [
//                 { firstName: { [Op.like]: `%${query}%` } },
//                 { lastName: { [Op.like]: `%${query}%` } },
//                 { userName: { [Op.like]: `%${query}%` } },
//                 { year: { [Op.like]: `%${query}%` } },
//                 { studentID: { [Op.like]: `%${query}%` } },
//                 { branch: { [Op.like]: `%${query}%` } },

//                 //สร้างเงื่อนไขยังไม่ครบ
//             ]
//         };
//         // ถ้ามีสองคำ แสดงว่าเป็นชื่อและนามสกุล
//         if (terms.length === 2) {
//             const [firstName, lastName] = terms;
//             whereClause = {
//                 [Op.or]: [
//                     {
//                         [Op.and]: [
//                             { firstName: { [Op.like]: `%${firstName}%` } },
//                             { lastName: { [Op.like]: `%${lastName}%` } },
//                         ]
//                     },
//                     { year: { [Op.like]: `%${query}%` } },
//                 ]
//             };
//         }

//         const users = await UsersModel.findAll({
//             where: whereClause
//         });

//         if (users.length === 0) {
//             return res.status(404).send({ message: "No users found" });
//         }

//         res.send(users);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.put('/user/:id', async (req, res) => {
//     try {
//         const user = await UsersModel.findByPk(req.params.id);
//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }
//         const { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, role } = req.body;
//         Object.assign(user, { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, role })
//         await user.save();

//         // res.json({ data: user, studentID:user.studentID, message: "Success" });
//         res.json({ data: user, studentID: user.studentID, message: "Success" });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// })

router.put('/user/:id', async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // ตรวจสอบและอัปเดตเฉพาะฟิลด์ที่มีใน req.body
        const { firstName, lastName, userName, password, phoneNumber, gender, year, branch, status, studentID, role } = req.body;

        if (firstName !== undefined) user.firstName = firstName;
        if (lastName !== undefined) user.lastName = lastName;
        if (userName !== undefined) user.userName = userName;
        if (password !== undefined) user.password = password;
        if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
        if (gender !== undefined) user.gender = gender;
        if (year !== undefined) user.year = year;
        if (branch !== undefined) user.branch = branch;
        if (status !== undefined) user.status = status;
        if (studentID !== undefined) user.studentID = studentID;
        if (role !== undefined) user.role = role;

        await user.save();

        res.json({ data: user, studentID: user.studentID, message: "Success" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



router.delete('/users/:id', async (req, res) => {
    try {
        const user = await UsersModel.findByPk(req.params.id);
        const studentID = user ? user.dataValues.studentID : null;

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // ลบข้อมูลที่เกี่ยวข้องกับการประเมิน แต่เก็บข้อมูลบริษัทและวิทยาลัยไว้
        await dataEvaluationInternshipModel.destroy({ where: { studentId: studentID } });
        await dataEvaluationInternshipForUniversity.destroy({ where: { studentId: studentID } });
        await dataEvaluation.destroy({ where: { studentId: studentID } });

        // ลบข้อมูลผู้ใช้ใน UsersModel
        await user.destroy();

        res.send({ message: "User and associated evaluation data deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;