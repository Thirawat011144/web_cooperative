const UsersModel = require('./Users');
const CompaniesModel = require('./Companies');
const CollegesModel = require('./Colleges');
const dataEvaluationInternshipModel = require('./DataEvaluationInternship');
const dataEvaluationInternshipForUniversity = require('./DataEvaluationInternshipForUniversity');
const dataEvaluation = require('./DataEvaluation');
const TeachersModels = require('./Teachers');
const EvaluatorsModels = require('./Evaluators');

// กำหนดความสัมพันธ์
UsersModel.hasOne(CompaniesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'companyDetails', onDelete: 'CASCADE' });
CompaniesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasOne(CollegesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'collegeDetails', onDelete: 'CASCADE' });
CollegesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasMany(dataEvaluationInternshipModel, { foreignKey: 'studentId', sourceKey: 'studentID', as: 'evaluationDetails', onDelete: 'CASCADE' });
dataEvaluationInternshipModel.belongsTo(UsersModel, { foreignKey: 'studentId', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasMany(dataEvaluationInternshipForUniversity, { foreignKey: 'studentId', sourceKey: 'studentID', as: 'evaluationUniversityDetails', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
dataEvaluationInternshipForUniversity.belongsTo(UsersModel, { foreignKey: 'studentId', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasMany(dataEvaluation, { foreignKey: 'studentId', sourceKey: 'studentID', as: 'evaluationHightDetails', onDelete: 'CASCADE' });
dataEvaluation.belongsTo(UsersModel, { foreignKey: 'studentId', targetKey: 'studentID', as: 'userDetails' });

// กำหนดความสัมพันธ์สำหรับ TeachersModels และ EvaluatorsModels

// ความสัมพันธ์ของ TeachersModels กับ dataEvaluationInternshipForUniversity
TeachersModels.hasMany(dataEvaluationInternshipForUniversity, {
    foreignKey: 'idCard',
    sourceKey: 'idCard',
    as: 'universityEvaluations', // เปลี่ยน alias ให้ไม่ซ้ำกัน
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

dataEvaluationInternshipForUniversity.belongsTo(TeachersModels, {
    foreignKey: 'idCard',
    targetKey: 'idCard',
    as: 'universityTeacher' // เปลี่ยน alias ให้ไม่ซ้ำกัน
});

// ความสัมพันธ์ของ EvaluatorsModels กับ DataEvaluationInternship
EvaluatorsModels.hasMany(dataEvaluationInternshipModel, {
    foreignKey: 'idCard',
    sourceKey: 'idCard',
    as: 'evaluatorEvaluations', // เปลี่ยน alias ให้ไม่ซ้ำกัน
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

dataEvaluationInternshipModel.belongsTo(EvaluatorsModels, {
    foreignKey: 'idCard',
    targetKey: 'idCard',
    as: 'internshipEvaluator' // เปลี่ยน alias ให้ไม่ซ้ำกัน
});


// EvaluatorsModels to DataEvaluation
EvaluatorsModels.hasMany(dataEvaluation, {
    foreignKey: 'idCardEvaluator', // ใช้ idCardEvaluator เป็น foreign key
    sourceKey: 'idCard',
    as: 'evaluationsAsEvaluator',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

dataEvaluation.belongsTo(EvaluatorsModels, {
    foreignKey: 'idCardEvaluator', // ใช้ idCardEvaluator เป็น foreign key
    targetKey: 'idCard',
    as: 'evaluator'
});

// กำหนดความสัมพันธ์ 1:M โดยใช้ idCard ของ TeachersModels
TeachersModels.hasMany(dataEvaluation, {
    foreignKey: 'idCardTeacher',  // กำหนด foreign key ในตาราง dataEvaluation สำหรับ idCard ของครู
    sourceKey: 'idCard',          // กำหนด source key เป็น idCard จากตาราง TeachersModels
    as: 'teacherEvaluations',     // ตั้งชื่อ alias สำหรับความสัมพันธ์
    onDelete: 'CASCADE',          // ถ้าลบข้อมูลจากตาราง TeachersModels ข้อมูลที่เกี่ยวข้องใน dataEvaluation จะถูกลบไปด้วย
    onUpdate: 'CASCADE'           // ถ้ามีการอัปเดต idCard ของ TeachersModels ข้อมูลที่เกี่ยวข้องใน dataEvaluation จะถูกอัปเดตด้วย
});

dataEvaluation.belongsTo(TeachersModels, {
    foreignKey: 'idCardTeacher',  // กำหนด foreign key เป็น idCardTeacher ในตาราง dataEvaluation
    targetKey: 'idCard',          // กำหนด target key เป็น idCard จากตาราง TeachersModels
    as: 'teacher'                 // ตั้งชื่อ alias สำหรับการอ้างอิงกลับไปยัง TeachersModels
});

// ฟังก์ชัน syncModels สำหรับซิงค์โมเดลทั้งหมด
// async function syncModels() {
//     try {
//         await UsersModel.sync({ alter: true });
//         await CompaniesModel.sync({ alter: true });
//         await CollegesModel.sync({ alter: true });
//         await dataEvaluationInternshipModel.sync({ alter: true });
//         await dataEvaluationInternshipForUniversity.sync({ alter: true });
//         await dataEvaluation.sync({ alter: true });
//         await TeachersModels.sync({ alter: true });
//         await EvaluatorsModels.sync({ alter: true });
//         console.log("Tables created successfully!");
//     } catch (error) {
//         console.error("Error creating tables:", error);
//     }
// }

// syncModels();

// Export โมเดลเพื่อใช้ในไฟล์อื่น
module.exports = {
    UsersModel,
    CompaniesModel,
    CollegesModel,
    dataEvaluationInternshipModel,
    dataEvaluationInternshipForUniversity,
    dataEvaluation,
    TeachersModels,
    EvaluatorsModels
};
