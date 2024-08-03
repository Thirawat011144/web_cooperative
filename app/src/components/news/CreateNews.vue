<template>
  <div class="content mt-4">
    <div class="card bg-white">
      <h5 class="card-header">แบบฟอร์มแจ้งข้อมูลข่าวสาร</h5>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="title" class="form-label">ชื่อข่าว</label>
            <input v-model="news.title" type="text" id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="imageFile" class="form-label">Upload Image</label>
            <input @change="handleFileUpload('imageFile', $event)" type="file" id="imageFile" class="form-control"
              accept="image/*">
          </div>
          <div class="mb-3">
            <label for="detail" class="form-label">รายละเอียด</label>
            <textarea v-model="news.detail" id="detail" class="form-control" ></textarea>
          </div>
          <div class="mb-3">
            <label for="pdfFile" class="form-label">Upload PDF</label>
            <input @change="handleFileUpload('pdfFile', $event)" type="file" id="pdfFile" class="form-control"
              accept=".pdf">
          </div>
          <div class="mb-3">
            <label for="docFile" class="form-label">Upload DOC</label>
            <input @change="handleFileUpload('docFile', $event)" type="file" id="docFile" class="form-control"
              accept=".doc,.docx">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  setup() {
    const news = ref({
      title: '',
      imageFile: null,
      detail: '',
      pdfFile: null,
      docFile: null,
    });

    const router = useRouter();

    const handleFileUpload = (type, event) => {
      if (type === 'pdfFile') {
        news.value.pdfFile = event.target.files[0];
      } else if (type === 'docFile') {
        news.value.docFile = event.target.files[0];
      }else if (type === 'imageFile') {
        news.value.imageFile = event.target.files[0];
      }
    };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('title', news.value.title);
      formData.append('detail', news.value.detail);
      if (news.value.pdfFile) {
        formData.append('pdfFile', news.value.pdfFile);
      }
      if (news.value.docFile) {
        formData.append('docFile', news.value.docFile);
      }if (news.value.imageFile) {
        formData.append('imageFile', news.value.imageFile);
      }

      try {
        const response = await axios.post('http://localhost:3000/api/news/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response) {
          Swal.fire({
            title: 'Success',
            text: 'แจ้งข่าวประชาสัมพันธ์เรียบร้อยแล้ว',
            icon: 'success',
            timer: 2000,
          });
          router.push('/admin-index/list-news');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'ไม่สามารถเพิ่มข่าวสารได้',
          icon: 'error',
        });
      }
    };

    return {
      news,
      handleFileUpload,
      submitForm,
    };
  },
};
</script>

<style scoped>
.card-header {
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}
</style>
