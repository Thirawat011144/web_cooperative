<template>
    <div>
        <Navbar />
        <div class="bg">
            <div class="container">
                <div class="header">
                    <router-link to="/internship">
                        <h4 class="text-center">{{ job.company }}</h4>
                    </router-link>
                    <router-link to="/internship">
                        <button class="post-job-button">ย้อนกลับไปหน้าแรก</button>
                    </router-link>
                </div>
                <div class="content">
                    <div class="section">
                        <div class="info-container">
                            <div class="info-column">
                                <p><label>ชื่อบริษัท/ชื่อร้าน:</label> {{ job.company }}</p>
                                <p><label>ที่อยู่:</label> {{ job.location }}</p>
                                <p><label>ชื่อผู้ติดต่อ:</label> {{ job.contactPerson }}</p>
                                <p><label>ตำแหน่ง:</label> {{ job.contactPosition }}</p>
                                <p><label>โทรศัพท์:</label> {{ job.contactTel }}</p>
                            </div>
                            <div class="info-separator"></div>
                            <div class="info-column">
                                <p><label>อีเมล์:</label> {{ job.contactEmail }}</p>
                                <p><label>ที่อยู่สำหรับติดต่อ:</label> {{ job.location }}</p>
                                <p><label>ช่องทางการติดต่ออื่นๆ:</label> {{ job.otherContact }}</p>
                                <p><label>สาขาที่รับ:</label> {{ job.branch }}</p>
                            </div>
                        </div>
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
const job = ref({}); // เก็บข้อมูลสถานที่ฝึกงาน

// ฟังก์ชันดึงข้อมูลจาก API
const fetchJob = async () => {
    try {
        const response = await axios.get(`${config.api_path}/internship/${route.params.id}`);
        job.value = response.data;
    } catch (error) {
        console.error('Error fetching job:', error);
    }
};

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
    fetchJob();
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

.header h4 {
    margin: 0;
    font-size: 24px;
    text-align: center;
    flex: 1;
}

.header .post-job-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 20px;
}

.content {
    padding: 20px;
}

.section {
    margin-bottom: 20px;
}

.info-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}

.info-column {
    flex: 1;
}

.info-separator {
    width: 1px;
    background-color: #ddd;
    margin: 0 20px;
    height: auto;
}
</style>
