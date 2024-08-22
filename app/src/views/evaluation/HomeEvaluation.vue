<template>
  <div>
    <!-- เช็คเงื่อนไขของ checkEvaluatorStatus -->
    <div v-if="checkEvaluatorStatus === 'อาจารย์นิเทศ'">
      <div>
        <router-view></router-view>
        <div class="text-center">
          <router-link to="/teacher-index/student-tec4active" class="no-underline enlarge-on-hover btn btn-secondary ">
            กลับไปหน้าแรก
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <NavbarEvaluation />
      <div class="content-wrapper">
        <SidebarEvaluation />
        <router-view></router-view>
        <div class="card-header">
          <div class="card-title"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavbarEvaluation from '../../components/evaluation/NavbarEvaluation.vue';
import SidebarEvaluation from '../../components/evaluation/SidebarEvaluation.vue';
import config from '../../../config';
import { onMounted } from 'vue';

onMounted(() => {
  // เช็คว่าหน้านี้ถูกรีเฟรชแล้วหรือยัง
  if (!window.location.hash) {
    window.location.hash = 'reloaded';
    window.location.reload();
  }
});

const checkEvaluatorStatus = localStorage.getItem(config.evaluatorStatus);
console.log(checkEvaluatorStatus);
</script>

<style scoped>
/* ยกเลิกการขีดเส้นใต้สำหรับลิงก์ */
.no-underline {
  text-decoration: none;
}

/* เพิ่มเอฟเฟกต์ขยายเมื่อ hover */
.enlarge-on-hover {
  display: inline-block;
  transition: transform 0.2s ease-in-out;
}

.enlarge-on-hover:hover {
  transform: scale(1.1);
}

.text-center {
  text-align: center;
  margin-top: 20px;
  /* ปรับตามความต้องการ */
}

.text-center a {
  color: rgb(239, 239, 239);
  font-size: 18px;
  /* ปรับขนาดตามความต้องการ */
  /* font-weight: bold; */
  cursor: pointer;
}
</style>
