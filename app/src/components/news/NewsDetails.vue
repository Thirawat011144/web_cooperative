<template>
    <div>
        <Navbar />
        <div class="bg">
            <div class="container">
                <div class="header">
                    <h1>{{ announcement.title }}</h1>
                    <router-link to="/news">
                        <button class="post-news-button">ย้อนกลับไปหน้าแรก</button>
                    </router-link>
                </div>
                <div class="content">
                    <img v-if="announcement.imageFile" :src="getFileTypeUrl(announcement.imageFile)"
                        alt="Announcement Image" class="announcement-image">
                    <img v-else class="announcement-image" src="../../assets/img/917.png">
                    <div class="announcement-details">
                        <div v-html="announcement.detail"></div>
                        <a v-if="announcement.pdfFile" :href="getFileTypeUrl(announcement.pdfFile)" target="_blank"
                            class="news-link">ดาวน์โหลด PDF</a>
                        <a v-if="announcement.docFile" :href="getFileTypeUrl(announcement.docFile)" target="_blank"
                            class="news-link">ดาวน์โหลด DOC</a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const route = useRoute();
const announcement = ref({}); // สำหรับเก็บข้อมูลข่าว

// ฟังก์ชันดึงข้อมูลจาก API
const fetchAnnouncement = async () => {
    try {
        const response = await axios.get(`${config.api_path}/news/${route.params.id}`);
        announcement.value = response.data;
    } catch (error) {
        console.error('Error fetching announcement:', error);
    }
};

const getFileTypeUrl = (fileUrl) => {
    console.log(fileUrl)
    return fileUrl ? `${fileUrl}` : '#';
};

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
    fetchAnnouncement();
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
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.content {
    padding: 20px;
}

.announcement-details {
    margin-top: 20px;
    font-size: 16px;
    line-height: 1.6;
}

.announcement-image {
    margin-top: 20px;
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.news-link {
    display: block;
    margin-top: 10px;
    text-decoration: none;
    color: #1e90ff;
    /* Link color */
}

.news-link:hover {
    text-decoration: underline;
}
</style>
