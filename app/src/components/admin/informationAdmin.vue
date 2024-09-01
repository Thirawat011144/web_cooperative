<template>
    <div class="flex-grow-1 p-3">
        <h2>ข้อมูลส่วนตัว</h2>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อ:</span> {{ dataResult.firstName }} <span>นามสกุล:</span> {{ dataResult.lastName }}
                </h5>

                <p class="card-text">
                    <span>โทรศัพท์:</span> {{ dataResult.phoneNumber }}
                </p>
                <p class="card-text">
                    <span>เลขบัตรประชาชน:</span> {{ dataResult.idCard }}
                </p>
                <p class="card-text branch-container">
                    <span>รับผิดชอบสาขา :</span>
                    <multiselect v-model="selectedBranches" :options="branchOptions" :multiple="true" track-by="name"
                        label="name" placeholder="เลือกสาขาวิชา">
                    </multiselect>
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
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';
import config from '../../../config';

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const id = userData.id || null;

const dataResult = ref(null);
const loading = ref(true);
const selectedBranches = ref([]);
const branchOptions = ref([
    { name: 'สาขาครุศาสตร์อุตสาหกรรมโยธา' },
    { name: 'สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า' },
    { name: 'สาขาครุศาสตร์อุตสาหกรรมเครื่องกล' },
    { name: 'สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ' },
    { name: 'สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม' },
    { name: 'สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์' },
    { name: 'สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ' },
    { name: 'สาขาวิชาช่างโยธา' },
    { name: 'สาขาวิชาช่างก่อสร้าง' },
    { name: 'สาขาวิชาช่างเครื่องมือกลอัตโนมัติ' },
    { name: 'สาขาวิชาช่างยนต์' },
    { name: 'สาขาวิชาช่างกลเกษตร' },
    { name: 'สาขาวิชาช่างกลโรงงาน' },
    { name: 'สาขาวิชาช่างท่อและประสาน' },
    { name: 'สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล' },
    { name: 'สาขาวิชาช่างอิเล็กทรอนิกส์' },
    { name: 'สาขาวิชาเทคโนโลยีคอมพิวเตอร์' },
    { name: 'สาขาวิชาช่างไฟฟ้ากำลัง' },
    { name: 'สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล' },
    { name: 'สาขาวิชาช่างเทคนิคคอมพิวเตอร์' }
]);

const fetchUserData = async () => {
    if (id) {
        try {
            const response = await axios.get(`${config.api_path}/admin/${id}`);
            dataResult.value = response.data;

            // Map the branches from the API response to the options in branchOptions
            selectedBranches.value = dataResult.value.branch.map(branch => {
                const matchedOption = branchOptions.value.find(option => option.name === branch.name);
                return matchedOption ? matchedOption : { name: branch.name }; // Ensure the structure is correct
            });

            console.log('Selected Branches:', selectedBranches.value);
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

const saveChanges = async () => {
    console.log('Saving branches:', selectedBranches.value);
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

    if (result.isConfirmed) {
        try {
            // แปลง selectedBranches ให้เป็น array ของ objects ที่มี key `name`
            const branchesToSave = selectedBranches.value.map(branch => ({ name: branch.name }));
            await axios.put(`${config.api_path}/admin/${id}`, {
                branch: branchesToSave // ส่งข้อมูลในรูปแบบ array ของ objects
            });
            Swal.fire({
                title: 'สำเร็จ',
                text: 'บันทึกการเปลี่ยนแปลงสำเร็จ',
                icon: 'success',
            }).then(() => {
                fetchUserData(); // รีเฟรชข้อมูลหลังจากการบันทึก
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
