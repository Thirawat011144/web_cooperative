<template>
  <div class="contact-container">
    <div class="contact-box">
      <div class="contact-header">
        <h1 class="header-title">การเข้าสู่ระบบ</h1>
        <p class="header-subtitle">
          กรุณาติดต่อเจ้าหน้าที่เพื่อทำการยืนยันตัวตน
        </p>
      </div>
      <div class="contact-info-box">
        <p class="contact-info">เมื่อยืนยันแล้วกรุณาเข้าสู่ระบบอีกครั้ง</p>
        <p class="contact-info"><span>เบอร์โทรศัพท์:</span> 098-765-4321</p>
        <p class="contact-info"><span>Line:</span> Oatthirawat</p>
      </div>
      <router-link to="/" class="home-link">หน้าแรก</router-link>
    </div>
  </div>
</template>
    
  <script setup>
// Add any required JavaScript logic here if needed
</script>
    
  <style scoped>
@import url("https://fonts.googleapis.com/css2?family=TH+Sarabun+New:wght@400;700&display=swap");

.contact-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "TH Sarabun New", sans-serif;
}

.contact-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/img/8.jpg") no-repeat center center/cover;
  filter: blur(10px);
  z-index: -1;
}

.contact-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 450px;
  width: 100%;
  z-index: 1; /* Ensure the content is above the blurred background */
}

.contact-header {
  margin-bottom: 30px;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #333333;
}

.header-subtitle {
  font-size: 1.5rem;
  color: #666666;
}

.contact-info-box {
  margin-bottom: 30px;
}

.contact-info {
  font-size: 1.25rem;
  color: #555555;
  margin: 10px 0;
}

.contact-info span {
  font-weight: 700;
  color: #333333;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  font-size: 1.25rem;
  color: #ffffff;
  background-color: #007bff;
  padding: 10px 30px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #0056b3;
}
</style>
  