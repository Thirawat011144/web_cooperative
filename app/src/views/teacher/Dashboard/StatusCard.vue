<template>
    <div class="card">
        <div class="card-header">
            <h2 class="card-title">{{ title }}</h2>
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
                <div class="status-circle" @click="filterStatus('เสร็จสิ้น')">
                    <div class="circle">{{ finish }}</div>
                    <p>เสร็จสิ้น</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
    students: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const statusFilter = ref('all');

const allCount = computed(() => props.students.length);
const permissionCount = computed(() => props.students.filter(student => student.status === 'ขออนุมัติ').length);
const trainCount = computed(() => props.students.filter(student => student.status === 'อนุมัติ').length);
const trainCountInternship = computed(() => props.students.filter(student => student.status === 'เข้ารับการฝึก').length);
const passCount = computed(() => props.students.filter(student => student.status === 'ผ่าน').length);
const failCount = computed(() => props.students.filter(student => student.status === 'ไม่ผ่าน' || student.status === 'ไม่อนุมัติ').length);
const finish = computed(() => props.students.filter(student => student.status === 'เสร็จสิ้น').length);

const filterStatus = (status) => {
    statusFilter.value = status;
};
</script>

<style scoped>
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