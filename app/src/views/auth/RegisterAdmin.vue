<template>
    <section class="h-100 bg-light">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col">
                    <div class="card card-registration my-4">
                        <div class="row g-0">
                            <div class="col-xl-12">
                                <div class="card-body p-md-5 text-black">
                                    <h3 class="mb-5 text-uppercase">สมัครสมาชิก</h3>

                                    <form @submit.prevent="handleRegister">
                                        <div class="row">
                                            <div class="col-md-4 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3ExamplePrefix">คำนำหน้า <span
                                                            class="text-red">*</span></label>
                                                    <select id="form3ExamplePrefix" class="form-control-lg"
                                                        v-model="prefix" required>
                                                        <!-- <option value="" disabled selected>-</option> -->
                                                        <option value="นาย">นาย</option>
                                                        <option value="นาง">นาง</option>
                                                        <option value="นางสาว">นางสาว</option>
                                                        <option value="อาจารย์">อาจารย์</option>
                                                        <option value="ผู้ช่วยศาสตราจารย์">ผู้ช่วยศาสตราจารย์</option>
                                                        <option value="รองศาสตราจารย์">รองศาสตราจารย์</option>
                                                        <!-- <option value="พลเอก">พลเอก</option> -->
                                                        <!-- <option value="พันโท">พันโท</option> -->
                                                        <!-- เพิ่มเติมคำนำหน้าหรือยศอื่นๆ ตามต้องการ -->
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-4 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1m">ชื่อ <span
                                                            class="text-red">*</span></label>
                                                    <input type="text" id="form3Example1m"
                                                        class="form-control form-control-lg" v-model="firstName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-4 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1n">นามสกุล
                                                        <span>*</span></label>
                                                    <input type="text" id="form3Example1n"
                                                        class="form-control form-control-lg" v-model="lastName"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1m1">ชื่อผู้ใช้
                                                        <span>*</span></label>
                                                    <input type="text" id="form3Example1m1"
                                                        class="form-control form-control-lg" v-model="userName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1n1">รหัสผ่าน
                                                        <span>*</span></label>
                                                    <input type="password" id="form3Example1n1"
                                                        class="form-control form-control-lg" v-model="password"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example8">เบอร์ติดต่อ
                                                <span>*</span></label>
                                            <input type="text" id="form3Example8" class="form-control form-control-lg"
                                                v-model="phoneNumber" @input="validatePhoneNumber" required
                                                minlength="10" maxlength="10" placeholder="Example 0987654321" />
                                            <small v-if="phoneNumberWarning" class="text-danger">{{ phoneNumberWarning
                                                }}</small>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example9">เลขบัตรประชาชน
                                                <span>*</span></label>
                                            <input type="text" id="form3Example9" class="form-control form-control-lg"
                                                v-model="idCard" maxlength="13" @input="validateIdCard"
                                                pattern="[0-9]{13}" required
                                                placeholder="กรุณาใส่เฉพาะตัวเลข 13 หลัก" />
                                            <small v-if="idCardWarning" class="text-danger">{{ idCardWarning }}</small>
                                        </div>


                                        <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                            <label class="mb-0 me-4">เพศ: <span>*</span> </label>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="femaleGender" value="Female" v-model="gender" required />
                                                <label class="form-check-label" for="femaleGender">หญิง</label>
                                            </div>
                                            <div class="form-check form-check-inline mb-0 me-4">
                                                <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                                    id="maleGender" value="Male" v-model="gender" required />
                                                <label class="form-check-label" for="maleGender">ชาย</label>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <label for="">สาขาวิชาที่ดูแล(สามารถเปลี่ยนได้) <span>*</span></label>
                                            <div class="col mb-4">
                                                <select v-model="branch" class="form-select" required>
                                                    <option value="" disabled>-</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมโยธา">
                                                        สาขาครุศาสตร์อุตสาหกรรมโยธา</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า">
                                                        สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมเครื่องกล">
                                                        สาขาครุศาสตร์อุตสาหกรรมเครื่องกล</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ">
                                                        สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม">
                                                        สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์">
                                                        สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์</option>
                                                    <option value="สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ">
                                                        สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ</option>
                                                    <option value="สาขาวิชาช่างโยธา">สาขาวิชาช่างโยธา</option>
                                                    <option value="สาขาวิชาช่างก่อสร้าง">สาขาวิชาช่างก่อสร้าง</option>
                                                    <option value="สาขาวิชาช่างเครื่องมือกลอัตโนมัติ">
                                                        สาขาวิชาช่างเครื่องมือกลอัตโนมัติ</option>
                                                    <option value="สาขาวิชาช่างยนต์">สาขาวิชาช่างยนต์</option>
                                                    <option value="สาขาวิชาช่างกลเกษตร">สาขาวิชาช่างกลเกษตร</option>
                                                    <option value="สาขาวิชาช่างกลโรงงาน">สาขาวิชาช่างกลโรงงาน</option>
                                                    <option value="สาขาวิชาช่างท่อและประสาน">สาขาวิชาช่างท่อและประสาน
                                                    </option>
                                                    <option value="สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล">
                                                        สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล
                                                    </option>
                                                    <option value="สาขาวิชาช่างอิเล็กทรอนิกส์">
                                                        สาขาวิชาช่างอิเล็กทรอนิกส์</option>
                                                    <option value="สาขาวิชาเทคโนโลยีคอมพิวเตอร์">
                                                        สาขาวิชาเทคโนโลยีคอมพิวเตอร์</option>

                                                    <!-- สาขาวิชาช่างก่อสร้าง (ซ้ำ) -->
                                                    <option value="สาขาวิชาช่างไฟฟ้ากำลัง">สาขาวิชาช่างไฟฟ้ากำลัง
                                                    </option>
                                                    <!-- สาขาวิชาช่างยนต์ (ซ้ำ) -->
                                                    <option value="สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล">
                                                        สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล
                                                    </option>
                                                    <!-- สาขาวิชาช่างอิเล็กทรอนิกส์ (ซ้ำ) -->
                                                    <option value="สาขาวิชาช่างเทคนิคคอมพิวเตอร์">
                                                        สาขาวิชาช่างเทคนิคคอมพิวเตอร์</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="submit" class="btn btn-lg"
                                                style="background-color: mediumvioletred; color: white;">Submit
                                                form</button>
                                        </div>
                                    </form>

                                    <div class="d-flex justify-content-end pt-3">
                                        <router-link to="/login">
                                            <small>Already have an account? Click <a href="#">Login</a></small>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import axios from "axios";
import { ref } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router'

const router = useRouter();

const prefix = ref('');  // เพิ่มตัวแปร prefix
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const password = ref('');
const phoneNumber = ref('');
const idCard = ref('');  // เพิ่มตัวแปร idCard
const gender = ref('');
const branch = ref('');
const statusStart = 'notVerified'
const role = 'teacher'


const phoneNumberWarning = ref('');
// const emailWarning = ref('');
const idCardWarning = ref('')

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
let checkStatusStart = null

if (userData.statusStart) {
    checkStatusStart = userData.statusStart;
    console.log(checkStatusStart)
} else {
    console.log('No userData found in localStorage');
}

const validatePhoneNumber = () => {
    const originalValue = phoneNumber.value;
    phoneNumber.value = phoneNumber.value.replace(/[^0-9]/g, '');

    if (originalValue !== phoneNumber.value) {
        phoneNumberWarning.value = 'คุณสามารถใส่ได้เฉพาะตัวเลขเท่านั้น';
    } else {
        phoneNumberWarning.value = ''; // ล้างข้อความแจ้งเตือนหากไม่มีการเปลี่ยนแปลง
    }
};

const validateIdCard = () => {
    // ลบอักขระที่ไม่ใช่ตัวเลขออก
    idCard.value = idCard.value.replace(/[^0-9]/g, '');

    // ตรวจสอบความยาวของเลขบัตรประชาชน
    if (idCard.value.length !== 13) {
        idCardWarning.value = 'กรุณาใส่เลขบัตรประชาชนให้ครบ 13 หลัก';
    } else {
        idCardWarning.value = ''; // ล้างข้อความแจ้งเตือนหากรูปแบบถูกต้อง
    }
};


const handleRegister = async () => {
    try {
        const payload = {
            prefix: prefix.value,  // เพิ่ม prefix ใน payload
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            idCard: idCard.value,  // เพิ่ม idCard ใน payload
            gender: gender.value,
            branch: branch.value,
            statusStart,
            role
        }

        // const response = await axios.post(`${config.api_path}/register`, payload);
        const response = await axios.post(`${config.api_path}/teacher`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign Up",
                text: "สมัครบัญชีเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            })

            router.push('/login-choice')
        }
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Register Error"),
            icon: "error"
        })
        console.log(error)
    }
}
</script>

<style scoped>
.bg-light {
    background-color: #f8f9fa !important;
}

.card-registration {
    position: relative;
    background: rgba(255, 255, 255);
    /* backdrop-filter: blur(10px); */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-registration::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/8.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(10px);
    z-index: -1;
}

.card-registration .card-body {
    position: relative;
    padding: 2rem;
}

.form-outline {
    position: relative;
    margin-bottom: 1.5rem;
}

.form-label {
    display: block;
    margin-bottom: 0.5rem;
}

.form-control-lg {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-check-input {
    margin-right: 0.5rem;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

span {
    color: red;
}
</style>
