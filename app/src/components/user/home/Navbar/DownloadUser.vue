<template>
    <div>
        <Navbar />
        <div class="bg">
            <div class="container">
                <div class="header">
                    <h1>ดาวน์โหลดเอกสาร</h1>
                    <!-- <router-link to="/list-announcements"> -->
                    <button class="post-news-button">ดูข่าวทั้งหมด</button>
                    <!-- </router-link> -->
                </div>

                <div class="content">
                    <div class="table-container">
                        <table>
                            <thead>
                                <tr class="text-center">
                                    <th>ชื่อ</th>
                                    <th>ดาวน์โหลด (PDF)</th>
                                    <th>ดาวน์โหลด (Doc)</th>
                                    <th>ดาวน์โหลด (ลิงค์)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(doc, index) in paginatedDocuments" :key="index">
                                    <td class="text-center">{{ doc.name }}</td>
                                    <td class="text-center">
                                        <div v-if="doc.pdfFile">
                                            <a :href="getDownloadPath(doc.pdfFile)" target="_blank">ดาวน์โหลดฟอร์ม</a>
                                        </div>
                                        <div v-else>
                                            <p class="text-center">-</p>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div v-if="doc.docFile">
                                            <a :href="getDownloadPath(doc.docFile)" target="_blank">ดาวน์โหลดฟอร์ม</a>
                                        </div>
                                        <div v-else>
                                            <p class="text-center">-</p>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <div v-if="doc.link">
                                            <a :href="doc.link" target="_blank">ดาวน์โหลดฟอร์ม</a>
                                        </div>
                                        <div v-else>
                                            <p class="text-center">-</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        </div>
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Navbar from '../../../../components/user/home/Navbar.vue';
import Footer from '../../../../components/HomeView/Footer.vue';

// ข้อมูลเอกสารดาวน์โหลด
const documents = ref([]);
const currentPage = ref(1);
const perPage = ref(7); // จำนวนรายการต่อหน้า

const fetchDocuments = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/downloads');
        documents.value = response.data;
        // console.log('API Path:', config.api_path);
        // console.log('Description:', documents.value.pdfFile);
    } catch (error) {
        console.error('Error fetching documents:', error);
    }
};

// const getDownloadPath = (fileName) => {
//     return fileName ? `http://localhost:3000/uploads/${fileName}` : '';
// };

const getDownloadPath = (fileName) => {
    return fileName ? `${fileName}` : '';
};






// คำนวณรายการที่จะแสดงในหน้าปัจจุบัน
const paginatedDocuments = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return documents.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(documents.value.length / perPage.value));

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

// ดึงข้อมูลเมื่อคอมโพเนนต์ถูกเมาท์
onMounted(() => {
    fetchDocuments();
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
    display: flex;
    flex-direction: column;
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

.content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.table-container {
    width: 100%;
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 1em;
    min-width: 400px;
    border: 1px solid #dddddd;
}

table thead tr {
    background-color: #f2f2f2;
    text-align: left;
}

table th,
table td {
    padding: 12px 15px;
    border: 1px solid #dddddd;
}

table tbody tr {
    border-bottom: 1px solid #dddddd;
}

table tbody tr:nth-of-type(even) {
    background-color: #f9f9f9;
}

table tbody tr:last-of-type {
    border-bottom: 2px solid #dddddd;
}

table tbody tr:hover {
    background-color: #f1f1f1;
}

a {
    color: #1a73e8;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.post-news-button {
    background-color: #ffffff;
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 20px 0;
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
