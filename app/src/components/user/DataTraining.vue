<script setup>
import { ref, onMounted, watch } from 'vue';
import config from '../../../config';
import axios from 'axios';

const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const company = ref('');
const college = ref('');

let studentID = null;

if (userData.studentID) {
    studentID = userData.studentID;
} else {
    console.log('No userData found in localStorage');
}

const fetchCompany = async () => {
    try {
        if (studentID) {
            const response = await axios.get(`${config.api_path}/company/${studentID}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem(config.token_name)}` }
            });
            company.value = response.data;
        } else {
            console.error('studentID is not defined');
        }
    } catch (error) {
        console.error('Error fetching company:', error);
    }
};

const fetchCollege = async () => {
    try {
        if (studentID) {
            const response = await axios.get(`${config.api_path}/college/${studentID}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem(config.token_name)}` }
            });
            college.value = response.data;
        } else {
            console.error('studentID is not defined');
        }
    } catch (error) {
        console.error('Error fetching college:', error);
    }
};

onMounted(() => {
    fetchCompany();
    fetchCollege();
});
</script>

<template>
    <div class="flex-grow-1 p-3">
        <div class="card" v-if="company">
            <h2>ข้อมูลสถานประกอบการ</h2>
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อสถานประกอบการ:</span> {{ company.companyName }}
                </h5>
                <p class="card-text">
                    <span>แผนก:</span> {{ company.companyDepartment }}
                </p>
                <p class="card-text">
                    <span>ชื่อ-นามสกุลผู้ประสานงาน:</span> {{ company.contactFirstName }} {{ company.contactLastName }}
                </p>
                <p class="card-text">
                    <span>เบอร์โทรศัพท์:</span> {{ company.companyPhone }}
                </p>
                <p class="card-text">
                    <span>Email:</span> {{ company.companyEmail }}
                </p>
                <p class="card-text">
                    <span>ที่ตั้ง:</span> {{ company.companyAddress }}
                </p>
            </div>
        </div>
        <div v-else>
        </div>

        <div class="card" v-if="college">
            <h2>ข้อมูลสถานที่ฝึกสอน</h2>
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อวิทยาลัย:</span> {{ college.collegeName }}
                </h5>
                <p class="card-text">
                    <span>แผนกวิชาที่นักศึกษาเข้ารับการฝึกประสบการณ์วิชาชีพ
                        :</span> {{ college.department }}
                </p>
                <p class="card-text">
                    <span>ขนาดสถานศึกษา
                        :</span> {{ college.schoolSize }}
                </p>
                <p class="card-text">
                    <span>ชื่อ-นามสกุลผู้ประสานงาน:</span> {{ college.contactFirstName }} {{ college.contactLastName }}
                </p>
                <p class="card-text">
                    <span>เบอร์โทรศัพท์:</span> {{ college.collegePhone }}
                </p>
                <p class="card-text">
                    <span>Email:</span> {{ college.collegeEmail }}
                </p>
                <p class="card-text">
                    <span>ที่ตั้ง:</span> {{ college.collegeAddress }}
                </p>
            </div>
        </div>

        <!-- <div v-else>
            <p>Loading...</p>
        </div> -->
    </div>
</template>

<style scoped>
span {
    font-weight: bold;
}
</style>
