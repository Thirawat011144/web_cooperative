<template>
  <div>
    <Sidebar />
    <Navbar />
    <div class="content-wrapper bg-white">
      <div class="content">
        <!-- <div class="ms-3 mt-3 mb-3">
          <router-link :to="{ path: '/admin-index/list-cr2' }">
            <button class="btn ms-3" :class="getButtonClass('/admin-index/list-cr2')">ปวช ปี 2</button>
          </router-link>

          <router-link :to="{ path: '/admin-index/list-ec2' }">
            <button class="btn ms-3" :class="getButtonClass('/admin-index/list-ec2')">ปริญาตรี ชั้นปีที่ 2</button>
          </router-link>

          <router-link :to="{ path: '/admin-index/list-ec4' }">
            <button class="btn ms-3" :class="getButtonClass('/admin-index/list-ec4')">ปริญาตรี ชั้นปีที่ 4</button>
          </router-link>
        </div> -->
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import Navbar from "../../components/admin/Navbar.vue";
import Sidebar from "../../components/admin/Sidebar.vue";

const route = useRoute();

const getButtonClass = (path) => {
  return route.path === path ? 'btn-outline-secondary' : 'btn-secondary';
};
</script>

<style scoped>
/* สไตล์เพิ่มเติมถ้าต้องการ */
</style>
