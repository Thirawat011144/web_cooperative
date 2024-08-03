<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header">แก้ไขข้อมูลสหกิจศึกษา</h5>
            <div class="card-header">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label for="description" class="form-label">รายละเอียด (รูปภาพ)</label>
                        <input type="file" @change="onFileChange" id="description" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">ที่อยู่</label>
                        <textarea v-model="cooperativeEducation.address" id="address" class="form-control" rows="2"
                            required></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">อีเมลล์</label>
                        <input v-model="cooperativeEducation.email" type="email" id="email" class="form-control"
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">เบอร์โทร</label>
                        <input v-model="cooperativeEducation.phone" type="tel" id="phone" class="form-control"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary">Save</button>
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

import config from '../../../config';

const router = useRouter();
const route = useRoute();

const cooperativeEducation = ref({
    address: '',
    email: '',
    phone: '',
});
const imageFile = ref(null);

const onFileChange = (e) => {
    imageFile.value = e.target.files[0];
};

const loadCooperativeData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/contact/admin/${route.params.id}`);
        if (response.data) {
            cooperativeEducation.value = response.data;
        }
    } catch (error) {
        console.error('Error loading cooperative data:', error);
    }
};

const submitForm = async () => {
    try {
        const formData = new FormData();
        formData.append('address', cooperativeEducation.value.address);
        formData.append('email', cooperativeEducation.value.email);
        formData.append('phone', cooperativeEducation.value.phone);
        if (imageFile.value) {
            formData.append('description', imageFile.value);
        }

        const response = await axios.put(`${config.api_path}/contact/${route.params.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response) {
            Swal.fire({
                title: "Success",
                text: "แก้ไขข้อมูลสหกิจศึกษาเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
            router.push('/admin-index/cooperative-education');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถแก้ไขข้อมูลได้",
            icon: "error",
        });
    }
};

onMounted(() => {
    loadCooperativeData();
});
</script>

<style scoped></style>
