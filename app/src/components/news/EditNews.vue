<template>
  <div class="content">
    <div class="card bg-white">
      <h5 class="card-header"> แก้ไขแบบฟอร์มแจ้งข้อมูลข่าวสาร </h5>
      <div class="card-header">
        <form @submit.prevent="updateData">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input v-model="news.title" type="text" id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="detail" class="form-label">Link</label>
            <input v-model="news.detail" type="text" id="detail" class="form-control" >
          </div>
          <div class="mb-3">
            <label for="pdfFile" class="form-label">Upload PDF</label>
            <input @change="handleFileUpload('pdfFile', $event)" type="file" id="pdfFile" class="form-control" accept=".pdf">
          </div>
          <div class="mb-3">
            <label for="docFile" class="form-label">Upload DOC</label>
            <input @change="handleFileUpload('docFile', $event)" type="file" id="docFile" class="form-control" accept=".doc,.docx">
          </div>
          <div class="mb-3">
            <label for="imageFile" class="form-label">Upload Image</label>
            <input @change="handleFileUpload('imageFile', $event)" type="file" id="imageFile" class="form-control" accept="image/*">
          </div>
          <button type="submit" class="btn btn-primary">แก้ไข</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const news = ref({
  title: '',
  detail: '',
  pdfFile: null,
  docFile: null,
  imageFile: null
});

const fetchData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news/${route.params.id}`);
    const newsData = response.data;
    news.value = { ...newsData };
  } catch (error) {
    Swal.fire({
      title: "error",
      text: (error.message, "ไม่สามารถแก้ไขได้"),
      icon: "error"
    });
  }
};

const handleFileUpload = (type, event) => {
  if (type === 'pdfFile') {
    news.value.pdfFile = event.target.files[0];
  } else if (type === 'docFile') {
    news.value.docFile = event.target.files[0];
  } else if (type === 'imageFile') {
    news.value.imageFile = event.target.files[0];
  }
};

const updateData = async () => {
  const result = await Swal.fire({
    title: 'แก้ไขข้อมูล',
    text: 'คุณจะไม่สามารถย้อนกลับได้!',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'ยืนยัน',
    cancelButtonText: 'ยกเลิก'
  });
  if (result.isConfirmed) {
    try {
      const formData = new FormData();
      formData.append('title', news.value.title);
      formData.append('detail', news.value.detail);
      if (news.value.pdfFile) {
        formData.append('pdfFile', news.value.pdfFile);
      }
      if (news.value.docFile) {
        formData.append('docFile', news.value.docFile);
      }
      if (news.value.imageFile) {
        formData.append('imageFile', news.value.imageFile);
      }

      const response = await axios.put(`${config.api_path}/news/${route.params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === 'Success') {
        Swal.fire({
          title: "สำเร็จ",
          text: "แก้ไขข้อมูลสำเร็จ",
          icon: "success",
        });

        router.push('/admin-index/list-news');
      }
    } catch (error) {
      Swal.fire({
        title: "error",
        text: (error.message, "Update Error"),
        icon: "error"
      });
    }
  }
};

onMounted(() => {
  fetchData();
});

</script>

<style scoped></style>
