<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { saveAs } from "file-saver";
import config from "../../../config";
import THSarabunNewFont from "../../../THSarabunNew-normal"; // ไฟล์ฟอนต์ Base64 ที่คุณแปลงแล้ว

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
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error",
    });
  }
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
              <!-- <th>ชื่อ-นามสกุล</th> -->
              <th>ชื่อสถานประกอบการ</th>
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
