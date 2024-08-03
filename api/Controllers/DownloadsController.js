const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const DownloadsModel = require('../Models/Downloads');

// กำหนดการตั้งค่า Multer สำหรับการอัพโหลดไฟล์
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // กำหนดโฟลเดอร์ที่ใช้เก็บไฟล์
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // กำหนดชื่อไฟล์ใหม่
    }
});

const upload = multer({ storage: storage });

// API สำหรับการเพิ่มเอกสาร
router.post('/downloads', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }]), async (req, res) => {
    try {
        const { name, link } = req.body;
        const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0].filename : null;
        const docFile = req.files['docFile'] ? req.files['docFile'][0].filename : null;

        const newDocument = await DownloadsModel.create({
            name,
            link,
            pdfFile,
            docFile
        });

        res.status(201).json(newDocument);
    } catch (error) {
        console.error("Error creating document:", error);
        res.status(500).json({ error: "Error creating document" });
    }
});

// API สำหรับการดึงเอกสารทั้งหมด
// router.get('/downloads', async (req, res) => {
//     try {
//         const documents = await DownloadsModel.findAll();
//         const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

//         const documentsWithUrls = documents.map(doc => ({
//             ...doc.toJSON(),
//             pdfFile: doc.pdfFile ? baseUrl + doc.pdfFile : null,
//             docFile: doc.docFile ? baseUrl + doc.docFile : null
//         }));

//         res.status(200).json(documentsWithUrls);
//     } catch (error) {
//         console.error("Error fetching documents:", error);
//         res.status(500).json({ error: "Error fetching documents" });
//     }
// });

router.get('/downloads', async (req, res) => {
    try {
        const documents = await DownloadsModel.findAll();
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

        const documentsWithUrls = documents.map(doc => ({
            ...doc.toJSON(),
            pdfFile: doc.pdfFile ? baseUrl + doc.pdfFile : null,
            docFile: doc.docFile ? baseUrl + doc.docFile : null
        }));

        res.status(200).json(documentsWithUrls);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Error fetching documents" });
    }
});


// API สำหรับดึงเอกสารตาม ID
router.get('/downloads/:id', async (req, res) => {
    try {
        const document = await DownloadsModel.findByPk(req.params.id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error("Error fetching document:", error);
        res.status(500).json({ error: "Error fetching document" });
    }
});

// API สำหรับการอัพเดตเอกสาร
router.put('/downloads/:id', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }]), async (req, res) => {
    try {
        const document = await DownloadsModel.findByPk(req.params.id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        const { name, link } = req.body;
        const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0].filename : document.pdfFile;
        const docFile = req.files['docFile'] ? req.files['docFile'][0].filename : document.docFile;

        await document.update({
            name,
            link,
            pdfFile,
            docFile
        });

        res.status(200).json(document);
    } catch (error) {
        console.error("Error updating document:", error);
        res.status(500).json({ error: "Error updating document" });
    }
});

// API สำหรับการลบไฟล์ PDF
router.delete('/downloads/:id/pdf', async (req, res) => {
    try {
        const document = await DownloadsModel.findByPk(req.params.id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        if (document.pdfFile) {
            const pdfFilePath = path.join(__dirname, '../uploads/', document.pdfFile);
            if (fs.existsSync(pdfFilePath)) {
                fs.unlink(pdfFilePath, async (err) => {
                    if (err) {
                        console.error("Error deleting PDF file:", err);
                        return res.status(500).json({ error: "Error deleting PDF file" });
                    } else {
                        await document.update({ pdfFile: null });
                        console.log("PDF file deleted:", pdfFilePath);
                        res.status(200).json({ message: "PDF file deleted successfully" });
                    }
                });
            } else {
                console.log("PDF file does not exist:", pdfFilePath);
                res.status(404).json({ error: "PDF file does not exist" });
            }
        } else {
            res.status(404).json({ error: "PDF file not found" });
        }
    } catch (error) {
        console.error("Error deleting PDF file:", error);
        res.status(500).json({ error: "Error deleting PDF file" });
    }
});

// API สำหรับการลบไฟล์ Doc
router.delete('/downloads/:id/doc', async (req, res) => {
    try {
        const document = await DownloadsModel.findByPk(req.params.id);
        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        if (document.docFile) {
            const docFilePath = path.join(__dirname, '../uploads/', document.docFile);
            if (fs.existsSync(docFilePath)) {
                fs.unlink(docFilePath, async (err) => {
                    if (err) {
                        console.error("Error deleting Doc file:", err);
                        return res.status(500).json({ error: "Error deleting Doc file" });
                    } else {
                        await document.update({ docFile: null });
                        console.log("Doc file deleted:", docFilePath);
                        res.status(200).json({ message: "Doc file deleted successfully" });
                    }
                });
            } else {
                console.log("Doc file does not exist:", docFilePath);
                res.status(404).json({ error: "Doc file does not exist" });
            }
        } else {
            res.status(404).json({ error: "Doc file not found" });
        }
    } catch (error) {
        console.error("Error deleting Doc file:", error);
        res.status(500).json({ error: "Error deleting Doc file" });
    }
});

// API สำหรับการลบเอกสาร
router.delete('/downloads/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const document = await DownloadsModel.findByPk(id);

        if (!document) {
            return res.status(404).json({ error: "Document not found" });
        }

        // ลบไฟล์ PDF
        if (document.pdfFile) {
            const pdfFilePath = path.join(__dirname, '../uploads/', document.pdfFile);
            if (fs.existsSync(pdfFilePath)) {
                fs.unlink(pdfFilePath, (err) => {
                    if (err) {
                        console.error("Error deleting PDF file:", err);
                    } else {
                        console.log("PDF file deleted:", pdfFilePath);
                    }
                });
            } else {
                console.log("PDF file does not exist:", pdfFilePath);
            }
        }

        // ลบไฟล์ Doc
        if (document.docFile) {
            const docFilePath = path.join(__dirname, '../uploads/', document.docFile);
            if (fs.existsSync(docFilePath)) {
                fs.unlink(docFilePath, (err) => {
                    if (err) {
                        console.error("Error deleting Doc file:", err);
                    } else {
                        console.log("Doc file deleted:", docFilePath);
                    }
                });
            } else {
                console.log("Doc file does not exist:", docFilePath);
            }
        }

        await document.destroy();
        res.status(200).json({ message: "Document deleted successfully" });
    } catch (error) {
        console.error("Error deleting document:", error);
        res.status(500).json({ error: "Error deleting document" });
    }
});



module.exports = router;
