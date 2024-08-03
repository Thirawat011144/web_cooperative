<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import config from '../../../config';
import THSarabunNewFont from '../../../THSarabunNew-normal'; // ไฟล์ฟอนต์ Base64 ที่คุณแปลงแล้ว

// สร้างตัวแปรเพื่อเก็บข้อมูล
const companies = ref([]);
const branch = localStorage.getItem(config.currentStudyField)

// ฟังก์ชั่นสำหรับดึงข้อมูลจาก API
const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/companies`);
        // อัพเดตตัวแปร companies ด้วยข้อมูลที่ได้รับจาก API
        companies.value = response.data.filter(user => user.userDetails.branch === branch)

    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
        });
    }
};

// ฟังก์ชั่นสำหรับสร้างและดาวน์โหลด PDF
const downloadPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("THSarabunNew.ttf", THSarabunNewFont);
    doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
    doc.setFont("THSarabunNew");

    doc.setFontSize(16);
    doc.text('ข้อมูลสถานประกอบการ', 10, 10);

    const tableColumn = ["ลำดับ", "ชื่อ-นามสกุล", "ชื่อสถานประกอบการ"];
    const tableRows = [];

    companies.value.forEach((company, index) => {
        const companyData = [
            index + 1,
            `${company.userDetails.firstName} ${company.userDetails.lastName}`,
            company.companyName
        ];
        tableRows.push(companyData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
        styles: { font: 'THSarabunNew', fontSize: 12 }
    });

    doc.save('companies.pdf');
};

// ฟังก์ชั่นสำหรับสร้างและดาวน์โหลด CSV
const downloadCSV = () => {
    const bom = "\uFEFF"; // Byte Order Mark สำหรับรองรับภาษาไทย
    let csvContent = bom + "ลำดับ,ชื่อ-นามสกุล,ชื่อสถานประกอบการ\n";

    companies.value.forEach((company, index) => {
        const row = `${index + 1},${company.userDetails.firstName} ${company.userDetails.lastName},${company.companyName}`;
        csvContent += row + "\n";
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'companies.csv');
};

// เรียกใช้ฟังก์ชั่น fetchData เมื่อ component ถูกสร้างขึ้น
onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">ข้อมูลสถานประกอบการ</div>
                <!-- <button @click="downloadPDF">Download PDF</button>
                <button @click="downloadCSV">Download CSV</button> -->
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชื่อสถานประกอบการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(company, index) in companies" :key="company.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ company.userDetails.firstName }} {{ company.userDetails.lastName }}</td>
                            <td>{{ company.companyName }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style>
/* เพิ่มสไตล์ถ้าจำเป็น */
</style>
