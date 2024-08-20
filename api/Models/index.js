// const UsersModel = require('./Users');
// const CompaniesModel = require('./Companies');

// // กำหนดความสัมพันธ์
// UsersModel.hasOne(CompaniesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'companyDetails' });
// CompaniesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

// // async function syncModels() {
// //     try {
// //         await UsersModel.sync({ alter: true });
// //         await CompaniesModel.sync({ alter: true });
// //         console.log("Tables created successfully!");
// //     } catch (error) {
// //         console.error("Error creating tables:", error);
// //     }
// // }

// // syncModels();

// module.exports = { UsersModel, CompaniesModel };

const UsersModel = require('./Users');
const CompaniesModel = require('./Companies');
const CollegesModel = require('./Colleges');
const dataEvaluationInternshipModel = require('./DataEvaluationInternship')
const dataEvaluationInternshipForUniversity = require('./DataEvaluationInternshipForUniversity')
const dataEvaluation = require('./DataEvaluation')

// กำหนดความสัมพันธ์
UsersModel.hasOne(CompaniesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'companyDetails' });
CompaniesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasOne(CollegesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'collegeDetails' });
CollegesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasMany(dataEvaluationInternshipModel, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    sourceKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'evaluationDetails'
});

dataEvaluationInternshipModel.belongsTo(UsersModel, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    targetKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'userDetails'
});

UsersModel.hasMany(dataEvaluationInternshipForUniversity, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    sourceKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'evaluationUniversityDetails'
});

dataEvaluationInternshipForUniversity.belongsTo(UsersModel, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    targetKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'userDetails'
});

UsersModel.hasMany(dataEvaluation, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    sourceKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'evaluationHightDetails'
});

dataEvaluation.belongsTo(UsersModel, {
    foreignKey: 'studentId', // ใช้ studentId ที่อยู่ใน dataEvaluationInternshipModel
    targetKey: 'studentID', // ใช้ studentID ที่อยู่ใน UsersModel
    as: 'userDetails'
});

// async function syncModels() {
//     try {
//         await UsersModel.sync({ alter: true });
//         await CompaniesModel.sync({ alter: true });
//         await CollegesModel.sync({ alter: true });
//         console.log("Tables created successfully!");
//     } catch (error) {
//         console.error("Error creating tables:", error);
//     }
// }

// syncModels();

module.exports = { UsersModel, CompaniesModel, CollegesModel, dataEvaluationInternshipModel, dataEvaluationInternshipForUniversity, dataEvaluation };
