<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header"> แบบฟอร์มเพิ่มข้อมูลสถานที่ฝึกงาน </h5>
            <div class="card-header">
                <form @submit.prevent="updateData">
                    <div class="mb-3">
                        <div class="mb-3">
                            <h5>ข้อมูลทั่วไป</h5>
                            <label for="company" class="form-label">บริษัท <span class="text-red">*</span></label>
                            <input v-model="internship.company" type="text" id="company" class="form-control" required>
                        </div>
                        <label for="title" class="form-label">ตำแหน่ง <span class="text-red">*</span></label>
                        <input v-model="internship.position" type="text" id="title" class="form-control" required>
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
                        <label for="tel" class="form-label">รหัสไปรษณีย์</label>
                        <input v-model="internship.zipCode" type="text" id="tel" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">อีเมล์ <span class="text-red">*</span></label>
                        <input v-model="internship.mail" type="text" id="tel" class="form-control" required>
                    </div>
                    <h5>รายละเอียดอื่นๆ</h5>
                    <div class="mb-3">
                        <label for="tel" class="form-label">ประเภทหน่วยงาน</label>
                        <input v-model="internship.type" type="text" id="tel" class="form-control"
                            placeholder="Ex. งานรัฐวิสาหกิจ/เอกชน/อื่นๆ" required>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">อัตราที่รับ <span class="text-red">*</span></label>
                        <input v-model="internship.vacancies" type="text" id="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">เงินเดือน</label>
                        <input v-model="internship.salary" type="text" id="tel" class="form-control">
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
                        <select v-model="internship.educationLevel" id="educationLevel" class="form-control">
                            <option value="" disabled>-- กรุณาเลือก --</option>
                            <option value="ปวช.">ปวช.</option>
                            <option value="ปวส.">ปวส.</option>
                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                        </select>
                        <!-- <input type="text" id="tel" class="form-control" required> -->
                    </div>
                    <h5>ข้อมูลผู้ประสานงาน</h5>
                    <div class="mb-3">
                        <label for="tel" class="form-label">ชื่อผู้ติดต่อ <span class="text-red">*</span></label>
                        <input v-model="internship.contactPerson" type="text" id="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">ตำแหน่ง</label>
                        <input v-model="internship.contactPosition" type="text" id="contactPosition"
                            class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">อีเมล์ <span class="text-red">*</span></label>
                        <input v-model="internship.contactEmail" type="text" id="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">เบอร์โทร <span class="text-red">*</span></label>
                        <input v-model="internship.contactTel" type="text" id="tel" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="otherContact" class="form-label">ช่องทางการติดต่ออื่นๆ</label>
                        <input v-model="internship.otherContact" type="text" id="otherContact" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const internship = ref({
    company: '',
    position: '',
    location: '',
    tel: '',
    zipCode: '',
    mail: '',
    type: '',
    vacancies: '',
    salary: '',
    gender: '',
    educationLevel: '',
    contactPerson: '',
    contactPosition: '',
    contactEmail: '',
    contactTel: '',
    otherContact: '',
});


const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/internship/${route.params.id}`);
        const internshipData = response.data;
        internship.value = { ...internshipData };
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "ไม่สามารถแก้ไขได้"),
            icon: "error"
        });
        console.log(error)
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
            const response = await axios.put(`${config.api_path}/internship/${route.params.id}`, internship.value);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "แก้ไขข้อมูลผู้ใช้สำเร็จ",
                    icon: "success",
                });

                router.push('/admin-index/internship-admin');
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: (error.message, "Update Error"),
                icon: "error"
            });
        }
    }
};


onMounted(() => {
    fetchData();
});
</script>

<style scoped></style>