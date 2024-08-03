// const express = require('express');
// const NewsModel = require('../Models/News');
// const multer = require('multer');
// const path = require('path');

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

// // POST เพิ่มข่าวสารพร้อมอัปโหลดไฟล์
// router.post('/news', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }, { name: 'imageFile' }]), async (req, res) => { // แก้ไข: เพิ่ม imageFile ในการอัปโหลดไฟล์
//     try {
//         const { title, detail } = req.body;
//         let pdfFile = '';
//         let docFile = '';
//         let imageFile = ''; // แก้ไข: เพิ่มตัวแปรสำหรับ imageFile

//         if (!title) {
//             return res.status(400).send({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
//         }

//         // ตรวจสอบการอัปโหลดไฟล์ PDF, DOC และ Image (ถ้ามี)
//         if (req.files['pdfFile']) {
//             pdfFile = req.files['pdfFile'][0].filename;
//         }
//         if (req.files['docFile']) {
//             docFile = req.files['docFile'][0].filename;
//         }
//         if (req.files['imageFile']) { // แก้ไข: ตรวจสอบการอัปโหลดไฟล์รูปภาพ
//             imageFile = req.files['imageFile'][0].filename;
//         }

//         const news = await NewsModel.create({
//             title,
//             detail,
//             pdfFile,
//             docFile,
//             imageFile, // แก้ไข: เพิ่มการบันทึก imageFile
//         });

//         res.status(201).send({ message: 'สร้างข่าวสารสำเร็จ', news });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // router.get('/news', async (req, res) => {
// //     try {
// //         const newsList = await NewsModel.findAll();
// //         res.status(200).send(newsList);
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //     }
// // });

// router.get('/news', async (req, res) => {
//     try {
//         const documents = await NewsModel.findAll();
//         const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

//         const documentsWithUrls = documents.map(doc => ({
//             ...doc.toJSON(),
//             pdfFile: doc.pdfFile ? baseUrl + doc.pdfFile : null,
//             docFile: doc.docFile ? baseUrl + doc.docFile : null,
//             imageFile: doc.imageFile ? baseUrl + doc.imageFile : null // แก้ไข: เพิ่ม URL ของ imageFile
//         }));

//         res.status(200).json(documentsWithUrls);
//     } catch (error) {
//         console.error("Error fetching documents:", error);
//         res.status(500).json({ error: "Error fetching documents" });
//     }
// });

// // router.get("/news/:id", async (req, res) => {
// //     try {
// //         const news = await NewsModel.findByPk(req.params.id);
// //         if (!news) {
// //             return res.status(404).send({ message: "News not found" });
// //         }
// //         res.send(news);
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //     }
// // })

// // GET ข่าวสารตาม ID
// router.get('/news/:id', async (req, res) => {
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: 'News not found' });
//         }
//         const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`; // แก้ไข: เพิ่ม baseUrl สำหรับ imageFile
//         const newsWithUrls = {
//             ...news.toJSON(),
//             pdfFile: news.pdfFile ? baseUrl + news.pdfFile : null,
//             docFile: news.docFile ? baseUrl + news.docFile : null,
//             imageFile: news.imageFile ? baseUrl + news.imageFile : null // แก้ไข: เพิ่ม URL ของ imageFile
//         };
//         res.send(newsWithUrls);
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // router.put('/news/:id', async (req, res) => {
// //     try {
// //         const news = await NewsModel.findByPk(req.params.id);
// //         if (!news) {
// //             return res.status(404).send({ message: "News not found" });
// //         }
// //         const { title, detail, } = req.body;
// //         Object.assign(news, { title, detail })
// //         await news.save();
// //         res.json({ data: news, message: "Success" });
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //     }
// // })

// // router.delete('/news/:id', async (req, res) => {
// //     try {
// //         const news = await NewsModel.findByPk(req.params.id);
// //         if (!news) {
// //             return res.status(404).send({ message: "News not found" });
// //         }
// //         await news.destroy();
// //         res.send({ message: "News deleted successfully" });
// //     } catch (error) {
// //         res.status(500).send({ message: error.message });
// //         console.log(error)
// //     }
// // })

// // PUT แก้ไขข่าวสารตาม ID
// router.put('/news/:id', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }, { name: 'imageFile' }]), async (req, res) => { // แก้ไข: เพิ่ม imageFile ในการอัปโหลดไฟล์
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: 'News not found' });
//         }

//         const { title, detail } = req.body;

//         // ตรวจสอบการอัปโหลดไฟล์ PDF, DOC และ Image (ถ้ามี)
//         if (req.files['pdfFile']) {
//             news.pdfFile = req.files['pdfFile'][0].filename;
//         }
//         if (req.files['docFile']) {
//             news.docFile = req.files['docFile'][0].filename;
//         }
//         if (req.files['imageFile']) { // แก้ไข: ตรวจสอบการอัปโหลดไฟล์รูปภาพ
//             news.imageFile = req.files['imageFile'][0].filename;
//         }

//         news.title = title;
//         news.detail = detail;

//         await news.save();
//         res.json({ data: news, message: 'Success' });
//     } catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// // DELETE ลบข่าวสารตาม ID
// router.delete('/news/:id', async (req, res) => {
//     try {
//         const news = await NewsModel.findByPk(req.params.id);
//         if (!news) {
//             return res.status(404).send({ message: 'News not found' });
//         }
//         await news.destroy();
//         res.send({ message: 'News deleted successfully' });
//     } catch (error) {
//         res.status(500).send({ message: error.message });

//     }
// });

// module.exports = router;

const express = require('express');
const NewsModel = require('../Models/News');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post('/news', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }, { name: 'imageFile' }]), async (req, res) => {
    try {
        const { title, detail } = req.body;
        let pdfFile = '';
        let docFile = '';
        let imageFile = '';

        if (!title) {
            return res.status(400).send({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
        }

        if (req.files['pdfFile']) {
            pdfFile = req.files['pdfFile'][0].filename;
        }
        if (req.files['docFile']) {
            docFile = req.files['docFile'][0].filename;
        }
        if (req.files['imageFile']) {
            imageFile = req.files['imageFile'][0].filename;
        }

        const news = await NewsModel.create({
            title,
            detail,
            pdfFile,
            docFile,
            imageFile,
        });

        res.status(201).send({ message: 'สร้างข่าวสารสำเร็จ', news });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get('/news', async (req, res) => {
    try {
        const documents = await NewsModel.findAll();
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;

        const documentsWithUrls = documents.map(doc => ({
            ...doc.toJSON(),
            pdfFile: doc.pdfFile ? baseUrl + doc.pdfFile : null,
            docFile: doc.docFile ? baseUrl + doc.docFile : null,
            imageFile: doc.imageFile ? baseUrl + doc.imageFile : null
        }));

        res.status(200).json(documentsWithUrls);
    } catch (error) {
        console.error("Error fetching documents:", error);
        res.status(500).json({ error: "Error fetching documents" });
    }
});

router.get('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        const newsWithUrls = {
            ...news.toJSON(),
            pdfFile: news.pdfFile ? baseUrl + news.pdfFile : null,
            docFile: news.docFile ? baseUrl + news.docFile : null,
            imageFile: news.imageFile ? baseUrl + news.imageFile : null
        };
        res.send(newsWithUrls);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.put('/news/:id', upload.fields([{ name: 'pdfFile' }, { name: 'docFile' }, { name: 'imageFile' }]), async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }

        const { title, detail } = req.body;

        if (req.files['pdfFile']) {
            news.pdfFile = req.files['pdfFile'][0].filename;
        }
        if (req.files['docFile']) {
            news.docFile = req.files['docFile'][0].filename;
        }
        if (req.files['imageFile']) {
            news.imageFile = req.files['imageFile'][0].filename;
        }

        news.title = title;
        news.detail = detail;

        await news.save();
        res.json({ data: news, message: 'Success' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.delete('/news/:id', async (req, res) => {
    try {
        const news = await NewsModel.findByPk(req.params.id);
        if (!news) {
            return res.status(404).send({ message: 'News not found' });
        }
        await news.destroy();
        res.send({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: error.message });

    }
});

module.exports = router;
