<template>
    <div class="content mt-4">
        <div class="card bg-white">
            <h5 class="card-header">แบบฟอร์มเพิ่มข้อมูลสถานที่ฝึกสอน</h5>
            <div class="card-header">
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <div class="mb-3">
                            <h5>ข้อมูลทั่วไป</h5>
                            <label for="company" class="form-label">ชื่อโรงเรียน/วิทยาลัย <span
                                    class="text-red">*</span></label>
                            <input v-model="internship.company" type="text" id="company" class="form-control" required>
                        </div>
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
                        <input v-model="internship.mail" type="text" id="mail" class="form-control" required>
                    </div>
                    <!-- <h5>สาขาที่รับ</h5> -->
                    <div v-for="(branch, index) in internship.branches" :key="index" class="mb-3">
                        <label :for="'branchName_' + index" class="form-label">ชื่อสาขา <span
                                class="text-red">*</span></label>
                        <input v-model="branch.name" :id="'branchName_' + index" type="text" class="form-control"
                            required>
                        <label :for="'branchCount_' + index" class="form-label">จำนวนคนที่รับ <span
                                class="text-red">*</span></label>
                        <input v-model="branch.count" :id="'branchCount_' + index" type="number" class="form-control"
                            required>
                        <button type="button" @click="removeBranch(index)" class="btn btn-danger mt-2">ลบ</button>
                        <button type="button" @click="addBranch" class="btn btn-success mt-2 ms-2">เพิ่มสาขา</button>
                    </div>
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
                        <select v-model="internship.educationLevel" id="educationLevel" class="form-control">
                            <option value="" disabled>-- กรุณาเลือก --</option>
                            <option value="ปวช.">ปวช.</option>
                            <option value="ปวส.">ปวส.</option>
                            <option value="ปริญญาตรี">ปริญญาตรี</option>
                        </select>
                    </div>

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
                        <input v-model="internship.contactEmail" type="text" id="contactEmail" class="form-control"
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';

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
    branches: [{ name: '', count: '' }],
});

const addBranch = () => {
    internship.value.branches.push({ name: '', count: '' });
};

const removeBranch = (index) => {
    internship.value.branches.splice(index, 1);
};

const submitForm = async () => {
    console.log(internship.value)
    try {
        const response = await axios.post(`${config.api_path}/practice-teaching`, internship.value);
        if (response) {
            Swal.fire({
                title: "Success",
                text: "เพิ่มข้อมูลสถานที่ฝึกงานเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            });
            router.push('/admin-index/internship-admin');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถเพิ่มข้อมูลสถานที่ฝึกงานได้",
            icon: "error",
        });
    }
};
</script>

<style scoped></style>
