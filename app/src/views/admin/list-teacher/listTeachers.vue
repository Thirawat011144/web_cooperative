<template>
    <div class="content">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center" style="width: 100%;">
                <h4 class="">ข้อมูลอาจารย์</h4>
                <!-- ปุ่มที่ใช้เปิด modal -->
                <button @click="showModal" class="btn btn-primary ml-auto">เพิ่มรายชื่อ</button>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>ลำดับ</th>
                        <th>ชื่อ-นามสกุล</th>
                        <!-- <th>สาขาวิชา</th> -->
                        <th>การจัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in teachers" :key="user.id">
                        <td>{{ index + 1 }}</td>
                        <td v-if="user.firstName === null"> ยังไม่มีข้อมูล </td>
                        <td v-else>{{ user.firstName }} {{ user.lastName }}</td>
                        <!-- <td v-if="user.branch === null">ยังไม่มีข้อมูล</td> -->
                        <!-- <td v-else>{{ user.branch }}</td> -->
                        <td style="display: flex; align-items: center;">
                            <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm ml-2">ลบ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal สำหรับเพิ่ม username และ password -->
        <div v-if="isModalVisible" class="modal-backdrop">
            <div class="modal-content">
                <button @click="closeModal" class="btn-close ml-auto"></button>
                <div class="modal-body">
                    <form @submit.prevent="addTeacher">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="newTeacherUsername" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="newTeacherPassword"
                                required>
                        </div>
                        <button type="submit" class="btn btn-primary">เพิ่มรายชื่อ</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';

const teachers = ref([]);
const newTeacherUsername = ref(''); // เก็บ username ที่ผู้ใช้กรอก
const newTeacherPassword = ref(''); // เก็บ password ที่ผู้ใช้กรอก

const isModalVisible = ref(false);  // ตัวแปรควบคุมการแสดงผล Modal

// ฟังก์ชันสำหรับเปิด modal
const showModal = () => {
    newTeacherUsername.value = '';  // รีเซ็ตค่า username ในฟอร์ม
    newTeacherPassword.value = '';  // รีเซ็ตค่า password ในฟอร์ม
    isModalVisible.value = true;  // แสดง modal
};

// ฟังก์ชันสำหรับปิด Modal
const closeModal = () => {
    isModalVisible.value = false;
};

// ฟังก์ชันสำหรับเพิ่มอาจารย์
const addTeacher = async () => {
    try {
        await axios.post(`${config.api_path}/teacher`, {
            userName: newTeacherUsername.value,
            password: newTeacherPassword.value
        });

        // หากเพิ่มสำเร็จ ทำการรีเฟรชตารางข้อมูล
        await fetchData();

        // แสดงข้อความแจ้งเตือนความสำเร็จ
        Swal.fire({
            title: "Success",
            text: "เพิ่มรายชื่ออาจารย์เรียบร้อยแล้ว",
            icon: "success"
        });

        // ปิด modal หลังจากเพิ่มสำเร็จ
        closeModal();
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถเพิ่มรายชื่ออาจารย์ได้",
            icon: "error"
        });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลอาจารย์
const fetchData = async () => {
    try {
        const teachersResponse = await axios.get(`${config.api_path}/teachers`);
        teachers.value = teachersResponse.data;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: error.message,
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
            await axios.delete(`${config.api_path}/teacher/${id}`);
            teachers.value = teachers.value.filter(user => user.id !== id); // อัปเดตตารางหลังจากลบ
            Swal.fire({
                title: "Deleted",
                text: "ลบข้อมูลเรียบร้อยแล้ว",
                icon: "success"
            });
            fetchData(); // ดึงข้อมูลใหม่หลังจากลบสำเร็จ
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

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.modal-close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
}
</style>
