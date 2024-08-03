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
const { UsersModel, CollegesModel } = require("../Models/index");
const authenticateToken = require('../Middleware/Authorization');

router.post('/college', async (req, res) => {
    try {
        const { collegeName, contactFirstName, contactLastName, collegePhone, collegeEmail, collegeAddress, studentID, department,schoolSize,academicYear, status } = req.body;

        // หา record ที่มี studentID ตรงกับค่าในตาราง Users
        const user = await UsersModel.findOne({ where: { studentID } });

        if (!user) {
            res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Users" });
            return;
        }

        // ตรวจสอบค่า status
        if (status === 'ไม่อนุมัติ') {
            // อัปเดต status ใน Users table
            user.year = academicYear
            user.status = 'ขออนุมัติ';
            user.college = collegeName;
            await user.save();

            // หา record ที่มี studentID ตรงกับค่าในตาราง Colleges
            const existingCollege = await CollegesModel.findOne({ where: { studentID } });

            if (existingCollege) {
                // อัปเดตข้อมูลในฐานข้อมูล
                existingCollege.collegeName = collegeName;
                existingCollege.contactFirstName = contactFirstName;
                existingCollege.contactLastName = contactLastName;
                existingCollege.collegePhone = collegePhone;
                existingCollege.collegeEmail = collegeEmail;
                existingCollege.collegeAddress = collegeAddress;
                existingCollege.department = department; // อัปเดต department
                existingCollege.schoolSize = schoolSize; 
                await existingCollege.save();

                res.status(200).send({ message: "Success", existingCollege });
            } else {
                res.status(404).send({ message: "ไม่พบข้อมูล studentID ในตาราง Colleges" });
            }
        } else if (status === 'ขออนุมัติ') {
            const existingCollege = await CollegesModel.findOne({ where: { studentID } });
            if (existingCollege) {

                     // อัปเดต status ใน Users table
                     user.year = academicYear
                     user.status = status;
                     user.college = collegeName;
                     await user.save();

                  // อัปเดตข้อมูลในฐานข้อมูล
                  existingCollege.collegeName = collegeName;
                  existingCollege.contactFirstName = contactFirstName;
                  existingCollege.contactLastName = contactLastName;
                  existingCollege.collegePhone = collegePhone;
                  existingCollege.collegeEmail = collegeEmail;
                  existingCollege.collegeAddress = collegeAddress;
                  existingCollege.department = department; // อัปเดต department
                  existingCollege.schoolSize = schoolSize; 
                  await existingCollege.save();
  
                  res.status(200).send({ message: "Success", existingCollege });
                // res.status(409).send({ message: "studentID นี้มีอยู่แล้วในตาราง Colleges" });
            } else {
                // อัปเดต status ใน Users table
                user.year = academicYear
                user.status = status;
                user.college = collegeName;
                await user.save();

                // สร้าง record ใหม่
                const newCollege = await CollegesModel.create({
                    collegeName,
                    contactFirstName,
                    contactLastName,
                    collegePhone,
                    collegeEmail,
                    collegeAddress,
                    studentID,
                    department ,// เพิ่ม department ในการสร้าง record ใหม่
                    schoolSize
                });
                res.status(201).send({ message: "Success", newCollege });
            }
        } else if (status === 'ผ่าน') {
            // เปลี่ยน status และ year ใน Users table
            user.status = 'ขออนุมัติ';
            user.year = 'ป.ตรี ปีที่ 4';
            await user.save();
            
            // สร้าง record ใหม่
            const newCollege = await CollegesModel.create({
                collegeName,
                contactFirstName,
                contactLastName,
                collegePhone,
                collegeEmail,
                collegeAddress,
                studentID,
                department, // เพิ่ม department ในการสร้าง record ใหม่
                schoolSize
            });
            res.status(201).send({ message: "Success", newCollege });
        } else {
            res.status(400).send({ message: "สถานะไม่ถูกต้อง" });
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
