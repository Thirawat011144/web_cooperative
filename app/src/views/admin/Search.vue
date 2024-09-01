<script setup>
import { ref, onMounted, watch, computed } from "vue"; // นำเข้า computed
import { useSearchStore } from "../../store/Search";
import * as XLSX from "xlsx"; // import library
import axios from "axios";
import Swal from "sweetalert2";
import config from "../../../config";
import { downloadExcel, downloadExcelHight as downloadSearchHight, downloadExcelHightEvaluation } from "@/utils/downloadSearch";
import { downloadExcel as downloadExcelBefore, downloadExcelHight } from "@/utils/downloadBeforeEvaluation";

const searchStore = useSearchStore();
const searchResults = ref([]);

const isModalVisible = ref(false);
const modalData = ref(null);

const updateSearchResults = () => {
    searchResults.value = searchStore.searchResults;
};

const sortedUsers = computed(() => {
    return searchResults.value.slice().sort((a, b) => a.id - b.id); // ใช้ computed เพื่อจัดเรียงข้อมูล
});

// const downloadExcel = () => {
//     const data = sortedUsers.value.map(user => ({ // ใช้ sortedUsers.value
//         'รหัสนักศึกษา': user.studentID,
//         'ชื่อ': user.firstName,
//         'นามสกุล': user.lastName,
//         'สาขา': user.branch,
//         'ชั้นปี': user.year,
//         'สถานะ': user.status,
//         'เบอร์โทรศัพท์': user.phoneNumber,
//         'อีเมล์': user.email,
//         'สถานที่ฝึกประสบการณ์': user.college // เปลี่ยน college เป็น company
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
//     XLSX.writeFile(workbook, 'students.xlsx');
// };



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
            icon: "error",
        });
        console.log(error);
    }
};

const removeData = async (id) => {
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก'
    });

    if (result.isConfirmed) {
        try {
            const response = await axios.delete(`${config.api_path}/users/${id}`);
            searchResults.value = searchResults.value.filter(user => user.id !== id);
            Swal.fire({
                title: 'สำเร็จ',
                text: 'ลบข้อมูลผู้ใช้สำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.value) {
                    fetchData();
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: (error.message, 'Cr2 Error DeleteData'),
                icon: 'error'
            });
            console.log(error);
        }
    }
};

const closeModal = () => {
    isModalVisible.value = false;
    modalData.value = null;
};
// modal



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
    <section class="content">
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    &nbsp; ผลการค้นหา <br>
                    <div class="btn-group m-1">
                        <button class="btn btn-info dropdown-toggle" type="button" id="downloadMenuButton"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            ดาวน์โหลดข้อมูล
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="downloadMenuButton">
                            <li v-if="sortedUsers.some(user => user.collegeDetails)">
                                <a class="dropdown-item" @click="downloadExcelHight('student', sortedUsers)"
                                    style="cursor: pointer;">
                                    ดาวน์โหลดเฉพาะข้อมูลส่วนตัว [Hight]
                                </a>
                            </li>
                            <li v-else>
                                <a class="dropdown-item" @click="downloadExcelBefore('student', sortedUsers)"
                                    style="cursor: pointer;">
                                    ดาวน์โหลดเฉพาะข้อมูลส่วนตัว
                                </a>
                            </li>
                            <li
                                v-if="sortedUsers.some(user => user.evaluationDetails && user.evaluationDetails.length > 0)">
                                <a class="dropdown-item" @click="downloadExcel('student', sortedUsers)"
                                    style="cursor: pointer;">
                                    ดาวน์โหลดข้อมูลการประเมินจากสถานประกอบการ
                                </a>
                            </li>
                            <li
                                v-if="sortedUsers.some(user => user.evaluationUniversityDetails && user.evaluationUniversityDetails.length > 0)">
                                <a class="dropdown-item" @click="downloadSearchHight('student', sortedUsers)"
                                    style="cursor: pointer;">
                                    ดาวน์โหลดข้อมูลการประเมินจากอาจารย์นิเทศ
                                </a>
                            </li>
                            <li
                                v-if="sortedUsers.some(user => user.evaluationHightDetails && user.evaluationHightDetails.length > 0)">
                                <a class="dropdown-item" @click="downloadExcelHightEvaluation('student', sortedUsers)"
                                    style="cursor: pointer;">
                                    ดาวน์โหลดข้อมูลการประเมิน
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>ลำดับ</th>
                            <th>รหัสนักศึกษา</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>ชั้นปี</th>
                            <th>สาขา</th>
                            <th>สถานที่ฝึกงาน</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in sortedUsers" :key="user.id">
                            <!-- ใช้ sortedUsers ใน v-for -->
                            <td>{{ index + 1 }}</td>
                            <td>{{ user.studentID }}</td>
                            <td>{{ user.firstName }} {{ user.lastName }}</td>
                            <td>{{ user.year }}</td>
                            <td>{{ user.branch }}</td>
                            <td>
                                <button class="btn btn-success" @click="showModal(user.id)">
                                    ดูข้อมูล
                                </button>
                            </td>
                            <!-- ใช้ company ตามฟิลด์ในตาราง -->
                            <td>
                                <router-link :to="`/edit-cr2/${user.id}`">
                                    <button class="btn btn-primary m-1">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </button>
                                </router-link>
                                <button @click="removeData(user.id)" class="btn btn-danger m-1">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal -->
        <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
                        <button type="button" class="btn-close" @click="isModalVisible = false"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="modalData">
                        <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
                        <p>
                            ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}
                        </p>
                        <p>สาขา: {{ modalData.branch }}</p>
                        <p>ชั้นปี: {{ modalData.year }}</p>
                        <p>สถานะ: {{ modalData.status }}</p>
                        <p>เบอร์โทรศัพท์: {{ modalData.phoneNumber }}</p>
                        <p v-if="modalData.email">Email: {{ modalData.email }}</p>
                        <p v-else></p>
                        <div v-if="modalData.companyDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
                            <p>แผนก: {{ modalData.companyDetails.companyDepartment }}</p>
                            <p>ชื่อ-นามสกุลผู้ประสานงาน: {{ modalData.companyDetails.contactFirstName }} {{
                                modalData.companyDetails.contactLastName }}</p>
                            <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
                            <p v-if="modalData.companyDetails.companyEmail">Email: {{
                                modalData.companyDetails.companyEmail }}</p>
                            <p v-else></p>
                            <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
                        </div>
                        <div v-if="modalData.collegeDetails">
                            <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
                            <p>
                                โรงเรียน/วิทยาลัย: {{ modalData.collegeDetails.collegeName }}
                            </p>
                            <p>
                                ชื่อ-นามสกุลผู้ประสานงาน:
                                {{ modalData.collegeDetails.contactFirstName }}
                                {{ modalData.collegeDetails.contactLastName }}
                            </p>
                            <p>เบอร์โทรศัพท์: {{ modalData.collegeDetails.collegePhone }}</p>
                            <p v-if="modalData.collegeDetails.collegeEmail">
                                Email: {{ modalData.collegeDetails.collegeEmail }}
                            </p>
                            <p v-else></p>
                            <p>
                                ที่ตั้งวิทยาลัย: {{ modalData.collegeDetails.collegeAddress }}
                            </p>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">
                            ปิด
                        </button>
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
