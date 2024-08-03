import ExcelJS from 'exceljs';
import { format } from 'date-fns'

export const downloadExcel = (sortedUsers, evaluationData) => {

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Students');

    worksheet.columns = [
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
    ];

    sortedUsers.value.forEach(user => {
        const evaluations = evaluationData.value.filter(e => e.studentId === user.studentID);
        evaluations.forEach(evaluation => {
            const formattedDate = evaluation.createdAt ? format(new Date(evaluation.createdAt), 'dd/MM/yyyy, HH:mm:ss') : '';
            console.log(user); // เพิ่มการพิมพ์ข้อมูล user เพื่อดูโครงสร้าง
            console.log(evaluation); // เพิ่มการพิมพ์ข้อมูล evaluation เพื่อดูโครงสร้าง
            worksheet.addRow({
                timestamp: formattedDate,
                evaluatorName: evaluation.evaluatorName || '',
                idCard: evaluation.idCard || '',
                phoneNumber: evaluation.phoneNumber || 'sad',
                companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
                department: user.companyDetails?.companyDepartment || 'ไม่มีข้อมูล', // เพิ่มค่าเริ่มต้นเป็น 'ไม่มีข้อมูล'
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
                academicAbility: evaluation.academicAbility || 'ไม่มีข้อมูล',
                abilityToLearn: evaluation.abilityToLearn || 'ไม่มีข้อมูล',
                practicalAbility: evaluation.practicalAbility || 'ไม่มีข้อมูล',
                judgmentAndDecision: evaluation.judgmentAndDecision || 'ไม่มีข้อมูล',
                managementAndPlanning: evaluation.managementAndPlanning || 'ไม่มีข้อมูล',
                communicationSkills: evaluation.communicationSkills || 'ไม่มีข้อมูล',
                foreignLanguage: evaluation.foreignLanguage || 'ไม่มีข้อมูล',
                suitabilityForJob: evaluation.suitabilityForJob || 'ไม่มีข้อมูล',
                responsibilityAndDependability: evaluation.responsibilityAndDependability || 'ไม่มีข้อมูล',
                interestInWork: evaluation.interestInWork || 'ไม่มีข้อมูล',
                initiative: evaluation.initiative || 'ไม่มีข้อมูล',
                dependability: evaluation.dependability || 'ไม่มีข้อมูล',
                personality: evaluation.personality || 'ไม่มีข้อมูล',
                interpersonalSkills: evaluation.interpersonalSkills || 'ไม่มีข้อมูล',
                discipline: evaluation.discipline || 'ไม่มีข้อมูล',
                ethicsAndMorality: evaluation.ethicsAndMorality || 'ไม่มีข้อมูล',
                strength: evaluation.strength || 'ไม่มีข้อมูล',
                improvement: evaluation.improvement || 'ไม่มีข้อมูล',
                jobOffer: evaluation.jobOffer || 'ไม่มีข้อมูล',
                other: evaluation.other || 'ไม่มีข้อมูล',
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
        link.download = 'students.xlsx';
        link.click();
    });
};

export const downloadExcelUniversity = (sortedUsers, universityEvaluationData) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('StudentsForUniversity');

    worksheet.columns = [
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
    ];

    sortedUsers.value.forEach(user => {
        const evaluations = universityEvaluationData.value.filter(e => e.studentId === user.studentID);
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