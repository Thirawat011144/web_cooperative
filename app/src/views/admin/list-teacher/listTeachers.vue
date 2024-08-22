<template>
    <div class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">ข้อมูลอาจารย์</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>สาขาวิชา</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.branch }}</td>
                            <td style="display: flex; align-items: center;">
                                <select @change="(e) => handleChangRole(user, e)" v-model="user.role" class="w-100"
                                    style="border-color:black ; border-radius: 3px">
                                    <option v-for="roleItem in role" :key="roleItem">{{ roleItem }}</option>
                                </select>
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

const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/users`);
        users.value = response.data.filter(user => user.year === null && user.studentID === null);
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

onMounted(() => {
    fetchData();
});
</script>


<style scoped></style>
