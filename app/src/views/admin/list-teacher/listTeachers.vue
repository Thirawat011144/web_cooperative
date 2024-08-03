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
                            <td>
                                <select @change="(e) => handleChangRole(user, e)" v-model="user.role" class="w-100"
                                    style="border-color: seashell;">
                                    <option v-for="roleItem in role" :key="roleItem">{{ roleItem }}</option>
                                </select>
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

onMounted(() => {
    fetchData();
});
</script>


<style scoped></style>
