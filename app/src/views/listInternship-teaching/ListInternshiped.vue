<template>
    <div>
        <NavbarVue />
        <div class="bg">
            <div class="container">
                <!-- <h1>รายละเอียดของสาขา</h1> -->
                <div class="branch-list">
                    <router-link v-for="branch in paginatedAnnouncements" :key="branch.id" :to="branch.route"
                        style="text-decoration: none;">
                        <div class="branch-item">
                            <div class="icon">{{ branch.icon }}</div>
                            <p>{{ branch.name }}</p>
                        </div>
                    </router-link>
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
import { ref, computed } from 'vue';
import NavbarVue from "../../components/HomeView/Navbar.vue";
import Footer from '../../components/HomeView/Footer.vue';

const announcements = ref([
    { id: 1, route: '/internshiped-civil', icon: '🏗️', name: 'สาขาครุศาสตร์อุตสาหกรรมโยธา' },
    { id: 2, route: '/internshiped-electrical', icon: '⚡', name: 'สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า' },
    { id: 3, route: '/internshiped-mechanical', icon: '🔧', name: 'สาขาครุศาสตร์อุตสาหกรรมเครื่องกล' },
    { id: 4, route: '/industrial-industry', icon: '🏭', name: 'สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ' },
    { id: 5, route: '/electronics-telecommunications', icon: '📡', name: 'สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม' },
    { id: 6, route: '/computer', icon: '💻', name: 'สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์' },
    { id: 7, route: '/welder', icon: '🔩', name: 'สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ' },
    { id: 8, route: '/construction', icon: '🏗️', name: 'สาขาวิชาช่างก่อสร้าง' },
    { id: 9, route: '/electrical-power', icon: '⚡', name: 'สาขาวิชาช่างไฟฟ้ากำลัง' },
    { id: 10, route: '/automotive', icon: '🚗', name: 'สาขาวิชาช่างยนต์' },
    { id: 11, route: '/mechanical-drawing', icon: '📐', name: 'สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล' },
    { id: 12, route: '/electronics', icon: '📟', name: 'สาขาวิชาช่างอิเล็กทรอนิกส์' },
    { id: 13, route: '/computer-tech', icon: '💻', name: 'สาขาวิชาช่างเทคนิคคอมพิวเตอร์' },
    { id: 14, route: '/civil', icon: '🏗️', name: 'สาขาวิชาช่างโยธา' },
    { id: 15, route: '/automated-machinery', icon: '🤖', name: 'สาขาวิชาช่างเครื่องมือกลอัตโนมัติ' },
    { id: 16, route: '/agricultural-machinery', icon: '🚜', name: 'สาขาวิชาช่างกลเกษตร' },
    { id: 17, route: '/factory-machinery', icon: '🏭', name: 'สาขาวิชาช่างกลโรงงาน' },
    { id: 18, route: '/pipe-welding', icon: '🔧', name: 'สาขาวิชาช่างท่อและประสาน' },
    { id: 19, route: '/mechanical-design', icon: '🛠️', name: 'สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล' },
    { id: 20, route: '/computer-technology', icon: '💻', name: 'สาขาวิชาเทคโนโลยีคอมพิวเตอร์' },
]);

console.log(announcements.value);


const currentPage = ref(1);
const perPage = ref(7); // Number of items per page

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
</script>

<style scoped>
.bg {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
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
    background-color: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 90%;
    max-width: 900px;
    text-align: center;
}

h1 {
    margin-bottom: 30px;
    font-size: 28px;
    color: #333;
}

.branch-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.branch-item {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
}

.branch-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.branch-item p {
    margin: 0;
    font-size: 18px;
    color: #555;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: absolute;
    bottom: 0px;
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
    margin: 0 10px 5px 0;
}

.icon {
    font-size: 40px;
}
</style>
