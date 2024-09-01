import ExcelJS from 'exceljs';
import { format } from 'date-fns';

// ฟังก์ชันสร้าง worksheet
export const createWorksheet = (workbook, worksheetName, columns) => {
    const worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = columns;

    // ตั้งค่าแบบอักษรให้กับ header row
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { name: 'TH Sarabun New', size: 16, bold: true };
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCCCCC' } // Gray background
        };
        cell.alignment = { horizontal: 'center' };
    });

    return worksheet;
};

// ฟังก์ชันเติมข้อมูลลง worksheet
export const populateWorksheet = (worksheet, data) => {
    data.forEach(rowData => {
        const row = worksheet.addRow(rowData);

        // ตั้งค่าแบบอักษรสำหรับแต่ละเซลล์
        row.eachCell({ includeEmpty: true }, (cell) => {
            cell.font = { name: 'TH Sarabun New', size: 16 }; // ตั้งค่าแบบอักษรเป็น TH Sarabun New
            cell.alignment = { horizontal: 'center' };
        });
    });
};
// ฟังก์ชันดาวน์โหลด Excel
export const downloadExcel = (filename, sortedUsers) => {
    console.log(sortedUsers)
    if (!sortedUsers) {
        console.error("sortedUsers ไม่มีค่า");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'Students', [

        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน(ผู้ประเมิน)', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์(ผู้ประเมิน)', key: 'phoneNumberEvaluator', width: 15 },
        { header: 'สถานที่ฝึกประสบการณ์', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIdCard', width: 20 },
        { header: 'สาขา', key: 'branch', width: 30 },
        { header: 'ชื่อ', key: 'firstName', width: 30 },
        { header: 'นามสกุล', key: 'lastName', width: 30 },
        { header: 'ชั้นปี', key: 'year', width: 20 },
        { header: 'สถานะ', key: 'status', width: 20 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 20 },
        { header: 'อีเมล์', key: 'email', width: 30 },
        { header: 'คะแนนรวม', key: 'totalScore', width: 20 },
        { header: 'คิดเป็นร้อยละ', key: 'averageScore', width: 20 },
        { header: 'ปริมาณงาน (Quantity Of Work) ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด (ในระดับที่นักศึกษาจะปฏิบัติได้) และเทียบกับนักศึกษาทั่ว ๆ ไป', key: 'criteria', width: 100 },
        { header: 'คุณภาพงาน (Quality Of Work) ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อย มีความรอบคอบ ไม่เกิดปัญหาติดตามมา งานไม่ค้าง ทำงานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด', key: 'qualityOfWork', width: 100 },
        { header: 'ความรู้ความสามารถทางวิชาการ(Academic Ability)นักศึกษามีความรู้ทางวิชาการเพียงพอ  ที่จะทำงานตามที่ได้รับมอบหมาย (ในระดับที่นักศึกษาจะปฏิบัติได้)', key: 'academicAbility', width: 100 },
        { header: 'ความสามารถในการเรียนรู้และประยุกต์วิชาการ (Ability to Learn and Apply Knowledge)ความรวดเร็วในการเรียนรู้  เข้าใจข้อมูล  ข่าวสาร  และวิธีการทำงาน  ตลอดจนการนำความรู้ไปประยุกต์ใช้งาน', key: 'abilityToLearn', width: 100 },
        { header: 'ความรู้ความชำนาญด้านปฏิบัติการ (Practical  Ability)เช่น  การปฏิบัติงานในภาคสนาม  ในห้องปฏิบัติการ', key: 'practicalAbility', width: 100 },
        { header: 'วิจารณญาณและการตัดสินใจ (Judgment and Decision Making)ตัดสินใจได้ดี  ถูกต้อง รวดเร็ว  มีการวิเคราะห์  ข้อมูลและปัญหาต่าง ๆ อย่างรอบคอบก่อนการตัดสินใจ  สามารถแก้ปัญหาเฉพาะหน้า  สามารถไว้วางใจให้ตัดสินใจได้ด้วยตัวเอง', key: 'judgmentAndDecision', width: 100 },
        { header: 'การจัดการและวางแผน (Management and Planning)', key: 'managementAndPlanning', width: 100 },
        { header: 'ทักษะการสื่อสาร (Communication  Skills)ความสามารถในการติดต่อสื่อสาร  การพูด  การเขียน  และการนำเสนอ  (Presentation)  สามารถสื่อให้เข้าใจได้ง่าย  เรียบร้อย  ชัดเจน  ถูกต้อง  รัดกุม  มีลำดับขั้นตอนที่ดี  ไม่ก่อให้เกิดความสับสนต่อการทำงาน  รู้จักสอบถาม  รู้จักชี้แจงผลการปฏิบัติงานและข้อขัดข้องให้ทราบ', key: 'communicationSkills', width: 100 },
        { header: 'การพัฒนาด้านภาษาและวัฒนธรรมต่างประเทศ (Foreign  Language and CulturalDevelopment)เช่น ภาษาอังกฤษ  การทำงานกับชาวต่างชาติ', key: 'foreignLanguage', width: 100 },
        { header: 'ความเหมาะสมต่อตำแหน่งงานที่ได้รับมอบหมาย (Suitability for Job Position)สามารถพัฒนาตนเองให้ปฏิบัติงานตาม Job Position และ Job Description ที่มอบหมายได้อย่างเหมาะสมหรือตำแหน่งงานนี้เหมาะสมกับนักศึกษาคนนี้หรือไม่เพียงใด', key: 'suitabilityForJob', width: 100 },
        { header: 'ความรับผิดชอบและเป็นผู้ที่ไว้วางใจได้ (Responsibility and Dependability)ดำเนินงานให้สำเร็จลุล่วงโดยคำนึงถึงเป้าหมาย  และความสำเร็จของงานเป็นหลักยอมรับผลที่เกิดจากการทำงานอย่างมีเหตุผล  สามารถปล่อยให้ทำงาน (กรณีงานประจำ) ได้โดยไม่ต้องควบคุมมากจนเกินไป ความจำเป็นในการตรวจสอบขั้นตอนและผลงานตลอดเวลาสามารถไว้วางในให้รับผิดชอบงานที่มากกว่าเวลาประจำสามารถไว้วางใจได้แทบทุกสถานการณ์หรือในสถานการณ์ปกติเท่านั้น', key: 'responsibilityAndDependability', width: 100 },
        { header: 'ความสนใจ  อุตสาหะในการทำงาน (Interest in  Work)ความสนใจและความกระตือรือร้นในการทำงาน  มีความอุตสาหะ  ความพยายาม ความตั้งใจที่จะทำงานได้สำเร็จ  ความมานะบากบั่น  ไม่ย่อท้อต่ออุปสรรคและปัญหา', key: 'interestInWork', width: 100 },
        { header: 'ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or Self Starter)เมื่อได้รับคำชี้แนะ  สามารถเริ่มทำงานได้เอง  โดยไม่ต้องรอคำสั่ง (กรณีงานประจำ)  เสนอตัวเข้าช่วยงานแทบทุกอย่าง  มาขอรับงานใหม่ ๆ ไปทำ ไม่ปล่อยเวลาว่างให้ล่วงเลยไปโดยเปล่าประโยชน์', key: 'initiative', width: 100 },
        { header: 'การตอบเสนอต่อการสั่งการ (Responsibility and Dependability)ยินดีรับคำสั่ง คำแนะนำ คำวิจารณ์  ไม่แสดงความอึดอัดใจ  เมื่อได้รับคำติเตือนและวิจารณ์  ความรวดเร็วในการปฏิบัติตามคำสั่ง  การปรับตัวปฏิบัติตามคำแนะนำ ข้อเสนอแนะและวิจารณ์', key: 'dependability', width: 100 },
        { header: 'บุคลิกภาพและการวางตัว (Personality)มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติ วุฒิภาวะ  ความอ่อนน้อมถ่อมตน  การแต่งกาย กิริยาวาจา  การตรงต่อเวลา และอื่น ๆ', key: 'personality', width: 100 },
        { header: 'มนุษยสัมพันธ์ (Interpersonal Skills)สามารถร่วมงานกับผู้อื่น  การทำงานเป็นทีม  สร้างมนุษย์สัมพันธ์ได้ดี  เป็นที่รักใคร่ชอบพอของผู้ร่วมงาน  เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน', key: 'interpersonalSkills', width: 100 },
        { header: 'ความมีระเบียบวินัย  ปฏิบัติตามวัฒนธรรมขององค์กร (Discipline and Adaptability to Formal  Organization)ความสนใจเรียบรู้  ศึกษา  กฎระเบียบ นโยบายต่าง ๆ และปฏิบัติตามโดยเต็มใจการปฏิบัติตามระเบียบบริหารบุคคล (การเข้างาน  ลางาน)  ปฏิบัติตามกฎการรักษาความปลอดภัยในโรงงาน  การควบคุมคุณภาพ 5ส  และอื่น ๆ', key: 'discipline', width: 100 },
        { header: 'คุณธรรมและจริยธรรม (Ethics and Morality) มีความซื่อสัตย์  สุจริต  มีจิตใจสะอาด  รู้จักเสียสละ  ไม่เห็นแก่ตัว  เอื้อเฟื้อช่วยเหลือคนอื่น', key: 'ethicsAndMorality', width: 100 },
        { header: 'จุดเด่นของนักศึกษา/Strength', key: 'strength', width: 100 },
        { header: 'ข้อควรปรับปรุงของนักศึกษา/Improvement', key: 'improvement', width: 100 },
        { header: 'หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ (หากมีโอกาสเลือก)', key: 'jobOffer', width: 100 },
        { header: 'ข้อคิดเห็นเพิ่มเติม/Other Comments', key: 'other', width: 100 },
    ]);

    const data = sortedUsers.map(user => ({

        // evaluatorName: user.evaluationHightDetails?.evaluatorName || 'ไม่มีข้อมูลไม่มี',
        evaluatorName: `${user.evaluationDetails?.[0]?.internshipEvaluator?.firstName || 'ไม่มีข้อมูล'} ${user.evaluationDetails?.[0]?.internshipEvaluator?.lastName || 'ไม่มีข้อมูล'}`,
        idCard: user.evaluationDetails?.[0]?.idCard || 'ไม่มีข้อมูล',
        phoneNumberEvaluator: user.evaluationDetails?.[0]?.internshipEvaluator?.phoneNumber || 'ไม่มีข้อมูล',
        companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล',
        department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
        evaluatorStatus: user.evaluationDetails?.[0]?.internshipEvaluator?.evaluatorStatus || 'ไม่มีข้อมูล',
        time: user.evaluationDetails?.[0]?.time || 'ไม่มีข้อมูล',
        branch: user.branch || 'ไม่มีข้อมูล',
        studentID: user.studentID || 'ไม่มีข้อมูล',
        studentIdCard: user.idCard || 'ไม่มีข้อมูล',
        firstName: user.firstName || 'ไม่มีข้อมูล',
        lastName: user.lastName || 'ไม่มีข้อมูล',
        year: user.year || 'ไม่มีข้อมูล',
        status: user.status || 'ไม่มีข้อมูล',
        phoneNumber: user.phoneNumber || 'ไม่มีข้อมูล',
        email: user.email || 'ไม่มีข้อมูล',
        totalScore: user.evaluationDetails?.[0]?.totalScore || 'ไม่มีข้อมูล',
        averageScore: user.evaluationDetails?.[0]?.averageScore || 'ไม่มีข้อมูล',
        criteria: user.evaluationDetails?.[0]?.criteria || 'ไม่มีข้อมูล',
        qualityOfWork: user.evaluationDetails?.[0]?.qualityOfWork || 'ไม่มีข้อมูล',
        academicAbility: user.evaluationDetails?.[0]?.academicAbility || 'ไม่มีข้อมูล',
        abilityToLearn: user.evaluationDetails?.[0]?.abilityToLearn || 'ไม่มีข้อมูล',
        practicalAbility: user.evaluationDetails?.[0]?.practicalAbility || 'ไม่มีข้อมูล',
        judgmentAndDecision: user.evaluationDetails?.[0]?.judgmentAndDecision || 'ไม่มีข้อมูล',
        managementAndPlanning: user.evaluationDetails?.[0]?.managementAndPlanning || 'ไม่มีข้อมูล',
        communicationSkills: user.evaluationDetails?.[0]?.communicationSkills || 'ไม่มีข้อมูล',
        foreignLanguage: user.evaluationDetails?.[0]?.foreignLanguage || 'ไม่มีข้อมูล',
        suitabilityForJob: user.evaluationDetails?.[0]?.suitabilityForJob || 'ไม่มีข้อมูล',
        responsibilityAndDependability: user.evaluationDetails?.[0]?.responsibilityAndDependability || 'ไม่มีข้อมูล',
        interestInWork: user.evaluationDetails?.[0]?.interestInWork || 'ไม่มีข้อมูล',
        initiative: user.evaluationDetails?.[0]?.initiative || 'ไม่มีข้อมูล',
        dependability: user.evaluationDetails?.[0]?.dependability || 'ไม่มีข้อมูล',
        personality: user.evaluationDetails?.[0]?.personality || 'ไม่มีข้อมูล',
        interpersonalSkills: user.evaluationDetails?.[0]?.interpersonalSkills || 'ไม่มีข้อมูล',
        discipline: user.evaluationDetails?.[0]?.discipline || 'ไม่มีข้อมูล',
        ethicsAndMorality: user.evaluationDetails?.[0]?.ethicsAndMorality || 'ไม่มีข้อมูล',
        strength: user.evaluationDetails?.[0]?.strength || 'ไม่มีข้อมูล',
        improvement: user.evaluationDetails?.[0]?.improvement || 'ไม่มีข้อมูล',
        jobOffer: user.evaluationDetails?.[0]?.jobOffer || 'ไม่มีข้อมูล',
        other: user.evaluationDetails?.[0]?.other || 'ไม่มีข้อมูล',

    }));


    populateWorksheet(worksheet, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.xlsx`;
        link.click();
    });
};

// ฟังก์ชันดาวน์โหลด Excel
export const downloadExcelHight = (filename, sortedUsers) => {
    if (!sortedUsers) {
        console.error("sortedUsers ไม่มีค่า");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'Students', [
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumberTeacher', width: 15 },
        { header: 'ชื่อสถานประกอบการที่นักศึกษาเข้ารับการฝึก', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIdCard', width: 20 },
        { header: 'ชื่อ', key: 'firstName', width: 30 },
        { header: 'นามสกุล', key: 'lastName', width: 30 },
        { header: 'สาขา', key: 'branch', width: 30 },
        { header: 'ชั้นปี', key: 'year', width: 20 },
        { header: 'สถานะ', key: 'status', width: 20 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 20 },
        { header: 'อีเมล์', key: 'email', width: 30 },

        { header: 'การประสานงานด้านการจัดการดูแลนักศึกษาในสถานประกอบการ ระหว่างบุคคล และผู้นิเทศงานในสถานประกอบการ', key: 'criteria', width: 20 },
        { header: 'การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล (การปฐมนิเทศ การแนะนำระเบียบวินัย การลางาน สวัสดิการ การจ่ายค่าตอบแทน)', key: 'hrGuidance', width: 20 },
        { header: 'บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและให้ความเป็นกันเองกับนักศึกษา', key: 'employeeSupport', width: 20 },
        { header: 'ปริมาณงานที่ได้รับมอบหมาย', key: 'assignedWorkload', width: 20 },
        { header: 'คุณลักษณะงานที่ได้รับมอบหมายตรงกับสาขาวิชาเอกของนักศึกษา', key: 'taskRelevanceToMajor', width: 20 },
        { header: 'งานที่ได้รับมอบหมายตรงกับที่สถานประกอบการเสนอไว้', key: 'taskMatchesProposal', width: 20 },
        { header: 'งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา', key: 'assignedTaskInterestMatch', width: 20 },
        { header: 'ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ', key: 'reportTopicSuitability', width: 20 },
        { header: 'มีผู้นิเทศงานในสถานประกอบการดูแลนักศึกษาตั้งแต่วันแรกที่ทำงาน', key: 'initialSupervisor', width: 20 },
        { header: 'ความรู้และประสบการณ์วิชาชีพของผู้นิเทศงานในสถานประกอบการ', key: 'supervisorKnowledgeAndExperience', width: 20 },
        { header: 'เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการปฏิบัติงาน', key: 'supervisionTime', width: 20 },
        { header: 'เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการเขียนรายงาน', key: 'reportWritingSupervisionTime', width: 20 },
        { header: 'ความสนใจของผู้นิเทศงานในสถานประกอบการต่อการสอนงานและสั่งงาน', key: 'supervisorInterestInGuidance', width: 20 },
        { header: 'การให้ความสำคัญต่อการประเมินผลการปฏิบัติงานและเขียนรายงานของผู้นิเทศงานในสถานประกอบการ', key: 'supervisorEvaluationPriority', width: 20 },
        { header: 'การจัดทำแผนปฏิบัติงานตลอดระยะเวลาของการปฏิบัติงานให้กับนักศึกษา', key: 'workPlanDevelopment', width: 20 },
        { header: 'บุคลิกภาพ', key: 'personality', width: 20 },
        { header: 'วุฒิภาวะ', key: 'maturity', width: 20 },
        { header: 'การปรับตัว', key: 'adaptation', width: 20 },
        { header: 'การเรียนรู้', key: 'learning', width: 20 },
        { header: 'การแสดงความคิดเห็น', key: 'expressingOpinions', width: 20 },
        { header: 'มนุษย์สัมพันธ์', key: 'humanRelations', width: 20 },
        { header: 'ทัศนคติ', key: 'attitude', width: 20 },
        { header: 'การมีส่วนร่วมกับองค์กร', key: 'organizationEngagement', width: 20 },
        { header: 'การแสดงออกทางความคิดและข้อเสนอแนะในที่ประชุม', key: 'meetingFeedbackAndIdeas', width: 20 },
        { header: 'ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติตามระเบียบวินัยขององค์กร', key: 'ethicsAndDiscipline', width: 20 },
        { header: 'การปฏิบัติตนเป็นตัวอย่างที่ดีในด้านความซื่อสัตย์และความรับผิดชอบ', key: 'integrityAndResponsibility', width: 20 },
        { header: 'ความรู้และทักษะพื้นฐานที่จำเป็นต่อการปฏิบัติงาน มอบหมายงานให้สำเร็จ', key: 'basicKnowledgeAndSkills', width: 20 },
        { header: 'การนำความรู้และทักษะไปประยุกต์ใช้ในงานที่ได้รับมอบหมาย', key: 'applicationOfKnowledgeAndSkills', width: 20 },
        { header: 'ความก้าวหน้าและความสมบูรณ์ของการจัดทำรายงาน', key: 'reportProgressAndCompletion', width: 20 },
        { header: 'การสื่อสารข้อมูลในรายงานอย่างชัดเจนและเป็นระบบ', key: 'clearAndSystematicCommunication', width: 20 },
        { header: 'การประเมินโดยรวมของนักศึกษา', key: 'studentOverallEvaluation', width: 20 },
        { header: 'ข้อคิดเห็นเพิ่มเติม', key: 'other', width: 50 },
    ]);

    const data = sortedUsers.map(user => ({
        evaluatorName: `${user.evaluationUniversityDetails?.[0]?.universityTeacher?.firstName || 'ไม่มีข้อมูล'} ${user.evaluationUniversityDetails?.[0]?.universityTeacher?.lastName || ''}`,
        // evaluatorName : `${user.evaluationDetails?.[0]?.internshipEvaluator?.firstName || ''} ${user.evaluationDetails?.[0]?.internshipEvaluator?.lastName || ''}`.trim(),
        idCard: user.evaluationUniversityDetails?.[0]?.idCard || 'ไม่มีข้อมูล',
        phoneNumberTeacher: user.evaluationUniversityDetails?.[0]?.universityTeacher?.phoneNumber || 'ไม่มีข้อมูล',
        // phoneNumberEvaluator: user.evaluationDetails?.[0]?.internshipEvaluator?.phoneNumber || '',
        companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล',
        department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
        evaluatorStatus: user.evaluationUniversityDetails?.[0]?.evaluatorStatus || 'ไม่มีข้อมูล',

        studentID: user.studentID,
        studentIdCard: user.idCard,
        firstName: user.firstName,
        lastName: user.lastName,
        branch: user.branch,
        year: user.year,
        status: user.status,
        phoneNumber: user.phoneNumber,
        email: user.email,
        collegeName: user.collegeDetails?.collegeName || 'ไม่มีข้อมูล',
        criteria: user.evaluationUniversityDetails?.[0]?.criteria || 'ไม่มีข้อมูล',
        hrGuidance: user.evaluationUniversityDetails?.[0]?.hrGuidance || 'ไม่มีข้อมูล',
        employeeSupport: user.evaluationUniversityDetails?.[0]?.employeeSupport || 'ไม่มีข้อมูล',
        assignedWorkload: user.evaluationUniversityDetails?.[0]?.assignedWorkload || 'ไม่มีข้อมูล',
        taskRelevanceToMajor: user.evaluationUniversityDetails?.[0]?.taskRelevanceToMajor || 'ไม่มีข้อมูล',
        taskMatchesProposal: user.evaluationUniversityDetails?.[0]?.taskMatchesProposal || 'ไม่มีข้อมูล',
        assignedTaskInterestMatch: user.evaluationUniversityDetails?.[0]?.assignedTaskInterestMatch || 'ไม่มีข้อมูล',
        reportTopicSuitability: user.evaluationUniversityDetails?.[0]?.reportTopicSuitability || 'ไม่มีข้อมูล',
        initialSupervisor: user.evaluationUniversityDetails?.[0]?.initialSupervisor || 'ไม่มีข้อมูล',
        supervisorKnowledgeAndExperience: user.evaluationUniversityDetails?.[0]?.supervisorKnowledgeAndExperience || 'ไม่มีข้อมูล',
        supervisionTime: user.evaluationUniversityDetails?.[0]?.supervisionTime || 'ไม่มีข้อมูล',
        reportWritingSupervisionTime: user.evaluationUniversityDetails?.[0]?.reportWritingSupervisionTime || 'ไม่มีข้อมูล',
        supervisorInterestInGuidance: user.evaluationUniversityDetails?.[0]?.supervisorInterestInGuidance || 'ไม่มีข้อมูล',
        supervisorEvaluationPriority: user.evaluationUniversityDetails?.[0]?.supervisorEvaluationPriority || 'ไม่มีข้อมูล',
        workPlanDevelopment: user.evaluationUniversityDetails?.[0]?.workPlanDevelopment || 'ไม่มีข้อมูล',
        personality: user.evaluationUniversityDetails?.[0]?.personality || 'ไม่มีข้อมูล',
        maturity: user.evaluationUniversityDetails?.[0]?.maturity || 'ไม่มีข้อมูล',
        adaptation: user.evaluationUniversityDetails?.[0]?.adaptation || 'ไม่มีข้อมูล',
        learning: user.evaluationUniversityDetails?.[0]?.learning || 'ไม่มีข้อมูล',
        expressingOpinions: user.evaluationUniversityDetails?.[0]?.expressingOpinions || 'ไม่มีข้อมูล',
        humanRelations: user.evaluationUniversityDetails?.[0]?.humanRelations || 'ไม่มีข้อมูล',
        attitude: user.evaluationUniversityDetails?.[0]?.attitude || 'ไม่มีข้อมูล',
        organizationEngagement: user.evaluationUniversityDetails?.[0]?.organizationEngagement || 'ไม่มีข้อมูล',
        meetingFeedbackAndIdeas: user.evaluationUniversityDetails?.[0]?.meetingFeedbackAndIdeas || 'ไม่มีข้อมูล',
        ethicsAndDiscipline: user.evaluationUniversityDetails?.[0]?.ethicsAndDiscipline || 'ไม่มีข้อมูล',
        integrityAndResponsibility: user.evaluationUniversityDetails?.[0]?.integrityAndResponsibility || 'ไม่มีข้อมูล',
        basicKnowledgeAndSkills: user.evaluationUniversityDetails?.[0]?.basicKnowledgeAndSkills || 'ไม่มีข้อมูล',
        applicationOfKnowledgeAndSkills: user.evaluationUniversityDetails?.[0]?.applicationOfKnowledgeAndSkills || 'ไม่มีข้อมูล',
        reportProgressAndCompletion: user.evaluationUniversityDetails?.[0]?.reportProgressAndCompletion || 'ไม่มีข้อมูล',
        clearAndSystematicCommunication: user.evaluationUniversityDetails?.[0]?.clearAndSystematicCommunication || 'ไม่มีข้อมูล',
        studentOverallEvaluation: user.evaluationUniversityDetails?.[0]?.studentOverallEvaluation || 'ไม่มีข้อมูล',
        other: user.evaluationUniversityDetails?.[0]?.other || 'ไม่มีข้อมูล',
    }));

    populateWorksheet(worksheet, data);

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.xlsx`;
        link.click();
    });
};


export const downloadExcelHightEvaluation = (filename, sortedUsers) => {
    if (!sortedUsers) {
        console.error("sortedUsers ไม่มีค่า");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'Students', [
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานศึกษาที่นักศึกษาเข้ารับการฝึก', key: 'collegeName', width: 50 },
        { header: 'แผนกสาขาวิชาที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'ขนาดสถานศึกษา', key: 'schoolSize', width: 20 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'fullName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIDCard', width: 20 },
        { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา', key: 'criteria', width: 50 },
        { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovationAlignment', width: 50 },
        { header: 'สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'learningPlan', width: 50 },
        { header: 'สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovativeLearningPlan', width: 50 },
        { header: 'สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน', key: 'joyfulLearningActivities', width: 50 },
        { header: 'จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน', key: 'learnerWellbeingActivities', width: 50 },
        { header: 'สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ', key: 'individualStudentDevelopment', width: 50 },
        { header: 'สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ', key: 'systematicQualityReporting', width: 50 },
        { header: 'สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน', key: 'studentProblemResearch', width: 50 },
        { header: 'สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น', key: 'digitalLearningTools', width: 50 },
        { header: 'สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์', key: 'collaborativeCreativity', width: 50 },
        { header: 'มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ', key: 'professionalGrowthActivities', width: 50 },
        { header: 'ร่วมมือกับผู้ปกครองในการพัฒนาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', key: 'parentCollaboration', width: 50 },
        { header: 'ร่วมมือกับผู้ปกครองในการแก้ปัญหาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', key: 'parentCollab', width: 50 },
        { header: 'สามารถสร้างเครือข่ายความร่วมมือกับผู้ปกครองเพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', key: 'parentNetwork', width: 50 },
        { header: 'สามารถสร้างเครือข่ายความร่วมมือกับชุมชน เข่น ปราชญ์ชาวบ้าน หน่วยงานปกครองของท้องถิ่น เพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', key: 'communityNetwork', width: 50 },
        { header: 'สามารถรายงานการศึกษาบริบทของชุมชนโดยเลือกประเด็นศึกษา  ได้แก่  วิทยากรในชุมชน  ปราชญ์ชาวบ้านในชุมชน  แหล่งเรียนรู้ในชุมชน  วัฒนธรรมของชุมชน  เศรษฐกิจของชุมชน  เป็นต้น', key: 'communityContextReport', width: 50 },
        { header: 'สามารถปฏิบัติตนในการอยู่ร่วมกับชุมชนได้อย่างเหมาะสม', key: 'communityEngagement', width: 50 },
        { header: 'สามารถรายงานการศึกษาวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่นโดยเลือกศึกษาตามประเด็น  ได้แก่ วิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  ปราชญ์ชาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น   แหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น          การอนุรักษ์วัฒนธรรมและภูมิปัญญาท้องถิ่น  เป็นต้น', key: 'culturalStudyReport', width: 50 },
        { header: 'สามารถนำวัฒนธรรมชุมชนและภูมิปัญญาในท้องถิ่นมาบูรณาการในการจัดการเรียนรู้ในซั้นเรียนตามประเด็น  ได้แก่ 	องค์ความรู้ของวิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  องค์ความรู้ของปราชญ์ซาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  องค์ความรู้จากแหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น เป็นต้น', key: 'culturalIntegration', width: 50 },
        { header: 'มุ่งมั่นพัฒนาผู้เรียนให้เกิดการเรียนรู้ ทักษะปฏิบัติ และคุณลักษณะที่ดีงาม อย่างเต็มความสามารถด้วยวิธีการที่เหมาะสมกับระดับ ความสามารถและช่วงวัย', key: 'studentGrowth', width: 50 },
        { header: 'รักเมตตา เอาใจใส่ ช่วยเหลือและพัฒนาผู้เรียนอย่างเหมาะสม', key: 'studentCare', width: 50 },
        { header: 'ส่งเสริมการเรียนรู้อย่างต่อเนื่องด้วยความเอาใจใส่', key: 'continuousLearning', width: 50 },
        { header: 'การยอมรับความแตกต่างของผู้เรียนทางด้านเพศ เชื้อชาติ ศาสนา วัฒนธรรม และระดับการเรียนรู้', key: 'inclusivity', width: 50 },
        { header: 'กระตุ้นและเสริมสร้างแรงจูงใจในการเรียนรู้แก่ผู้เรียนโดยใช้การเสริมแรงทางบวก', key: 'positiveReinforcement', width: 50 },
        { header: 'ส่งเสริมให้ผู้เรียนแสดงความสามารถและความคิดริเริ่มสร้างสรรค์อย่างเต็มศักยภาพ', key: 'creativeExpression', width: 50 },
        { header: 'ติดตามข้อมูลข่าวสารการศึกษา สังคม การเมือง การปกครอง และเศรษฐกิจ โดยสามารถนำมาประยุกต์ เชื่อมโยงกับเนื้อหาในการจัดการเรียนรู้ได้อย่างมีประสิทธิภาพ', key: 'currentAffairsIntegration', width: 50 },
        { header: 'นำแนวคิด เทคนิควิธีการ หรือความรู้ใหม่ๆ ที่น่าสนใจ มาประยุกต์ใช้เป็นส่วนหนึ่งในการออกแบบการจัดกิจกรรรมการเรียนรู้ได้อย่างเหมาะสม', key: 'innovativeTeaching', width: 50 },
        { header: 'ประพฤติตนเป็นแบบอย่างที่ดีทั้งทางกาย วาจา และจิตใจ มีคุณธรรมจริยธรรม', key: 'ethicalRoleModel', width: 50 },
        { header: 'ปฏิบัติตนโดยยึดหลักความเป็นธรรมเท่าเทียม และมีส่วนช่วยให้คนในองค์กรอยู่ร่วมกันอย่างสันติ', key: 'fairnessAndHarmony', width: 50 },
        { header: 'ปฏิบัติตนตามข้อตกลง กฎกติกาของโรงเรียนด้วยความสมัครใจ ทั้งในด้านการปฏิบัติการสอนและการปฏิบัติหน้าที่อื่นในโรงเรียน', key: 'complianceAndCommitment', width: 50 },
        { header: 'ติดตามข้อมูลและปรับเปลี่ยนตนเองให้สอดคล้องการเปลี่ยนแปลง          ทางวิชาชีพ วิทยาการ เศรษฐกิจ สังคม และการเมือง', key: 'adaptiveProfessional', width: 50 },
        { header: 'ศรัทธา ชื่อสัตย์ สุจริต และรับผิดชอบต่อวิชาชีพครู', key: 'professionalIntegrity', width: 50 },
        { header: 'เป็นสมาชิกที่ดีขององค์กรวิชาชีพ', key: 'professionalMembership', width: 50 },
        { header: 'ให้บริการด้วยความจริงใจและเสมอภาค', key: 'sincereService', width: 50 },
        { header: 'ไม่เรียกรับหรือรับผลประโยชน์จากการใช้ตำแหน่งหน้าที่โดยมิชอบ', key: 'ethicalConduct', width: 50 },
        { header: 'อุทิศตนเพื่อช่วยเหลือเพื่อนผู้ร่วมประกอบวิชาชีพภายใต้หลักการที่ถูกต้อง', key: 'dedicatedSupport', width: 50 },
        { header: 'สร้างความสามัคคีในหมู่คณะ', key: 'teamHarmony', width: 50 },
        { header: 'ริเริ่ม วางแผน หรือ เป็นผู้น่าในการทำกิจกรรมเกี่ยวกับอนุรักษ์และพัฒนา เศรษฐกิจ สังคม ศาสนา ศิลปวัฒนธรรม ภูมิปัญญา หรือ สิ่งแวดล้อมโดยคำนึงถึงผลประโยชน์ของส่วนรวมเป็นสำคัญ', key: 'communityLeadership', width: 50 },
        { header: 'ปฏิบัติตนตามกฎระเบียบของสังคมภายใต้ระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขอย่างเคร่งครัด', key: 'democraticCompliance', width: 50 },
        { header: 'ข้อเสนอแนะ', key: 'additionalComments', width: 50 }
    ]);

    sortedUsers.forEach(user => {
        if (user.evaluationHightDetails && user.evaluationHightDetails.length > 0) {
            user.evaluationHightDetails.forEach(detail => {
                let idCard = '';
                let phoneNumber = '';
                let conditionForEvaluator = detail.evaluator !== null && detail.evaluator !== undefined;

                if (conditionForEvaluator) {
                    idCard = detail.evaluator ? detail.evaluator.idCard : '';
                    phoneNumber = detail.evaluator ? detail.evaluator.phoneNumber : '';
                } else {
                    idCard = detail.teacher ? detail.teacher.idCard : detail.idCard || '';
                    phoneNumber = detail.teacher ? detail.teacher.phoneNumber : detail.phoneNumber || '';
                }
                console.log(user.evaluationHightDetails);
                console.log("User ID:", user.id, "Evaluation Details:", detail);
                const row = worksheet.addRow({

                    evaluatorName: detail.evaluator ? detail.evaluator.firstName : (detail.teacher ? detail.teacher.firstName : ''),
                    idCard: idCard || 'ไม่มีข้อมูล',
                    phoneNumber: phoneNumber || 'ไม่มีข้อมูล',
                    collegeName: user.collegeDetails?.collegeName || 'ไม่มีข้อมูล',
                    department: user.collegeDetails?.department || '',
                    schoolSize: user.collegeDetails?.schoolSize || '',
                    evaluatorStatus: detail.evaluatorStatus || 'ไม่มีข้อมูล',
                    time: detail.time || '',
                    branch: user.branch || '',
                    fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
                    studentID: user.studentID,
                    studentIDCard: user.idCard,
                    criteria: detail.criteria || '',
                    innovationAlignment: detail.innovationAlignment || '',
                    learningPlan: detail.learningPlan || '',
                    innovativeLearningPlan: detail.innovativeLearningPlan || '',
                    joyfulLearningActivities: detail.joyfulLearningActivities || '',
                    learnerWellbeingActivities: detail.learnerWellbeingActivities || '',
                    individualStudentDevelopment: detail.individualStudentDevelopment || '',
                    systematicQualityReporting: detail.systematicQualityReporting || '',
                    studentProblemResearch: detail.studentProblemResearch || '',
                    digitalLearningTools: detail.digitalLearningTools || '',
                    collaborativeCreativity: detail.collaborativeCreativity || '',
                    professionalGrowthActivities: detail.professionalGrowthActivities || '',
                    parentCollaboration: detail.parentCollaboration || '',
                    parentCollab: detail.parentCollab || '',
                    parentNetwork: detail.parentNetwork || '',
                    communityNetwork: detail.communityNetwork || '',
                    communityContextReport: detail.communityContextReport || '',
                    communityEngagement: detail.communityEngagement || '',
                    culturalStudyReport: detail.culturalStudyReport || '',
                    culturalIntegration: detail.culturalIntegration || '',
                    studentGrowth: detail.studentGrowth || '',
                    studentCare: detail.studentCare || '',
                    continuousLearning: detail.continuousLearning || '',
                    inclusivity: detail.inclusivity || '',
                    positiveReinforcement: detail.positiveReinforcement || '',
                    creativeExpression: detail.creativeExpression || '',
                    currentAffairsIntegration: detail.currentAffairsIntegration || '',
                    innovativeTeaching: detail.innovativeTeaching || '',
                    ethicalRoleModel: detail.ethicalRoleModel || '',
                    fairnessAndHarmony: detail.fairnessAndHarmony || '',
                    complianceAndCommitment: detail.complianceAndCommitment || '',
                    adaptiveProfessional: detail.adaptiveProfessional || '',
                    professionalIntegrity: detail.professionalIntegrity || '',
                    professionalMembership: detail.professionalMembership || '',
                    sincereService: detail.sincereService || '',
                    ethicalConduct: detail.ethicalConduct || '',
                    dedicatedSupport: detail.dedicatedSupport || '',
                    teamHarmony: detail.teamHarmony || '',
                    communityLeadership: detail.communityLeadership || '',
                    democraticCompliance: detail.democraticCompliance || '',
                    additionalComments: detail.additionalComments || ''
                });

                // ตั้งค่าแบบอักษรสำหรับแต่ละเซลล์ในแถวนี้
                row.eachCell({ includeEmpty: true }, (cell) => {
                    cell.font = { name: 'TH Sarabun New', size: 16 }; // ตั้งค่าแบบอักษรเป็น TH Sarabun New
                    cell.alignment = { horizontal: 'center' };
                });
            });
        }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.xlsx`;
        link.click();
    }).catch((error) => {
        console.error("เกิดข้อผิดพลาดในการสร้างไฟล์:", error);
    });
};