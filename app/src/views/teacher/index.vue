<template>
    <div>
        <Navbar />
        <div class="content-wrapper">
            <Sidebar />
            <router-view></router-view>
            <div class="card-header">
                <div class="card-title"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Navbar from '@/components/teacher/NavbarTeacher.vue';
import Sidebar from '@/components/teacher/Sidebar.vue';

onMounted(() => {
    // เช็คว่าหน้านี้ถูกรีเฟรชแล้วหรือยัง
    if (!window.location.hash) {
        window.location.hash = 'reloaded';
        window.location.reload();
    }
});
</script>

<style></style>