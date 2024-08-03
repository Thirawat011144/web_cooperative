const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const ContactModel = require("../Models/Contact");

// กำหนดที่เก็บไฟล์และชื่อไฟล์
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// สร้าง multer instance
const upload = multer({ storage: storage });

// สร้าง API POST เพื่อเพิ่มข้อมูลใหม่ในตาราง contact
router.post('/contact', upload.single('description'), async (req, res) => {
    try {
        // ตรวจสอบความถูกต้องของข้อมูลใน request body
        const { address, email, phone } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'Description (image) is required' });
        }

        // สร้าง URL ของไฟล์รูปภาพ
        const descriptionUrl = `/uploads/${req.file.filename}`;

        // สร้างข้อมูลใหม่ในตาราง contact
        const newContact = await ContactModel.create({
            description: descriptionUrl,
            address,
            email,
            phone
        });

        // ส่งข้อมูลที่สร้างกลับไป
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: 'Error creating contact', details: error.message });
    }
});

// สร้าง API GET เพื่อดึงข้อมูล contact
router.get('/contact', async (req, res) => {
    try {
        const contactData = await ContactModel.findAll({
            order: [['createdAt', 'DESC']], // เรียงลำดับตามเวลาที่สร้าง
            limit: 1 // ดึงข้อมูลล่าสุดเท่านั้น
        });
        if (contactData.length > 0) {
            res.send(contactData[0]);
        } else {
            res.status(404).send({ message: "No contact data found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/contact/admin', async (req, res) => {
    try {
        const contactData = await ContactModel.findAll({
            order: [['createdAt', 'DESC']], // เรียงลำดับตามเวลาที่สร้าง
        });
        if (contactData.length > 0) {
            res.send(contactData);
        } else {
            res.status(404).send({ message: "No contact data found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// สร้าง API GET เพื่อนำข้อมูลสหกิจศึกษาตาม ID
router.get('/contact/admin/:id', async (req, res) => {
    try {
        const contact = await ContactModel.findByPk(req.params.id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// สร้าง API PUT เพื่อแก้ไขข้อมูล contact
router.put('/contact/:id', upload.single('description'), async (req, res) => {
    try {
        const { address, email, phone } = req.body;
        const contact = await ContactModel.findByPk(req.params.id);

        if (!contact) {
            return res.status(404).send({ message: "Contact not found" });
        }

        // ตรวจสอบและอัพเดตข้อมูล
        contact.address = address;
        contact.email = email;
        contact.phone = phone;

        if (req.file) {
            // อัพเดต URL ของไฟล์รูปภาพถ้ามีไฟล์ใหม่ถูกอัพโหลด
            contact.description = `/uploads/${req.file.filename}`;
        }

        await contact.save();
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// สร้าง API DELETE เพื่อลบข้อมูล contact
router.delete('/contact/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const contact = await ContactModel.findByPk(id);
        if (contact) {
            await contact.destroy();
            res.status(200).send({ message: "Contact deleted successfully" });
        } else {
            res.status(404).send({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// ให้ Express เสิร์ฟไฟล์ในโฟลเดอร์ uploads
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
