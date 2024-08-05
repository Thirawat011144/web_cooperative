<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
// import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
// ฟังก์ชันสำหรับการดาวน์โหลดไฟล์ Excel
import { format } from 'date-fns';
import { downloadExcel, downloadExcelUniversity } from "@/utils/downloadInternship";

const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const evaluationData = ref([]); // เพิ่มการประกาศตัวแปร evaluationData
const universityEvaluationData = ref([]); // เพิ่มการประกาศตัวแปร universityEvaluationData
const branch = localStorage.getItem(config.branch)

const fetchData = async () => {
    try {
        const [userResponse, evaluationResponse, universityEvaluationResponse] = await Promise.all([
            axios.get(`${config.api_path}/users`),
            axios.get(`${config.api_path}/data-evaluation-internship`),
            axios.get(`${config.api_path}/data-evaluation-internship-university`) // เพิ่มการดึงข้อมูลจาก API
        ]);
        users.value = userResponse.data.filter(user => user.status === "ผ่าน" && user.year === "ปวส 2" && user.branch === branch);
        evaluationData.value = evaluationResponse.data;
        universityEvaluationData.value = universityEvaluationResponse.data; // เก็บข้อมูลที่ได้จาก API
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
        const user = response.data;
        makeModalDraggable(); // Call function to make the modal draggable


        // หาข้อมูลการประเมินที่เกี่ยวข้องกับ studentID
        const evaluation = evaluationData.value.find(e => e.studentId === user.studentID);
        modalData.value = { ...user, evaluation };
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

// ฟังก์ชันสำหรับการลบข้อมูล
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
                    fetchData(); // รีเฟรชข้อมูลหลังจากการลบ
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

const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id); // เรียงลำดับตาม ID
});

// ฟังก์ชันสำหรับอัปเดตสถานะของผู้ใช้ทั้งหมดเป็น 'เสร็จสิ้น'
const updateAllStatusToCompleted = async () => {
    try {
        const result = await Swal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณจะอัปเดตสถานะของผู้ใช้ทั้งหมดเป็น "เสร็จสิ้น"',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, อัปเดตเลย!',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            const updatePromises = users.value.map(user => {
                return axios.put(`${config.api_path}/user/${user.id}`, { status: 'เสร็จสิ้น', year: 'ประกาศนียบัตรวิชาชีพชั้นสูงชั้นปีที่ 2' });
            });
            await Promise.all(updatePromises);
            Swal.fire({
                title: "สำเร็จ",
                text: "สถานะของผู้ใช้ทั้งหมดได้ถูกอัปเดตเป็น 'เสร็จสิ้น'",
                icon: "success",
            });
            fetchData(); // รีเฟรชข้อมูลหลังจากอัปเดตสถานะ
        }
    } catch (error) {
        Swal.fire({
            title: 'error',
            text: (error.message, 'Cr2 Error UpdateStatus'),
            icon: 'error'
        });
    }
};

const exportExcel = () => {
    downloadExcel(sortedUsers, evaluationData);
};

const exportExcelUniverSity = () => {
    downloadExcelUniversity(sortedUsers, universityEvaluationData);
}

onMounted(() => {
    fetchData();
});

// Function to make the modal draggable
const makeModalDraggable = () => {
    const modal = document.querySelector('.modal-dialog');
    let isMouseDown = false;
    let offsetX, offsetY;

    modal.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        const rect = modal.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    });

    document.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            modal.style.position = 'absolute';
            modal.style.left = `${event.clientX - offsetX}px`;
            modal.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
};

</script>


<template>
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนียบัตรวิชาชีพชั้นสูง ชั้นปีที่ 2 (ผ่าน)
                    <div>
                        <router-link :to="`/admin-index/dcr-req`"> <button
                                class="btn btn-primary m-1">ขออนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/dcr-approved`"> <button
                                class="btn btn-success m-1">อนุมัติ</button></router-link>
                        <router-link :to="`/admin-index/dcr-active`"> <button
                                class="btn btn-warning m-1">เข้ารับการฝึก</button></router-link>
                        <router-link :to="`/admin-index/dcr-success`"> <button class="btn btn-success m-1">ผ่าน</button>
                        </router-link>
                        <router-link :to="`/admin-index/dcr-notpass`"> <button
                                class="btn btn-danger m-1">ไม่ผ่าน</button>
                        </router-link>
                        <button class="btn btn-info m-1" @click="exportExcel">การประเมินจากสถานประกอบการณ์</button>
                        <button class="btn btn-info m-1"
                            @click="exportExcelUniverSity">การประเมินจากมหาวิทยาลัย</button>
                        <button class="btn btn-info m-1" @click="updateAllStatusToCompleted">เสร็จสิ้นทั้งหมด</button>
                        <!-- <button class="btn btn-info m-1" @click="updateAllStatusToCompleted">เสร็จสิ้นทั้งหมด</button> -->
                    </div>
                </div>

                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">ลำดับ</th>
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
                            <td class="text-center">{{ index + 1 }}</td>
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.branch }}</td>
                            <td>{{ user.year }}</td>
                            <td class="text-center">
                                <button class="btn btn-success" @click="showModal(user.id)">ดูข้อมูล</button>
                                <router-link :to="`data-tec4-admin/${user.id}`">
                                    <!-- <button class="btn btn-success m-1">ข้อมูลการประเมิน</button> -->
                                </router-link>
                            </td>
                            <td>
                                <router-link :to="`/edit-cr2/${user.id}`">
                                    <button class="btn btn-primary m-1"><i
                                            class="fa-solid fa-pen-to-square"></i></button>
                                </router-link>
                                <button @click="removeData(user.id)" class="btn btn-danger m-1"><i
                                        class="fa-solid fa-trash-can"></i></button>
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
                        <!-- <div v-if="modalData.evaluation">
                            <p class="text-bold">ข้อมูลการประเมิน</p>
                            <p>ชื่อผู้ประเมิน: {{ modalData.evaluation.evaluatorName }}</p>
                            <p>สถานะผู้ประเมิน: {{ modalData.evaluation.evaluatorStatus }}</p>
                            <p>เวลา: {{ modalData.evaluation.time }}</p>
                            <p>การประเมิน: {{ modalData.evaluation.criteria ?
                                JSON.stringify(modalData.evaluation.criteria) : '' }}</p>
                        </div> -->
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
