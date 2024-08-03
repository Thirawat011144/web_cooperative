const express = require('express');
const router = express.Router();
// const CompaniesModel = require("../Models/Companies")
const { UsersModel, CompaniesModel } = require("../Models/index");

const authenticateToken = require('../Middleware/Authorization');

// router.post('/company', async (req, res) => {
//     try {
//         const { companyName, companyType, companyPhone, companyEmail, companyAddress, studentID } = req.body;
//         const newCompany = await CompaniesModel.create({
//             companyName,
//             companyType,
//             companyPhone,
//             companyEmail,
//             companyAddress,
//             studentID
//         });
//         console.log(req.body)

//         res.status(201).send({ message: "Success", newCompany });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.post('/company', async (req, res) => {
//     try {
//         const { companyName, companyType, companyPhone, companyEmail, companyAddress, studentID, status } = req.body;

//         const user = await UsersModel.findOne({ where: { studentID } });
//         if (user) {
//             user.status = status;
//             await user.save();
//         } else {
//             res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
//             return;
//         }

//         if (status === 'ไม่อนุมัติ') {
//             // หา record ที่มี studentID ตรงกับค่าในฐานข้อมูล
//             const existingCompany = await CompaniesModel.findOne({ where: { studentID } });

//             if (existingCompany) {
//                 // อัปเดตข้อมูลในฐานข้อมูล
//                 existingCompany.companyName = companyName;
//                 existingCompany.companyType = companyType;
//                 existingCompany.companyPhone = companyPhone;
//                 existingCompany.companyEmail = companyEmail;
//                 existingCompany.companyAddress = companyAddress;
//                 await existingCompany.save();

//                 res.status(200).send({ message: "ข้อมูลถูกอัปเดตเรียบร้อยแล้ว", existingCompany });
//             } else {
//                 res.status(404).send({ message: "ไม่พบข้อมูล studentID ในฐานข้อมูล" });
//             }
//         } else if (status === 'ขออนุมัติ') {
//             // สร้าง record ใหม่
//             const newCompany = await CompaniesModel.create({
//                 companyName,
//                 companyType,
//                 companyPhone,
//                 companyEmail,
//                 companyAddress,
//                 studentID
//             });
//             res.status(201).send({ message: "Success", newCompany });
//         } else {
//             res.status(400).send({ message: "สถานะไม่ถูกต้อง" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });


router.post('/company', async (req, res) => {
    try {
        const { companyName, companyDepartment, contactFirstName, contactLastName, companyPhone, companyEmail, companyAddress, studentID,academicYear, status, valueStatus } = req.body;

        // หา record ที่มี studentID ตรงกับค่าในตาราง Users
        const user = await UsersModel.findOne({ where: { studentID } });

        if (!user) {
            res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
            return;
        }

        // ตรวจสอบค่า status
        if (status === 'ไม่อนุมัติ' || status === 'ไม่ผ่าน') {
            // อัปเดต status ใน Users table
            user.year = academicYear
            user.status = 'ขออนุมัติ';
            await user.save();
            

            // หา record ที่มี studentID ตรงกับค่าในตาราง Companies
            const existingCompany = await CompaniesModel.findOne({ where: { studentID } });

            if (existingCompany) {
                // อัปเดตข้อมูลในฐานข้อมูล
                existingCompany.companyName = companyName;
                existingCompany.companyDepartment = companyDepartment;
                existingCompany.contactFirstName = contactFirstName;
                existingCompany.contactLastName = contactLastName;
                existingCompany.companyPhone = companyPhone;
                existingCompany.companyEmail = companyEmail;
                existingCompany.companyAddress = companyAddress;
                await existingCompany.save();

                res.status(200).send({ message: "Success", existingCompany });
            } else {
                const newCompanies = await CompaniesModel.create({
                    companyName,
                    companyDepartment,
                    contactFirstName,
                    contactLastName,
                    companyPhone,
                    companyEmail,
                    companyAddress,
                    studentID,
                    valueStatus
                })
                res.status(201).send({ message: "Success", newCompanies });
            }
        } else if (status === 'ขออนุมัติ') {
            // อัปเดต status ใน Users table
            user.year = academicYear
            user.status = status;
            await user.save();

            // สร้าง record ใหม่
            const newCompany = await CompaniesModel.create({
                companyName,
                companyDepartment,
                contactFirstName,
                contactLastName,
                companyPhone,
                companyEmail,
                companyAddress,
                studentID,
                valueStatus,
                // status
            });
            res.status(201).send({ message: "Success", newCompany });
        } else if (status === 'ผ่าน') {

        } else {
            res.status(400).send({ message: "สถานะไม่ถูกต้อง" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


router.get('/company/:studentID', async (req, res) => {
    try {
        const companyData = await CompaniesModel.findOne({ where: { studentID: req.params.studentID } });
        if (!companyData) return res.status(404).send({ message: 'User not found' });

        res.send(companyData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// router.get('/companies', async (req, res) => {
//     try {
//       const companies = await CompaniesModel.findAll();
//       res.send(companies);
//     } catch (error) {
//       res.status(500).send({ message: error.message });
//     }
//   });

router.get('/companies', async (req, res) => {
    try {
        const companies = await CompaniesModel.findAll({
            include: [
                {
                    model: UsersModel,
                    as: 'userDetails',
                    attributes: ['firstName', 'lastName', 'branch'] // เลือกเฉพาะฟิลด์ firstName และ lastName
                }
            ]
        });
        res.send(companies);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete("/companies", async (req, res) => {
    try {
        const { studentID } = req.body; // ตรวจสอบชื่อฟิลด์ให้ตรงกัน

        const result = await CompaniesModel.destroy({
            where: { studentID: studentID } // ใช้ studentID
        });

        if (result) {
            res.json({ message: "Evaluations deleted successfully" });
        } else {
            res.status(404).send({ message: "Evaluations not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});



module.exports = router;
