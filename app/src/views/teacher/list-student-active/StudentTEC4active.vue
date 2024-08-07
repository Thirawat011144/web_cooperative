<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import * as XLSX from 'xlsx'; // import library
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcelHight } from "@/utils/downloadBeforeEvaluation";

const router = useRouter();  // เพิ่มการประกาศตัวแปร router

const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
let branch = null;

if (userData.branch) {
    branch = userData.branch;
} else {
    console.log('No userData found in localStorage');
}

const fetchData = async () => {
    try {
        const usersResponse = await axios.get(`${config.api_path}/users`);
        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation`);

        const evaluationCounts = evaluationResponse.data.reduce((counts, evaluation) => {
            counts[evaluation.studentId] = (counts[evaluation.studentId] || 0) + 1;
            return counts;
        }, {});

        console.log("Evaluation Counts:", evaluationCounts); // ตรวจสอบค่า evaluationCounts

        // อัปเดตสถานะเป็น 'ผ่าน' หรือ 'ไม่ผ่าน' สำหรับนักศึกษาตามเงื่อนไข
        const updateStatusPromises = usersResponse.data.map(async user => {
            console.log("User:", user); // ตรวจสอบค่าของ user แต่ละคน
            if (
                user.status === "เข้ารับการฝึก" &&
                user.year === "ป.ตรี ปีที่ 4" &&
                user.branch === branch
            ) {
                if (user.status !== "ไม่ผ่าน" && (evaluationCounts[user.studentID] || 0) >= 10) {
                    const response = await axios.put(`${config.api_path}/user/${user.id}`, { status: 'ผ่าน' });
                    console.log("Update Response:", response.data); // ตรวจสอบการตอบสนองของ API
                    user.status = 'ผ่าน';
                } else if (user.status === "ไม่ผ่าน") {
                    const response = await axios.put(`${config.api_path}/user/${user.id}`, { status: 'ไม่ผ่าน' });
                    console.log("Update Response:", response.data); // ตรวจสอบการตอบสนองของ API
                }
            }
            return user;
        });

        const updatedUsers = await Promise.all(updateStatusPromises);

        users.value = updatedUsers.filter(user =>
            user.status === "เข้ารับการฝึก" &&
            user.year === "ป.ตรี ปีที่ 4" &&
            user.branch === branch &&
            (evaluationCounts[user.studentID] || 0) < 10
        );

        users.value.forEach(user => {
            user.isEvaluated = evaluationCounts[user.studentID] >= 10; // ตรวจสอบจำนวนการประเมินและตั้งค่า
        });
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error"),
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
            // อัปเดตสถานะเป็น 'ไม่ผ่าน' ทันที
            const response = await axios.put(`${config.api_path}/user/${id}`, { status: newStatus });
            if (response.data.message === "Success") {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "อัปเดตสถานะสำเร็จ",
                    icon: "success",
                });

                const studentID = response.data.data.studentID; // แก้ไขการเข้าถึง studentID
                // console.log(studentID);

                // ยิง API ไปที่ data-evaluation เพื่อลบข้อมูลที่มี studentID ตรงกับ id นี้
                await axios.delete(`${config.api_path}/data-evaluation`, { data: { studentID: studentID } });
                Swal.fire({
                    title: "สำเร็จ",
                    text: "ลบข้อมูลการประเมินสำเร็จ",
                    icon: "success",
                });
                fetchData(); // รีเฟรชข้อมูลหลังจากอัปเดตสถานะและลบข้อมูลการประเมิน
            }
            return;
        }
        // ตรวจสอบว่าจำนวนการประเมินของนักศึกษามีครบ 3 ครั้งหรือไม่ก่อนที่จะอนุมัติ 'ผ่าน'
        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation`);
        const evaluationCounts = evaluationResponse.data.reduce((counts, evaluation) => {
            counts[evaluation.studentId] = (counts[evaluation.studentId] || 0) + 1;
            return counts;
        }, {});

        const userEvaluations = evaluationCounts[id] || 0;

        if (userEvaluations < 10 && newStatus === 'ผ่าน') {
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


const removeData = async (id) => {
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        try {
            const response = await axios.delete(`${config.api_path}/users/${id}`);
            users.value = users.value.filter(user => user.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลผู้ใช้สำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchData();
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: (error.message, 'Cr2 Error DeleteData'),
                icon: 'error'
            });
            console.log(error);
        }
    }
};

// handleEvaluation ฟังก์ชันที่กำหนดการประเมิน
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
        router.push(`/home-evaluation/student-ev-tec4`);
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
    // router.push(`/home-evaluation/evaluation-one/${userId}`);
};

const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id);
});

// ฟังก์ชันสำหรับการดาวน์โหลดไฟล์ Excel
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
//         'สถานที่ฝึกประสบการณ์': user.college
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
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นปริญาตรีชั้นปีที่ 4 (เข้ารับการฝึก)
                    <div>
                        <router-link :to="`/teacher-index/student-tec4req`">
                            <button class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-tec4approved`">
                            <button class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/teacher-index/student-tec4active`">
                            <button class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
                        <router-link :to="`/teacher-index/student-tec4success`">
                            <button class="btn btn-success m-1">ผ่าน</button></router-link>
                        <router-link :to="`/teacher-index/student-tec4notpass`">
                            <button class="btn btn-danger m-1">ไม่ผ่าน</button></router-link>
                        <button class="btn btn-info m-1" @click="downloadExcelHight('student', sortedUsers)">ดาวน์โหลด
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
        <!-- Modal -->
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
                        <div v-if="modalData.collegeDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>สถานประกอบการ: {{ modalData.collegeDetails.collegeName }}</p>
                            <p>แผนกวิชาที่นักเรียนเข้ารับการฝึกประสบการณ์วิชาชีพ: {{ modalData.collegeDetails.department
                                }}</p>
                            <p>ขนาดสถานศึกษา: {{ modalData.collegeDetails.schoolSize }}</p>
                            <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.collegeDetails.contactFirstName }} {{
                                modalData.collegeDetails.contactLastName }}</p>
                            <p>เบอร์โทรศัพท์: {{ modalData.collegeDetails.collegePhone }}</p>
                            <p v-if="modalData.collegeDetails.collegeEmail">Email: {{
                                modalData.collegeDetails.collegeEmail }}</p>
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
