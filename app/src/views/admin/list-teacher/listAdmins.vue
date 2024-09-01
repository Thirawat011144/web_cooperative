<template>
    <div class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">ข้อมูลผู้ดูแล</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <!-- <th>สาขาวิชา</th> -->
                            <th>สถานะ</th>
                            <th>การจัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in admins" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <!-- <td>{{ user.branch }}</td> -->
                            <td style="display: flex; align-items: center;">
                                <button v-if="user.statusStart === 'notVerified'" @click="verifyUser(user)"
                                    class="btn btn-warning btn-sm">
                                    ขอยืนยันตัวตน
                                </button>
                                <span v-else>
                                    <button class="btn btn-success btn-sm">ยืนยันตัวตนเรียบร้อยแล้ว</button>
                                </span>

                            </td>
                            <td>
                                <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm ml-2">ลบ</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup>
import axios from "axios";
import { ref, onMounted, watch } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';

const users = ref([]);
const role = ["admin", "teacher", "user"];

const admins = ref([]);
const teachers = ref([]);

const fetchData = async () => {
    try {
        // ทำการขอข้อมูลจาก API สำหรับ admins และ teachers
        const adminsResponse = await axios.get(`${config.api_path}/admins`);
        // const teachersResponse = await axios.get(`${config.api_path}/teachers`);

        // เก็บข้อมูลแยกกันในตัวแปร admins และ teachers
        admins.value = adminsResponse.data;
        // teachers.value = teachersResponse.data;
        // users.value = [...adminsResponse.data, ...teachersResponse.data];
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error"
        });
    }
};

const handleChangRole = (user, e) => {
    user.role = e.target.value;
    updateUserRole(user);
};

const updateUserRole = async (user) => {
    try {
        await axios.put(`${config.api_path}/user/${user.id}`, {
            role: user.role
        });
        Swal.fire({
            title: "Success",
            text: "User role updated successfully",
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Failed to update user role",
            icon: "error"
        });
    }
};

const deleteUser = async (id) => {
    try {
        const confirmation = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการลบผู้ใช้งานนี้หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        });

        if (confirmation.isConfirmed) {
            await axios.delete(`${config.api_path}/users/${id}`);
            users.value = users.value.filter(user => user.id !== id); // อัปเดตตารางหลังจากลบ
            Swal.fire({
                title: "Deleted",
                text: "ลบข้อมูลเรียบร้อยแล้ว",
                icon: "success"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถลบข้อมูลได้",
            icon: "error"
        });
    }
};

const verifyUser = async (user) => {
    try {
        const confirmation = await Swal.fire({
            title: "คุณแน่ใจหรือไม่?",
            text: "คุณต้องการยืนยันตัวตนของผู้ใช้งานนี้หรือไม่?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ยืนยันตัวตน!',
            cancelButtonText: 'ยกเลิก'
        });

        if (confirmation.isConfirmed) {
            // อัพเดทสถานะในฐานข้อมูลเป็น 'verified'
            await axios.put(`${config.api_path}/admin/${user.id}`, {
                statusStart: 'verified'
            });

            // อัพเดทสถานะใน front-end
            user.statusStart = 'verified';

            Swal.fire({
                title: "Success",
                text: "ยืนยันตัวตนเรียบร้อยแล้ว",
                icon: "success"
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถยืนยันตัวตนได้",
            icon: "error"
        });
    }
};

onMounted(() => {
    fetchData();
});
</script>


<style scoped></style>
