import ExcelJS from 'exceljs';
import { format } from 'date-fns';

// ฟังก์ชันสร้าง worksheet
export const createWorksheet = (workbook, worksheetName, columns) => {
    const worksheet = workbook.addWorksheet(worksheetName);
    worksheet.columns = columns;

    // ตั้งค่าแบบอักษรให้กับ header row
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
            cell.font = { name: 'TH Sarabun New', size: 16 }; // ตั้งค่าแบบอักษรเป็น TH Sarabun New
            cell.alignment = { horizontal: 'center' };
        });
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
    if (!sortedUsers) {
        console.error("sortedUsers ไม่มีค่า");
        return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = createWorksheet(workbook, 'Students', [
        { header: 'รหัสนักศึกษา', key: 'studentID', width: 20 },
        { header: 'เลขบัตรประชาชน', key: 'studentIdCard', width: 20 },
        { header: 'ชื่อ', key: 'firstName', width: 30 },
        { header: 'นามสกุล', key: 'lastName', width: 30 },
        { header: 'สาขา', key: 'branch', width: 30 },
        { header: 'ชั้นปี', key: 'year', width: 20 },
        { header: 'สถานะ', key: 'status', width: 20 },
        { header: 'เบอร์โทรศัพท์', key: 'phoneNumber', width: 20 },
        { header: 'อีเมล์', key: 'email', width: 30 },
        { header: 'สถานที่ฝึกประสบการณ์', key: 'companyName', width: 50 }
    ]);

    const data = sortedUsers.map(user => ({
        studentID: user.studentID,
        studentIdCard: user.idCard,
        firstName: user.firstName,
        lastName: user.lastName,
        branch: user.branch,
        year: user.year,
        status: user.status,
        phoneNumber: user.phoneNumber,
        email: user.email,
        companyName: user.companyDetails?.companyName || 'ไม่มีข้อมูล'
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
