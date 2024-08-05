<template>
    <div>
      <!-- เช็คเงื่อนไขของ checkEvaluatorStatus -->
      <div v-if="checkEvaluatorStatus === 'อาจารย์นิเทศ'">
        <div>
          <router-view></router-view>
          <div>
            <div></div>
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
  import NavbarEvaluation from '../../components/evaluation/NavbarEvaluation.vue'
  import SidebarEvaluation from '../../components/evaluation/SidebarEvaluation.vue'
  import config from '../../../config'
  
  const checkEvaluatorStatus = localStorage.getItem(config.evaluatorStatus)
  console.log(checkEvaluatorStatus)
  </script>
  
  <style></style>
  