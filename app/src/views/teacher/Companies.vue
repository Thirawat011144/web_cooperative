<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import config from "../../../config";
import { createWorksheet } from "@/utils/download"; // Assuming the createWorksheet function is in this file

// สร้างตัวแปรเพื่อเก็บข้อมูล
const companies = ref([]);
const branch = localStorage.getItem(config.currentStudyField);

// ฟังก์ชั่นสำหรับดึงข้อมูลจาก API
const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/companies`);
    // กรองชื่อสถานประกอบการที่ซ้ำกัน โดยใช้ Set เพื่อเก็บชื่อที่ไม่ซ้ำ
    const uniqueCompanies = new Map();

    response.data.forEach((company) => {
      if (
        !uniqueCompanies.has(company.companyName) &&
        company.userDetails.branch === branch
      ) {
        uniqueCompanies.set(company.companyName, company);
      }
    });

    // อัพเดตตัวแปร companies ด้วยข้อมูลที่ไม่ซ้ำกัน
    companies.value = Array.from(uniqueCompanies.values());
    console.log(companies.value)
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
};


// ฟังก์ชันสำหรับการดาวน์โหลดข้อมูลเป็นไฟล์ Excel
const downloadExcel = () => {
  const workbook = new ExcelJS.Workbook();
  const columns = [
    { header: "ลำดับ", key: "index", width: 10 },
    // { header: "ชื่อ-นามสกุล", key: "fullName", width: 30 },
    { header: "ชื่อวิทยาลัย", key: "companyName", width: 30 },
    { header: "ที่อยู่", key: "companyAddress", width: 30 },
    { header: "เบอร์โทรศัพท์", key: "companyPhone", width: 30 },
  ];

  const worksheet = createWorksheet(workbook, "ข้อมูลวิทยาลัย", columns);

  // เติมข้อมูลลงใน worksheet
  companies.value.forEach((company, index) => {
    const row = worksheet.addRow({
      index: index + 1,
      // fullName: `${college.userDetails.firstName} ${college.userDetails.lastName}`,
      companyName: company.companyName,
      companyAddress: company.companyAddress,
      companyPhone: company.companyPhone
    });

    // ตั้งค่าแบบอักษรและการจัดตำแหน่งสำหรับแต่ละเซลล์ในแถวนี้
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: 'TH Sarabun New', size: 16 }; // ตั้งค่าแบบอักษรเป็น TH Sarabun New
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // สร้างไฟล์ Excel และบันทึก
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), "company_data.xlsx");
  });
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
        <div class="card-title"
          style="display: flex; justify-content: space-between; align-items: center;  width: 100%;">
          <h2> ข้อมูลสถานประกอบการ </h2>
          <button class="btn btn-secondary m-2" style="margin-left: auto" @click="downloadExcel">ดาวน์โหลดข้อมูล
            📥</button>
        </div>
        <!-- <button @click="downloadPDF">Download PDF</button>
                <button @click="downloadCSV">Download CSV</button> -->
        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <!-- <th>ชื่อ-นามสกุล</th> -->
              <th>ชื่อสถานประกอบการ</th>
              <th>ที่อยู่</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(company, index) in companies" :key="company.id">
              <td>{{ index + 1 }}</td>
              <!-- <td>
                {{ company.userDetails.firstName }}
                {{ company.userDetails.lastName }}
              </td> -->
              <td>{{ company.companyName }}</td>
              <td>{{ company.companyAddress }}</td>
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
