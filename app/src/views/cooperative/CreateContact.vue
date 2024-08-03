<template>
  <div class="content mt-4">
    <div class="card bg-white">
      <h5 class="card-header">แบบฟอร์มเกี่ยวกับสหกิจศึกษา</h5>
      <div class="card-header">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="description" class="form-label">รายละเอียด (รูปภาพ)</label>
            <input type="file" @change="onFileChange" id="description" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="address" class="form-label">ที่อยู่</label>
            <textarea v-model="cooperativeEducation.address" id="address" class="form-control" rows="2"
              required></textarea>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">อีเมลล์</label>
            <input v-model="cooperativeEducation.email" type="email" id="email" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">เบอร์โทร</label>
            <input v-model="cooperativeEducation.phone" type="tel" id="phone" class="form-control" required />
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

import config from '../../../config';

const router = useRouter();

const cooperativeEducation = ref({
  address: '',
  email: '',
  phone: '',
});
const imageFile = ref(null);

const onFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

const submitForm = async () => {
  try {
    const formData = new FormData();
    formData.append('address', cooperativeEducation.value.address);
    formData.append('email', cooperativeEducation.value.email);
    formData.append('phone', cooperativeEducation.value.phone);
    formData.append('description', imageFile.value);

    const response = await axios.post(`${config.api_path}/contact`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response) {
      Swal.fire({
        title: "Success",
        text: "เพิ่มข้อมูลสหกิจศึกษาเรียบร้อยแล้ว",
        icon: "success",
        timer: 2000
      });
      router.push('/admin-index/cooperative-education');
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "ไม่สามารถเพิ่มข้อมูลได้",
      icon: "error",
    });
  }
};
</script>

<style scoped></style>
