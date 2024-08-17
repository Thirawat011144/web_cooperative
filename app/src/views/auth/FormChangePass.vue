<template>
  <div class="reset-password-container">
    <div class="form-wrapper">
      <p v-if="userName.length > 0">
        <label for="Username">Username:</label>
        <input
          type="text"
          v-model="userName[0].userName"
          disabled
          class="full-width-input"
        />
      </p>
      <form @submit.prevent="handleSubmit" class="styled-form">
        <h2>Reset Your Password</h2>
        <div class="input-group">
          <label for="newPassword">New Password:</label>
          <input
            type="password"
            v-model="newPassword"
            id="newPassword"
            required
            class="full-width-input"
          />
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            v-model="confirmPassword"
            id="confirmPassword"
            required
            class="full-width-input"
          />
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

const route = useRoute();
const router = useRouter();
const isReset = ref(false);
const idCard = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const userName = ref([]);
const checkToken = localStorage.getItem(config.token_name);
const checkRole = localStorage.getItem(config.role_name);

if (route.query.idCard) {
  idCard.value = route.query.idCard;
  isReset.value = true;
} else {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  idCard.value = userData.idCard || "";
}

const fetchUserName = async () => {
  try {
    const response = await axios.get(`${config.api_path}/users`);
    userName.value = response.data.filter(
      (user) => user.idCard === idCard.value
    );
  } catch (error) {
    console.error("Error fetching user name:", error);
  }
};

onMounted(() => {
  fetchUserName();
});

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await axios.post(`${config.api_path}/reset-password`, {
      idCard: idCard.value,
      newPassword: newPassword.value,
    });

    if (response.data.message === "Password has been reset successfully") {
      if (checkToken === null) {
        router.push("/login-choice");
      } else if (checkRole === "teacher") {
        router.push("/teacher-index");
      } else if (checkRole === "admin") {
        router.push("/admin-index");
      } else {
        router.push("/user-index");
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