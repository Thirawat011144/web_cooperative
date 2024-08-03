<template>
    <div class="content mt-4">
        <div class="card">
            <h5 class="card-header">ข้อมูลเอกสารที่ลงทะเบียน</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ชื่อเอกสาร</th>
                        <th scope="col">ลิงค์</th>
                        <th scope="col">ไฟล์ PDF</th>
                        <th scope="col">ไฟล์ Doc</th>
                        <th scope="col">วันที่ลงประกาศ</th>
                        <th scope="col">Tools</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(document, index) in documents" :key="document.id">
                        <td>{{ document.name }}</td>
                        <td>
                            <a v-if="document.link" :href="document.link" target="_blank">ดาวน์โหลดลิงค์</a>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <a v-if="document.pdfFile" :href="document.pdfFile" target="_blank">ดาวน์โหลด PDF</a>
                            <span v-else>-</span>
                        </td>
                        <td>
                            <a v-if="document.docFile" :href="document.docFile" target="_blank">ดาวน์โหลด Doc</a>
                            <span v-else>-</span>
                        </td>
                        <td>{{ formatDate(document.createdAt) }}</td>
                        <td class="p-3">
                            <router-link :to="`/admin-index/edit-download/${document.id}`">
                                <button class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></button>
                            </router-link>
                            <button @click="removeData(document.id)" class="btn btn-danger"><i
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

const documents = ref([]);

// ฟังก์ชันดึงข้อมูลเอกสารและจัดเรียงตามวันที่สร้าง
const fetchDocuments = async () => {
    try {
        const response = await axios.get(`${config.api_path}/downloads`);
        documents.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error('Error fetching documents:', error);
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
            await axios.delete(`${config.api_path}/downloads/${id}`);
            documents.value = documents.value.filter(document => document.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลเอกสารสำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchDocuments();
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
    fetchDocuments();
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