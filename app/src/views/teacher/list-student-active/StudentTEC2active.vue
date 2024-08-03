<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import * as XLSX from 'xlsx';
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcel as downloadExcelInternship, downloadExcelUniversity as downloadExcelUniversity } from '@/utils/download';
const router = useRouter();
const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
let branch = null;
const evaluationData = ref([]); // เพิ่มการประกาศตัวแปร evaluationData
const universityEvaluationData = ref([]);

if (userData.branch) {
    branch = userData.branch;
} else {
    console.log('No userData found in localStorage');
}

const fetchData = async () => {
    try {
        const usersResponse = await axios.get(`${config.api_path}/users`);
        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship`);
        const universityEvaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship-university`);

        evaluationData.value = evaluationResponse.data;
        universityEvaluationData.value = universityEvaluationResponse.data
        console.log(evaluationData)
        const evaluationCounts = evaluationResponse.data.reduce((counts, evaluation) => {
            counts[evaluation.studentId] = (counts[evaluation.studentId] || 0) + 1;
            return counts;
        }, {});

        const universityEvaluationCounts = universityEvaluationResponse.data.reduce((counts, evaluation) => {
            counts[evaluation.studentId] = (counts[evaluation.studentId] || 0) + 1;
            return counts;
        }, {});

        // อัปเดตสถานะเป็น 'ผ่าน' หรือ 'ไม่ผ่าน' สำหรับนักศึกษาตามเงื่อนไข
        const updateStatusPromises = usersResponse.data.map(async user => {
            if (
                user.status === "เข้ารับการฝึก" &&
                user.year === "ป.ตรี ปีที่ 2" &&
                user.branch === branch
            ) {
                const userEvaluations = evaluationResponse.data.filter(
                    evaluation => evaluation.studentId === user.studentID
                );

                const userUniversityEvaluations = universityEvaluationResponse.data.filter(
                    evaluation => evaluation.studentId === user.studentID
                );


                const hasHighAverageScore = userEvaluations.some(
                    evaluation => evaluation.averageScore >= 80
                );



                if (hasHighAverageScore && userUniversityEvaluations.length > 0) {
                    await axios.put(`${config.api_path}/user/${user.id}`, { status: 'ผ่าน' });
                    user.status = 'ผ่าน';
                }
            }
            return user;
        });

        const updatedUsers = await Promise.all(updateStatusPromises);

        users.value = updatedUsers.filter(user =>
            user.status === "เข้ารับการฝึก" &&
            user.year === "ป.ตรี ปีที่ 2" &&
            user.branch === branch
        );

        // เพิ่มสถานะการประเมินให้กับข้อมูลนักศึกษา
        users.value.forEach(user => {
            user.isEvaluated = universityEvaluationCounts[user.studentID] > 0;
        });

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

                const studentID = response.data.data.studentID;
                await axios.delete(`${config.api_path}/companies`, { data: { studentID: studentID } });
                await axios.delete(`${config.api_path}/data-evaluation-internship-university`, { data: { studentID: studentID } });
                await axios.delete(`${config.api_path}/data-evaluation-internship`, { data: { studentID: studentID } });
                Swal.fire({
                    title: "สำเร็จ",
                    text: "ลบข้อมูลการประเมินสำเร็จ",
                    icon: "success",
                });
                fetchData();
            }
            return;
        }

        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship`);
        const evaluationCounts = evaluationResponse.data.reduce((counts, evaluation) => {
            counts[evaluation.studentId] = (counts[evaluation.studentId] || 0) + 1;
            return counts;
        }, {});

        const userEvaluations = evaluationCounts[id] || 0;

        if (userEvaluations < 3 && newStatus === 'ผ่าน') {
            Swal.fire({
                title: "ไม่สามารถอนุมัติได้",
                text: "จำนวนนักศึกษาที่ได้รับการประเมินยังไม่ครบ 3 ครั้ง",
                icon: "warning"
            });
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
    const roleTeacher = localStorage.getItem(config.role_name);
    const roleStatus = localStorage.getItem(config.evaluatorStatus);

    console.log("User ID:", userId);
    console.log("Role Teacher:", roleTeacher);
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
        'สถานที่ฝึกประสบการณ์': user.companyDetails.companyName
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
    <section class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นปริญาตรี ชั้นปีที่ 2 (เข้ารับการฝึก)
                    <div>
                        <router-link :to="`/teacher-index/student-tec2req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-tec2approved`"> <button
                                class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-tec2active`"> <button
                                class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
                        <router-link :to="`/teacher-index/student-tec2success`"> <button
                                class="btn btn-success m-1">ผ่าน</button>
                        </router-link>
                        <router-link :to="`/teacher-index/student-tec2notpass`"> <button
                                class="btn btn-danger m-1">ไม่ผ่าน</button>
                        </router-link>

                        <button class="btn btn-info m-1"
                            @click="downloadExcelInternship(sortedUsers, evaluationData)">การประเมินจากสถานประกอบการณ์</button>
                        <button class="btn btn-info m-1"
                            @click="downloadExcelUniversity(sortedUsers, universityEvaluationData)">การประเมินจากมหาลัย</button>
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
