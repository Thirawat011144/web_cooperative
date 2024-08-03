<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header">แบบฟอร์มเพิ่มข้อมูลสถานที่ฝึกงาน</h5>
            <div class="card-body">
                <form @submit.prevent="updateData">
                    <!-- ข้อมูลทั่วไป -->
                    <div class="mb-3">
                        <h5>ข้อมูลทั่วไป</h5>
                        <label for="company" class="form-label">บริษัท <span class="text-red">*</span></label>
                        <input v-model="internship.company" type="text" id="company" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="location" class="form-label">ที่ตั้ง <span class="text-red">*</span></label>
                        <input v-model="internship.location" type="text" id="location" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">เบอร์ติดต่อ <span class="text-red">*</span></label>
                        <input v-model="internship.tel" type="text" id="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="zipCode" class="form-label">รหัสไปรษณีย์</label>
                        <input v-model="internship.zipCode" type="text" id="zipCode" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="mail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
                        <input v-model="internship.mail" type="email" id="mail" class="form-control" required>
                    </div>

                    <!-- สาขาที่รับ -->
                    <label for="branch" class="form-label">สาขาที่รับ</label>
                    <div v-for="(branch, index) in internship.branches" :key="index" class="mb-3">
                        <div class="d-flex">
                            <input v-model="branch.name" type="text" placeholder="ชื่อสาขา" class="form-control me-2"
                                required>
                            <input v-model="branch.count" type="number" placeholder="จำนวนคนที่รับ" class="form-control"
                                required>
                            <button @click="removeBranch(index)" type="button" class="btn btn-danger ms-2">ลบ</button>
                        </div>
                    </div>
                    <button @click="addBranch" type="button" class="btn btn-secondary">เพิ่มสาขา</button>

                    <!-- รายละเอียดอื่นๆ -->
                    <h5>รายละเอียดอื่นๆ</h5>
                    <div class="mb-3">
                        <label for="salary" class="form-label">เงินเดือน</label>
                        <input v-model="internship.salary" type="text" id="salary" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="gender" class="form-label">เพศ <span class="text-red">*</span></label>
                        <select v-model="internship.gender" id="gender" class="form-control" required>
                            <option value="" disabled>-- กรุณาเลือก --</option>
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="ไม่จำกัด">ไม่จำกัด</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="educationLevel" class="form-label">ระดับการศึกษา <span
                                class="text-red">*</span></label>
                        <select v-model="internship.educationLevel" id="educationLevel" class="form-control" required>
                            <option value="" disabled>-- กรุณาเลือก --</option>
                            <option value="ปวช.">ปวช.</option>
                            <option value="ปวส.">ปวส.</option>
                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                        </select>
                    </div>

                    <!-- ข้อมูลผู้ประสานงาน -->
                    <h5>ข้อมูลผู้ประสานงาน</h5>
                    <div class="mb-3">
                        <label for="contactPerson" class="form-label">ชื่อผู้ติดต่อ <span
                                class="text-red">*</span></label>
                        <input v-model="internship.contactPerson" type="text" id="contactPerson" class="form-control"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="contactPosition" class="form-label">ตำแหน่ง</label>
                        <input v-model="internship.contactPosition" type="text" id="contactPosition"
                            class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="contactEmail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
                        <input v-model="internship.contactEmail" type="email" id="contactEmail" class="form-control"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="contactTel" class="form-label">เบอร์โทร <span class="text-red">*</span></label>
                        <input v-model="internship.contactTel" type="text" id="contactTel" class="form-control"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="otherContact" class="form-label">ช่องทางการติดต่ออื่นๆ</label>
                        <input v-model="internship.otherContact" type="text" id="otherContact" class="form-control">
                    </div>

                    <button type="submit" class="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const internship = ref({
    company: '',
    location: '',
    tel: '',
    zipCode: '',
    mail: '',
    salary: '',
    gender: '',
    educationLevel: '',
    contactPerson: '',
    contactPosition: '',
    contactEmail: '',
    contactTel: '',
    otherContact: '',
    branches: [] // ฟิลด์ใหม่สำหรับสาขา
});

const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching/${route.params.id}`);
        internship.value = { ...response.data };
    } catch (error) {
        Swal.fire({
            title: "error",
            text: "ไม่สามารถดึงข้อมูลได้",
            icon: "error"
        });
        console.log(error);
    }
};

const updateData = async () => {
    const result = await Swal.fire({
        title: 'แก้ไขข้อมูล',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก'
    });
    if (result.isConfirmed) {
        try {
            const response = await axios.put(`${config.api_path}/practice-teaching/${route.params.id}`, internship.value);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "แก้ไขข้อมูลสถานที่ฝึกงานสำเร็จ",
                    icon: "success",
                });
                router.push('/admin-index/practice');
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: "ไม่สามารถอัพเดตข้อมูลได้",
                icon: "error"
            });
        }
    }
};

const addBranch = () => {
    internship.value.branches.push({ name: '', people: 0 });
};

const removeBranch = (index) => {
    internship.value.branches.splice(index, 1);
};

onMounted(() => {
    fetchData();
});
</script>



<style scoped></style>