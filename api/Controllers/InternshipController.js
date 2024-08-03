const express = require("express");
const InternshipModel = require('../Models/Internship')

const router = express.Router();

router.post("/internship", async (req, res) => {
    try {
        const {
            company,
            position,
            location,
            tel,
            zipCode,
            mail,
            type,
            vacancies,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact
        } = req.body;

        // ตรวจสอบว่าข้อมูลที่จำเป็นทั้งหมดถูกส่งมา
        if (!company || !position || !location || !tel || !mail || !vacancies || !gender || !educationLevel || !contactPerson || !contactEmail || !contactTel) {
            return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบถ้วน" });
        }

        // ตั้งค่าดีฟอลต์เป็น "-" หากฟิลด์ใดไม่มีข้อมูล
        const newInternship = await InternshipModel.create({
            company: company || "-",
            position: position || "-",
            location: location || "-",
            tel: tel || "-",
            zipCode: zipCode || "-",
            mail: mail || "-",
            type: type || "-",
            vacancies: vacancies || "-",
            salary: salary || "-",
            gender: gender || "-",
            educationLevel: educationLevel || "-",
            contactPerson: contactPerson || "-",
            contactPosition: contactPosition || "-",
            contactEmail: contactEmail || "-",
            contactTel: contactTel || "-",
            otherContact: otherContact || "-"
        });

        res.status(201).json(newInternship);
    } catch (error) {
        console.error("Error creating internship:", error);
        res.status(500).json({ message: "ไม่สามารถเพิ่มข้อมูลสถานที่ฝึกงานได้" });
    }
});


router.get("/internship", async (req, res) => {
    try {
        const internships = await InternshipModel.findAll();
        res.status(200).send(internships);
    } catch (error) {
        console.error("Error fetching internships:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกงานได้" });
    }
});

router.get("/internship/:id", async (req, res) => {
    try {
        const internship = await InternshipModel.findByPk(req.params.id);
        if (!internship) {
            return res.status(404).json({ message: "ไม่พบข้อมูลสถานที่ฝึกงาน" });
        }
        res.status(200).json(internship);
    } catch (error) {
        console.error("Error fetching internship:", error);
        res.status(500).json({ message: "ไม่สามารถดึงข้อมูลสถานที่ฝึกงานได้" });
    }
});


router.put('/internship/:id', async (req, res) => {
    try {
        // หา internship ที่ต้องการอัพเดตโดยใช้ id จาก URL parameter
        const internship = await InternshipModel.findByPk(req.params.id);

        // ถ้าไม่เจอ internship ที่มี id นี้ จะส่งสถานะ 404 และข้อความว่าไม่พบสถานที่ฝึกงาน
        if (!internship) {
            return res.status(404).send({ message: "Internship not found" });
        }

        // ดึงค่าที่ต้องการอัพเดตจาก request body
        const {
            company,
            position,
            location,
            tel,
            zipCode,
            mail,
            type,
            vacancies,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact
        } = req.body;

        // อัพเดตค่าใหม่ลงใน internship instance
        Object.assign(internship, {
            company,
            position,
            location,
            tel,
            zipCode,
            mail,
            type,
            vacancies,
            salary,
            gender,
            educationLevel,
            contactPerson,
            contactPosition,
            contactEmail,
            contactTel,
            otherContact
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



router.delete('/internship/:id', async (req, res) => {
    try {
        const internship = await InternshipModel.findByPk(req.params.id);
        if (!internship) {
            return res.status(404).send({ message: "InternshipModel not found" });
        }
        await internship.destroy();
        res.send({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
        console.log(error)
    }
})


module.exports = router;
