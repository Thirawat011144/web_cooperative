<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const userData = JSON.parse(localStorage.getItem('userData') || '{}');

const companyName = ref('');
const contactName = ref(''); // รวมชื่อและนามสกุลเข้าด้วยกัน
const contactPosition = ref(''); // เพิ่มฟิลด์ตำแหน่งผู้ประสานงาน
const companyPhone = ref('');
const companyEmail = ref('');
const companyAddress = ref('');
const studentID = ref('');
const academicYear = ref('');

if (userData.studentID) {
    studentID.value = userData.studentID;
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
                contactName: contactName.value, // รวมชื่อและนามสกุลเข้าด้วยกัน
                contactPosition: contactPosition.value, // เพิ่มตำแหน่งผู้ประสานงาน
                companyPhone: companyPhone.value,
                companyEmail: companyEmail.value,
                companyAddress: companyAddress.value,
                studentID: studentID.value,
                academicYear: academicYear.value,
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
            } else if (response.data.message === 'มีข้อมูลการสมัครเรียบร้อยแล้ว') {
                Swal.fire({
                    title: "ผิดพลาด",
                    text: "มีข้อมูลการสมัครแล้ว",
                    icon: "warning",
                });
            }
        } catch (error) {
            if (error.response.data.message === "Validation error") {
                Swal.fire({
                    title: "error",
                    text: ("มีข้อมูลนี้ในระบบแล้ว"),
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: "error",
                    text: (error.response.data.message),
                    icon: "error"
                })
            }
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

                                    </select>
                                </div>
                            </div>
                        </div>

                        <label class="form-label" for="contactInfo">ข้อมูลผู้ประสานงานสถานประกอบการ</label>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="contactName">ชื่อ-นามสกุล <span
                                    class="text-red">*</span></label>
                            <input type="text" id="contactName" class="form-control" v-model="contactName" required />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="contactPosition">ตำแหน่ง <span
                                    class="text-red">*</span></label>
                            <input type="text" id="contactPosition" class="form-control" v-model="contactPosition"
                                required />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyPhone">เบอร์โทรศัพท์ <span
                                    class="text-red">*</span></label>
                            <input type="tel" id="companyPhone" class="form-control" v-model="companyPhone"
                                maxlength="10" required />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyEmail">อีเมล <span class="text-red">*</span> </label>
                            <input type="email" id="companyEmail" class="form-control" v-model="companyEmail" />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="studentID">รหัสนักศึกษา <span
                                    class="text-red">*</span></label>
                            <input type="text" id="studentID" class="form-control" v-model="studentID" disabled />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="companyAddress">ที่ตั้งสถานประกอบการ <span
                                    class="text-red">*</span></label>
                            <textarea class="form-control" id="companyAddress" rows="4" v-model="companyAddress"
                                placeholder="ตัวอย่าง (150 ถนนศรีจันทร์ ในเมือง อำเภอเมืองขอนแก่น ขอนแก่น 40000)"
                                required></textarea>
                        </div>

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
