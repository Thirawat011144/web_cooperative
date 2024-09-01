<template>
    <div v-if="isVisible" class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
            <button type="button" class="btn-close" @click="close" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="data">
            <p>รหัสนักศึกษา: {{ data.studentID }}</p>
            <p>ชื่อ-นามสกุล: {{ data.firstName }} {{ data.lastName }}</p>
            <p>สาขา: {{ data.branch }}</p>
            <p>ชั้นปี: {{ data.year }}</p>
            <p>สถานะ: {{ data.status }}</p>
            <p>เบอร์โทรศัพท์: {{ data.phoneNumber }}</p>
            <p v-if="data.email">Email: {{ data.email }}</p>
            <div v-if="data.companyDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>สถานประกอบการ: {{ data.companyDetails.companyName }}</p>
              <p>แผนก: {{ data.companyDetails.companyDepartment }}</p>
              <p>
                ชื่อ-นามสกุลผู้ประสานงาน:
                {{ data.companyDetails.contactFirstName }} {{ data.companyDetails.contactLastName }}
              </p>
              <p>เบอร์โทรศัพท์: {{ data.companyDetails.companyPhone }}</p>
              <p v-if="data.companyDetails.companyEmail">Email: {{ data.companyDetails.companyEmail }}</p>
              <p>ที่ตั้งสถานประกอบการ: {{ data.companyDetails.companyAddress }}</p>
            </div>
            <div v-else-if="data.collegeDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>สถานประกอบการ: {{ data.collegeDetails.collegeName }}</p>
              <p>
                ชื่อ-นามสกุลผู้ประสานงาน:
                {{ data.collegeDetails.contactFirstName }} {{ data.collegeDetails.contactLastName }}
              </p>
              <p>เบอร์โทรศัพท์: {{ data.collegeDetails.collegePhone }}</p>
              <p v-if="data.collegeDetails.collegeEmail">Email: {{ data.collegeDetails.collegeEmail }}</p>
              <p>ที่ตั้งวิทยาลัย: {{ data.collegeDetails.collegeAddress }}</p>
            </div>
            <div v-else>
              <p>ไม่มีข้อมูลสถานประกอบการ</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="close">ปิด</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    isVisible: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>
  