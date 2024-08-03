<template>
    <div>
        <div class="main-content">
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Dashboard</h2>
                </div>
                <div class="card-body">
                    <h3>ข้อมูลนักเรียนทั้งหมด</h3>
                    <div class="status-circles">
                        <div class="status-circle" @click="filterStatus('all')">
                            <div class="circle">{{ allCount }}</div>
                            <p>ทั้งหมด</p>
                        </div>
                        <div class="status-circle" @click="filterStatus('ขออนุมัติ')">
                            <div class="circle">{{ permissionCount }}</div>
                            <p>ขออนุมัติ</p>
                        </div>
                        <div class="status-circle" @click="filterStatus('อนุมัติ')">
                            <div class="circle">{{ trainCount }}</div>
                            <p>อนุมัติ</p>
                        </div>
                        <div class="status-circle" @click="filterStatus('เข้ารับการฝึก')">
                            <div class="circle">{{ trainCountInternship }}</div>
                            <p>เข้ารับการฝึก</p>
                        </div>
                        <div class="status-circle" @click="filterStatus('ผ่าน')">
                            <div class="circle">{{ passCount }}</div>
                            <p>ผ่าน</p>
                        </div>
                        <div class="status-circle" @click="filterStatus('ไม่ผ่าน')">
                            <div class="circle">{{ failCount }}</div>
                            <p>ไม่ผ่าน</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import config from '../../../config';

const students = ref([]);
const statusFilter = ref('all');

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
        students.value = response.data.filter(student => student.branch === branch && student.role !== 'teacher' && student.role !== 'admin'); // กรองสาขาและ role
        console.log(students.value)
    } catch (error) {
        console.error("Error fetching students:", error);
    }
};

const allCount = computed(() => students.value.length);
const permissionCount = computed(() => students.value.filter(student => student.status === 'ขออนุมัติ').length);
const trainCount = computed(() => students.value.filter(student => student.status === 'อนุมัติ').length);
const trainCountInternship = computed(() => students.value.filter(student => student.status === 'เข้ารับการฝึก').length);
const passCount = computed(() => students.value.filter(student => student.status === 'ผ่าน').length);
const failCount = computed(() => students.value.filter(student => student.status === 'ไม่ผ่าน' || student.status === 'ไม่อนุมัติ').length);

const filterStatus = (status) => {
    statusFilter.value = status;
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

.card {
    width: 100%;
    max-width: 1200px;
    margin: 20px;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.card-header {
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
    background-color: #4d4e4f;
    color: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.card-title {
    margin: 0;
    font-size: 24px;
    font-weight: bold;
}

.card-body {
    padding: 20px;
}

.status-circles {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}

.status-circle {
    text-align: center;
    cursor: pointer;
}

.circle {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: #cccdcf;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    margin-bottom: 10px;
    transition: background-color 0.3s;
}

.circle:hover {
    background-color: #0056b3;
}

.status-circle p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}
</style>
