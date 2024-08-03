// utils/download.js
import ExcelJS from 'exceljs';
import { format } from 'date-fns';

export const createWorksheet = (workbook, worksheetName, columns) => {
    const worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = columns;

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


    return worksheet;
};

export const populateWorksheet = (worksheet, data, evaluationData) => {
    data.forEach(user => {
        const evaluations = evaluationData.filter(e => e.studentId === user.studentID);

        // ตรวจสอบว่ามีข้อมูลการประเมินหรือไม่
        console.log(`User: ${user.studentID}, Evaluations: ${evaluations.length}`);

        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';

            const rowData = {
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                idCard: evaluation.idCard || '',
                phoneNumber: evaluation.phoneNumber || '',
                companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล',
                department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล',
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                studentIDCard: user.idCard,
                totalScore: `${evaluation.totalScore || 'ไม่มีข้อมูล'}`,
                averageScore: `${evaluation.averageScore || 'ไม่มีข้อมูล'}% `,
                criteria: evaluation.criteria || 'ไม่มีข้อมูล',
                qualityOfWork: evaluation.qualityOfWork || 'ไม่มีข้อมูล',
                generalKnowledge: evaluation.generalKnowledge || 'ไม่มีข้อมูล',
                specificKnowledge: evaluation.specificKnowledge || 'ไม่มีข้อมูล',
                responsibility: evaluation.responsibility || 'ไม่มีข้อมูล',
                teamResponsibility: evaluation.teamResponsibility || 'ไม่มีข้อมูล',
                conduct: evaluation.conduct || 'ไม่มีข้อมูล',
                problemSolving: evaluation.problemSolving || 'ไม่มีข้อมูล',
                strength: evaluation.strength || 'ไม่มีข้อมูล',
                improvement: evaluation.improvement || 'ไม่มีข้อมูล',
                jobOffer: evaluation.jobOffer || 'ไม่มีข้อมูล',
                other: evaluation.other || 'ไม่มีข้อมูล'
            };

            console.log(rowData);

            // เพิ่มข้อมูลลงใน worksheet
            const row = worksheet.addRow(rowData);

            // ตั้งค่าแบบอักษรสำหรับแต่ละเซลล์
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.font = { name: 'TH Sarabun New', size: 16 };
                cell.alignment = { horizontal: 'center' };
            });
        });
    });
};

export const downloadExcel = (sortedUsers, evaluationData) => {
    console.log(evaluationData);
    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'Students', [
        { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานประกอบการที่นักศึกษาเข้ารับการฝึก', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIDCard', width: 20 },
        { header: 'คะแนนรวม', key: 'totalScore', width: 20 },
        { header: 'คิดเป็นร้อยละ', key: 'averageScore', width: 20 },
        { header: 'ปริมาณงาน (Quantity Of Work)', key: 'criteria', width: 100 },
        { header: 'คุณภาพงาน (Quality Of Work)', key: 'qualityOfWork', width: 100 },
        { header: 'ความรู้ความสามารถทั่วไป (General Knowledge)', key: 'generalKnowledge', width: 100 },
        { header: 'ความรู้ความสามารถเฉพาะด้าน (Specific Knowledge)', key: 'specificKnowledge', width: 100 },
        { header: 'ความรับผิดชอบในหน้าที่ (Responsibility)', key: 'responsibility', width: 100 },
        { header: 'ความรับผิดชอบต่อทีม (Team Responsibility)', key: 'teamResponsibility', width: 100 },
        { header: 'การประพฤติปฏิบัติตน (Conduct)', key: 'conduct', width: 100 },
        { header: 'การแก้ไขปัญหา (Problem Solving)', key: 'problemSolving', width: 100 },
        { header: 'จุดเด่นของนักศึกษา/Strength', key: 'strength', width: 100 },
        { header: 'ข้อควรปรับปรุงของนักศึกษา/Improvement', key: 'improvement', width: 100 },
        { header: 'หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ (หากมีโอกาสเลือก)', key: 'jobOffer', width: 100 },
        { header: 'ข้อคิดเห็นเพิ่มเติม/Other Comments', key: 'other', width: 100 },
    ]);

    populateWorksheet(worksheet, sortedUsers, evaluationData);

    console.log(worksheet.getSheetValues()); // ตรวจสอบค่าใน worksheet

    workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'students.xlsx';
        link.click();
    });
};

export const downloadExcelUniversity = (sortedUsers, universityEvaluationData) => {
    if (!sortedUsers || !universityEvaluationData) {
        console.error("sortedUsers หรือ universityEvaluationData ไม่มีค่า");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'StudentsForUniversity', [
        { header: 'ประทับเวลา', key: 'timestamp', width: 30 },
        { header: 'ชื่อ - สกุล(ผู้ประเมิน)', key: 'evaluatorName', width: 30 },
        { header: 'เลขบัตรประชาชน', key: 'idCard', width: 30 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 15 },
        { header: 'ชื่อสถานประกอบการที่นักศึกษาเข้ารับการฝึก', key: 'companyName', width: 50 },
        { header: 'แผนกที่นักศึกษาเข้ารับการฝึก', key: 'department', width: 50 },
        { header: 'สถานะผู้ประเมินสมรรถวิชาชีพ', key: 'evaluatorStatus', width: 30 },
        { header: 'รอบการประเมิน', key: 'time', width: 20 },
        { header: 'สาขาวิชาที่นักศึกษากำลังศึกษา', key: 'branch', width: 30 },
        { header: 'รายชื่อนักศึกษา', key: 'studentName', width: 30 },
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIDCard', width: 20 },
        { header: 'การประสานงานด้านการจัดการดูแลนักศึกษา', key: 'criteria', width: 20 },
        { header: 'การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล', key: 'hrGuidance', width: 20 },
        { header: 'บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุน', key: 'employeeSupport', width: 20 },
        { header: 'ปริมาณงานที่ได้รับมอบหมาย', key: 'assignedWorkload', width: 20 },
        { header: 'คุณลักษณะงานที่ได้รับมอบหมาย', key: 'taskRelevanceToMajor', width: 20 },
        { header: 'งานที่ได้รับมอบหมายตรงกับที่เสนอไว้', key: 'taskMatchesProposal', width: 20 },
        { header: 'งานที่ได้รับมอบหมายตรงกับความสนใจ', key: 'assignedTaskInterestMatch', width: 20 },
        { header: 'ความเหมาะสมของหัวข้อรายงาน', key: 'reportTopicSuitability', width: 20 },
        { header: 'มีผู้นิเทศงานในสถานประกอบการดูแล', key: 'initialSupervisor', width: 20 },
        { header: 'ความรู้และประสบการณ์วิชาชีพ', key: 'supervisorKnowledgeAndExperience', width: 20 },
        { header: 'เวลาผู้นิเทศงานให้แก่นักศึกษา', key: 'supervisionTime', width: 20 },
        { header: 'เวลาผู้นิเทศงานให้ด้านการเขียนรายงาน', key: 'reportWritingSupervisionTime', width: 20 },
        { header: 'ความสนใจของผู้นิเทศงาน', key: 'supervisorInterestInGuidance', width: 20 },
        { header: 'การให้ความสำคัญต่อการประเมินผล', key: 'supervisorEvaluationPriority', width: 20 },
        { header: 'การจัดทำแผนปฏิบัติงาน', key: 'workPlanDevelopment', width: 20 },
        { header: 'บุคลิกภาพ', key: 'personality', width: 20 },
        { header: 'วุฒิภาวะ', key: 'maturity', width: 20 },
        { header: 'การปรับตัว', key: 'adaptation', width: 20 },
        { header: 'การเรียนรู้', key: 'learning', width: 20 },
        { header: 'การแสดงความคิดเห็น', key: 'expressingOpinions', width: 20 },
        { header: 'มนุษย์สัมพันธ์', key: 'humanRelations', width: 20 },
        { header: 'ทัศนคติ', key: 'attitude', width: 20 },
        { header: 'การมีส่วนร่วมกับองค์กร', key: 'organizationEngagement', width: 20 },
        { header: 'การแสดงออกทางความคิดและข้อเสนอแนะ', key: 'meetingFeedbackAndIdeas', width: 20 },
        { header: 'ความประพฤติ คุณธรรม จริยธรรม', key: 'ethicsAndDiscipline', width: 20 },
        { header: 'การปฏิบัติตนเป็นตัวอย่าง', key: 'integrityAndResponsibility', width: 20 },
        { header: 'ความรู้และทักษะพื้นฐาน', key: 'basicKnowledgeAndSkills', width: 20 },
        { header: 'การนำความรู้ไปประยุกต์ใช้', key: 'applicationOfKnowledgeAndSkills', width: 20 },
        { header: 'ความก้าวหน้าและความสมบูรณ์', key: 'reportProgressAndCompletion', width: 20 },
        { header: 'การสื่อสารข้อมูลในรายงาน', key: 'clearAndSystematicCommunication', width: 20 },
        { header: 'การประเมินโดยรวม', key: 'studentOverallEvaluation', width: 20 },
        { header: 'ข้อคิดเห็นเพิ่มเติม', key: 'other', width: 50 }
    ]);

    sortedUsers.forEach(user => { // ไม่ใช้ sortedUsers.value
        const evaluations = universityEvaluationData.filter(e => e.studentId === user.studentID);
        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
            console.log(user); // เพิ่มการพิมพ์ข้อมูล user เพื่อดูโครงสร้าง
            console.log(evaluation); // เพิ่มการพิมพ์ข้อมูล evaluation เพื่อดูโครงสร้าง
            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                idCard: evaluation.idCard || '',
                phoneNumber: evaluation.phoneNumber || '',
                companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                evaluatorStatus: evaluation.evaluatorStatus || '',
                time: evaluation.time || '',
                branch: user.branch,
                studentName: `${user.firstName} ${user.lastName}`,
                studentID: user.studentID,
                studentIDCard: user.idCard,
                criteria: evaluation.criteria || 'ไม่มีข้อมูล',
                hrGuidance: evaluation.hrGuidance || 'ไม่มีข้อมูล',
                employeeSupport: evaluation.employeeSupport || 'ไม่มีข้อมูล',
                assignedWorkload: evaluation.assignedWorkload || 'ไม่มีข้อมูล',
                taskRelevanceToMajor: evaluation.taskRelevanceToMajor || 'ไม่มีข้อมูล',
                taskMatchesProposal: evaluation.taskMatchesProposal || 'ไม่มีข้อมูล',
                assignedTaskInterestMatch: evaluation.assignedTaskInterestMatch || 'ไม่มีข้อมูล',
                reportTopicSuitability: evaluation.reportTopicSuitability || 'ไม่มีข้อมูล',
                initialSupervisor: evaluation.initialSupervisor || 'ไม่มีข้อมูล',
                supervisorKnowledgeAndExperience: evaluation.supervisorKnowledgeAndExperience || 'ไม่มีข้อมูล',
                supervisionTime: evaluation.supervisionTime || 'ไม่มีข้อมูล',
                reportWritingSupervisionTime: evaluation.reportWritingSupervisionTime || 'ไม่มีข้อมูล',
                supervisorInterestInGuidance: evaluation.supervisorInterestInGuidance || 'ไม่มีข้อมูล',
                supervisorEvaluationPriority: evaluation.supervisorEvaluationPriority || 'ไม่มีข้อมูล',
                workPlanDevelopment: evaluation.workPlanDevelopment || 'ไม่มีข้อมูล',
                personality: evaluation.personality || 'ไม่มีข้อมูล',
                maturity: evaluation.maturity || 'ไม่มีข้อมูล',
                adaptation: evaluation.adaptation || 'ไม่มีข้อมูล',
                learning: evaluation.learning || 'ไม่มีข้อมูล',
                expressingOpinions: evaluation.expressingOpinions || 'ไม่มีข้อมูล',
                humanRelations: evaluation.humanRelations || 'ไม่มีข้อมูล',
                attitude: evaluation.attitude || 'ไม่มีข้อมูล',
                organizationEngagement: evaluation.organizationEngagement || 'ไม่มีข้อมูล',
                meetingFeedbackAndIdeas: evaluation.meetingFeedbackAndIdeas || 'ไม่มีข้อมูล',
                ethicsAndDiscipline: evaluation.ethicsAndDiscipline || 'ไม่มีข้อมูล',
                integrityAndResponsibility: evaluation.integrityAndResponsibility || 'ไม่มีข้อมูล',
                basicKnowledgeAndSkills: evaluation.basicKnowledgeAndSkills || 'ไม่มีข้อมูล',
                applicationOfKnowledgeAndSkills: evaluation.applicationOfKnowledgeAndSkills || 'ไม่มีข้อมูล',
                reportProgressAndCompletion: evaluation.reportProgressAndCompletion || 'ไม่มีข้อมูล',
                clearAndSystematicCommunication: evaluation.clearAndSystematicCommunication || 'ไม่มีข้อมูล',
                studentOverallEvaluation: evaluation.studentOverallEvaluation || 'ไม่มีข้อมูล',
                other: evaluation.other || 'ไม่มีข้อมูล'
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
        link.download = 'studentsForUniversity.xlsx';
        link.click();
    });
};
