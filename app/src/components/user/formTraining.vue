<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const companyName = ref('');
const companyDepartment = ref('');
const contactFirstName = ref('');
const contactLastName = ref('');
const companyPhone = ref('');
const companyEmail = ref('');
const companyAddress = ref('');
const studentID = ref('')
const academicYear = ref('')
const status = ref('');
const valueStatus = ref('สำเร็จ')

if (userData.studentID) {
    studentID.value = userData.studentID;
    status.value = userData.status;
} else {
    console.log('No userData found in localStorage');
}

const handleSubmit = async () => {
    const result = await Swal.fire({
        title: 'เพิ่มข้อมูล',
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
            const formData = {
                companyName: companyName.value,
                companyDepartment: companyDepartment.value,
                contactFirstName: contactFirstName.value,
                contactLastName: contactLastName.value,
                companyPhone: companyPhone.value,
                companyEmail: companyEmail.value,
                companyAddress: companyAddress.value,
                studentID: studentID.value,
                academicYear: academicYear.value,
                status: status.value,
                valueStatus: valueStatus.value
            };
            const response = await axios.post(`${config.api_path}/company`, formData);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "เพิ่มข้อมูลสำเร็จ",
                    icon: "success",
                });
                console.log(response.data.newCompany);
                localStorage.setItem('companyData', JSON.stringify(response.data.newCompany));
                router.push('/user-index/data-student');
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: "Creating Data Company Error: " + error.message,
                icon: "error"
            });
            console.log(error);
        }
    }
};
</script>

<template>
    <div>
        <div class="flex-grow-1 p-3">
            <h3>แบบฟอร์มลงทะเบียนขอออกฝึกประสบการณ์</h3>
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="companyName">ชื่อสถานประกอบการ
                                        <span class="text-red">*</span></label>
                                    <input type="text" id="companyName" class="form-control" v-model="companyName"
                                        required />
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="companyType">แผนก <span
                                            class="text-red">*</span></label>
                                    <input type="text" id="companyType" class="form-control" v-model="companyDepartment"
                                        required />
                                </div>
                            </div>
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="academicYear">ชั้นปี <span
                                            class="text-red">*</span></label>
                                    <select id="academicYear" class="form-control" v-model="academicYear" required>
                                        <option value="" disabled selected>เลือกชั้นปี</option>
                                        <option value="ปวช 1">ประกาศนียบัตรวิชาชีพชั้นปีที่ 1</option>
                                        <option value="ปวช 2">ประกาศนียบัตรวิชาชีพชั้นปีที่ 2</option>
                                        <option value="ปวช 3">ประกาศนียบัตรวิชาชีพชั้นปีที่ 3</option>
                                        <option value="ปวส 1">ประกาศนียบัตรวิชาชีพชั้นสูงชั้นปีที่ 1</option>
                                        <option value="ปวส 2">ประกาศนียบัตรวิชาชีพชั้นสูงชั้นปีที่ 2</option>
                                        <option value="ป.ตรี ปีที่ 1">ปริญญาตรี ปีที่ 1</option>
                                        <option value="ป.ตรี ปีที่ 2">ปริญญาตรี ปีที่ 2</option>
                                        <option value="ป.ตรี ปีที่ 3">ปริญญาตรี ปีที่ 3</option>
                                        <option value="ป.ตรี ปีที่ 4">ปริญญาตรี ปีที่ 4</option>
                                        <option value="ป.ตรี ปีที่ 5">ปริญญาตรี ปีที่ 5</option>
                                        <option value="ป.ตรี ปีที่ 6">ปริญญาตรี ปีที่ 6</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <label class="form-label" for="contactInfo">ข้อมูลผู้ประสานงานสถานประกอบการ</label>
                        <!-- Text input -->
                        <div data-mdb-input-init class="form-outline row mb-4 ">
                            <div class="col">
                                <label class="form-label" for="contactFirstName">ชื่อ <span
                                        class="text-red">*</span></label>
                                <input type="text" id="contactFirstName" class="form-control" v-model="contactFirstName"
                                    required />
                            </div>
                            <div class="col">
                                <label class="form-label" for="contactLastName">นามสกุล <span
                                        class="text-red">*</span></label>
                                <input type="text" id="contactLastName" class="form-control" v-model="contactLastName"
                                    required />
                            </div>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyPhone">เบอร์โทรศัพท์ <span
                                    class="text-red">*</span></label>
                            <input type="tel" id="companyPhone" class="form-control" v-model="companyPhone"
                                maxlength="10" required />
                        </div>

                        <!-- Email input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyEmail">Email </label>
                            <input type="email" id="companyEmail" class="form-control" v-model="companyEmail" />
                        </div>

                        <!-- StudentID input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="studentID">Student ID <span class="text-red">*</span></label>
                            <input type="text" id="studentID" class="form-control" v-model="studentID" disabled />
                        </div>

                        <!-- Message input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyAddress">ที่ตั้งสถานประกอบการ <span
                                    class="text-red">*</span></label>
                            <textarea class="form-control" id="companyAddress" rows="4" v-model="companyAddress"
                                required></textarea>
                        </div>

                        <!-- Submit button -->
                        <button type="submit" class="btn btn-primary btn-block mb-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.form-outline {
    margin-bottom: 1rem;
}
</style>
