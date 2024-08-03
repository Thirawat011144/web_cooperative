<script setup>
import { ref, onMounted, watch } from "vue";
import { useSearchStore } from '../../store/Search';
import config from "../../../config";
import Swal from "sweetalert2";
import axios from "axios";

const searchStore = useSearchStore();
const searchResults = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);

// const userData = JSON.parse(localStorage.getItem('userData') || '{}');
// let branch = null

// modal
const showModal = async (id) => {
    isModalVisible.value = true;
    try {
        const response = await axios.get(`${config.api_path}/user/${id}`);
        modalData.value = response.data;
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error Fetching Data"),
            icon: 'error'
        });
    }
};

const closeModal = () => {
    isModalVisible.value = false;
    modalData.value = null;
};
// modal


const updateSearchResults = () => {
    searchResults.value = searchStore.searchResults;
};

onMounted(() => {
    updateSearchResults();
});


watch(
    () => searchStore.searchResults,
    (newResults) => {
        updateSearchResults();
    }
);
</script>

<template>
    <section class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    ผลการค้นหา
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชั้นปี</th>
                            <th class="text-center">สาขา</th>
                            <th class="text-center">ข้อมูลสถานประกอบการ</th>
                            <!-- <th>Tools</th> -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in searchResults" :key="user.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.year }}</td>
                            <td class="text-center">{{ user.branch }}</td>
                            <td class="text-center"><button class="btn btn-success"
                                    @click="showModal(user.id)">ดูข้อมูล</button></td>
                            <!-- <td>
                                <button class="btn btn-primary m-1">Edit</button>
                                <button class="btn btn-danger m-1">Delete</button>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal -->
        <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
                        <button type="button" class="btn-close" @click="isModalVisible = false"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="modalData">
                        <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
                        <p>ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}</p>
                        <p>สาขา: {{ modalData.branch }}</p>
                        <p>ชั้นปี: {{ modalData.year }}</p>
                        <p>สถานะ: {{ modalData.status }}</p>
                        <div v-if="modalData.companyDetails">
                            <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
                            <p>ประเภทหน่วยงาน: {{ modalData.companyDetails.companyType }}</p>
                            <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
                            <p v-if="modalData.companyDetails.companyEmail">Email: {{
                                modalData.companyDetails.companyEmail }}</p>
                            <p v-else></p>
                            <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
                        </div>
                        <div v-else>
                            <p>ไม่มีข้อมูลสถานประกอบการ</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.table {
    width: 100%;
    margin: 20px 0;
}
</style>
