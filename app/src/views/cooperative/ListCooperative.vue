<template>
    <div class="content mt-4">
        <div class="card">
            <h5 class="card-header">ข้อมูลสหกิจศึกษา</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ที่อยู่</th>
                        <th scope="col">อีเมล</th>
                        <th scope="col">เบอร์โทร</th>
                        <th scope="col">รายละเอียด (รูปภาพ)</th>
                        <th scope="col">วันที่ลงประกาศ</th>
                        <th scope="col">เครื่องมือ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(cooperative, index) in cooperatives" :key="cooperative.id">
                        <td>{{ cooperative.address }}</td>
                        <td>{{ cooperative.email }}</td>
                        <td>{{ cooperative.phone }}</td>
                        <td>
                            <img :src="`${config.api_path}${cooperative.description}`" alt="รูปภาพสหกิจศึกษา"
                                width="100">
                        </td>
                        <td>{{ formatDate(cooperative.createdAt) }}</td>
                        <td class="p-3">
                            <router-link :to="`/admin-index/edit-cooperative/${cooperative.id}`">
                                <button class="btn btn-primary">✏️ แก้ไข</button>
                            </router-link>
                            <button @click="removeData(cooperative.id)" class="btn btn-danger">🗑️ ลบ</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import config from "../../../config";

const cooperatives = ref([]);

// ฟังก์ชันดึงข้อมูลสหกิจศึกษาและจัดเรียงตามวันที่สร้าง
const fetchCooperatives = async () => {
    try {
        const response = await axios.get(`${config.api_path}/contact/admin`);
        if (Array.isArray(response.data)) {
            cooperatives.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else {
            console.error('Error: Data is not an array');
        }
    } catch (error) {
        console.error('Error fetching cooperatives:', error);
    }
};

// ฟังก์ชันฟอร์แมตวันที่
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
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
            await axios.delete(`${config.api_path}/contact/${id}`);
            cooperatives.value = cooperatives.value.filter(cooperative => cooperative.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลสหกิจศึกษาสำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchCooperatives();
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

onMounted(() => {
    fetchCooperatives();
});
</script>

<style scoped>
.content {
    /* max-width: 1000px; */
    margin: 0 auto;
}

.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.card-header {
    background-color: #f7f7f7;
    border-bottom: 1px solid #ddd;
    padding: 10px 20px;
    font-size: 1.25em;
    font-weight: bold;
}

.table {
    width: 100%;
    margin: 20px 0;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

.table tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
}

.table tbody tr:hover {
    background-color: #f1f1f1;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}
</style>
