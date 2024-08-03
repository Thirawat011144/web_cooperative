<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const role = localStorage.getItem(config.role_name);


const user = ref({
    firstName: '',
    lastName: '',
    // userName: '',
    // password: '',
    phoneNumber: '',
    gender: '',
    year: '',
    branch: '',
    // status: '',
    studentID: '',
    // company: ''
});

const fetchData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/user/${route.params.id}`);
        const userData = response.data; // ปรับตามโครงสร้างของข้อมูลที่ได้จาก API
        user.value = { ...userData }; // ใช้ spread operator เพื่อคัดลอกข้อมูล
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Edit Error"),
            icon: "error"
        });
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
            const checkYears = user.value.year
            console.log("check",checkYears)
            const response = await axios.put(`${config.api_path}/user/${route.params.id}`, user.value);
            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "แก้ไขข้อมูลผู้ใช้สำเร็จ",
                    icon: "success",
                });
                if (role === 'teacher') {
                    router.push('/teacher-index/list-cr2');
                } else if (role === 'admin' && checkYears === 'ปวส 2'){
                    router.push('/admin-index/list-dcr');
                } else {
                    router.push('/admin-index/list-cr2');
                }
            }
        } catch (error) {
            Swal.fire({
                title: "error",
                text: (error.message, "Update Error"),
                icon: "error"
            });
            console.log(error)
        }
    }
};

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="container">
        <div class="background"></div>
        <div class="overlay">
            <div class="card card-registration">
                <div class="card-body p-md-5 text-black">
                    <h3 class="mb-5 text-uppercase">แก้ไขข้อมูลผู้ใช้</h3>
                    <form @submit.prevent="updateData">
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="firstName">First name</label>
                                    <input type="text" id="firstName" class="form-control form-control-lg"
                                        v-model="user.firstName" />
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="lastName">Last name</label>
                                    <input type="text" id="lastName" class="form-control form-control-lg"
                                        v-model="user.lastName" />
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <!-- <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="userName">Username</label>
                                    <input type="text" id="userName" class="form-control form-control-lg"
                                        v-model="user.userName" />
                                </div>
                            </div> -->
                            <!-- <div class="col-md-6 mb-4">
                                <div class="form-outline">
                                    <label class="form-label" for="password">Password</label>
                                    <input type="password" id="password" class="form-control form-control-lg"
                                        v-model="user.password" />
                                </div>
                            </div> -->
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="phoneNumber">Tel</label>
                            <input type="text" id="phoneNumber" class="form-control form-control-lg"
                                v-model="user.phoneNumber" />
                        </div>
                        <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                            <h6 class="mb-0 me-4">Gender:</h6>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                    value="Female" v-model="user.gender" />
                                <label class="form-check-label" for="femaleGender">Female</label>
                            </div>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                    value="Male" v-model="user.gender" />
                                <label class="form-check-label" for="maleGender">Male</label>
                            </div>
                        </div>
                        <div class="d-md-flex justify-content-start align-items-center mb-4 py-2">
                            <h6 class="mb-0 me-4">Year:</h6>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="yearOptions" id="voc2" value="ปวช 3"
                                    v-model="user.year" />
                                <label class="form-check-label" for="voc2">ปวช 3</label>
                            </div>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="yearOptions" id="voc2" value="ปวส 2"
                                    v-model="user.year" />
                                <label class="form-check-label" for="voc2">ปวส 2</label>
                            </div>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="yearOptions" id="bach2"
                                    value="ป.ตรี ปีที่ 2" v-model="user.year" />
                                <label class="form-check-label" for="bach2">ป.ตรี ปีที่ 2</label>
                            </div>
                            <div class="form-check form-check-inline mb-0 me-4">
                                <input class="form-check-input" type="radio" name="yearOptions" id="bach4"
                                    value="ป.ตรี ปีที่ 4" v-model="user.year" />
                                <label class="form-check-label" for="bach4">ป.ตรี ปีที่ 4</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-4">
                                <label class="form-label" for="branch">สาขา</label>
                                <select v-model="user.branch" class="form-select">
                                    <option value="" disabled>-</option>
                                    <option value="สาขาวิชาช่างก่อสร้าง">
                                        สาขาวิชาช่างก่อสร้าง</option>
                                    <option value="สาขาวิชาช่างไฟฟ้ากำลัง">
                                        สาขาวิชาช่างไฟฟ้ากำลัง</option>
                                    <option value="สาขาวิชาช่างยนต์">
                                        สาขาวิชาช่างยนต์</option>
                                    <option value="สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล">
                                        สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล</option>
                                    <option value="สาขาวิชาช่างอิเล็กทรอนิกส์">
                                        สาขาวิชาช่างอิเล็กทรอนิกส์</option>
                                    <option value="สาขาวิชาช่างเทคนิคคอมพิวเตอร์">
                                        สาขาวิชาช่างเทคนิคคอมพิวเตอร์</option>
                                    <option value="สาขาวิชาช่างโยธา">
                                        สาขาวิชาช่างโยธา</option>
                                    <option value="สาขาวิชาช่างเครื่องมือกลอัตโนมัติ">
                                        สาขาวิชาช่างเครื่องมือกลอัตโนมัติ</option>
                                    <option value="สาขาวิชาช่างกลเกษตร">
                                        สาขาวิชาช่างกลเกษตร</option>
                                    <option value="สาขาวิชาช่างกลโรงงาน">
                                        สาขาวิชาช่างกลโรงงาน</option>
                                    <option value="สาขาวิชาช่างท่อและประสาน">
                                        สาขาวิชาช่างท่อและประสาน</option>
                                    <option value="สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล">
                                        สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล</option>
                                    <option value="สาขาวิชาเทคโนโลยีคอมพิวเตอร์">
                                        สาขาวิชาเทคโนโลยีคอมพิวเตอร์</option>
                                </select>
                            </div>
                            <!-- <div class="col-md-6 mb-4">
                                <label class="form-label" for="status">สถานะ</label>
                                <select v-model="user.status" class="form-select">
                                    <option value="" disabled>-</option>
                                    <option value="ไม่อนุมัติ">ไม่อนุมัติ</option>
                                    <option value="ขออนุมัติ">ขออนุมัติ</option>
                                    <option value="อนุมัติ">อนุมัติ</option>
                                    <option value="ผ่าน">ผ่าน</option>
                                </select>
                            </div> -->
                        </div>
                        <div class="form-outline mb-4">
                            <label class="form-label" for="studentID">Student ID</label>
                            <input v-model="user.studentID" type="text" id="studentID"
                                class="form-control form-control-lg" />
                        </div>
                        <!-- <div class="form-outline mb-4">
                            <label class="form-label" for="company">Company</label>
                            <input v-model="user.company" type="text" id="company"
                                class="form-control form-control-lg" />
                        </div> -->
                        <div class="d-flex justify-content-end pt-3">
                            <button type="submit" class="btn btn-primary btn-lg ms-2">Submit Form</button>
                        </div>
                        <!-- <div class="d-flex justify-content-end pt-3">
                            <router-link to="/login"><small>Already have an account? Click <a
                                        href="#">Login</a></small></router-link>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/8.jpg') no-repeat center center;
    background-size: cover;
    filter: blur(8px);
    z-index: -1;
}

.overlay {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-registration {
    margin: 10px 0 10px 0;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
}

.form-outline {
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
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
}

.btn-lg {
    width: auto;
    padding: 0.5rem 1rem;
    background-color: mediumvioletred;
    color: white;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
}

.form-check-inline {
    margin-right: 0.5rem;
}
</style>
