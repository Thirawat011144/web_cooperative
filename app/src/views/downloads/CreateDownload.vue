<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header"> แบบฟอร์มเพิ่มเอกสารดาวน์โหลด </h5>
            <div class="card-body">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="name" class="form-label">ชื่อเอกสาร</label>
                        <input v-model="document.name" type="text" id="name" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="link" class="form-label">อัพโหลดลิงค์</label>
                        <input v-model="document.link" type="text" id="link" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="pdfFile" class="form-label">หรืออัพโหลดไฟล์ (PDF)</label>
                        <input @change="handleFileUpload" type="file" id="pdfFile" class="form-control" accept=".pdf">
                    </div>
                    <!-- <div class="mb-3">
                        <label for="docLink" class="form-label">ลิงค์ดาวน์โหลด (Doc)</label>
                        <input v-model="document.docLink" type="text" id="docLink" class="form-control">
                    </div> -->
                    <div class="mb-3">
                        <label for="docFile" class="form-label">หรืออัพโหลดไฟล์ (Doc)</label>
                        <input @change="handleFileUpload" type="file" id="docFile" class="form-control"
                            accept=".doc,.docx">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();

const document = ref({
    name: '',
    link: '',
    pdfFile: null,
    // docLink: '',
    docFile: null,
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (event.target.id === 'pdfFile') {
        document.value.pdfFile = file;
    } else if (event.target.id === 'docFile') {
        document.value.docFile = file;
    }
};

const submitForm = async () => {
    const formData = new FormData();
    formData.append('name', document.value.name);
    formData.append('link', document.value.link);
    // formData.append('docLink', document.value.docLink);
    if (document.value.pdfFile) {
        formData.append('pdfFile', document.value.pdfFile);
    }
    if (document.value.docFile) {
        formData.append('docFile', document.value.docFile);
    }
    try {
        const response = await axios.post(`http://localhost:3000/api/downloads`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response) {
            Swal.fire({
                title: "Success",
                text: "เพิ่มเอกสารเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
            router.push('/admin-index/list-download');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถเพิ่มเอกสารได้",
            icon: "error",
        });
    }
};
</script>

<style scoped>
.content {
    /* max-width: 600px; */
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
    text-align: center;
}

.card-body {
    padding: 20px;
}

.mb-3 {
    margin-bottom: 1rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-control {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
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
</style>