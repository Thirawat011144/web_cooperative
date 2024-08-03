<script setup>
import axios from 'axios';
import { ref } from 'vue';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import { useDataStore } from '../../store/Search'


const router = useRouter();
const searchData = useDataStore();

const userName = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const payload = {
            userName: userName.value,
            password: password.value
        };
        const response = await axios.post(`${config.api_path}/login`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign In",
                text: "เข้าสู่ระบบแล้ว",
                icon: "success",
                timer: 2000,
            });
            console.log(response)
            localStorage.setItem(config.token_name, response.data.token);
            localStorage.setItem(config.role_name, response.data.data.role)
            localStorage.setItem(config.firstName_name, response.data.data.firstName)
            localStorage.setItem(config.branch, response.data.data.branch)
            localStorage.setItem('userData', JSON.stringify(response.data.data)); // เก็บข้อมูลใน localStorage
            searchData.setDataResults(response.data.data);

            if (response.data.data.role === "admin") {
                router.push('/admin-index/list-teachers')
            } else if (response.data.data.role === "teacher") {
                router.push('/teacher-index/dashboard')
            }
            else {
                router.push('/')
            }
        }
    } catch (error) {
        Swal.fire({
            title: "ข้อมูลไม่ถูกต้อง",
            text: ("Username or Password ไม่ถูกต้อง"),
            icon: "error"
        })
    }
}

</script>
<template>
    <div>
        <!-- Background Image -->
        <div class="background"></div>

        <!-- Main Container -->
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
            <!-- Login Container -->
            <div class="row border rounded-5 p-3 bg-white shadow box-area">
                <!-- Left Box -->
                <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                    style="background: #FFF;">
                    <div class="featured-image mb-3">
                        <img src="../../assets/img/rmuti3.png" class="img-fluid" style="width: 100px;">
                    </div>
                    <p class="text-back fs-2" style="font-weight: 600;">
                        งานสหกิจศึกษา</p>
                    <small class="text-back text-wrap text-center" style="width: 17rem;">คณะครุศาสตร์อุตสหกรรม <br>
                        มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน
                        <br>
                        วิทยาเขตขอนแก่น</small>
                </div>
                <!-- Right Box -->
                <div class="col-md-6 right-box">
                    <div class="row align-items-center">
                        <div class="header-text mb-4 ">
                            <h2 class="ab">เข้าสู่ระบบ</h2>
                            <p class="text-white">We are happy to have you back.</p>
                        </div>
                        <form @submit.prevent="handleLogin">
                            <div class="input-group mb-3">
                                <input v-model="userName" type="text" class="form-control form-control-lg bg-light fs-6"
                                    placeholder="Username" required>
                            </div>
                            <div class="input-group mb-1">
                                <input v-model="password" type="password"
                                    class="form-control form-control-lg bg-light fs-6" placeholder="Password" required>
                            </div>
                            <div class="input-group mb-5 d-flex justify-content-between">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="formCheck">
                                    <label for="formCheck" class="form-check-label text-secondary"><small>Remember
                                            Me</small></label>
                                </div>
                            </div>
                            <div class="input-group mb-3">
                                <button style="background-color: mediumvioletred; color: white;"
                                    class="btn w-100 fs-6">Login</button>

                                <!--  -->
                            </div>
                        </form>
                        <div class="input-group mb-3"></div>
                        <div class="row">
                            <!-- <p>ยังไม่มีบัญชีผู้ใช้ ใช่ไหม</p> -->
                            <!-- <router-link to="/register"><small href="#">สมัครสำหรับนักศึกษา</small></router-link> -->
                            <router-link to="/teacher-register"><small href="#">Don't have an
                                    account? Click Register</small></router-link>
                            <router-link to="/forgot-pass"><small href="#">Forgot your password?</small></router-link>
                            <!-- <router-link to="/register-evaluation"><small
                                    href="#">สมัครสำหรับผู้ประเมิน</small></router-link>
                            <router-link to="/login-evaluation"><small
                                    href="#">เข้าสู่ระบบสำหรับผู้ประเมิน</small></router-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style scope>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Niramit:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

body {
    font-family: 'Sarabun', sans-serif;
    background: #ececec;
}

.ab {
    font-family: 'Sarabun', sans-serif;
}

/*------------ Login container ------------*/
.box-area {
    width: 930px;
}

/*------------ Right box ------------*/
.right-box {
    padding: 40px 30px 40px 40px;
}

/*------------ Custom Placeholder ------------*/
::placeholder {
    font-size: 16px;
}

.rounded-4 {
    border-radius: 20px;
}

.rounded-5 {
    border-radius: 30px;
}

/*------------ For small screens------------*/
@media only screen and (max-width: 768px) {
    .box-area {
        margin: 0 10px;
    }

    .left-box {
        height: 100px;
        overflow: hidden;
    }

    .right-box {
        padding: 20px;
    }
}

.background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../assets/img/8.jpg');
    background-size: cover;
    background-position: center;
    filter: blur(8px);
    z-index: -1;
}

.container {
    position: relative;
    z-index: 1;
}

.box-area {
    background: rgba(255, 255, 255, 0.8);
    /* ทำให้พื้นหลังของกล่องโปร่งแสง */
    border-radius: 10px;
}
</style>
