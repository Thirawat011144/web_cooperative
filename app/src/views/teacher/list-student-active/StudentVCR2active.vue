<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import * as XLSX from 'xlsx';
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcel } from "@/utils/downloadBeforeEvaluation";

const router = useRouter();
const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
// const userData = JSON.parse(localStorage.getItem('userData') || '{}');
// let branch = null;
const evaluationData = ref([]); // เพิ่มการประกาศตัวแปร evaluationData
const universityEvaluationData = ref([]);

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

const fetchData = async () => {
    try {
        const usersResponse = await axios.get(`${config.api_path}/users`);
        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship`);
        const universityEvaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship-university`);

        evaluationData.value = evaluationResponse.data;
        universityEvaluationData.value = universityEvaluationResponse.data;

        console.log("Users Response:", usersResponse.data);

        const updatedUsers = usersResponse.data.map(async user => {
            console.log("Processing User:", user);

            const userEvaluations = evaluationResponse.data.filter(
                evaluation => evaluation.studentId === user.studentID
            );

            const userUniversityEvaluations = universityEvaluationResponse.data.filter(
                evaluation => evaluation.studentId === user.studentID
            );

            if (userEvaluations.length > 0 && userUniversityEvaluations.length > 0) {
                await axios.put(`${config.api_path}/user/${user.id}`, { status: 'ประเมินเรียบร้อยแล้ว' });
                user.status = 'ประเมินเรียบร้อยแล้ว';
            }

            console.log("Updated User Status:", user.status);

            return user;
        });

        const finalUsers = await Promise.all(updatedUsers);
console.log("Final Users After Update:", finalUsers);

users.value = finalUsers.filter(user => {
    // การกรองตามสาขาและปี
    const branchNames = branches.map(branch => branch.name);

    let userBranchNames = [];
    if (Array.isArray(user.branch)) {
        userBranchNames = user.branch.map(branch => branch.name);
    } else if (typeof user.branch === 'object' && user.branch !== null) {
        if (user.branch.name) {
            userBranchNames = [user.branch.name];  // ถ้า `user.branch` เป็น object และมี `name`
        } else {
            console.log("Unexpected branch object format:", user.branch);
            return false;  // ถ้า `user.branch` เป็น object แต่ไม่มี `name`
        }
    } else if (typeof user.branch === 'string') {
        userBranchNames = [user.branch];  // ถ้า `user.branch` เป็น string
    } else {
        console.log("Unexpected branch format:", user.branch);
        return false;  // ถ้า `user.branch` ไม่อยู่ในรูปแบบที่คาดหวัง ไม่ให้ผ่านการกรอง
    }

    const isStatusMatch = user.status === "เข้ารับการฝึก";
    const isYearMatch = user.year === "ปวช 3";
    const isBranchMatch = userBranchNames.some(name => branchNames.includes(name));
    const userUniversityEvaluations = universityEvaluationData.value.filter(
        evaluation => evaluation.studentId === user.studentID
    );


    // ตรวจสอบว่าผู้ใช้คนนี้ได้ถูกประเมินหรือไม่
    user.isEvaluated = user.status === 'ประเมินเรียบเสร็จสิ้น' || 
        (userUniversityEvaluations.length > 0);

    return isStatusMatch && isYearMatch && isBranchMatch;
});

console.log("Filtered Users:", users.value);

    } catch (error) {
        Swal.fire({
            title: "error",
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

const handleStatus = async (id, newStatus) => {
    try {
        if (newStatus === 'ไม่ผ่าน') {
            const response = await axios.put(`${config.api_path}/user/${id}`, { status: newStatus });
            if (response.data.message === "Success") {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "อัปเดตสถานะสำเร็จ",
                    icon: "success",
                });
                fetchData(); // เพียงแค่รีเฟรชข้อมูลโดยไม่ลบข้อมูลที่เกี่ยวข้อง
            }
            return;
        }

        const response = await axios.put(`${config.api_path}/user/${id}`, { status: newStatus });
        if (response.data.message === "Success") {
            Swal.fire({
                title: "สำเร็จ",
                text: "อัปเดตสถานะสำเร็จ",
                icon: "success",
            });
            fetchData();
        }
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error Updating Status"),
            icon: "error"
        });
    }
};


const handleEvaluation = (userId) => {
    let role = localStorage.getItem(config.evaluatorStatus);
    console.log(role);

    if (role === null || role === 'null') {
        role = 'อาจารย์นิเทศ';
    }

    localStorage.setItem(config.evaluatorStatus, role);
    const roleTeacher = localStorage.getItem(config.role_name); // ไม่ได้ใช้
    const roleStatus = localStorage.getItem(config.evaluatorStatus);

    console.log("User ID:", userId);
    console.log("Role Teacher:", roleTeacher); // ไม่ได้ใช้แล้ว
    console.log("Role:", roleStatus);

    if (roleStatus === 'อาจารย์นิเทศ') {
        console.log("Navigating to: /home-evaluation/evaluation-one-vcr/" + userId);
        router.push(`/home-evaluation/evaluation-one-vcr/${userId}`);
    } else if (roleStatus === 'ผู้ดูแล') {
        console.log("Navigating to: /page-evaluation/" + userId);
        router.push(`/home-evaluation/evaluation-one-mentor/${userId}`);
    } else {
        console.log("Invalid role");
        Swal.fire({
            title: "error",
            text: "Role ไม่ถูกต้อง",
            icon: "error"
        });
    }
};

const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id);
});

// const downloadExcel = () => {
//     const data = sortedUsers.value.map(user => ({
//         'รหัสนักศึกษา': user.studentID,
//         'ชื่อ': user.firstName,
//         'นามสกุล': user.lastName,
//         'สาขา': user.branch,
//         'ชั้นปี': user.year,
//         'สถานะ': user.status,
//         'เบอร์โทรศัพท์': user.phoneNumber,
//         'อีเมล์': user.email,
//         'สถานที่ฝึกประสบการณ์': user.companyDetails.companyName
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
//     XLSX.writeFile(workbook, 'students.xlsx');
// };

onMounted(() => {
    fetchData();
});
</script>

<template>
    <section class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนียบัตรวิชาชีพ ชั้นปีที่ 3 (เข้ารับการฝึก)
                    <div>
                        <router-link :to="`/teacher-index/student-vcr2req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-vcr-approved`"> <button
                                class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-vcr2active`"> <button
                                class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
                        <router-link :to="`/teacher-index/student-vcr2success`"> <button
                                class="btn btn-success m-1">ผ่าน</button>
                        </router-link>
                        <router-link :to="`/teacher-index/student-vcr2notpass`"> <button
                                class="btn btn-danger m-1">ไม่ผ่าน</button>
                        </router-link>
                        <button class="btn btn-info m-1" @click="downloadExcel('student', sortedUsers)">ดาวน์โหลด
                            Excel</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
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
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.branch }}</td>
                            <td>{{ user.year }}</td>
                            <td class="text-center">
                                <button class="btn btn-success" @click="showModal(user.id)">ดูข้อมูล</button>
                            </td>
                            <td>
                                <button :class="user.isEvaluated ? 'btn btn-secondary' : 'btn btn-success'"
                                    @click="handleEvaluation(user.id)" :disabled="user.isEvaluated">
                                    {{ user.isEvaluated ? 'ประเมินแล้ว' : 'ประเมิน' }}
                                </button>
                                &nbsp;
                                <button class="btn btn-danger"
                                    @click="handleStatus(user.id, 'ไม่ผ่าน')">ไม่ผ่าน</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
                        <button type="button" class="btn-close" @click="isModalVisible = false"
                            aria-label="Close"></button>
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
                        <div v-if="modalData.companyDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
                            <p>แผนก: {{ modalData.companyDetails.companyDepartment }}</p>
                            <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.companyDetails.contactFirstName }} {{
                                modalData.companyDetails.contactLastName }}</p>
                            <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
                            <p v-if="modalData.companyDetails.companyEmail">Email: {{
                                modalData.companyDetails.companyEmail }}</p>
                            <p v-else></p>
                            <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
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
