<template>
    <div class="branch-dashboard">
      <h3>ปวช 3</h3>
      <div class="status-cards">
        <StatusCard
          status="all"
          label="ทั้งหมด"
          branch="ปวช 3"
          cardColor="pink"
          percentageText="+8% from yesterday"
        />
        <StatusCard
          status="ขออนุมัติ"
          label="ขออนุมัติ"
          branch="ปวช 3"
          cardColor="yellow"
          percentageText="+5% from yesterday"
        />
        <StatusCard
          status="อนุมัติ"
          label="อนุมัติ"
          branch="ปวช 3"
          cardColor="green"
          percentageText="+1.2% from yesterday"
        />
        <StatusCard
          status="เข้ารับการฝึก"
          label="เข้ารับการฝึก"
          branch="ปวช 3"
          cardColor="blue"
          percentageText="+0.5% from yesterday"
        />
        <StatusCard
          status="ผ่าน"
          label="ผ่าน"
          branch="ปวช 3"
          cardColor="purple"
          percentageText="-2% from yesterday"
        />
        <StatusCard
          status="ไม่ผ่าน"
          label="ไม่ผ่าน"
          branch="ปวช 3"
          cardColor="orange"
          percentageText="-3% from yesterday"
        />
        <StatusCard
          status="เสร็จสิ้น"
          label="เสร็จสิ้น"
          branch="ปวช 3"
          cardColor="grey"
          percentageText="-1% from yesterday"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import StatusCard from './StatusCard.vue';
  
  // ฟังก์ชัน filterStatus สามารถใส่ใน StatusCard เพื่อการจัดการคลิก
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