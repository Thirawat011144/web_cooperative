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

// กำหนดความสัมพันธ์
UsersModel.hasOne(CompaniesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'companyDetails' });
CompaniesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

UsersModel.hasOne(CollegesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'collegeDetails' });
CollegesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

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

module.exports = { UsersModel, CompaniesModel, CollegesModel };
