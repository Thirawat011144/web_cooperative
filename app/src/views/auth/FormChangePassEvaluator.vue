<template>
  <div class="form-container">
    <p v-if="userName.length > 0">
      <label for="Username">Username:</label>
      <input type="text" v-model="userName[0].userName" disabled />
    </p>
    <!-- แสดงชื่อผู้ใช้ -->
    <form @submit.prevent="handleSubmit">
      <label for="newPassword">New Password:</label>
      <input type="password" v-model="newPassword" id="newPassword" required />
      <label for="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        v-model="confirmPassword"
        id="confirmPassword"
        required
      />
      <!-- แสดง input hidden ถ้าใช้การรีเซ็ตรหัสผ่านจาก URL -->
      <input v-if="isReset" type="hidden" v-model="idCard" />
      <button type="submit">Reset Password</button>
    </form>
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
@import url("https://fonts.googleapis.com/css2?family=TH+Sarabun+New:wght@400;700&display=swap");
</style>