<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import * as XLSX from 'xlsx';
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcel, downloadExcelHight } from "@/utils/downloadBeforeEvaluation";

const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
let branch = null;
const changYears = ref(null);  // ใช้รับค่าชั้นปีที่เลือก

if (userData.branch) {
    branch = userData.branch;
} else {
    console.log('No userData found in localStorage');
}

// ฟังก์ชันที่รับค่าชั้นปีจากปุ่มที่ถูกคลิก
const changYear = (year) => {
    changYears.value = year;  // กำหนดค่าชั้นปี
    fetchData();  // เรียกใช้ฟังก์ชัน fetchData เพื่อกรองข้อมูลใหม่ตามชั้นปี
}

const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/users`);
        users.value = response.data.filter(user =>
            user.status === "เสร็จสิ้น" &&
            user.branch === branch &&
            user.year === changYears.value  // กรองตามชั้นปีที่เลือก
        );
        console.log(users.value)
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error"),
            icon: "error"
        });
    }
};

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

const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id);
});

onMounted(() => {
    changYear('ปวช 3'); // เริ่มต้นด้วยการแสดงข้อมูล ปวช 3
});
</script>

<template>
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">
                    <div>
                        <button @click="changYear('ปวช 3')" class="btn btn-primary ms-2">ปวช 3</button>
                        <button @click="changYear('ปวส 2')" class="btn btn-primary ms-2">ปวส 2</button>
                        <button @click="changYear('ป.ตรี ปีที่ 2')" class="btn btn-primary ms-2">ป.ตรี ปีที่ 2</button>
                        <button @click="changYear('ป.ตรี ปีที่ 4')" class="btn btn-primary ms-2">ป.ตรี ปีที่ 4</button>
                        <button class="btn btn-info m-2" v-if="changYears === 'ป.ตรี ปีที่ 4'"
                            @click="downloadExcelHight('student', sortedUsers)">ดาวน์โหลด
                            Excel</button>
                        <button class="btn btn-info m-2" v-if="changYears !== 'ป.ตรี ปีที่ 4'"
                            @click="downloadExcel('student', sortedUsers)">ดาวน์โหลด
                            Excel</button>
                    </div>
                </div>
                <!-- ตารางแสดงข้อมูล -->
                <table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">ลำดับ</th>
                            <th>รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>สาขา</th>
                            <th>ชั้นปี</th>
                            <th class="text-center">ชื่อสถานประกอบการ</th>
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
                            </td>
                            <td>
                                <router-link :to="`/edit-cr2/${user.id}`">
                                    <button class="btn btn-primary m-1">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </router-link>
                                <button @click="removeData(user.id)" class="btn btn-danger m-1">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
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
                        <div v-else-if="modalData.collegeDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>สถานประกอบการ: {{ modalData.collegeDetails.collegeName }}</p>
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


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

body {
    font-family: 'Sarabun', sans-serif;
}
</style>
