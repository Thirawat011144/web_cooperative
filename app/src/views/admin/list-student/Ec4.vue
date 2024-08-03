<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import THSarabunNewFont from '../../../../THSarabunNew-normal'; // Base64-encoded font file
import * as XLSX from 'xlsx'; // import library
import { makeModalDraggable } from "@/utils/draggable";


const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const branch = localStorage.getItem(config.branch)

const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/users`);
    // users.value = response.data.filter(user => user.year === "ป.ตรี ปีที่ 4");
    users.value = response.data.filter(user => user.year === "ป.ตรี ปีที่ 4" && user.branch === branch);
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: error.message,
      icon: "error"
    });
  }
};

// modal
const showModal = async (id) => {
  isModalVisible.value = true;
  try {
    const response = await axios.get(`${config.api_path}/user/${id}`);
    modalData.value = response.data;
    makeModalDraggable();
  } catch (error) {
    Swal.fire({
      title: "error",
      text: (error.message, "Cr2 Error Fetching Data"),
      icon: 'error'
    });
  }
};

const closeModal = () => {
  isModalVisible.value = false;
  modalData.value = null;
};
// modal


// const downloadPDF = () => {
//   const doc = new jsPDF();
//   doc.addFileToVFS("THSarabunNew.ttf", THSarabunNewFont);
//   doc.addFont("THSarabunNew.ttf", "THSarabunNew", "normal");
//   doc.setFont("THSarabunNew");

//   doc.setFontSize(20);
//   doc.text('ข้อมูลนักศึกษาชั้นปีที่ 4', 10, 10);

//   const tableColumn = ['ลำดับ', 'รหัสนักศึกษา', 'ชื่อ-นามสกุล', 'สาขา', 'ชั้นปี', 'ชื่อสถานประกอบการ'];
//   const tableRows = [];

//   users.value.forEach((user, index) => {
//     const userData = [
//       index + 1,
//       user.studentID,
//       `${user.firstName} ${user.lastName}`,
//       user.branch,
//       user.year,
//       user.college
//     ];
//     tableRows.push(userData);
//   });

//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 20,
//     styles: { font: 'THSarabunNew', fontSize: 18 }
//   });

//   doc.save('students.pdf');
// };


// const downloadCSV = () => {
//   const bom = "\uFEFF"; // Byte Order Mark สำหรับรองรับภาษาไทย
//   const tableColumn = ['ลำดับ', 'รหัสนักศึกษา', 'ชื่อ-นามสกุล', 'สาขา', 'ชั้นปี', 'ชื่อสถานศึกษา'];
//   let csvContent = bom + tableColumn.join(",") + "\n";

//   sortedUsers.value.forEach((user, index) => {
//     const row = [
//       index + 1,
//       user.studentID,
//       `${user.firstName} ${user.lastName}`,
//       user.branch,
//       user.year,
//       user.college
//     ];
//     csvContent += row.join(",") + "\n";
//   });

//   const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//   saveAs(csvBlob, 'students.csv');
// };


// const generateCSV = (columns, rows) => {
//   let csvContent = '';

//   // Header
//   csvContent += columns.join(',') + '\n';

//   // Rows
//   rows.forEach(row => {
//     csvContent += row.join(',') + '\n';
//   });

// return csvContent;
// };

const sortedUsers = computed(() => {
  return users.value.slice().sort((a, b) => a.id - b.id);
});

// ฟังก์ชันสำหรับการดาวน์โหลดไฟล์ Excel
const downloadExcel = () => {
  const data = sortedUsers.value.map(user => ({
    'รหัสนักศึกษา': user.studentID,
    'ชื่อ': user.firstName,
    'นามสกุล': user.lastName,
    'สาขา': user.branch,
    'ชั้นปี': user.year,
    'สถานะ': user.status,
    'เบอร์โทรศัพท์': user.phoneNumber,
    'อีเมล์': user.email,
    'สถานที่ฝึกประสบการณ์': user.college
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
  XLSX.writeFile(workbook, 'students.xlsx');
};


onMounted(() => {
  fetchData();
});
</script>

<template>
  <section class="content">
    <div class="card">
      <div class="card-header">
        <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นปริญาตรี ชั้นปีที่ 
          <div>
            <router-link :to="`/admin-index/Ec4-req`"> <button
                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
            <router-link :to="`/admin-index/Ec4-approved`"> <button
                class="btn btn-success m-1">อนุมัติ</button></router-link>
            <router-link :to="`/admin-index/Ec4-active`"> <button
                class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
            <router-link :to="`/admin-index/Ec4-success`"> <button class="btn btn-success m-1">ผ่าน</button>
            </router-link>
            <router-link :to="`/admin-index/Ec4-notpass`"> <button class="btn btn-danger m-1">ไม่ผ่าน</button>
            </router-link>
            <!-- <button @click="downloadPDF" class="btn btn-primary">ดาวน์โหลด PDF</button>  -->
            <button class="btn btn-info m-1" @click="downloadExcel">ดาวน์โหลด Excel</button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">ลำดับ</th>
              <th>รหัสนักศึกษา</th>
              <th>ชื่อ-นามสกุล</th>
              <th>สาขา</th>
              <th>ชั้นปี</th>
              <th class="text-center">ข้อมูลสถานประกอบการ</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in sortedUsers" :key="user.id">
              <td class="text-center">{{ index + 1 }}</td>
              <td>{{ user.studentID }}</td>
              <td>{{ user.firstName }} {{ user.lastName }}</td>
              <td>{{ user.branch }}</td>
              <td>{{ user.year }}</td>
              <td class="text-center">
                <button class="btn btn-success" @click="showModal(user.id)">ดูข้อมูล</button>
              </td>
              <td>
                <router-link :to="`/edit-ec4/${user.id}`">
                  <button class="btn btn-primary m-1"><i class="fa-solid fa-pen-to-square"></i></button>
                </router-link>
                <button @click="removeData(user.id)" class="btn btn-danger m-1"><i
                    class="fa-solid fa-trash-can"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
            <button type="button" class="btn-close" @click="isModalVisible = false" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="modalData">
            <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
            <p>ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}</p>
            <p>สาขา: {{ modalData.branch }}</p>
            <p>ชั้นปี: {{ modalData.year }}</p>
            <p>สถานะ: {{ modalData.status }}</p>
            <p>เบอร์โทรศัพท์: {{ modalData.phoneNumber }}</p>
            <p v-if="modalData.email">Email: {{ modalData.email }}</p>
            <p v-else></p>
            <!-- <div v-if="modalData.companyDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
              <p>แผนก: {{ modalData.companyDetails.companyDepartment }}</p>
              <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.companyDetails.contactFirstName }} {{
                modalData.companyDetails.contactLastName }}</p>
              <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
              <p v-if="modalData.companyDetails.companyEmail">Email: {{ modalData.companyDetails.companyEmail }}</p>
              <p v-else></p>
              <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
            </div> -->
            <div v-if="modalData.collegeDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>โรงเรียน/วิทยาลัย: {{ modalData.collegeDetails.collegeName }}</p>
              <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.collegeDetails.contactFirstName }} {{
                modalData.collegeDetails.contactLastName }}</p>
              <p>เบอร์โทรศัพท์: {{ modalData.collegeDetails.collegePhone }}</p>
              <p v-if="modalData.collegeDetails.collegeEmail">Email: {{ modalData.collegeDetails.collegeEmail }}</p>
              <p v-else></p>
              <p>ที่ตั้งวิทยาลัย: {{ modalData.collegeDetails.collegeAddress }}</p>

            </div>
            <div v-else>
              <p>ไม่มีข้อมูลสถานประกอบการ</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

body {
  font-family: 'Sarabun', sans-serif;
}
</style>
