<template>
    <div>
        <Navbar />
        <div class="bg">
            <div class="container">
                <div class="header">
                    <h1>สถานที่ฝึกงาน</h1>

                    <router-link to="/list-practice">
                        <button class="post-job-button">สถานที่ฝึกสอน</button>
                    </router-link>
                </div>
                <div class="content">
                    <div class="job-listing" v-for="job in paginatedJobs" :key="job.id">
                        <div class="job-header">
                            <h6>{{ job.companyName }}</h6>
                            <span class="job-type">{{ formatDate(job.createdAt) }}</span>
                        </div>
                        <div class="job-details">
                            <p><span class="text-bold">ที่อยู่:</span> {{ job.companyAddress }}</p>
                            <p><span class="text-bold">โทรศัพท์:</span> {{ job.companyPhone }}</p>
                        </div>
                    </div>
                </div>
                <div class="pagination">
                    <button @click="prevPage" :disabled="currentPage === 1"><i
                            class="fa-solid fa-backward"></i></button>
                    <span>หน้า {{ currentPage }} จาก {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages"><i
                            class="fa-solid fa-forward"></i></button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '@/components/HomeView/Navbar.vue';
import Footer from '@/components/HomeView/Footer.vue';

import config from '../../../../config';

const jobs = ref([]);
const currentPage = ref(1);
const perPage = ref(4); // จำนวนสถานที่ฝึกงานต่อหน้า

const fetchJobs = async () => {
    try {
        const response = await axios.get(`${config.api_path}/companies`);
        const uniqueAddresses = new Set();
        const uniqueCompanyName = new Set();

        jobs.value = response.data
            .filter(job => {
                if (
                    job.userDetails.branch === 'สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ' &&
                    !uniqueAddresses.has(job.companyAddress) &&
                    !uniqueCompanyName.has(job.companyName)
                ) {
                    uniqueAddresses.add(job.companyAddress);
                    uniqueCompanyName.add(job.companyName);
                    return true;
                }
                return false;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
};


const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
};

const paginatedJobs = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return jobs.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(jobs.value.length / perPage.value));

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
    fetchJobs();
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

.post-job-button {
    background-color: #ffffff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.content {
    padding: 20px;
}

.job-listing {
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    margin-bottom: 18px;
    border-radius: 8px;
}

.job-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.job-type {
    color: #555;
}

.job-details p {
    margin: 5px 0;
}

.text-bold {
    font-weight: bold;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: absolute;
    bottom: 40px;
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