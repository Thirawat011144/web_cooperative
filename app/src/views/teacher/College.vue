<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import config from "../../../config";
import { createWorksheet } from "@/utils/download"; // Assuming the createWorksheet function is in this file

// สร้างตัวแปรเพื่อเก็บข้อมูล
const colleges = ref([]);
const branch = localStorage.getItem(config.currentStudyField);

// ฟังก์ชันสำหรับดึงข้อมูลจาก API
const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/colleges`);
    // กรองชื่อวิทยาลัยที่ซ้ำกัน โดยใช้ Map เพื่อเก็บเฉพาะวิทยาลัยที่ไม่ซ้ำ
    const uniqueColleges = new Map();

    response.data.forEach((college) => {
      if (
        !uniqueColleges.has(college.collegeName) &&
        college.userDetails.branch === branch &&
        college.userDetails.year === "ป.ตรี ปีที่ 4"
      ) {
        uniqueColleges.set(college.collegeName, college);
      }
    });

    // อัพเดตตัวแปร colleges ด้วยข้อมูลที่ไม่ซ้ำกัน
    colleges.value = Array.from(uniqueColleges.values());
    console.log(colleges.value);
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
    { header: "ชื่อวิทยาลัย", key: "collegeName", width: 30 },
    { header: "ที่อยู่", key: "collegeAddress", width: 30 },
    { header: "ประเภทสถานศึกษา", key: "schoolSize", width: 30 },
  ];

  const worksheet = createWorksheet(workbook, "ข้อมูลวิทยาลัย", columns);

  // เติมข้อมูลลงใน worksheet
  colleges.value.forEach((college, index) => {
    const row = worksheet.addRow({
      index: index + 1,
      // fullName: `${college.userDetails.firstName} ${college.userDetails.lastName}`,
      collegeName: college.collegeName,
      collegeAddress: college.collegeAddress,
      schoolSize: college.schoolSize
    });

    // ตั้งค่าแบบอักษรและการจัดตำแหน่งสำหรับแต่ละเซลล์ในแถวนี้
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = { name: 'TH Sarabun New', size: 16 }; // ตั้งค่าแบบอักษรเป็น TH Sarabun New
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
    });
  });

  // สร้างไฟล์ Excel และบันทึก
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), "colleges_data.xlsx");
  });
};
// เรียกใช้ฟังก์ชัน fetchData เมื่อ component ถูกสร้างขึ้น
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="content mt-4">
    <div class="card">
      <div class="card-header">
        <div class="card-title"
          style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <h2>ข้อมูลสถานศึกษา</h2>
          <button class="btn btn-secondary m-2" style="margin-left: auto;" @click="downloadExcel"> ดาวน์โหลดข้อมูล
            📥</button>
        </div>


        <table class="table">
          <thead>
            <tr>
              <th>ลำดับ</th>
              <!-- <th>ชื่อ-นามสกุล</th> -->
              <th>ชื่อวิทยาลัย</th>
              <th>ที่อยู่</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(college, index) in colleges" :key="college.id">
              <td>{{ index + 1 }}</td>
              <!-- <td>
                {{ college.userDetails.firstName }}
                {{ college.userDetails.lastName }}
              </td> -->
              <td>{{ college.collegeName }}</td>
              <td>{{ college.collegeAddress }}</td>
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
