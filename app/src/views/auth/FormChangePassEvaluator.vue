<template>
    <form @submit.prevent="handleSubmit">
        <label for="newPassword">New Password:</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
        <!-- แสดง input hidden ถ้าใช้การรีเซ็ตรหัสผ่านจาก URL -->
        <input v-if="isReset" type="hidden" v-model="idCard" />
        <button type="submit">Reset Password</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '../../../config';
import { useRoute, useRouter } from 'vue-router';

// รับข้อมูลจาก URL query
const route = useRoute();
const router = useRouter();
const isReset = ref(false); // ตัวแปรเพื่อเช็คว่ากำลังรีเซ็ตรหัสผ่านหรือเปล่า
const idCard = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const checkToken = localStorage.getItem(config.token_name)
const checkRole = localStorage.getItem(config.role_name)

// ตรวจสอบว่ามี idCard ใน query หรือไม่
if (route.query.idCard) {
    idCard.value = route.query.idCard;
    isReset.value = true; // กำลังทำการรีเซ็ตรหัสผ่าน
} else {
    // กำลังทำการเปลี่ยนรหัสหลังจากล็อกอิน
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    idCard.value = userData.idCard || '';
}

// ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
const handleSubmit = async () => {
    if (newPassword.value !== confirmPassword.value) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await axios.post(`${config.api_path}/reset-password-evaluator`, {
            idCard: idCard.value,
            newPassword: newPassword.value,
        });

        console.log(response);

        if (response.data.message === "Password has been reset successfully") {
            if (checkToken === null) {
                // ไม่มี token (กรณีรีเซ็ตรหัสผ่าน)
                router.push('/login-choice');
            } else if (response.data.message === "Password has been reset successfully" && checkRole === 'evaluator') {
                router.push('/home-evaluation');
            }
        } else {
            alert('Failed to reset password. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};
</script>
