// const express = require('express');
// const router = express.Router();
// const { UsersModel, CollegesModel } = require("../Models/index");

// const authenticateToken = require('../Middleware/Authorization');

// router.post('/college', async (req, res) => {
//     try {
//         const { collegeName, contactFirstName, contactLastName, collegePhone, collegeEmail, collegeAddress, studentID, status } = req.body;

//         // หา record ที่มี studentID ตรงกับค่าในตาราง Users
//         const user = await UsersModel.findOne({ where: { studentID } });

//         if (!user) {
//             res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
//             return;
//         }

//         // ตรวจสอบค่า status
//         if (status === 'ไม่อนุมัติ') {
//             // อัปเดต status ใน Users table
//             user.status = 'ขออนุมัติ';
//             user.college = collegeName;
//             await user.save();

//             // หา record ที่มี studentID ตรงกับค่าในตาราง Colleges
//             const existingCollege = await CollegesModel.findOne({ where: { studentID } });

//             if (existingCollege) {
//                 // อัปเดตข้อมูลในฐานข้อมูล
//                 existingCollege.collegeName = collegeName;
//                 existingCollege.contactFirstName = contactFirstName;
//                 existingCollege.contactLastName = contactLastName;
//                 existingCollege.collegePhone = collegePhone;
//                 existingCollege.collegeEmail = collegeEmail;
//                 existingCollege.collegeAddress = collegeAddress;
//                 await existingCollege.save();

//                 res.status(200).send({ message: "Success", existingCollege });
//             } else {
//                 res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Colleges" });
//             }
//         } else if (status === 'ขออนุมัติ') {
//             const existingCollege = await CollegesModel.findOne({ where: { studentID } });
//             if (existingCollege) {
//                 res.status(409).send({ message: "studentID นี้มีอยู่แล้วในตาราง Colleges" });
//             }else{
//             // อัปเดต status ใน Users table
//             user.status = status;
//             user.college = collegeName;
//             await user.save();

//             // สร้าง record ใหม่
//             const newCollege = await CollegesModel.create({
//                 collegeName,
//                 contactFirstName,
//                 contactLastName,
//                 collegePhone,
//                 collegeEmail,
//                 collegeAddress,
//                 studentID

//             });
//             res.status(201).send({ message: "Success", newCollege });
//         }
//         } else if (status === 'ผ่าน') {
//             // เปลี่ยน status และ year ใน Users table
//             user.status = 'ขออนุมัติ';
//             user.year = 'ป.ตรี ปีที่ 4';
//             await user.save();
//             // สร้าง record ใหม่
//             const newCollege = await CollegesModel.create({
//                 collegeName,
//                 contactFirstName,
//                 contactLastName,
//                 collegePhone,
//                 collegeEmail,
//                 collegeAddress,
//                 studentID
//             });
//             res.status(201).send({ message: "Success", newCollege });
//             // res.status(200).send({ message: "Status and year updated successfully", user });
//         } else {
//             res.status(400).send({ message: "สถานะไม่ถูกต้อง" });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get('/college/:studentID', async (req, res) => {
//     try {
//         const collegeData = await CollegesModel.findOne({ where: { studentID: req.params.studentID } });
//         if (!collegeData) return res.status(404).send({ message: 'User not found' });

//         res.send(collegeData);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get('/colleges', async (req, res) => {
//     try {
//         const colleges = await CollegesModel.findAll({
//             include: [
//                 {
//                     model: UsersModel,
//                     as: 'userDetails',
//                     attributes: ['firstName', 'lastName', 'branch'] // เลือกเฉพาะฟิลด์ firstName และ lastName
//                 }
//             ]
//         });
//         res.send(colleges);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const { UsersModel, CollegesModel, CompaniesModel } = require("../Models/index");
const authenticateToken = require('../Middleware/Authorization');

// router.post('/college', async (req, res) => {
//     try {
//         const { collegeName, contactFirstName, contactLastName, collegePhone, collegeEmail, collegeAddress, studentID, department, schoolSize, academicYear, status } = req.body;
//         console.log(status)
//         // หา record ที่มี studentID ตรงกับค่าในตาราง Users
//         const user = await UsersModel.findOne({ where: { studentID } });

//         if (!user) {
//             res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
//             return;
//         }

//           // ตรวจสอบว่านักศึกษาเคยฝึกงานในปีที่ 2 หรือไม่
//           const internshipStatus = await CompaniesModel.findOne({ where: { studentID } });

//         // ดำเนินการต่อเฉพาะถ้าสถานะปัจจุบันเป็น 'ไม่อนุมัติ' หรือ 'ไม่ผ่าน'
//         if (internshipStatus || status === 'ไม่อนุมัติ' || status === 'ไม่ผ่าน') {
//             // อัปเดต status และข้อมูลอื่นๆ ใน Users table
//             user.year = academicYear;
//             user.status = 'ขออนุมัติ';
//             // user.college = collegeName;
//             await user.save();

//             // ตรวจสอบว่ามี record ในตาราง Colleges หรือไม่
//             const existingCollege = await CollegesModel.findOne({ where: { studentID } });

//             if (existingCollege) {
//                 // อัปเดตข้อมูลในตาราง Colleges
//                 existingCollege.collegeName = collegeName;
//                 existingCollege.contactFirstName = contactFirstName;
//                 existingCollege.contactLastName = contactLastName;
//                 existingCollege.collegePhone = collegePhone;
//                 existingCollege.collegeEmail = collegeEmail;
//                 existingCollege.collegeAddress = collegeAddress;
//                 existingCollege.department = department;
//                 existingCollege.schoolSize = schoolSize;
//                 await existingCollege.save();

//                 res.status(200).send({ message: "Success", existingCollege });
//             } else {
//                 // สร้าง record ใหม่ในตาราง Colleges
//                 const newCollege = await CollegesModel.create({
//                     collegeName,
//                     contactFirstName,
//                     contactLastName,
//                     collegePhone,
//                     collegeEmail,
//                     collegeAddress,
//                     studentID,
//                     department,
//                     schoolSize
//                 });
//                 res.status(201).send({ message: "Success", newCollege });
//             }
//         } else if (status === 'ขออนุมัติ') {
//             const existingCollege = await CollegesModel.findOne({ where: { studentID } });
//             if (existingCollege) {
//                 res.status(409).send({ message: "มีข้อมูลการสมัครที่อยู่ระหว่างการอนุมัติอยู่แล้ว" });
//             } else {
//                 // อัปเดต status ใน Users table
//                 user.year = academicYear;
//                 user.status = 'ขออนุมัติ';
//                 // user.college = collegeName;
//                 await user.save();

//                 // สร้าง record ใหม่
//                 const newCollege = await CollegesModel.create({
//                     collegeName,
//                     contactFirstName,
//                     contactLastName,
//                     collegePhone,
//                     collegeEmail,
//                     collegeAddress,
//                     studentID,
//                     department,
//                     schoolSize
//                 });
//                 res.status(201).send({ message: "Success", newCollege });
//             }
//         } else if (status === 'ผ่าน' || status === 'เสร็จสิ้น' || status === 'เข้ารับการฝึก' || status === 'อนุมัติ' || status === 'ประเมินเสร็จสิ้น') {
//             res.status(409).send({ message: "มีข้อมูลการสมัครเรียบร้อยแล้ว" });
//         } else {
//             res.status(400).send({ message: error.message });
//         }
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

router.post('/college', async (req, res) => {
    try {
        const { collegeName, contactFirstName, contactLastName, collegePhone, collegeEmail, collegeAddress, studentID, department, schoolSize, academicYear, status } = req.body;

        // หา record ที่มี studentID ตรงกับค่าในตาราง Users
        const user = await UsersModel.findOne({ where: { studentID } });

        if (!user) {
            res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
            return;
        }

        // ตรวจสอบว่านักศึกษาเคยฝึกงานในปีที่ 2 หรือไม่
        const internshipStatus = await CompaniesModel.findOne({ where: { studentID } });

        // ตรวจสอบว่านักศึกษาเคยสมัครฝึกสอนในปีที่ 4 หรือไม่
        const existingCollege = await CollegesModel.findOne({ where: { studentID } });

        if (existingCollege) {
            if (existingCollege.status === 'ขออนุมัติ') {
                res.status(409).send({ message: "มีข้อมูลการสมัครที่อยู่ระหว่างการอนุมัติอยู่แล้ว" });
            } else {
                res.status(409).send({ message: "มีข้อมูลการสมัครเรียบร้อยแล้ว" });
            }
            return;
        }

        // ตรวจสอบว่าเคยมีการฝึกงานใน CompaniesModel หรือไม่
        if (internshipStatus || status === 'ไม่อนุมัติ' || status === 'ไม่ผ่าน') {
            // อนุญาตให้สมัครใหม่สำหรับปีที่ 4
            user.year = academicYear;
            user.status = 'ขออนุมัติ';
            await user.save();

            const newCollege = await CollegesModel.create({
                collegeName,
                contactFirstName,
                contactLastName,
                collegePhone,
                collegeEmail,
                collegeAddress,
                studentID,
                department,
                schoolSize
            });

            res.status(201).send({ message: "Success", newCollege });
        } else if (status === 'ขออนุมัติ') {
            // ตรวจสอบว่ามีการสมัครไปแล้วหรือไม่
            const existingCollege = await CollegesModel.findOne({ where: { studentID } });

            if (existingCollege) {
                res.status(409).send({ message: "คุณได้สมัครไปแล้วและอยู่ระหว่างการอนุมัติ" });
            } else {
                // ถ้าไม่มีการสมัครก่อนหน้า จะอนุญาตให้สร้างการสมัครใหม่
                const newCollege = await CollegesModel.create({
                    collegeName,
                    contactFirstName,
                    contactLastName,
                    collegePhone,
                    collegeEmail,
                    collegeAddress,
                    studentID,
                    department,
                    schoolSize
                });
                res.status(201).send({ message: "Success", newCollege });
            }
        } else {
            res.status(400).send({ message: "ไม่สามารถสมัครใหม่ได้เนื่องจากสถานะปัจจุบันไม่ตรงเงื่อนไข" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


router.get('/college/:studentID', async (req, res) => {
    try {
        const collegeData = await CollegesModel.findOne({ where: { studentID: req.params.studentID } });
        if (!collegeData) return res.status(404).send({ message: 'User not found' });

        res.send(collegeData);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/colleges', async (req, res) => {
    try {
        const colleges = await CollegesModel.findAll({
            include: [
                {
                    model: UsersModel,
                    as: 'userDetails',
                    // attributes: ['firstName', 'lastName', 'branch'] // เลือกเฉพาะฟิลด์ firstName และ lastName
                }
            ]
        });
        res.send(colleges);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
