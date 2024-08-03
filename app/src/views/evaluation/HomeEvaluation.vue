<template>
    <div>
        <NavbarEvaluation />
        <div class="content-wrapper">
            <SidebarEvaluation />
            <router-view></router-view>
            <div class="card-header">
                <div class="card-title"></div>
            </div>
        </div>
    </div>

</template>

<script setup>
import NavbarEvaluation from '../../components/evaluation/NavbarEvaluation.vue'
import SidebarEvaluation from '../../components/evaluation/SidebarEvaluation.vue'
</script>

<style></style>
