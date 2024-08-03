<script setup>
import axios from "axios";
import { ref, computed } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const password = ref('');
const phoneNumber = ref('');
const gender = ref('');
const year = ref('');
const branch = ref('');
const status = ref('ขออนุมัติ');
const studentID = ref('');
const email = ref('');
const idCard = ref('');

const vocationalBranches = [
    { value: "สาขาวิชาช่างก่อสร้าง", text: "สาขาวิชาช่างก่อสร้าง" },
    { value: "สาขาวิชาช่างไฟฟ้ากำลัง", text: "สาขาวิชาช่างไฟฟ้ากำลัง" },
    { value: "สาขาวิชาช่างยนต์", text: "สาขาวิชาช่างยนต์" },
    { value: "สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล", text: "สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล" },
    { value: "สาขาวิชาช่างอิเล็กทรอนิกส์", text: "สาขาวิชาช่างอิเล็กทรอนิกส์" },
    { value: "สาขาวิชาช่างเทคนิคคอมพิวเตอร์", text: "สาขาวิชาช่างเทคนิคคอมพิวเตอร์" },
];

const highVocationalBranches = [
    { value: "สาขาวิชาช่างโยธา", text: "สาขาวิชาช่างโยธา" },
    { value: "สาขาวิชาช่างก่อสร้าง", text: "สาขาวิชาช่างก่อสร้าง" },
    { value: "สาขาวิชาช่างเครื่องมือกลอัตโนมัติ", text: "สาขาวิชาช่างเครื่องมือกลอัตโนมัติ" },
    { value: "สาขาวิชาช่างยนต์", text: "สาขาวิชาช่างยนต์" },
    { value: "สาขาวิชาช่างกลเกษตร", text: "สาขาวิชาช่างกลเกษตร" },
    { value: "สาขาวิชาช่างกลโรงงาน", text: "สาขาวิชาช่างกลโรงงาน" },
    { value: "สาขาวิชาช่างท่อและประสาน", text: "สาขาวิชาช่างท่อและประสาน" },
    { value: "สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล", text: "สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล" },
    { value: "สาขาวิชาช่างอิเล็กทรอนิกส์", text: "สาขาวิชาช่างอิเล็กทรอนิกส์" },
    { value: "สาขาวิชาเทคโนโลยีคอมพิวเตอร์", text: "สาขาวิชาเทคโนโลยีคอมพิวเตอร์" },
]

const bachelorBranches = [
    { value: "สาขาครุศาสตร์อุตสาหกรรมโยธา", text: "สาขาครุศาสตร์อุตสาหกรรมโยธา" },
    { value: "สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า", text: "สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า" },
    { value: "สาขาครุศาสตร์อุตสาหกรรมเครื่องกล", text: "สาขาครุศาสตร์อุตสาหกรรมเครื่องกล" },
    { value: "สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ", text: "สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ" },
    { value: "สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม", text: "สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม" },
    { value: "สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์", text: "สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์" },
    { value: "สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ", text: "สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ" },
];

const branches = computed(() => {
    if (year.value === "ปวช 3" || year.value === "ปวช 2" || year.value === "ปวช 1") {
        return vocationalBranches;
    } else if (year.value === "ปวส 1" || year.value === "ปวส 2") {
        return highVocationalBranches;
    } else if (year.value === "ป.ตรี ปีที่ 2" || year.value === "ป.ตรี ปีที่ 4") {
        return bachelorBranches;
    } else {
        return [];
    }
});

const handleRegister = async () => {
    try {
        const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            gender: gender.value,
            year: year.value,
            branch: branch.value,
            status: status.value,
            studentID: studentID.value,
            email: email.value,
            idCard: idCard.value
        }
        const response = await axios.post(`${config.api_path}/register`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign Up",
                text: "สมัครบัญชีเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000
            })
            router.push('/login')
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
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1m">ชื่อ </label>
                                                    <input type="text" id="form3Example1m"
                                                        class="form-control form-control-lg" v-model="firstName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1n">นามสกุล</label>
                                                    <input type="text" id="form3Example1n"
                                                        class="form-control form-control-lg" v-model="lastName"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1m1">Username</label>
                                                    <input type="text" id="form3Example1m1"
                                                        class="form-control form-control-lg" v-model="userName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="form3Example1n1">Password</label>
                                                    <input type="password" id="form3Example1n1"
                                                        class="form-control form-control-lg" v-model="password"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example8">อีเมล</label>
                                            <input type="email" id="form3Example8" class="form-control form-control-lg"
                                                v-model="email" required placeholder="example@example.com" />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example8">เบอร์ติดต่อ</label>
                                            <input type="text" id="form3Example8" class="form-control form-control-lg"
                                                v-model="phoneNumber" required minlength="10" maxlength="10"
                                                placeholder="Ex. 0987654321" />
                                        </div>

                                        <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                                            <h6 class="mb-0 me-4">เพศ: </h6>
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

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="year">ชั้นปี</label>
                                            <select id="year" v-model="year" class="form-select" required>
                                                <option value="" disabled></option>
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

                                        <div class="row">
                                            <div class="col mb-4">
                                                <div>
                                                    <label for="branch">สาขา</label>
                                                    <select id="branch" v-model="branch" class="form-select" required>
                                                        <option value="" disabled></option>
                                                        <option v-for="b in branches" :key="b.value" :value="b.value">
                                                            {{ b.text }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <!-- <div class="col-md-6 mb-4">
                                                <div>
                                                    <label for="status">สถานะ</label>
                                                    <select id="status" v-model="status" class="form-select" required>
                                                        <option value="" disabled>-</option>
                                                        <option value="ขออนุมัติ">ขออนุมัติ</option>
                                                    </select>
                                                </div>
                                            </div> -->
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example9">รหัสนักศึกษา (กรุณาใส่ -
                                                )</label>
                                            <input v-model="studentID" type="text" id="form3Example9"
                                                class="form-control form-control-lg" required maxlength="13"
                                                minlength="13" placeholder="Ex. 64322110094-5" />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form3Example9">เลขบัตรประชาชน</label>
                                            <input type="text" id="form3Example9" class="form-control form-control-lg"
                                                v-model="idCard" maxlength="13" pattern="[0-9]{13}" required />
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
</style>
