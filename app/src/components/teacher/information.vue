<template>
    <div class="flex-grow-1 p-3">
        <h2>ข้อมูลส่วนตัว</h2>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อ:</span> {{ dataResult.prefix }}{{ dataResult.firstName }} <span>นามสกุล:</span> {{ dataResult.lastName }}
                </h5>

                <p class="card-text">
                    <span>โทรศัพท์:</span> {{ dataResult.phoneNumber }}
                </p>
                <p class="card-text">
                    <span>เลขบัตรประชาชน:</span> {{ dataResult.idCard }}
                </p>
                <p class="card-text branch-container">
                    <span>รับผิดชอบสาขา :</span>
                    <select class="branch-select col-md-5 form-select" v-model="dataResult.branch"
                        @change="updateBranch">
                        <!-- <option value="" disabled>-</option> -->
                        <option value="สาขาครุศาสตร์อุตสาหกรรมโยธา">สาขาครุศาสตร์อุตสาหกรรมโยธา</option>
                        <option value="สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า">สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า</option>
                        <option value="สาขาครุศาสตร์อุตสาหกรรมเครื่องกล">สาขาครุศาสตร์อุตสาหกรรมเครื่องกล</option>
                        <option value="สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ">สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ</option>
                        <option value="สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม">
                            สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม</option>
                        <option value="สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์">สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์</option>
                        <option value="สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ">สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ</option>
                        
                        <option value="สาขาวิชาช่างโยธา">สาขาวิชาช่างโยธา</option>
                        <option value="สาขาวิชาช่างก่อสร้าง">สาขาวิชาช่างก่อสร้าง</option>
                        <option value="สาขาวิชาช่างเครื่องมือกลอัตโนมัติ">สาขาวิชาช่างเครื่องมือกลอัตโนมัติ</option>
                        <option value="สาขาวิชาช่างยนต์">สาขาวิชาช่างยนต์</option>
                        <option value="สาขาวิชาช่างกลเกษตร">สาขาวิชาช่างกลเกษตร</option>
                        <option value="สาขาวิชาช่างกลโรงงาน">สาขาวิชาช่างกลโรงงาน</option>
                        <option value="สาขาวิชาช่างท่อและประสาน">สาขาวิชาช่างท่อและประสาน</option>
                        <option value="สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล">สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล
                        </option>
                        <option value="สาขาวิชาช่างอิเล็กทรอนิกส์">สาขาวิชาช่างอิเล็กทรอนิกส์</option>
                        <option value="สาขาวิชาเทคโนโลยีคอมพิวเตอร์">สาขาวิชาเทคโนโลยีคอมพิวเตอร์</option>

                        <!-- สาขาวิชาช่างก่อสร้าง (ซ้ำ) -->
                        <option value="สาขาวิชาช่างไฟฟ้ากำลัง">สาขาวิชาช่างไฟฟ้ากำลัง</option>
                        <!-- สาขาวิชาช่างยนต์ (ซ้ำ) -->
                        <option value="สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล">สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล</option>
                        <!-- สาขาวิชาช่างอิเล็กทรอนิกส์ (ซ้ำ) -->
                        <option value="สาขาวิชาช่างเทคนิคคอมพิวเตอร์">สาขาวิชาช่างเทคนิคคอมพิวเตอร์</option>
                    </select>
                </p>
                <button @click="saveChanges" class="btn btn-primary">บันทึกการเปลี่ยนแปลง</button>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const id = userData.id || null;

const dataResult = ref(null);
const loading = ref(true);

const fetchUserData = async () => {
    if (id) {
        try {
            const response = await axios.get(`${config.api_path}/user/${id}`);
            dataResult.value = response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            dataResult.value = null;
        } finally {
            loading.value = false;
        }
    } else {
        console.error('User ID not found in local storage');
        dataResult.value = null;
        loading.value = false;
    }
};

const updateBranch = () => {
    console.log('Branch updated to:', dataResult.value.branch);
};

const saveChanges = async () => {
    // แสดงป๊อปอัพยืนยันการบันทึกการเปลี่ยนแปลง
    const result = await Swal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณต้องการบันทึกการเปลี่ยนแปลงหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ใช่, บันทึกเลย!',
        cancelButtonText: 'ยกเลิก'
    });

    // ตรวจสอบว่าผู้ใช้กดยืนยันการบันทึกหรือไม่
    if (result.isConfirmed) {
        try {
            await axios.put(`${config.api_path}/user/${id}`, { branch: dataResult.value.branch });
            Swal.fire({
                title: 'สำเร็จ',
                text: 'บันทึกการเปลี่ยนแปลงสำเร็จ',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetchUserData(); // รีเฟรชข้อมูลหลังจากการบันทึก
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถบันทึกการเปลี่ยนแปลงได้',
                icon: 'error',
            });
            console.error('Error saving changes:', error);
        }
    }
};

onMounted(() => {
    fetchUserData();
});
</script>

<style scoped>
span {
    font-weight: bold;
}

.card-text {
    display: flex;
    align-items: center;
}

.branch-container {
    display: flex;
    align-items: center;
}

.branch-container span {
    vertical-align: middle;
}

.branch-select {
    margin-left: 10px;
    flex-grow: 1;
    height: auto;
}
</style>
