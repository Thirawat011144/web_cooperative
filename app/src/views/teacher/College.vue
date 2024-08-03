<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';

// สร้างตัวแปรเพื่อเก็บข้อมูล
const colleges = ref([]);
const branch = localStorage.getItem(config.currentStudyField)

// ฟังก์ชั่นสำหรับดึงข้อมูลจาก API
const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/colleges`);
        // อัพเดตตัวแปร colleges ด้วยข้อมูลที่ได้รับจาก API
        colleges.value = response.data.filter(user => user.userDetails.branch = branch && user.userDetails.year === "ป.ตรี ปีที่ 4");
        console.log(colleges.value)
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error'
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
                <div class="card-title">ข้อมูลวิทยาลัย</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชื่อวิทยาลัย</th>
                            <!-- <th>สาขา</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(college, index) in colleges" :key="college.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ college.userDetails.firstName }} {{ college.userDetails.lastName }}</td>
                            <td>{{ college.collegeName }}</td>
                            <!-- <td>{{ college.userDetails.branch }}</td> -->
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
