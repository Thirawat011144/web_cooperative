<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header"> แบบฟอร์มแก้ไขเอกสารดาวน์โหลด </h5>
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
                        <p v-if="document.currentPdfFile">ไฟล์ปัจจุบัน: {{ document.currentPdfFile }}
                            <button @click="removePdfFile" type="button" class="btn btn-danger btn-sm">ลบไฟล์
                                PDF</button>
                        </p>
                    </div>
                    <div class="mb-3">
                        <label for="docFile" class="form-label">หรืออัพโหลดไฟล์ (Doc)</label>
                        <input @change="handleFileUpload" type="file" id="docFile" class="form-control"
                            accept=".doc,.docx">
                        <p v-if="document.currentDocFile">ไฟล์ปัจจุบัน: {{ document.currentDocFile }}
                            <button @click="removeDocFile" type="button" class="btn btn-danger btn-sm">ลบไฟล์
                                Doc</button>
                        </p>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();
const document = ref({
    name: '',
    link: '',
    pdfFile: null,
    currentPdfFile: '',
    docFile: null,
    currentDocFile: '',
});

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (event.target.id === 'pdfFile') {
        document.value.pdfFile = file;
    } else if (event.target.id === 'docFile') {
        document.value.docFile = file;
    }
};

const fetchDocument = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/downloads/${route.params.id}`);
        document.value = {
            name: response.data.name,
            link: response.data.link,
            pdfFile: null,
            currentPdfFile: response.data.pdfFile ? response.data.pdfFile.split('/').pop() : '',
            docFile: null,
            currentDocFile: response.data.docFile ? response.data.docFile.split('/').pop() : '',
        };
    } catch (error) {
        console.error('Error fetching document:', error);
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถดึงข้อมูลเอกสารได้",
            icon: "error",
        });
    }
};

const removePdfFile = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/downloads/${route.params.id}/pdf`);
        if (response.status === 200) {
            document.value.currentPdfFile = '';
            Swal.fire({
                title: "Success",
                text: "ลบไฟล์ PDF เรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถลบไฟล์ PDF ได้",
            icon: "error",
        });
    }
};

const removeDocFile = async () => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/downloads/${route.params.id}/doc`);
        if (response.status === 200) {
            document.value.currentDocFile = '';
            Swal.fire({
                title: "Success",
                text: "ลบไฟล์ Doc เรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถลบไฟล์ Doc ได้",
            icon: "error",
        });
    }
};

const submitForm = async () => {
    const formData = new FormData();
    formData.append('name', document.value.name);
    formData.append('link', document.value.link);
    if (document.value.pdfFile) {
        formData.append('pdfFile', document.value.pdfFile);
    }
    if (document.value.docFile) {
        formData.append('docFile', document.value.docFile);
    }
    try {
        const response = await axios.put(`http://localhost:3000/api/downloads/${route.params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response) {
            Swal.fire({
                title: "Success",
                text: "แก้ไขเอกสารเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
            router.push('/admin-index/list-download');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถแก้ไขเอกสารได้",
            icon: "error",
        });
    }
};

onMounted(() => {
    fetchDocument();
});
</script>

<style scoped>
.content {
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

.btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 0.25rem;
    cursor: pointer;
}

.btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
}
</style>
