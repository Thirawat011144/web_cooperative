<template>
  <div class="d-flex" style="height: 100vh;">
    <Sidebar />
    <div class="d-flex flex-column flex-grow-1">
      <div class="flex-grow-1">
        <!--  -->
      </div>
      <div class="mt-auto content-wrapper">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>

<script setup>
import Sidebar from '../../components/user/SidebarUser.vue';
</script>

<style scoped>
.mt-auto {
  margin-top: auto;
}
</style>
