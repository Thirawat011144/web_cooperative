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
let branch = null

if (userData.branch) {
  branch = userData.branch;
} else {
  console.log('No userData found in localStorage');
}
const branches = userData.branch;
console.log('Branches:', branches);
branches.forEach((branch, index) => {
  console.log(`Branch ${index + 1}:`, branch.name);
});

const fetchStudents = async () => {
  try {
    const response = await axios.get(`${config.api_path}/users`);

    console.log('Original API Response:', response.data);

    // กรองข้อมูลนักเรียนตามสาขาและบทบาท
    students.value = response.data.filter(user => {
      let userBranches = user.branch;

      if (Array.isArray(userBranches)) {
        // ถ้า userBranches เป็น array ของ object ที่มี 'name'
        return userBranches.some(branchItem => branch.some(b => b.name === branchItem.name)) &&
          user.status !== 'เสร็จสิ้น';
      } else if (typeof userBranches === 'string') {
        // ถ้า user.branch เป็น string
        return branch.some(b => b.name === userBranches) &&
          user.status !== 'เสร็จสิ้น';
      } else if (typeof userBranches === 'object' && userBranches.name) {
        // ถ้า user.branch เป็น object ที่มี 'name'
        return branch.some(b => b.name === userBranches.name) &&
          user.status !== 'เสร็จสิ้น';
      } else {
        return false;
      }
    });
    // กรองนักเรียนตามปีการศึกษา
    studentsLevel3.value = students.value.filter(student => student.year === "ปวช 3");
    studentsLevel2.value = students.value.filter(student => student.year === "ปวส 2");
console.log("นักเรียนระดับ ปวส 2:", studentsLevel2.value);
    studentsHightLevel2.value = students.value.filter(student => student.year === "ป.ตรี ปีที่ 2");
    studentsHightLevel4.value = students.value.filter(student => student.year === "ป.ตรี ปีที่ 4");

    console.log("นักเรียนระดับ ปวช 3:", studentsLevel3.value);
    console.log("นักเรียนระดับ ปวส 2:", studentsLevel2.value);
    console.log("นักเรียนระดับ ป.ตรี ปีที่ 2:", studentsHightLevel2.value);
    console.log("นักเรียนระดับ ป.ตรี ปีที่ 4:", studentsHightLevel4.value);
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
