<template>
  <div>
    <NavbarVue />
    <div class="bg">
      <div class="container">
        <router-link to="/internshiped" class="box">
          <div class="icon">🔍</div>
          <div class="content">
            <h2>สถานที่ฝึกงาน</h2>
          </div>
        </router-link>
        <router-link to="/teachinged-list" class="box">
          <div class="icon">📚</div>
          <div class="content">
            <h2>สถานฝึกสอน</h2>
          </div>
        </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import NavbarVue from "../../components/HomeView/Navbar.vue";
import Footer from '../../components/HomeView/Footer.vue';
</script>

<style scoped>
.bg {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg::before {
  content: "";
  background-image: url('../../assets/img/8.1.png');
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(3px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  z-index: 1;
  /* เพื่อให้กล่องอยู่เหนือพื้นหลังที่ถูกเบลอ */
}

.box {
  background-color: rgba(255, 255, 255, 0.8);
  width: 200px;
  height: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: transform 0.3s;
  text-decoration: none;
  color: #000;
}

.box:hover {
  transform: translateY(-10px);
}

.icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.content h2 {
  font-size: 20px;
  margin-bottom: 10px;
}
</style>
