<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit" class="styled-form">
            <h2>Reset Your Password</h2>
            <div class="input-group">
                <label for="idCard">ID Card:</label>
                <input type="text" v-model="idCard" id="idCard" required />
            </div>
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
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

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.styled-form {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.styled-form h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

.input-group {
    margin-bottom: 1.5rem;
}

.input-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #555;
}

.input-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;
}

.input-group input:focus {
    border-color: #007bff;
    outline: none;
}

.submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #0056b3;
}
</style>