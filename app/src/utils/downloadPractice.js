// import ExcelJS from 'exceljs';
// import { format } from 'date-fns';

// export const createWorksheet = (workbook, worksheetName, columns) => {
//     const worksheet = workbook.addWorksheet(worksheetName);
//     worksheet.columns = columns;

//     // Apply styles to all cells
//     worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
//         row.eachCell({ includeEmpty: false }, (cell) => {
//             cell.font = { name: 'TH Sarabun New', size: 16 };
//             cell.alignment = { horizontal: 'center' };
//         });
//         // Apply bold and background color to header row
//         if (rowNumber === 1) {
//             row.eachCell((cell) => {
//                 cell.font = { name: 'TH Sarabun New', size: 16, bold: true };
//                 cell.fill = {
//                     type: 'pattern',
//                     pattern: 'solid',
//                     fgColor: { argb: 'FFCCCCCC' } // Gray background
//                 };
//                 cell.alignment = { horizontal: 'center' };
//             });
//         }
//     });


//     return worksheet;
// };


// export const downloadExcel = (filename, sortedUsers) => {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Students');

//     worksheet.columns = [
//       { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
//       { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
//       { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
//       { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
//       { header: 'ชื่อสถานศึกษาที่นักศึกษาเข้ารับการฝึก', key: 'collegeName', width: 50 },
//       { header: 'แผนกสาขาวิชาที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
//       { header: 'ขนาดสถานศึกษา', key: 'schoolSize', width: 20 },
//       { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
//       { header: 'รอบการประเมิน', key: 'time', width: 20 },
//       { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
//       { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
//       { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
//       { header: 'เลขบัตรประชาชน', key: 'studentIDCard', width: 20 },
//       { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา', key: 'criteria', width: 50 },
//       { header: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovationAlignment', width: 50 },
//       { header: 'สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'learningPlan', width: 50 },
//       { header: 'สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', key: 'innovativeLearningPlan', width: 50 },
//       { header: 'สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน', key: 'joyfulLearningActivities', width: 50 },
//       { header: 'จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน', key: 'learnerWellbeingActivities', width: 50 },
//       { header: 'สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ', key: 'individualStudentDevelopment', width: 50 },
//       { header: 'สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ', key: 'systematicQualityReporting', width: 50 },
//       { header: 'สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน', key: 'studentProblemResearch', width: 50 },
//       { header: 'สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น', key: 'digitalLearningTools', width: 50 },
//       { header: 'สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์', key: 'collaborativeCreativity', width: 50 },
//       { header: 'มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ', key: 'professionalGrowthActivities', width: 50 },
//       { header: 'ร่วมมือกับผู้ปกครองในการพัฒนาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', key: 'parentCollaboration', width: 50 },
//       { header: 'ร่วมมือกับผู้ปกครองในการแก้ปัญหาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', key: 'parentCollab', width: 50 },
//       { header: 'สามารถสร้างเครือข่ายความร่วมมือกับผู้ปกครองเพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', key: 'parentNetwork', width: 50 },
//       { header: 'สามารถสร้างเครือข่ายความร่วมมือกับชุมชน เข่น ปราชญ์ชาวบ้าน หน่วยงานปกครองของท้องถิ่น เพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', key: 'communityNetwork', width: 50 },
//       { header: 'สามารถรายงานการศึกษาบริบทของชุมชนโดยเลือกประเด็นศึกษา  ได้แก่  วิทยากรในชุมชน  ปราชญ์ชาวบ้านในชุมชน  แหล่งเรียนรู้ในชุมชน  วัฒนธรรมของชุมชน  เศรษฐกิจของชุมชน  เป็นต้น', key: 'communityContextReport', width: 50 },
//       { header: 'สามารถปฏิบัติตนในการอยู่ร่วมกับชุมชนได้อย่างเหมาะสม', key: 'communityEngagement', width: 50 },
//       { header: 'สามารถรายงานการศึกษาวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่นโดยเลือกศึกษาตามประเด็น  ได้แก่ วิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  ปราชญ์ชาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น   แหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น          การอนุรักษ์วัฒนธรรมและภูมิปัญญาท้องถิ่น  เป็นต้น', key: 'culturalStudyReport', width: 50 },
//       { header: 'สามารถนำวัฒนธรรมชุมชนและภูมิปัญญาในท้องถิ่นมาบูรณาการในการจัดการเรียนรู้ในซั้นเรียนตามประเด็น  ได้แก่ 	องค์ความรู้ของวิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  องค์ความรู้ของปราชญ์ซาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  องค์ความรู้จากแหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น เป็นต้น', key: 'culturalIntegration', width: 50 },
//       { header: 'มุ่งมั่นพัฒนาผู้เรียนให้เกิดการเรียนรู้ ทักษะปฏิบัติ และคุณลักษณะที่ดีงาม อย่างเต็มความสามารถด้วยวิธีการที่เหมาะสมกับระดับ ความสามารถและช่วงวัย', key: 'studentGrowth', width: 50 },
//       { header: 'รักเมตตา เอาใจใส่ ช่วยเหลือและพัฒนาผู้เรียนอย่างเหมาะสม', key: 'studentCare', width: 50 },
//       { header: 'ส่งเสริมการเรียนรู้อย่างต่อเนื่องด้วยความเอาใจใส่', key: 'continuousLearning', width: 50 },
//       { header: 'การยอมรับความแตกต่างของผู้เรียนทางด้านเพศ เชื้อชาติ ศาสนา วัฒนธรรม และระดับการเรียนรู้', key: 'inclusivity', width: 50 },
//       { header: 'กระตุ้นและเสริมสร้างแรงจูงใจในการเรียนรู้แก่ผู้เรียนโดยใช้การเสริมแรงทางบวก', key: 'positiveReinforcement', width: 50 },
//       { header: 'ส่งเสริมให้ผู้เรียนแสดงความสามารถและความคิดริเริ่มสร้างสรรค์อย่างเต็มศักยภาพ', key: 'creativeExpression', width: 50 },
//       { header: 'ติดตามข้อมูลข่าวสารการศึกษา สังคม การเมือง การปกครอง และเศรษฐกิจ โดยสามารถนำมาประยุกต์ เชื่อมโยงกับเนื้อหาในการจัดการเรียนรู้ได้อย่างมีประสิทธิภาพ', key: 'currentAffairsIntegration', width: 50 },
//       { header: 'นำแนวคิด เทคนิควิธีการ หรือความรู้ใหม่ๆ ที่น่าสนใจ มาประยุกต์ใช้เป็นส่วนหนึ่งในการออกแบบการจัดกิจกรรรมการเรียนรู้ได้อย่างเหมาะสม', key: 'innovativeTeaching', width: 50 },
//       { header: 'ประพฤติตนเป็นแบบอย่างที่ดีทั้งทางกาย วาจา และจิตใจ มีคุณธรรมจริยธรรม', key: 'ethicalRoleModel', width: 50 },
//       { header: 'ปฏิบัติตนโดยยึดหลักความเป็นธรรมเท่าเทียม และมีส่วนช่วยให้คนในองค์กรอยู่ร่วมกันอย่างสันติ', key: 'fairnessAndHarmony', width: 50 },
//       { header: 'ปฏิบัติตนตามข้อตกลง กฎกติกาของโรงเรียนด้วยความสมัครใจ ทั้งในด้านการปฏิบัติการสอนและการปฏิบัติหน้าที่อื่นในโรงเรียน', key: 'complianceAndCommitment', width: 50 },
//       { header: 'ติดตามข้อมูลและปรับเปลี่ยนตนเองให้สอดคล้องการเปลี่ยนแปลง          ทางวิชาชีพ วิทยาการ เศรษฐกิจ สังคม และการเมือง', key: 'adaptiveProfessional', width: 50 },
//       { header: 'ศรัทธา ชื่อสัตย์ สุจริต และรับผิดชอบต่อวิชาชีพครู', key: 'professionalIntegrity', width: 50 },
//       { header: 'เป็นสมาชิกที่ดีขององค์กรวิชาชีพ', key: 'professionalMembership', width: 50 },
//       { header: 'ให้บริการด้วยความจริงใจและเสมอภาค', key: 'sincereService', width: 50 },
//       { header: 'ไม่เรียกรับหรือรับผลประโยชน์จากการใช้ตำแหน่งหน้าที่โดยมิชอบ', key: 'ethicalConduct', width: 50 },
//       { header: 'อุทิศตนเพื่อช่วยเหลือเพื่อนผู้ร่วมประกอบวิชาชีพภายใต้หลักการที่ถูกต้อง', key: 'dedicatedSupport', width: 50 },
//       { header: 'สร้างความสามัคคีในหมู่คณะ', key: 'teamHarmony', width: 50 },
//       { header: 'ริเริ่ม วางแผน หรือ เป็นผู้น่าในการทำกิจกรรมเกี่ยวกับอนุรักษ์และพัฒนา เศรษฐกิจ สังคม ศาสนา ศิลปวัฒนธรรม ภูมิปัญญา หรือ สิ่งแวดล้อมโดยคำนึงถึงผลประโยชน์ของส่วนรวมเป็นสำคัญ', key: 'communityLeadership', width: 50 },
//       { header: 'ปฏิบัติตนตามกฎระเบียบของสังคมภายใต้ระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขอย่างเคร่งครัด', key: 'democraticCompliance', width: 50 },
//       { header: 'ข้อเสนอแนะ', key: 'additionalComments', width: 50 }
//     ];

//     sortedUsers.value.forEach(user => {
//       const evaluations = evaluationData.value.filter(e => e.studentId === user.studentID);
//       evaluations.forEach(evaluation => {
//         const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
//         worksheet.addRow({
//           timestamp: formattedDate,
//           evaluatorName: evaluation.evaluatorName || '',
//           idCard: evaluation.idCard || '',
//           phoneNumber: evaluation.phoneNumber || '',
//           collegeName: user.collegeDetails?.collegeName || '',
//           department: user.collegeDetails?.department || '',
//           schoolSize: user.collegeDetails?.schoolSize || '',
//           evaluatorStatus: evaluation.evaluatorStatus || '',
//           time: evaluation.time || '',
//           branch: user.branch,
//           studentName: `${user.firstName} ${user.lastName}`,
//           studentID: user.studentID,
//           studentIDCard: user.idCard,
//           criteria: evaluation.criteria || '',
//           innovationAlignment: evaluation.innovationAlignment || '',
//           learningPlan: evaluation.learningPlan || '',
//           innovativeLearningPlan: evaluation.innovativeLearningPlan || '',
//           joyfulLearningActivities: evaluation.joyfulLearningActivities || '',
//           learnerWellbeingActivities: evaluation.learnerWellbeingActivities || '',
//           individualStudentDevelopment: evaluation.individualStudentDevelopment || '',
//           systematicQualityReporting: evaluation.systematicQualityReporting || '',
//           studentProblemResearch: evaluation.studentProblemResearch || '',
//           digitalLearningTools: evaluation.digitalLearningTools || '',
//           collaborativeCreativity: evaluation.collaborativeCreativity || '',
//           professionalGrowthActivities: evaluation.professionalGrowthActivities || '',
//           parentCollaboration: evaluation.parentCollaboration || '',
//           parentCollab: evaluation.parentCollab || '',
//           parentNetwork: evaluation.parentNetwork || '',
//           communityNetwork: evaluation.communityNetwork || '',
//           communityContextReport: evaluation.communityContextReport || '',
//           communityEngagement: evaluation.communityEngagement || '',
//           culturalStudyReport: evaluation.culturalStudyReport || '',
//           culturalIntegration: evaluation.culturalIntegration || '',
//           studentGrowth: evaluation.studentGrowth || '',
//           studentCare: evaluation.studentCare || '',
//           continuousLearning: evaluation.continuousLearning || '',
//           inclusivity: evaluation.inclusivity || '',
//           positiveReinforcement: evaluation.positiveReinforcement || '',
//           creativeExpression: evaluation.creativeExpression || '',
//           currentAffairsIntegration: evaluation.currentAffairsIntegration || '',
//           innovativeTeaching: evaluation.innovativeTeaching || '',
//           ethicalRoleModel: evaluation.ethicalRoleModel || '',
//           fairnessAndHarmony: evaluation.fairnessAndHarmony || '',
//           complianceAndCommitment: evaluation.complianceAndCommitment || '',
//           adaptiveProfessional: evaluation.adaptiveProfessional || '',
//           professionalIntegrity: evaluation.professionalIntegrity || '',
//           professionalMembership: evaluation.professionalMembership || '',
//           sincereService: evaluation.sincereService || '',
//           ethicalConduct: evaluation.ethicalConduct || '',
//           dedicatedSupport: evaluation.dedicatedSupport || '',
//           teamHarmony: evaluation.teamHarmony || '',
//           communityLeadership: evaluation.communityLeadership || '',
//           democraticCompliance: evaluation.democraticCompliance || '',
//           additionalComments: evaluation.additionalComments || ''
//         });
//       });
//     });

//     // Apply styles to all cells
//     worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
//       row.eachCell({ includeEmpty: false }, (cell) => {
//         cell.font = { name: 'TH Sarabun New', size: 16 };
//         cell.alignment = { horizontal: 'center' };
//       });
//       // Apply bold and background color to header row
//       if (rowNumber === 1) {
//         row.eachCell((cell) => {
//           cell.font = { name: 'TH Sarabun New', size: 16, bold: true };
//           cell.fill = {
//             type: 'pattern',
//             pattern: 'solid',
//             fgColor: { argb: 'FFCCCCCC' } // Gray background
//           };
//           cell.alignment = { horizontal: 'center' };
//         });
//       }
//     });

//     workbook.xlsx.writeBuffer().then((buffer) => {
//       const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       const link = document.createElement('a');
//       link.href = URL.createObjectURL(blob);
//       link.download = 'students.xlsx';
//       link.click();
//     });
//   };


import ExcelJS from 'exceljs';
import { format } from 'date-fns';

export const downloadExcel = (filename, users) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
        { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานศึกษาที่นักศึกษาเข้ารับการฝึก', key: 'collegeName', width: 50 },
        { header: 'แผนกสาขาวิชาที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'ขนาดสถานศึกษา', key: 'schoolSize', width: 20 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
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
        { header: 'สามารถสร้างเครือข่ายความร่วมมือกับชุมชน เช่น ปราชญ์ชาวบ้าน หน่วยงานปกครองของท้องถิ่น เพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', key: 'communityNetwork', width: 50 },
        { header: 'สามารถรายงานการศึกษาบริบทของชุมชนโดยเลือกประเด็นศึกษา ได้แก่ วิทยากรในชุมชน ปราชญ์ชาวบ้านในชุมชน แหล่งเรียนรู้ในชุมชน วัฒนธรรมของชุมชน เศรษฐกิจของชุมชน เป็นต้น', key: 'communityContextReport', width: 50 },
        { header: 'สามารถปฏิบัติตนในการอยู่ร่วมกับชุมชนได้อย่างเหมาะสม', key: 'communityEngagement', width: 50 },
        { header: 'สามารถรายงานการศึกษาวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่นโดยเลือกศึกษาตามประเด็น ได้แก่ วิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น ปราชญ์ชาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น แหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น การอนุรักษ์วัฒนธรรมและภูมิปัญญาท้องถิ่น เป็นต้น', key: 'culturalStudyReport', width: 50 },
        { header: 'สามารถนำวัฒนธรรมชุมชนและภูมิปัญญาในท้องถิ่นมาบูรณาการในการจัดการเรียนรู้ในชั้นเรียน', key: 'culturalIntegration', width: 50 },
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
        { header: 'ติดตามข้อมูลและปรับเปลี่ยนตนเองให้สอดคล้องการเปลี่ยนแปลงทางวิชาชีพ วิทยาการ เศรษฐกิจ สังคม และการเมือง', key: 'adaptiveProfessional', width: 50 },
        { header: 'ศรัทธา ชื่อสัตย์ สุจริต และรับผิดชอบต่อวิชาชีพครู', key: 'professionalIntegrity', width: 50 },
        { header: 'เป็นสมาชิกที่ดีขององค์กรวิชาชีพ', key: 'professionalMembership', width: 50 },
        { header: 'ให้บริการด้วยความจริงใจและเสมอภาค', key: 'sincereService', width: 50 },
        { header: 'ไม่เรียกรับหรือรับผลประโยชน์จากการใช้ตำแหน่งหน้าที่โดยมิชอบ', key: 'ethicalConduct', width: 50 },
        { header: 'อุทิศตนเพื่อช่วยเหลือเพื่อนผู้ร่วมประกอบวิชาชีพภายใต้หลักการที่ถูกต้อง', key: 'dedicatedSupport', width: 50 },
        { header: 'สร้างความสามัคคีในหมู่คณะ', key: 'teamHarmony', width: 50 },
        { header: 'ริเริ่ม วางแผน หรือ เป็นผู้นำในการทำกิจกรรมเกี่ยวกับอนุรักษ์และพัฒนา เศรษฐกิจ สังคม ศาสนา ศิลปวัฒนธรรม ภูมิปัญญา หรือ สิ่งแวดล้อมโดยคำนึงถึงผลประโยชน์ของส่วนรวมเป็นสำคัญ', key: 'communityLeadership', width: 50 },
        { header: 'ปฏิบัติตนตามกฎระเบียบของสังคมภายใต้ระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขอย่างเคร่งครัด', key: 'democraticCompliance', width: 50 },
        { header: 'ข้อเสนอแนะ', key: 'additionalComments', width: 50 }
    ];

    users.forEach(user => {
        user.evaluationHightDetails.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';

            const evaluatorName = evaluation.evaluator
                ? `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`
                : evaluation.teacher
                    ? `${evaluation.teacher.firstName} ${evaluation.teacher.lastName}`
                    : '';

            const idCard = evaluation.evaluator?.idCard || evaluation.teacher?.idCard || '';
            const phoneNumber = evaluation.evaluator?.phoneNumber || evaluation.teacher?.phoneNumber || '';

            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluatorName,
                idCard: idCard,
                phoneNumber: phoneNumber,
                collegeName: user.collegeDetails?.collegeName || '',
                department: user.collegeDetails?.department || '',
                schoolSize: user.collegeDetails?.schoolSize || '',
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                studentIDCard: user.idCard,
                criteria: evaluation.criteria || '',
                innovationAlignment: evaluation.innovationAlignment || '',
                learningPlan: evaluation.learningPlan || '',
                innovativeLearningPlan: evaluation.innovativeLearningPlan || '',
                joyfulLearningActivities: evaluation.joyfulLearningActivities || '',
                learnerWellbeingActivities: evaluation.learnerWellbeingActivities || '',
                individualStudentDevelopment: evaluation.individualStudentDevelopment || '',
                systematicQualityReporting: evaluation.systematicQualityReporting || '',
                studentProblemResearch: evaluation.studentProblemResearch || '',
                digitalLearningTools: evaluation.digitalLearningTools || '',
                collaborativeCreativity: evaluation.collaborativeCreativity || '',
                professionalGrowthActivities: evaluation.professionalGrowthActivities || '',
                parentCollaboration: evaluation.parentCollaboration || '',
                parentCollab: evaluation.parentCollab || '',
                parentNetwork: evaluation.parentNetwork || '',
                communityNetwork: evaluation.communityNetwork || '',
                communityContextReport: evaluation.communityContextReport || '',
                communityEngagement: evaluation.communityEngagement || '',
                culturalStudyReport: evaluation.culturalStudyReport || '',
                culturalIntegration: evaluation.culturalIntegration || '',
                studentGrowth: evaluation.studentGrowth || '',
                studentCare: evaluation.studentCare || '',
                continuousLearning: evaluation.continuousLearning || '',
                inclusivity: evaluation.inclusivity || '',
                positiveReinforcement: evaluation.positiveReinforcement || '',
                creativeExpression: evaluation.creativeExpression || '',
                currentAffairsIntegration: evaluation.currentAffairsIntegration || '',
                innovativeTeaching: evaluation.innovativeTeaching || '',
                ethicalRoleModel: evaluation.ethicalRoleModel || '',
                fairnessAndHarmony: evaluation.fairnessAndHarmony || '',
                complianceAndCommitment: evaluation.complianceAndCommitment || '',
                adaptiveProfessional: evaluation.adaptiveProfessional || '',
                professionalIntegrity: evaluation.professionalIntegrity || '',
                professionalMembership: evaluation.professionalMembership || '',
                sincereService: evaluation.sincereService || '',
                ethicalConduct: evaluation.ethicalConduct || '',
                dedicatedSupport: evaluation.dedicatedSupport || '',
                teamHarmony: evaluation.teamHarmony || '',
                communityLeadership: evaluation.communityLeadership || '',
                democraticCompliance: evaluation.democraticCompliance || '',
                additionalComments: evaluation.additionalComments || ''
            });
        });
    });

    // Apply styles to all cells
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
            cell.font = { name: 'TH Sarabun New', size: 16 };
            cell.alignment = { horizontal: 'center' };
        });
        // Apply bold and background color to header row
        if (rowNumber === 1) {
            row.eachCell((cell) => {
                cell.font = { name: 'TH Sarabun New', size: 16, bold: true };
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: 'FFCCCCCC' } // Gray background
                };
                cell.alignment = { horizontal: 'center' };
            });
        }
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    });
};
