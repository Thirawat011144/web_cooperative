<script setup>
import { ref, watch } from 'vue';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

const router = useRouter();

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const province = ref('');
const collegeName = ref('');
const contactFirstName = ref('');
const contactLastName = ref('');
const collegePhone = ref('');
const collegeEmail = ref('');
const collegeAddress = ref('');
const studentID = ref('');
const department = ref('');
const schoolSize = ref('');
const academicYear = ref('ป.ตรี ปีที่ 4');
const status = ref('ขออนุมัติ');

const provinces = ref([]);
const companies = ref([]);
const branches = ref([]);
const branchCounts = ref([]); // ใช้ติดตามจำนวนสาขาที่ว่าง

const selectedProvince = ref('');
const selectedCompany = ref('');
const selectedBranch = ref('');

// ตั้งค่า student ID ถ้ามี
if (userData.studentID) {
    studentID.value = userData.studentID;
    console.log('Student ID from localStorage:', studentID.value);
} else {
    console.log('No userData found in localStorage');
}

// ฟังก์ชันดึงข้อมูลจังหวัดจาก API
const fetchProvinces = async () => {
    console.log('Fetching provinces...');
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching`);
        const locations = response.data.map(item => item.location);
        provinces.value = [...new Set(locations.map(location => {
            const match = location.match(/จังหวัด(.+?)$/);
            return match ? match[1].trim() : '';
        }))]; // ลบข้อมูลที่ซ้ำออกโดยใช้ Set
        console.log('Provinces fetched:', provinces.value);
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};

// ฟังก์ชันดึงข้อมูลบริษัทตามจังหวัดที่เลือก
const fetchCompanies = async (province) => {
    console.log('Fetching companies for province:', province);
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching`);
        companies.value = response.data
            .filter(item => item.location.includes(province)) // กรองตามจังหวัด
            .map(item => ({
                name: item.company,
                address: item.location // เก็บที่อยู่ของบริษัท
            }));
        console.log('Companies fetched:', companies.value);
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
};

// ฟังก์ชันดึงข้อมูลสาขาตามบริษัทที่เลือก
const fetchBranches = async (company) => {
    console.log('Fetching branches for company:', company);
    try {
        const response = await axios.get(`${config.api_path}/practice-teaching`);
        branches.value = response.data
            .filter(item => item.company === company) // กรองตามบริษัท
            .flatMap(item => item.branches.map(branch => branch.name));

        // อัปเดตข้อมูลจำนวนสาขาที่ว่าง
        branchCounts.value = response.data
            .filter(item => item.company === company)
            .flatMap(item => item.branches);

        console.log('Branches fetched:', branches.value);
        console.log('Branch counts fetched:', branchCounts.value);
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
};

// ฟังก์ชันตรวจสอบการสมัคร
const checkAvailability = async () => {
    try {
        // ดึงข้อมูลการสมัครทั้งหมด
        const response = await axios.get(`${config.api_path}/colleges`);

        // ตรวจสอบจำนวนผู้สมัครในวิทยาลัยและสาขาที่เลือก
        const applicants = response.data.filter(college =>
            college.collegeName === selectedCompany.value &&
            college.department === selectedBranch.value
        );

        // จำนวนที่ต้องการสมัครสำหรับสาขาที่เลือก
        const requiredCount = branchCounts.value.find(branch =>
            branch.name === selectedBranch.value
        )?.count || 0;

        // เช็คว่ามีการสมัครครบตามจำนวนหรือไม่
        if (applicants.length >= requiredCount) {
            Swal.fire({
                title: "ไม่สามารถสมัครได้",
                text: "มีการสมัครครบตามจำนวนแล้ว",
                icon: "warning"
            });
            return false; // ยกเลิกการสมัคร
        }
        return true; // อนุญาตให้สมัครได้
    } catch (error) {
        console.error('Error checking availability:', error);
        return false; // ไม่สามารถตรวจสอบได้
    }
};


// ฟังก์ชันจัดการการส่งฟอร์ม
const handleSubmit = async () => {
    console.log('Submit button clicked');
    const result = await Swal.fire({
        title: 'เพิ่มข้อมูล',
        text: 'คุณจะไม่สามารถย้อนกลับได้!',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
    });

    console.log('Confirmation result:', result.isConfirmed);

    if (result.isConfirmed) {
        if (!await checkAvailability()) {
            console.log('Availability check failed');
            return; // ถ้าตรวจสอบแล้วไม่สามารถสมัครได้ ให้หยุดการส่งข้อมูล
        }

        try {
            const formData = {
                collegeName: selectedCompany.value, // ใช้ selectedCompany แทน collegeName
                contactFirstName: contactFirstName.value,
                contactLastName: contactLastName.value,
                collegePhone: collegePhone.value,
                collegeEmail: collegeEmail.value,
                collegeAddress: collegeAddress.value, // ใช้ที่อยู่ที่ดึงมา
                studentID: studentID.value,
                department: selectedBranch.value,
                schoolSize: schoolSize.value,
                academicYear: academicYear.value,
                status: status.value,
            };

            console.log('Form data to submit:', formData);

            const response = await axios.post(`${config.api_path}/college`, formData);
            console.log('Response from API:', response.data);

            if (response.data.message === 'Success') {
                Swal.fire({
                    title: "สำเร็จ",
                    text: "เพิ่มข้อมูลสำเร็จ",
                    icon: "success",
                });
                localStorage.setItem('collegeData', JSON.stringify(response.data.newCollege));
                router.push('/user-index/data-student');
            }
        } catch (error) {
            Swal.fire({
                title: "ข้อผิดพลาด",
                text: "เกิดข้อผิดพลาดในการสร้างข้อมูล: " + error.message,
                icon: "error"
            });
            console.log('Error submitting form:', error);
        }
    }
};

// เรียกใช้งานฟังก์ชันดึงข้อมูลจังหวัดเมื่อเริ่มต้น
fetchProvinces();

// ตรวจสอบการเปลี่ยนแปลงของจังหวัดที่เลือก
watch(selectedProvince, (newValue) => {
    console.log('Selected province changed to:', newValue);
    if (newValue) {
        fetchCompanies(newValue);
        selectedCompany.value = '';
        selectedBranch.value = '';
    }
});

// ตรวจสอบการเปลี่ยนแปลงของบริษัทที่เลือก
watch(selectedCompany, (newValue) => {
    console.log('Selected company changed to:', newValue);
    if (newValue) {
        const selectedCompanyData = companies.value.find(company => company.name === newValue);
        if (selectedCompanyData) {
            collegeAddress.value = selectedCompanyData.address; // ตั้งค่าที่อยู่ของบริษัทที่เลือก
        }
        fetchBranches(newValue);
        selectedBranch.value = '';
    }
});
</script>

<template>
    <div>
        <div class="flex-grow-1 p-3">
            <h3>แบบฟอร์มลงทะเบียนขอออกฝึกสอน</h3>
            <div class="card">
                <div class="card-body">
                    <form @submit.prevent="handleSubmit">
                        <!-- ฟิลด์จังหวัด -->
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="province">จังหวัด <span
                                            class="text-red">*</span></label>
                                    <select id="province" class="form-control" v-model="selectedProvince" required>
                                        <option value="" disabled selected>เลือกจังหวัด</option>
                                        <option v-for="province in provinces" :key="province" :value="province">
                                            {{ province }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- ฟิลด์บริษัท -->
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="company">วิทยาลัย<span
                                            class="text-red">*</span></label>
                                    <select id="company" class="form-control" v-model="selectedCompany" required>
                                        <option value="" disabled selected>เลือกบริษัท</option>
                                        <option v-for="company in companies" :key="company.name" :value="company.name">
                                            {{ company.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="collegeAddress">ที่อยู่</label>
                            <textarea id="collegeAddress" class="form-control" v-model="collegeAddress"
                                rows="4"></textarea>
                        </div>


                        <!-- ฟิลด์สาขา -->
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label"
                                        for="branch">แผนกวิชาที่นักศึกษาเข้ารับการฝึกประสบการณ์วิชาชีพ <span
                                            class="text-red">*</span></label>
                                    <select id="branch" class="form-control" v-model="selectedBranch" required>
                                        <option value="" disabled selected>เลือกแผนกวิชา</option>
                                        <option v-for="branch in branches" :key="branch" :value="branch">
                                            {{ branch }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label" for="schoolSize">ขนาดสถานศึกษา</label>
                            <select id="schoolSize" class="form-select" v-model="schoolSize" required>
                                <option value="" disabled>-</option>
                                <option value="สถานศึกษาขนาดเล็ก">สถานศึกษาขนาดเล็ก</option>
                                <option value="สถานศึกษาขนาดกลาง">สถานศึกษาขนาดกลาง</option>
                                <option value="สถานศึกษาขนาดใหญ่">สถานศึกษาขนาดใหญ่</option>
                                <option value="สถานศึกษาขนาดใหญ่พิเศษ">สถานศึกษาขนาดใหญ่พิเศษ</option>
                            </select>
                        </div>



                        <!-- ฟิลด์อื่นๆ -->
                        <div class="row mb-4">
                            <div class="col">
                                <div data-mdb-input-init class="form-outline">
                                    <label class="form-label" for="academicYear">ชั้นปี <span
                                            class="text-red">*</span></label>
                                    <select id="academicYear" class="form-control" v-model="academicYear" disabled>
                                        <option value="" disabled selected>เลือกชั้นปี</option>
                                        <option value="ปี 1">ปี 1</option>
                                        <option value="ปี 2">ปี 2</option>
                                        <option value="ปี 3">ปี 3</option>
                                        <option value="ป.ตรี ปีที่ 4">ป.ตรี ปีที่ 4</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6 mb-4">
                                <div>
                                    <label for="">สถานะ</label>
                                    <select v-model="status" class="form-select" disabled>
                                        <option value="" disabled>-</option>
                                        <option value="ขออนุมัติ">ขออนุมัติ</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <label class="form-label" for="contactInfo">ข้อมูลผู้ประสานงานวิทยาลัย</label>
                        <!-- ข้อมูลผู้ประสานงาน -->
                        <div data-mdb-input-init class="form-outline row mb-4">
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
                            <label class="form-label" for="collegePhone">เบอร์โทรศัพท์ <span
                                    class="text-red">*</span></label>
                            <input type="tel" id="collegePhone" class="form-control" v-model="collegePhone"
                                maxlength="10" required />
                        </div>

                        <div data-mdb-input-init class="form-outline mb-4">
                            <label class="form-label" for="collegeEmail">Email </label>
                            <input type="email" id="collegeEmail" class="form-control" v-model="collegeEmail" />
                        </div>


                        <div class="text-center mt-4">
                            <button type="submit" class="btn btn-primary">เพิ่มข้อมูล</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
