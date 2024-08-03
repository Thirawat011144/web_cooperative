<template>
  <div class="content">
    <h2>ข้อมูลนักศึกษา</h2>
    <div v-if="student" class="student-info college-card">

      <p><span class="label">รหัสนักศึกษา:</span> {{ student.studentID }}</p>
      <p><span class="label">ชื่อ-นามสกุล:</span> {{ student.firstName }} {{ student.lastName }}</p>
      <p><span class="label">สาขา:</span> {{ student.branch }}</p>
      <p><span class="label">ชั้นปี:</span> {{ student.year }}</p>
    </div>

    <div v-if="colleges && colleges.length" class="college-info">
      <h2>ข้อมูลสถานศึกษาที่ไปฝึกสอน</h2>
      <div v-for="college in colleges" :key="college.id" class="college-card">
        <p><span class="label">ชื่อวิทยาลัย:</span> {{ college.collegeName }}</p>
        <p><span class="label">แผนกวิชาที่นักเรียนเข้ารับการฝึกประสบการณ์วิชาชีพ:</span> {{ college.department }}</p>
        <p><span class="label">ขนาดสถานศึกษา:</span> {{ college.schoolSize }}</p>
        <p><span class="label">ชื่อผู้ประสานงาน:</span> {{ college.contactFirstName }} {{ college.contactLastName }}</p>
        <p><span class="label">เบอร์โทรศัพท์:</span> {{ college.collegePhone }}</p>
        <p><span class="label">Email:</span> {{ college.collegeEmail }}</p>
        <p><span class="label">ที่อยู่:</span> {{ college.collegeAddress }}</p>
      </div>
    </div>

    <div v-if="sortedEvaluations.length" class="evaluation-info">
      <h2>ข้อมูลการประเมิน</h2>
      <button class="btn" @click="downloadExcel"> Download <i class="fa-solid fa-circle-down"></i></button>
      <!-- <table class="table">
        <thead>
          <tr>
            <th>ผู้ประเมิน</th>
            <th>สถานะผู้ที่ทำการประเมิน</th>
            <th>รอบที่</th>
            <th>รายละเอียดการประเมิน</th>
            <th>คะแนน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evaluation in sortedEvaluations" :key="evaluation.id">
            <td>{{ evaluation.evaluatorName }}</td>
            <td>{{ evaluation.evaluatorStatus }}</td>
            <td>{{ evaluation.time }}</td>
            <td>
              <div v-for="(criterion, index) in evaluation.criteria" :key="index">
                <span>ข้อที่ {{ index + 1 }}: {{ criterion.label }}</span>
              </div>
            </td>
            <td>
              <div v-for="criterion in evaluation.criteria" :key="criterion.label">
                {{ criterion.score }}
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';
import config from '../../../../config';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';

const route = useRoute();
const student = ref(null);
const evaluations = ref([]);
const colleges = ref([]);

const fetchStudentData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/user/${route.params.id}`);
    student.value = response.data;
    fetchEvaluations(response.data.studentID);
    fetchCollegeData(response.data.studentID);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error fetching student data: ${error.message}`,
      icon: 'error',
    });
  }
};

const fetchEvaluations = async (studentID) => {
  try {
    const response = await axios.get(`${config.api_path}/data-evaluation`);
    evaluations.value = response.data.filter(evaluation => evaluation.studentId === studentID);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error fetching evaluations: ${error.message}`,
      icon: 'error',
    });
  }
};

const fetchCollegeData = async (studentID) => {
  try {
    const response = await axios.get(`${config.api_path}/colleges`);
    colleges.value = response.data.filter(college => college.studentID === studentID);
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: `Error fetching college data: ${error.message}`,
      icon: 'error',
    });
  }
};

const sortedEvaluations = computed(() => {
  return evaluations.value.slice().sort((a, b) => a.time - b.time);
});

const downloadExcel = async () => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Evaluations');

  // Adding student information
  worksheet.addRow(['ข้อมูลนักศึกษา']).font = { bold: true };
  worksheet.addRow(['ฟิลด์', 'ข้อมูล']);
  worksheet.addRow(['รหัสนักศึกษา', student.value.studentID]);
  worksheet.addRow(['ชื่อ-นามสกุล', `${student.value.firstName} ${student.value.lastName}`]);
  worksheet.addRow(['สาขา', student.value.branch]);
  worksheet.addRow(['ชั้นปี', student.value.year]);

  // Adding college information
  colleges.value.forEach(college => {
    worksheet.addRow([]);
    worksheet.addRow(['ข้อมูลสถานศึกษาที่ไปฝึกสอน']).font = { bold: true };
    worksheet.addRow(['ฟิลด์', 'ข้อมูล']);
    worksheet.addRow(['ชื่อวิทยาลัย', college.collegeName]);
    worksheet.addRow(['แผนกวิชาที่นักเรียนเข้ารับการฝึกประสบการณ์วิชาชีพ', college.department]);
    worksheet.addRow(['ขนาดสถานศึกษา', college.schoolSize]);
    worksheet.addRow(['ชื่อผู้ประสานงาน', `${college.contactFirstName} ${college.contactLastName}`]);
    worksheet.addRow(['เบอร์โทรศัพท์', college.collegePhone]);
    worksheet.addRow(['Email', college.collegeEmail]);
    worksheet.addRow(['ที่อยู่', college.collegeAddress]);
  });

  // Adding evaluation information
  worksheet.addRow([]);
  worksheet.addRow(['ผู้ประเมิน', 'สถานะผู้ที่ทำการประเมิน', 'รอบที่', 'รายละเอียดการประเมิน', 'คะแนน']).font = { bold: true };

  sortedEvaluations.value.forEach(evaluation => {
    evaluation.criteria.forEach((criterion, index) => {
      worksheet.addRow([
        evaluation.evaluatorName,
        evaluation.evaluatorStatus,
        evaluation.time,
        `ข้อที่ ${index + 1}: ${criterion.label}`,
        criterion.score
      ]);
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'evaluations.xlsx');
};

onMounted(() => {
  fetchStudentData();
});
</script>

<style scoped>
.content {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.student-info,
.college-info,
.evaluation-info {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
}

.college-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  word-wrap: break-word;
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #f2f2f2;
  white-space: nowrap;
}

.table td {
  text-align: center;
  white-space: nowrap;
}

.table td div {
  text-align: left;
}

.btn {
  /* background-color: #28a745; */
  color: rgb(0, 0, 0);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn:hover {
  background-color: gray
}
</style>
