<template>
    <div v-if="isVisible" class="modal fade show" tabindex="-1" style="display: block;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body" v-if="data">
                    <p>รหัสนักศึกษา: {{ data.studentID }}</p>
                    <p>ชื่อ-นามสกุล: {{ data.firstName }} {{ data.lastName }}</p>
                    <p>สาขา: {{ data.branch }}</p>
                    <p>ชั้นปี: {{ data.year }}</p>
                    <div v-if="data.companyDetails">
                        <p>สถานประกอบการ: {{ data.companyName }}</p>
                        <p>ประเภทหน่วยงาน: {{ data.companyType }}</p>
                        <p>เบอร์โทรศัพท์: {{ data.companyPhone }}</p>
                        <p>Email: {{ data.companyEmail }}</p>
                        <p>ที่ตั้งสถานประกอบการ: {{ data.companyAddress }}</p>
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
</template>

<script setup>

import axios from "axios";
import { ref, onMounted, computed } from 'vue';
// import config from "../../../../config";
import Swal from 'sweetalert2';



const props = defineProps({
    isVisible: Boolean,
    data: Object,
});



const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};


</script>

<style scoped>
.modal {
    display: block;
    backdrop-filter: blur(0.5px);
}
</style>
