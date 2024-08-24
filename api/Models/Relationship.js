const TeachersModels = require('./Teachers');
const dataEvaluationInternshipForUniversityModels = require('./DataEvaluationInternshipForUniversity');

const EvaluatorsModels = require('./Evaluators')
const DataEvaluationInternship = require('./DataEvaluationInternship')

// กำหนดความสัมพันธ์
TeachersModels.hasMany(dataEvaluationInternshipForUniversityModels, {
    foreignKey: 'idCard',
    sourceKey: 'idCard',
    as: 'evaluations',
    onDelete: 'CASCADE',   // ถ้าลบครู ข้อมูลที่เกี่ยวข้องจะถูกลบด้วย
    onUpdate: 'CASCADE'    // ถ้ามีการอัปเดต idCard ข้อมูลที่เกี่ยวข้องจะถูกอัปเดตด้วย
});


dataEvaluationInternshipForUniversityModels.belongsTo(TeachersModels, {
    foreignKey: 'idCard',
    targetKey: 'idCard',
    as: 'teacher'
});


// กำหนดความสัมพันธ์ 1:M โดยใช้ idCard
EvaluatorsModels.hasMany(DataEvaluationInternship, {
    foreignKey: 'idCard',  // กำหนด foreign key ในตาราง DataEvaluationInternship
    sourceKey: 'idCard',            // กำหนด source key เป็น idCard จากตาราง EvaluatorsModels
    as: 'evaluations',              // ตั้งชื่อ alias สำหรับความสัมพันธ์
    onDelete: 'CASCADE',            // ถ้าลบ Evaluator ข้อมูลที่เกี่ยวข้องใน DataEvaluationInternship จะถูกลบไปด้วย
    onUpdate: 'CASCADE'             // ถ้าอัปเดต idCard ของ Evaluator ข้อมูลที่เกี่ยวข้องใน DataEvaluationInternship จะถูกอัปเดตด้วย
});

DataEvaluationInternship.belongsTo(EvaluatorsModels, {
    foreignKey: 'idCard',  // กำหนด foreign key เป็น idCard ในตาราง DataEvaluationInternship
    targetKey: 'idCard',            // กำหนด target key เป็น idCard จากตาราง EvaluatorsModels
    as: 'evaluator'                 // ตั้งชื่อ alias สำหรับการอ้างอิงกลับไปยัง EvaluatorsModels
});



// ฟังก์ชัน syncModels สำหรับซิงค์โมเดลที่เกี่ยวข้อง
// async function syncModels() {
//     try {
//         await TeachersModels.sync({ alter: true });  // ซิงค์โมเดล Teachers
//         await dataEvaluationInternshipForUniversityModels.sync({ alter: true });  // ซิงค์โมเดล DataEvaluationInternshipForUniversity
//         await EvaluatorsModels.sync({ alter: true });  // ซิงค์โมเดล Evaluators
//         await DataEvaluationInternship.sync({ alter: true });  // ซิงค์โมเดล DataEvaluationInternship
//         console.log("Tables created successfully!");
//     } catch (error) {
//         console.error("Error creating tables:", error);
//     }
// }

// syncModels();

// // Export โมเดลเพื่อให้สามารถนำไปใช้ในไฟล์อื่นได้
module.exports = {
    TeachersModels,
    dataEvaluationInternshipForUniversityModels,
    EvaluatorsModels,
    DataEvaluationInternship
};


