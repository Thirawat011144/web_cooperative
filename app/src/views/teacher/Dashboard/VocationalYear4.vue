<template>
    <div class="branch-dashboard">
      <h3>ปวช 2</h3>
      <div class="status-cards">
        <StatusCard
          status="all"
          label="ทั้งหมด"
          branch="ปวช 2"
          cardColor="pink"
          percentageText="+8% from yesterday"
        />
        <!-- เพิ่ม StatusCard สำหรับสถานะอื่นๆ -->
      </div>
    </div>
  </template>
  
  <script setup>
  import StatusCard from './StatusCard.vue';
  </script>
  
  <style scoped>
  .branch-dashboard {
    margin-bottom: 20px;
  }
  
  .status-cards {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  </style>
  