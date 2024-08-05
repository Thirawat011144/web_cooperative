<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';
import * as XLSX from 'xlsx'; // import library
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcelHight } from "@/utils/downloadBeforeEvaluation";

// กำหนดค่าเริ่มต้นสำหรับข้อมูลต่าง ๆ
const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const branch = localStorage.getItem(config.branch);

// ฟังก์ชันดึงข้อมูล
const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/users`);
        users.value = response.data.filter(user => user.status === "ขออนุมัติ" && user.year === "ป.ตรี ปีที่ 4" && user.branch === branch);
    } catch (error) {
        Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "Cr2 Error: " + error.message,
            icon: "error"
        });
    }
};

// แสดง Modal
const showModal = async (id) => {
    isModalVisible.value = true;
    try {
        const response = await axios.get(`${config.api_path}/user/${id}`);
        modalData.value = response.data;
        makeModalDraggable();
    } catch (error) {
        Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "Cr2 Error Fetching Data: " + error.message,
            icon: 'error'
        });
    }
};

// ปิด Modal
const closeModal = () => {
    isModalVisible.value = false;
    modalData.value = null;
};

// ฟังก์ชันลบข้อมูล
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
            await axios.delete(`${config.api_path}/users/${id}`);
            users.value = users.value.filter(user => user.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลผู้ใช้สำเร็จ',
                icon: 'success',
            });
            fetchData();
        } catch (error) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: "Cr2 Error DeleteData: " + error.message,
                icon: 'error'
            });
        }
    }
};

// จัดเรียงข้อมูลผู้ใช้
const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id);
});

// ดึงข้อมูลเมื่อ component ถูก mount
onMounted(() => {
    fetchData();
});
</script>

<template>
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">
                    ข้อมูลนักศึกษาชั้นปริญาตรีชั้นปีที่ 4 (ผู้ขออนุมัติ)
                    <div>
                        <router-link :to="`/admin-index/Ec4-req`">
                            <button class="btn btn-primary m-1">ขออนุมัติ</button>
                        </router-link>
                        <router-link :to="`/admin-index/Ec4-approved`">
                            <button class="btn btn-success m-1">อนุมัติ</button>
                        </router-link>
                        <router-link :to="`/admin-index/Ec4-active`">
                            <button class="btn btn-warning m-1">เข้ารับการฝึก</button>
                        </router-link>
                        <router-link :to="`/admin-index/Ec4-success`">
                            <button class="btn btn-success m-1">ผ่าน</button>
                        </router-link>
                        <router-link :to="`/admin-index/Ec4-notpass`">
                            <button class="btn btn-danger m-1">ไม่ผ่าน</button>
                        </router-link>
                        <button class="btn btn-info m-1" @click="downloadExcelHight('student', sortedUsers)">ดาวน์โหลด
                            Excel</button>
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
                            <th>เครื่องมือ</th>
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
                                <router-link :to="`/edit-ec4/${user.id}`">
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
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
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
                            <p>โรงเรียน/วิทยาลัย: {{ modalData.collegeDetails.collegeName }}</p>
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
/* Add your styles here */
</style>
