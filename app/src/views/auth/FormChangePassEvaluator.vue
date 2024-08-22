<template>
  <div class="reset-password-container">
    <div class="form-wrapper">
      <p v-if="userName.length > 0">
        <label for="Username">Username:</label>
        <input type="text" v-model="userName[0].userName" disabled class="full-width-input" />
      </p>
      <form @submit.prevent="handleSubmit" class="styled-form">
        <h2>Reset Your Password</h2>
        <div class="input-group">
          <label for="newPassword">New Password:</label>
          <input type="password" v-model="newPassword" id="newPassword" required class="full-width-input" />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" required class="full-width-input" />
        </div>
        <input v-if="isReset" type="hidden" v-model="idCard" />
        <button type="submit" class="submit-button">Reset Password</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import config from "../../../config";
import { useRoute, useRouter } from "vue-router";

// รับข้อมูลจาก URL query
const route = useRoute();
const router = useRouter();
const isReset = ref(false); // ตัวแปรเพื่อเช็คว่ากำลังรีเซ็ตรหัสผ่านหรือเปล่า
const idCard = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const userName = ref([]); // ตัวแปรสำหรับเก็บชื่อผู้ใช้
const checkToken = localStorage.getItem(config.token_name);
const checkRole = localStorage.getItem(config.role_name);

// ตรวจสอบว่ามี idCard ใน query หรือไม่
if (route.query.idCard) {
  idCard.value = route.query.idCard;
  isReset.value = true; // กำลังทำการรีเซ็ตรหัสผ่าน
} else {
  // กำลังทำการเปลี่ยนรหัสหลังจากล็อกอิน
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  idCard.value = userData.idCard || "";
}

// ฟังก์ชันสำหรับดึงข้อมูลผู้ใช้
const fetchUserName = async () => {
  try {
    const response = await axios.get(`${config.api_path}/evaluation`);
    console.log(response.data);
    userName.value = response.data.filter(
      (user) => user.idCard === idCard.value
    );
    console.log(userName.value);
  } catch (error) {
    console.error("Error fetching user name:", error);
  }
};

// ดึงข้อมูลผู้ใช้เมื่อ component ถูกสร้าง
onMounted(() => {
  fetchUserName();
});

// ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(
      `${config.api_path}/reset-password-evaluator`,
      {
        idCard: idCard.value,
        newPassword: newPassword.value,
      }
    );

    console.log(response);

    if (response.data.message === "Password has been reset successfully") {
      if (checkToken === null) {
        // ไม่มี token (กรณีรีเซ็ตรหัสผ่าน)
        router.push("/login-choice");
      } else if (
        response.data.message === "Password has been reset successfully" &&
        checkRole === "evaluator"
      ) {
        router.push("/home-evaluation");
      }
    } else {
      alert("Failed to reset password. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.form-wrapper {
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.styled-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
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

.full-width-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.full-width-input:focus {
  border-color: #007bff;
  outline: none;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #ffffff;
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
