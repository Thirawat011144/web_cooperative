<template>
    <div class="login-choices">
        <div class="choice" @click="loginAs('admin')">
            <span class="emoji">🧑‍💼</span>
            <span>เข้าสู่ระบบสำหรับแอดมิน</span>
        </div>
        <div class="choice" @click="loginAs('student')">
            <span class="emoji">🎓</span>
            <span>เข้าสู่ระบบสำหรับนักศึกษา</span>
        </div>
        <div class="choice" @click="loginAs('teacher')">
            <span class="emoji">👨‍🏫</span>
            <span>เข้าสู่ระบบสำหรับอาจารย์</span>
        </div>
        <div class="choice" @click="loginAs('evaluator')">
            <span class="emoji">📝</span>
            <span>เข้าสู่ระบบสำหรับผู้ประเมิน</span>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const loginAs = (role) => {
    if (role === 'student') {
        router.push({ name: 'login-student' });
    } else if (role === 'teacher') {
        router.push({ name: 'login-teacher' });
    } else if (role === 'evaluator') {
        router.push({ name: 'login-evaluation' });
    } else if (role === 'admin') {
        router.push({ name: 'login' });
    }
};
</script>

<style scoped>
.login-choices {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url('../../assets/img/8.1.png') no-repeat center center fixed;
    /* เพิ่มพื้นหลัง */
    background-size: cover;
}

.choice {
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    /* เพิ่มความโปร่งแสงให้พื้นหลัง */
    backdrop-filter: blur(20px);
    /* ทำให้เบลอ */
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s;
}

.choice:hover {
    transform: scale(1.05);
}

.choice .emoji {
    font-size: 50px;
    margin-right: 20px;
}

.choice span {
    font-size: 18px;
    font-weight: bold;
}
</style>