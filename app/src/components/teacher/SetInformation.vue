<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">กรอกข้อมูลเพิ่มเติม</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="updateTeacherInfo">
                    <div v-if="currentStep >= 1" class="mb-3">
                        <label for="prefix" class="form-label">คำนำหน้า</label>
                        <input type="text" class="form-control" id="prefix" v-model="teacherData.prefix"
                            @input="goToNextStep(2)">
                    </div>
                    <div v-if="currentStep >= 2" class="mb-3">
                        <label for="firstName" class="form-label">ชื่อ</label>
                        <input type="text" class="form-control" id="firstName" v-model="teacherData.firstName" required
                            @input="goToNextStep(3)">
                    </div>
                    <div v-if="currentStep >= 3" class="mb-3">
                        <label for="lastName" class="form-label">นามสกุล</label>
                        <input type="text" class="form-control" id="lastName" v-model="teacherData.lastName" required
                            @input="goToNextStep(4)">
                    </div>
                    <div v-if="currentStep >= 4" class="mb-3">
                        <label for="phoneNumber" class="form-label">เบอร์โทรศัพท์</label>
                        <input type="text" class="form-control" id="phoneNumber" v-model="teacherData.phoneNumber"
                            @input="goToNextStep(5)">
                    </div>
                    <div v-if="currentStep >= 5" class="mb-3">
                        <label for="idCard" class="form-label">เลขบัตรประชาชน</label>
                        <input type="text" class="form-control" id="idCard" v-model="teacherData.idCard"
                            @input="goToNextStep(6)">
                    </div>
                    <div v-if="currentStep >= 6" class="mb-3">
                        <label for="gender" class="form-label">เพศ</label>
                        <select class="form-control" id="gender" v-model="teacherData.gender" @change="goToNextStep(7)">
                            <option value="ชาย">ชาย</option>
                            <option value="หญิง">หญิง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                    </div>
                    <div v-if="currentStep >= 7" class="mb-3">
                        <label for="branch" class="form-label">สาขาวิชา</label>
                        <multiselect v-model="teacherData.branch" :options="branches" :multiple="true"
                            :close-on-select="false" placeholder="เลือกสาขาวิชา" label="name" track-by="name"
                            @select="goToNextStep(8)" @remove="goToNextStep(8)">
                        </multiselect>
                    </div>
                    <div v-if="currentStep >= 8" class="mb-3">
                        <label for="password" class="form-label">ตั้งรหัสผ่านใหม่</label>
                        <input type="password" class="form-control" id="password" v-model="teacherData.password"
                            required>
                    </div>
                    <button v-if="currentStep >= 8" type="submit" class="btn btn-success mt-3">บันทึกข้อมูล</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import config from "../../../config";

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

const currentStep = ref(1);
const branches = ref(['วิทยาการคอมพิวเตอร์', 'วิศวกรรมซอฟต์แวร์', 'วิศวกรรมไฟฟ้า', 'วิศวกรรมเครื่องกล']); // ตัวอย่างสาขาวิชา

const goToNextStep = (step) => {
    if (teacherData.value.prefix && teacherData.value.firstName && teacherData.value.lastName &&
        teacherData.value.phoneNumber && teacherData.value.idCard && teacherData.value.gender &&
        teacherData.value.branch.length > 0 && teacherData.value.password) {
        currentStep.value = 8;
    } else {
        currentStep.value = step;
    }
};

const updateTeacherInfo = async () => {
    try {
        const response = await axios.put(`${config.api_path}/teacher/update`, teacherData.value);
        Swal.fire({
            title: "Success",
            text: "บันทึกข้อมูลสำเร็จแล้ว",
            icon: "success"
        });
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "ไม่สามารถบันทึกข้อมูลได้",
            icon: "error"
        });
    }
};

// Fetch teacher's current data on page load
onMounted(async () => {
    try {
        const response = await axios.get(`${config.api_path}/teachers`);
        teacherData.value = response.data;
        currentStep.value = Object.keys(response.data).filter(key => response.data[key]).length + 1;
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
.container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
}

.card {
    border-radius: 10px;
    overflow: hidden;
}

.card-header {
    font-size: 1.25rem;
    padding: 15px;
}

.card-body {
    padding: 20px;
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
}
</style>
