<template>
    <div class="content mt-4">
        <div class="card">
            <h5 class="card-header">ข้อมูลสถานประกอบการที่ลงทะเบียน</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">ชื่อโรงเรียน/วิทยาลัย</th>
                        <th scope="col">วันที่สร้าง</th>
                        <th scope="col">Tools</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(internship, index) in jobs" :key="internship.id">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ internship.company }}</td>
                        <td>{{ formatDate(internship.createdAt) }}</td>
                        <td class="p-3">
                            <router-link :to="`/admin-index/edit-practice/${internship.id}`">
                                <button class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                            </router-link>
                            <button @click="removeData(internship.id)" class="btn btn-danger"><i
                                    class="fa-solid fa-trash-can"></i></button>
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

const jobs = ref([]);

// ฟังก์ชันดึงข้อมูลสถานที่ฝึกงานและจัดเรียงตามวันที่สร้าง
const fetchJobs = async () => {
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching`);
        jobs.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error('Error fetching jobs:', error);
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
            const response = await axios.delete(`${config.api_path}/practice-teaching/${id}`);
            jobs.value = jobs.value.filter(internship => internship.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลผู้ใช้สำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchJobs();
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
    fetchJobs();
});
</script>

<style></style>