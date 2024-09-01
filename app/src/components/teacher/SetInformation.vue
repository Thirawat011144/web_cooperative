<template>
    <div class="">
        <div class="container mt-5">
            <div class="card shadow">
                <div class="card-header bg-secondary text-white">
                    <h4 class="mb-0 text-center">กรอกข้อมูลส่วนตัว</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="updateTeacherInfo">
                        <div class="form-row align-items-end">
                            <div class="col-md-2 mb-3">
                                <label for="prefix" class="form-label">คำนำหน้า <span>*</span></label>
                                <select class="form-control" id="prefix" v-model="teacherData.prefix">
                                    <option value="นาย">นาย</option>
                                    <option value="นาง">นาง</option>
                                    <option value="นางสาว">นางสาว</option>
                                </select>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="firstName" class="form-label">ชื่อ <span>*</span></label>
                                <input type="text" class="form-control" id="firstName" v-model="teacherData.firstName"
                                    @input="validateNameInput('firstName')" required>
                            </div>
                            <div class="col-md-5 mb-3">
                                <label for="lastName" class="form-label">นามสกุล <span>*</span></label>
                                <input type="text" class="form-control" id="lastName" v-model="teacherData.lastName"
                                    @input="validateNameInput('lastName')" required>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col mb-3">
                                <label for="phoneNumber" class="form-label">เบอร์โทรศัพท์ <span>*</span></label>
                                <input type="text" class="form-control" id="phoneNumber" maxlength="10"
                                    v-model="teacherData.phoneNumber" @input="validatePhoneNumber">
                                <!-- <small v-if="phoneNumberWarning" class="text-danger">{{ phoneNumberWarning }}</small> -->
                            </div>
                            <div class="col mb-3">
                                <label for="idCard" class="form-label">เลขบัตรประชาชน <span>*</span></label>
                                <input type="text" class="form-control" id="idCard" v-model="teacherData.idCard"
                                    maxlength="13" @input="validateNumericInput('idCard')">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col mb-3">
                                <label for="gender" class="form-label">เพศ <span>*</span></label>
                                <select class="form-control" id="gender" v-model="teacherData.gender">
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                    <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="branch" class="form-label">สาขาวิชา <span>*</span></label>
                            <multiselect v-model="teacherData.branch" :options="branches" :multiple="true"
                                :close-on-select="false" placeholder="เลือกสาขาวิชา" label="name" track-by="name">
                            </multiselect>
                        </div>

                        <div class="form-row">
                            <div class="col mb-3 position-relative">
                                <label for="password" class="form-label">ตั้งรหัสผ่านใหม่ <span>*</span></label>
                                <input :type="showPassword ? 'text' : 'password'" class="form-control pr-5"
                                    id="password" v-model="teacherData.password" required>
                                <button type="button" class="btn" @click="togglePasswordVisibility">
                                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                </button>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-secondary mt-3">บันทึกข้อมูล</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import config from "../../../config";

const router = useRouter();
const teacherId = ref(null);
const phoneNumberWarning = ref('');

const teacherData = ref({
    prefix: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    idCard: '',
    gender: '',
    branch: [],
    password: ''
});

const validateNumericInput = (field) => {
    teacherData.value[field] = teacherData.value[field].replace(/[^0-9]/g, '');
};

const validateNameInput = (field) => {
    teacherData.value[field] = teacherData.value[field].replace(/[^ก-๙a-zA-Z\s]/g, '');
};

const validatePhoneNumber = () => {
    const originalValue = teacherData.value.phoneNumber;
    validateNumericInput('phoneNumber');

    if (originalValue !== teacherData.value.phoneNumber) {
        phoneNumberWarning.value = 'คุณสามารถใส่ได้เฉพาะตัวเลขเท่านั้น';
    } else {
        phoneNumberWarning.value = '';
    }
};

const currentStep = ref(1);
const branches = ref([
    { name: 'สาขาวิชาช่างก่อสร้าง' },
    { name: 'สาขาวิชาช่างไฟฟ้ากำลัง' },
    { name: 'สาขาวิชาช่างยนต์' },
    { name: 'สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล' },
    { name: 'สาขาวิชาช่างอิเล็กทรอนิกส์' },
    { name: 'สาขาวิชาช่างเทคนิคคอมพิวเตอร์' },
    { name: 'สาขาวิชาช่างโยธา' },
    { name: 'สาขาวิชาช่างเครื่องมือกลอัตโนมัติ' },
    { name: 'สาขาวิชาช่างกลเกษตร' },
    { name: 'สาขาวิชาช่างกลโรงงาน' },
    { name: 'สาขาวิชาช่างท่อและประสาน' },
    { name: 'สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล' },
    { name: 'สาขาวิชาเทคโนโลยีคอมพิวเตอร์' },
]);

const showPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const updateTeacherInfo = async () => {
    validateNameInput('firstName');
    validateNameInput('lastName');
    validateNumericInput('idCard');
    validatePhoneNumber();

    if (teacherData.value.firstName === '' || teacherData.value.lastName === '' || teacherData.value.phoneNumber === '' || teacherData.value.idCard === '' || teacherData.value.gender === '' || teacherData.value.branch.length === 0 || teacherData.value.password === '') {
        Swal.fire({
            title: "Error",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "error"
        });
        return;
    }

    try {
        const response = await axios.put(`${config.api_path}/teacher/${teacherId.value}`, teacherData.value);
        Swal.fire({
            title: "Success",
            text: "บันทึกข้อมูลสำเร็จแล้ว",
            icon: "success"
        });
        router.push("/");
                localStorage.setItem(config.token_name, response.data.token);
                localStorage.setItem(config.role_name, response.data.data.role)
                localStorage.setItem(config.firstName_name, response.data.data.firstName)
                localStorage.setItem(config.token_lastName, response.data.data.lastName)
                localStorage.setItem(config.currentStudyField, response.data.data.branch)
                localStorage.setItem(config.idCard, response.data.data.idCard)
                localStorage.setItem(config.phoneNumber, response.data.data.phoneNumber)
                localStorage.setItem('userData', JSON.stringify(response.data.data)); // เก็บข้อมูลใน localStorage
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถบันทึกข้อมูลได้",
            icon: "error"
        });
        console.log(error)
    }
};

watch(teacherData, (newValue) => {
    if (newValue.prefix && newValue.firstName && newValue.lastName &&
        newValue.phoneNumber && newValue.idCard && newValue.gender &&
        Array.isArray(newValue.branch) && newValue.branch.length > 0 && newValue.password) {
        currentStep.value = 8;
    }
}, { deep: true });

onMounted(async () => {
    try {
        const response = await axios.get(`${config.api_path}/teachers`);
        if (Array.isArray(response.data)) {
            teacherData.value = response.data[0];
        } else {
            teacherData.value = response.data;
        }
        teacherId.value = teacherData.value.id;
        teacherData.value.password = '';
        currentStep.value = Object.keys(teacherData.value).filter(key => teacherData.value[key]).length + 1;
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถดึงข้อมูลได้",
            icon: "error"
        });
    }
});
</script>


<style scoped>
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #6c6c6c;
    position: relative;
    overflow: hidden;
}

.bg-black {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    min-height: 100vh;
    overflow: hidden;
}

.bg-black::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* background-image: url('../../assets/img/8.1.png'); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: blur(3px);
    z-index: -1;
}

.container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    /* background-color: rgba(255, 255, 255, 0.85);
    border-radius: 10px;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1); */
    z-index: 2;
    position: relative;
}

.card {
    border-radius: 10px;
    overflow: hidden;
}

.card-header {
    font-size: 1.25rem;
    padding: 15px;
    background-color: #007bff;
    color: white;
}

.card-body {
    padding: 20px;
    background-color: #ffffff;
}

.form-label {
    font-weight: bold;
}

.btn {
    width: 100%;
}

.mt-5 {
    margin-top: 3rem;
}

.shadow {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.multiselect {
    width: 100%;
    position: relative;
}

.multiselect__content-wrapper {
    max-height: 200px;
    /* กำหนดความสูงสูงสุดให้ dropdown */
    overflow-y: auto;
    /* เพิ่ม scrollbar ถ้าขนาดเกินกำหนด */
}

.multiselect__option--highlight .multiselect__option-label {
    display: none;
}

.position-relative {
    position: relative;
}

.pr-5 {
    padding-right: 2.5rem;
}

.btn-outline-secondary {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    border: none;
    padding: 0;
    font-size: 1rem;
    color: #007bff;
    background-color: transparent;
    z-index: 2;
    cursor: pointer;
}

.btn-outline-secondary i {
    font-size: 1.2rem;
}

.btn-outline-secondary:focus {
    box-shadow: none;
}

span {
    color: red;
}
</style>
