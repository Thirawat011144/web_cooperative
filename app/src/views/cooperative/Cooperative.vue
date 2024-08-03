<template>
    <div>
        <Navbar />
        <div class="bg">
            <div class="container">
                <div class="header">
                    <h1>เกี่ยวกับสหกิจศึกษา</h1>
                </div>
                <div class="content" v-if="cooperativeEducation">
                    <div class="section">
                        <!-- <h2>สหกิจศึกษาคืออะไร?</h2> -->
                        <img class="border border-dark" :src="`${config.api_path}/${cooperativeEducation.description}`"
                            alt="เกี่ยวกับสหกิจศึกษา" />
                    </div>

                    <div class="section">
                        <h2>ช่องทางการติดต่อ</h2>
                        <p>หากท่านมีข้อสงสัยหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับสหกิจศึกษา สามารถติดต่อเราได้ที่</p>
                        <p>โทรศัพท์: {{ cooperativeEducation.phone }}</p>
                        <p>อีเมล: {{ cooperativeEducation.email }}</p>
                        <p>ที่อยู่: {{ cooperativeEducation.address }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Navbar from '../../components/HomeView/Navbar.vue';
import Footer from '../../components/HomeView/Footer.vue';
import config from '../../../config';

const cooperativeEducation = ref(null);

onMounted(async () => {
    try {
        const response = await axios.get(`${config.api_path}/contact`);
        cooperativeEducation.value = response.data;
        console.log('API Path:', config.api_path);
        console.log('Description:', cooperativeEducation.value.description);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
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
    /* background-image: url('../../assets/img/8.1.png'); */
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.header {
    display: flex;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
}

.header h1 {
    margin: 0;
    font-size: 24px;
}

.content {
    padding: 20px;
    flex: 1;
}

.section {
    margin-bottom: 20px;
}

.section h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.section img {
    width: 100%;
    max-width: 1920px;
    height: auto;
    border-radius: 10px;
    /* เพิ่มความสวยงาม */
}

.section p,
.section ul {
    font-size: 16px;
    line-height: 1.5;
}

.section ul {
    padding-left: 20px;
    list-style-type: disc;
}
</style>
