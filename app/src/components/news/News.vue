<template>
  <div>
    <Navbar />
    <div class="bg">
      <div class="container">
        <div class="header">
          <h1>ข่าวประชาสัมพันธ์</h1>
          <router-link to="/list-announcements">
            <button class="post-news-button">ดูข่าวทั้งหมด</button>
          </router-link>
        </div>
        <div class="content">
          <div class="announcement-listing" v-for="announcement in paginatedAnnouncements" :key="announcement.id">
            <div class="announcement-header">
              <h6>{{ announcement.title }}</h6>
              <span class="announcement-date">
                <span class="icon">🕒</span>{{ formatDate(announcement.createdAt) }}
              </span>
            </div>
            <div class="announcement-details mt-4">
              <router-link to="/news-detail/:id">
                <p><router-link :to="`/news-detail/${announcement.id}`">
                    <p v-if="announcement.title">ดูรายละเอียด</p>
                  </router-link></p>
              </router-link>
            </div>
   
          </div>
        </div>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1"><i class="fa-solid fa-backward"></i></button>
          <span>หน้า {{ currentPage }} จาก {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages"><i class="fa-solid fa-forward"></i></button>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const announcements = ref([]);
const currentPage = ref(1);
const perPage = ref(4); // จำนวนข่าวประชาสัมพันธ์ต่อหน้า

const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${config.api_path}/news`);
    announcements.value = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (error) {
    console.error('Error fetching announcements:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};


const getFileTypeUrl = (fileUrl) => {
  return fileUrl ? `${config.api_path}/uploads/${fileUrl}` : '#';
};


const paginatedAnnouncements = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  const end = start + perPage.value;
  return announcements.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(announcements.value.length / perPage.value));

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  fetchAnnouncements();
});
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bg::before {
  content: "";
  background-image: url('../../assets/img/8.1.png');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.container {
  width: 100%;
  max-width: 1000px;
  padding: 20px;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 20px auto;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding-bottom: 80px;
  /* เพิ่มระยะห่างด้านล่าง */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.post-news-button {
  background-color: #ffffff;
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content {
  padding: 20px;
}

.announcement-listing {
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 25px;
  margin-bottom: 10px;
  border-radius: 8px;
  margin: 0px auto;
  margin-bottom: 20px;
}

.announcement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.announcement-date {
  color: #555;
}

.announcement-details p {
  margin: 5px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  position: absolute;
  bottom: 45px;
  left: 50%;
  transform: translateX(-50%);
}

.pagination button {
  background-color: #b23aca;
  color: #fff;
  border: none;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}
</style>
