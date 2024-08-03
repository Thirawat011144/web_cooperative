<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import config from "../../../config";
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const password = ref('');
const phoneNumber = ref('');
const idCard = ref('');
// const schoolName = ref('');
// const department = ref('');
// const schoolSize = ref('');
// const courseRelation = ref('');
const evaluatorStatus = ref('');
const currentStudyField = ref('');

const collegeNames = ref([]);

// Function to fetch college names
const fetchCollegeNames = async () => {
    try {
        const response = await axios.get(`${config.api_path}/colleges`);
        const uniqueCollegeNames = [...new Set(response.data.map(college => college.collegeName))];
        collegeNames.value = uniqueCollegeNames;
    } catch (error) {
        console.error("Error fetching college names:", error);
    }
};

// Fetch college names on component mount
onMounted(() => {
    fetchCollegeNames();
});

const handleRegister = async () => {
    try {
        const payload = {
            firstName: firstName.value,
            lastName: lastName.value,
            userName: userName.value,
            password: password.value,
            phoneNumber: phoneNumber.value,
            idCard: idCard.value,
            // schoolName: schoolName.value,
            // department: department.value,
            // schoolSize: schoolSize.value,
            // courseRelation: courseRelation.value,
            evaluatorStatus: evaluatorStatus.value,
            currentStudyField: currentStudyField.value,
        };

        const response = await axios.post(`${config.api_path}/evaluation`, payload);
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Sign Up",
                text: "สมัครบัญชีเรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
            });
            router.push('/login-evaluation');
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Register Error",
            icon: "error",
        });
        console.log(error);
    }
};
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
                                                    <label class="form-label" for="firstName">ชื่อ</label>
                                                    <input type="text" id="firstName"
                                                        class="form-control form-control-lg" v-model="firstName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="lastName">นามสกุล</label>
                                                    <input type="text" id="lastName"
                                                        class="form-control form-control-lg" v-model="lastName"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="userName">ชื่อผู้ใช้</label>
                                                    <input type="text" id="userName"
                                                        class="form-control form-control-lg" v-model="userName"
                                                        required />
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="password">รหัสผ่าน</label>
                                                    <input type="password" id="password"
                                                        class="form-control form-control-lg" v-model="password"
                                                        required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="idCard">เลขบัตรประจำตัวประชาชน</label>
                                                    <input type="text" id="idCard" class="form-control form-control-lg"
                                                        v-model="idCard" maxlength="13" minlength="13" required />
                                                </div>
                                            </div>
                                            <!-- <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="schoolName">ชื่อสถานศึกษาที่นักศึกษาเข้ารับการปฏิบัติการสอน</label>
                                                    <select id="schoolName" class="form-control form-control-lg"
                                                        v-model="schoolName" required>
                                                        <option value="" disabled>-</option>
                                                        <option v-for="name in collegeNames" :key="name" :value="name">
                                                            {{ name }}</option>
                                                    </select>
                                                </div>
                                            </div> -->
                                            <!-- Department input -->
                                            <!-- <div class="col-md-6 mb-4">
                                                <label class="form-label"
                                                    for="department">แผนกวิชาที่นักศึกษาเข้ารับการฝึกประสบการณ์วิชาชีพ
                                                    <span class="text-red">*</span></label>
                                                <select id="department" class="form-select" v-model="department"
                                                    required>
                                                    <option value="" disabled>-</option>
                                                    <option value="แผนกวิชาเทคนิคพื้นฐาน">แผนกวิชาเทคนิคพื้นฐาน</option>
                                                    <option value="แผนกวิชาเทคโนโลยีคอมพิวเตอร์">
                                                        แผนกวิชาเทคโนโลยีคอมพิวเตอร์</option>
                                                    <option value="แผนกวิชาช่างเทคนิคพื้นฐาน">แผนกวิชาช่างเทคนิคพื้นฐาน
                                                    </option>
                                                    <option value="แผนกวิชาแมคคาทอ닉ส์">แผนกวิชาแมคคาทอนิส์</option>
                                                    <option value="แผนกวิชาช่างกลโรงงาน">แผนกวิชาช่างกลโรงงาน</option>
                                                    <option value="แผนกวิชาช่างก่อสร้าง">แผนกวิชาช่างก่อสร้าง</option>
                                                    <option value="แผนกวิชาช่างเชื่อมโลหะ">แผนกวิชาช่างเชื่อมโลหะ
                                                    </option>
                                                    <option value="แผนกวิชาช่างเทคนิคอุตสาหกรรม">
                                                        แผนกวิชาช่างเทคนิคอุตสาหกรรม</option>
                                                    <option value="แผนกวิชาช่างไฟฟ้า">แผนกวิชาช่างไฟฟ้า</option>
                                                    <option value="แผนกวิชาช่างไฟฟ้ากำลัง">แผนกวิชาช่างไฟฟ้ากำลัง
                                                    </option>
                                                    <option value="แผนกวิชาช่างยนต์">แผนกวิชาช่างยนต์</option>
                                                    <option value="แผนกวิชาช่างโยธา">แผนกวิชาช่างโยธา</option>
                                                    <option value="แผนกวิชาช่างสถาปัตยกรรม">แผนกวิชาช่างสถาปัตยกรรม
                                                    </option>
                                                    <option value="แผนกวิชาช่างอิเล็กทรอนิกส์">
                                                        แผนกวิชาช่างอิเล็กทรอนิกส์</option>
                                                    <option value="แผนกวิชาเทคโนโลยีคอมพิวเตอร์">
                                                        แผนกวิชาเทคโนโลยีคอมพิวเตอร์</option>
                                                    <option value="แผนกวิชาคอมพิวเตอร์ธุรกิจ">แผนกวิชาคอมพิวเตอร์ธุรกิจ
                                                    </option>
                                                </select>
                                            </div> -->

                                            <!-- <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label" for="schoolSize">ขนาดสถานศึกษา</label>
                                                    <select id="schoolSize" class="form-control form-control-lg"
                                                        v-model="schoolSize" required>
                                                        <option value="" disabled>-</option>
                                                        <option value="สถานศึกษาขนาดเล็ก">สถานศึกษาขนาดเล็ก</option>
                                                        <option value="สถานศึกษาขนาดกลาง">สถานศึกษาขนาดกลาง</option>
                                                        <option value="สถานศึกษาขนาดใหญ่">สถานศึกษาขนาดใหญ่</option>
                                                        <option value="สถานศึกษาขนาดใหญ่พิเศษ">สถานศึกษาขนาดใหญ่พิเศษ
                                                        </option>
                                                    </select>
                                                </div>
                                            </div> -->
                                            <!-- <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="courseRelation">ความสัมพันธ์ของรายวิชาปฏิบัติการสอนในสถานศึกษา</label>
                                                    <select id="courseRelation" class="form-control form-control-lg"
                                                        v-model="courseRelation" required>
                                                        <option value="" disabled>-</option>
                                                        <option
                                                            value="ตรงกับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ หรือประกาศนียบัตรวิชาชีพชั้นสูง">
                                                            ตรงกับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน
                                                            หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ
                                                            หรือประกาศนียบัตรวิชาชีพชั้นสูง</option>
                                                        <option
                                                            value="สัมพันธ์กับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ หรือประกาศนียบัตรวิชาชีพชั้นสูง">
                                                            สัมพันธ์กับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน
                                                            หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ
                                                            หรือประกาศนียบัตรวิชาชีพชั้นสูง</option>
                                                        <option
                                                            value="ไม่ตรง/ไม่สัมพันธ์กับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ หรือประกาศนียบัตรวิชาชีพชั้นสูง">
                                                            ไม่ตรง/ไม่สัมพันธ์กับกลุ่มสาระการเรียนรู้ในหลักสูตรการศึกษาขั้นพื้นฐาน
                                                            หรือประเภทวิชาในหลักสูตรประกาศนียบัตรวิชาชีพ
                                                            หรือประกาศนียบัตรวิชาชีพชั้นสูง</option>
                                                    </select>
                                                </div>
                                            </div> -->
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="evaluatorStatus">สถานะผู้ประเมิน</label>
                                                    <select id="evaluatorStatus" class="form-control form-control-lg"
                                                        v-model="evaluatorStatus" required>
                                                        <option value="" disabled>-</option>
                                                        <option value="อาจารย์นิเทศ">อาจารย์นิเทศ</option>
                                                        <option value="หัวหน้าแผนกวิชา">หัวหน้าแผนกวิชา</option>
                                                        <option value="ครูพี่เลี้ยง">ครูพี่เลี้ยง</option>
                                                        <option value="กรรมการบริหารสถานศึกษา/ตัวแทนชุมชน">
                                                            กรรมการบริหารสถานศึกษา/ตัวแทนชุมชน
                                                        </option>
                                                        <option value="ผู้บริหารสถานศึกษา/ผู้ได้รับมอบหมาย">
                                                            ผู้บริหารสถานศึกษา/ผู้ได้รับมอบหมาย
                                                        </option>
                                                        <option value="ผู้ดูแล">
                                                            ผู้ดูแล
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline">
                                                    <label class="form-label"
                                                        for="currentStudyField">สาขาวิชาที่นักศึกษากำลังศึกษา
                                                        (สามารถเปลี่ยนแปลงได้)</label>
                                                    <select id="currentStudyField" class="form-control form-control-lg"
                                                        v-model="currentStudyField" required>
                                                        <option value="" disabled>-</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหกรรมโยธา">
                                                            สาขาครุศาสตร์อุตสาหกรรมโยธา</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า">
                                                            สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหกรรมเครื่องกล">
                                                            สาขาครุศาสตร์อุตสาหกรรมเครื่องกล</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ">
                                                            สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ</option>
                                                        <option
                                                            value="สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม">
                                                            สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์">
                                                            สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์</option>
                                                        <option value="สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ">
                                                            สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ</option>

                                                        <option value="สาขาวิชาช่างโยธา">สาขาวิชาช่างโยธา</option>
                                                        <option value="สาขาวิชาช่างก่อสร้าง">สาขาวิชาช่างก่อสร้าง
                                                        </option>
                                                        <option value="สาขาวิชาช่างเครื่องมือกลอัตโนมัติ">
                                                            สาขาวิชาช่างเครื่องมือกลอัตโนมัติ</option>
                                                        <option value="สาขาวิชาช่างยนต์">สาขาวิชาช่างยนต์</option>
                                                        <option value="สาขาวิชาช่างกลเกษตร">สาขาวิชาช่างกลเกษตร</option>
                                                        <option value="สาขาวิชาช่างกลโรงงาน">สาขาวิชาช่างกลโรงงาน
                                                        </option>
                                                        <option value="สาขาวิชาช่างท่อและประสาน">
                                                            สาขาวิชาช่างท่อและประสาน</option>
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
                                                            สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล</option>
                                                        <!-- สาขาวิชาช่างอิเล็กทรอนิกส์ (ซ้ำ) -->
                                                        <option value="สาขาวิชาช่างเทคนิคคอมพิวเตอร์">
                                                            สาขาวิชาช่างเทคนิคคอมพิวเตอร์</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6 mb-4">
                                                <div class="form-outline mb-4">
                                                    <label class="form-label" for="phoneNumber">เบอร์โทร</label>
                                                    <input type="tel" id="phoneNumber"
                                                        class="form-control form-control-lg" v-model="phoneNumber"
                                                        maxlength="10" pattern="[0-9]{10}" required />
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-flex justify-content-end pt-3">
                                            <button type="reset" class="btn btn-light btn-lg">Reset all</button>
                                            <button type="submit" class="btn btn-warning btn-lg ms-2">Submit
                                                form</button>
                                        </div>
                                    </form>
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
