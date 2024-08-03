// const express = require("express");
// const PracticeTeachingModel = require('../Models/PracticeTeaching'); // ตรวจสอบให้แน่ใจว่า path ถูกต้อง

// const router = express.Router();

// router.post('/practice-teaching', async (req, res) => {
//     try {
//         const {
//             company,
//             location,
//             tel,
//             zipCode,
//             mail,
//             vacancies,
//             salary,
//             gender,
//             educationLevel,
//             contactPerson,
//             contactPosition,
//             contactEmail,
//             contactTel,
//             otherContact
//         } = req.body;

//         // ตรวจสอบว่าข้อมูลที่จำเป็นทั้งหมดถูกส่งมา
//         if (!company || !location || !tel || !mail || !vacancies || !gender || !educationLevel || !contactPerson || !contactEmail || !contactTel) {
//             return res.status(400).json({ message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
//         }

//         // สร้างข้อมูลใหม่
//         const newPracticeTeaching = await PracticeTeachingModel.create({
//             company: company || "-",
//             location: location || "-",
//             tel: tel || "-",
//             zipCode: zipCode || "-",
//             mail: mail || "-",
//             vacancies: vacancies || "-",
//             salary: salary || "-",
//             gender: gender || "-",
//             educationLevel: educationLevel || "-",
//             contactPerson: contactPerson || "-",
//             contactPosition: contactPosition || "-",
//             contactEmail: contactEmail || "-",
//             contactTel: contactTel || "-",
//             otherContact: otherContact || "-"
//         });

//         // ส่งกลับข้อมูลที่สร้างใหม่
//         res.status(201).json({ data: newPracticeTeaching, message: "สร้างข้อมูลสถานที่ฝึกสอนสำเร็จ" });
//     } catch (error) {
//         console.error("Error creating practice teaching:", error);
//         res.status(500).json({ message: "ไม่สามารถสร้างข้อมูลสถานที่ฝึกสอนได้" });
//     }
// });

// router.get('/practice-teaching', async (req, res) => {
//     try {
//         const practiceTeachings = await PracticeTeachingModel.findAll();
       
//         res.status(200).send(practiceTeachings)
//     } catch (error) {
//         console.error("Error fetching practice teachings:", error);
//         res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกสอนได้" });
//     }
// });

// // API GET สำหรับดึงข้อมูลเฉพาะรายการโดยใช้ ID
// router.get('/practice-teaching/:id', async (req, res) => {
//     try {
//         const practiceTeaching = await PracticeTeachingModel.findByPk(req.params.id);
//         if (!practiceTeaching) {
//             return res.status(404).json({ message: "ไม่พบข้อมูลสถานที่ฝึกสอน" });
//         }
//         res.status(200).send(practiceTeaching)
//     } catch (error) {
//         console.error("Error fetching practice teaching:", error);
//         res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกสอนได้" });
//     }
// });

// router.put('/practice-teaching/:id', async (req, res) => {
//     try {
//         // หา internship ที่ต้องการอัพเดตโดยใช้ id จาก URL parameter
//         const internship = await PracticeTeachingModel.findByPk(req.params.id);

//         // ถ้าไม่เจอ internship ที่มี id นี้ จะส่งสถานะ 404 และข้อความว่าไม่พบสถานที่ฝึกงาน
//         if (!internship) {
//             return res.status(404).send({ message: "Internship not found" });
//         }

//         // ดึงค่าที่ต้องการอัพเดตจาก request body
//         const {
//             company,
//             location,
//             tel,
//             zipCode,
//             mail,
//             vacancies,
//             salary,
//             gender,
//             educationLevel,
//             contactPerson,
//             contactPosition,
//             contactEmail,
//             contactTel,
//             otherContact
//         } = req.body;

//         // อัพเดตค่าใหม่ลงใน internship instance
//         Object.assign(internship, {
//             company,
//             location,
//             tel,
//             zipCode,
//             mail,
//             vacancies,
//             salary,
//             gender,
//             educationLevel,
//             contactPerson,
//             contactPosition,
//             contactEmail,
//             contactTel,
//             otherContact
//         });

//         // บันทึกการเปลี่ยนแปลงลงในฐานข้อมูล
//         await internship.save();

//         // ส่งกลับข้อมูลที่อัพเดตและข้อความสำเร็จ
//         res.json({ data: internship, message: "Success" });
//     } catch (error) {
//         // ถ้ามีข้อผิดพลาด จะส่งสถานะ 500 และข้อความข้อผิดพลาด
//         res.status(500).send({ message: error.message });
//     }
// });

// router.delete('/practice-teaching/:id', async (req, res) => {
//     try {
//         const practice = await PracticeTeachingModel.findByPk(req.params.id);
//         if (!practice) {
//             return res.status(404).send({ message: "InternshipModel not found" });
//         }
//         await practice.destroy();
//         res.send({ message: "News deleted successfully" });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//         console.log(error)
//     }
// })

// module.exports = router;


const express = require("express");
const PracticeTeachingModel = require('../Models/PracticeTeaching'); // ตรวจสอบให้แน่ใจว่า path ถูกต้อง

const router = express.Router();

router.post('/practice-teaching', async (req, res) => {
    try {
        const {
            company,
            location,
            tel,
            zipCode,
            mail,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact,
            branches // เพิ่มฟิลด์ branches
        } = req.body;

        // ตรวจสอบว่าข้อมูลที่จำเป็นทั้งหมดถูกส่งมา
        if (!company || !location || !tel || !mail || !gender || !educationLevel || !contactPerson || !contactEmail || !contactTel) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน" });
        }

        // สร้างข้อมูลใหม่
        const newPracticeTeaching = await PracticeTeachingModel.create({
            company: company || "-",
            location: location || "-",
            tel: tel || "-",
            zipCode: zipCode || "-",
            mail: mail || "-",
            salary: salary || "-",
            gender: gender || "-",
            educationLevel: educationLevel || "-",
            contactPerson: contactPerson || "-",
            contactPosition: contactPosition || "-",
            contactEmail: contactEmail || "-",
            contactTel: contactTel || "-",
            otherContact: otherContact || "-",
            branches: branches || [] // บันทึกสาขาที่รับ
        });

        // ส่งกลับข้อมูลที่สร้างใหม่
        res.status(201).json({ data: newPracticeTeaching, message: "สร้างข้อมูลสถานที่ฝึกสอนสำเร็จ" });
    } catch (error) {
        console.error("Error creating practice teaching:", error);
        res.status(500).json({ message: "ไม่สามารถสร้างข้อมูลสถานที่ฝึกสอนได้" });
    }
});

router.get('/practice-teaching', async (req, res) => {
    try {
        const practiceTeachings = await PracticeTeachingModel.findAll();
       
        res.status(200).send(practiceTeachings)
    } catch (error) {
        console.error("Error fetching practice teachings:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกสอนได้" });
    }
});

// API GET สำหรับดึงข้อมูลเฉพาะรายการโดยใช้ ID
router.get('/practice-teaching/:id', async (req, res) => {
    try {
        const practiceTeaching = await PracticeTeachingModel.findByPk(req.params.id);
        if (!practiceTeaching) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสถานที่ฝึกสอน" });
        }
        res.status(200).send(practiceTeaching)
    } catch (error) {
        console.error("Error fetching practice teaching:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกสอนได้" });
    }
});

router.put('/practice-teaching/:id', async (req, res) => {
    try {
        // หา internship ที่ต้องการอัพเดตโดยใช้ id จาก URL parameter
        const internship = await PracticeTeachingModel.findByPk(req.params.id);

        // ถ้าไม่เจอ internship ที่มี id นี้ จะส่งสถานะ 404 และข้อความว่าไม่พบสถานที่ฝึกงาน
        if (!internship) {
            return res.status(404).send({ message: "Internship not found" });
        }

        // ดึงค่าที่ต้องการอัพเดตจาก request body
        const {
            company,
            location,
            tel,
            zipCode,
            mail,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact,
            branches // เพิ่มฟิลด์ branches
        } = req.body;

        // อัพเดตค่าใหม่ลงใน internship instance
        Object.assign(internship, {
            company,
            location,
            tel,
            zipCode,
            mail,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact,
            branches // อัพเดตสาขาที่รับ
        });

        // บันทึกการเปลี่ยนแปลงลงในฐานข้อมูล
        await internship.save();

        // ส่งกลับข้อมูลที่อัพเดตและข้อความสำเร็จ
        res.json({ data: internship, message: "Success" });
    } catch (error) {
        // ถ้ามีข้อผิดพลาด จะส่งสถานะ 500 และข้อความข้อผิดพลาด
        res.status(500).send({ message: error.message });
    }
});

router.delete('/practice-teaching/:id', async (req, res) => {
    try {
        const practice = await PracticeTeachingModel.findByPk(req.params.id);
        if (!practice) {
            return res.status(404).send({ message: "InternshipModel not found" });
        }
        await practice.destroy();
        res.send({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error)
    }
})

module.exports = router;

