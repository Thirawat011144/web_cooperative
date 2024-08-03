<template>
    <form @submit.prevent="handleSubmit">
        <label for="idCard">ID Card:</label>
        <input type="text" v-model="idCard" id="idCard" required />
        <button type="submit">Submit</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import config from '../../../config';

const idCard = ref('');
const router = useRouter();

const handleSubmit = async () => {
    try {
        console.log(idCard.value); // แสดงค่าของ idCard ในคอนโซล

        const response = await axios.post(`${config.api_path}/forgot-password-evaluator`, { idCard: idCard.value });

        if (response.data.redirectToReset) {
            // เปลี่ยนเส้นทางไปยังหน้าเปลี่ยนรหัสผ่าน
            router.push({ name: 'reset-password-evaluator', query: { idCard: idCard.value } });
        } else {
            alert('User not found. Please check your ID Card.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};
</script>
