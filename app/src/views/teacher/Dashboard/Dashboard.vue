<template>
  <div>
    <div class="main-content" v-if="studentsLevel3.length > 0">
      <StatusCard title="ระดับชั้นประกาศนียบัตรวิชาชีพ ชั้นปีที่ 3" :students="studentsLevel3" />
    </div>
    <div class="main-content" v-if="studentsLevel2.length > 0">
      <StatusCard title="ระดับชั้นประกาศนียบัตรวิชาชีพชั้นสูง ชั้นปีที่ 2" :students="studentsLevel2" />
    </div>
    <div class="main-content" v-if="studentsHightLevel2.length > 0">
      <StatusCard title="ระดับชั้นปริญญาตรี ชั้นปีที่ 2" :students="studentsHightLevel2" />
    </div>
    <div class="main-content" v-if="studentsHightLevel4.length > 0">
      <StatusCard title="ระดับชั้นปริญญาตรี ชั้นปีที่ 4" :students="studentsHightLevel4" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import config from '../../../../config';
import StatusCard from './StatusCard.vue';

const students = ref([]);
const studentsLevel3 = ref([]);
const studentsLevel2 = ref([]);
const studentsHightLevel2 = ref([]);
const studentsHightLevel4 = ref([]);


const userData = JSON.parse(localStorage.getItem('userData') || '{}');
let branch = null;

if (userData.branch) {
  branch = userData.branch;
} else {
  console.log('No userData found in localStorage');
}

const fetchStudents = async () => {
  try {
    const response = await axios.get(`${config.api_path}/users`);
    students.value = response.data.filter(student => student.branch === branch && student.role !== 'teacher' && student.role !== 'admin' && student.prefix === null); // กรองสาขาและ role
    console.log("student",students.value)
    // Assuming you have a way to distinguish between levels
    studentsLevel3.value = students.value.filter(student => student.year === "ปวช 3");
    studentsLevel2.value = students.value.filter(student => student.year === "ปวส 2");
    studentsHightLevel2.value = students.value.filter(student => student.year === "ป.ตรี ปีที่ 2");
    studentsHightLevel4.value = students.value.filter(student => student.year === "ป.ตรี ปีที่ 4");
 
    console.log(studentsLevel3.value)
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

onMounted(fetchStudents);
</script>

<style scoped>
.main-content {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
}
</style>
