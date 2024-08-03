const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const path = require('path');

// const Evaluation = require('./Models/Evaluation')

// const sequelize = require('./connect') ทดสอบการเชื่อมต่อ Database
// const CompaniesModel = require('./Models/Companies')
// const ContactModel =  require('./Models/Contact')
// const DataEvaluationInternshipForUniversityController = require('./Models/DataEvaluationInternshipForUniversity')

const RegisterController = require("./Controllers/RegisterController")
const LoginController = require("./Controllers/LoginController")
const UsersController = require("./Controllers/UsersController")
const NewsController = require("./Controllers/NewsController")
const InternshipController = require('./Controllers/InternshipController')
const PracticeTeachingController = require('./Controllers/PracticeTeachingController')
const CompaniesController = require("./Controllers/CompaniesController")
const DownloadsController = require("./Controllers/DownloadsController")
const ContactController = require('./Controllers/ContactController')
const CollegesController = require('./Controllers/CollegesController')
const EvaluationController = require('./Controllers/EvaluationController')
const DataEvaluationController = require('./Controllers/DataEvaluationController')
const DataEvaluationInternshipController = require('./Controllers/DataEvaluationInternshipController')
const DataEvaluationInternshipForUniversityController = require('./Controllers/DataEvaluationInternshipForUniversityController')


const app = express()
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', RegisterController)
app.use('/api', LoginController)
app.use('/api', UsersController)
app.use('/api', NewsController)
app.use('/api', CompaniesController)
app.use('/api', InternshipController)
app.use('/api', PracticeTeachingController)
app.use('/api', DownloadsController)
app.use('/api', ContactController)
app.use('/api', CollegesController)
app.use('/api', EvaluationController)
app.use('/api', DataEvaluationController)
app.use('/api', DataEvaluationInternshipController)
app.use('/api', DataEvaluationInternshipForUniversityController)

app.listen(port, () => {
    console.log(`Example app listening on port`, port);
});