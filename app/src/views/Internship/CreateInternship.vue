<template>
  <div class="content mt-4">
    <div class="card bg-white">
      <h5 class="card-header">แบบฟอร์มเพิ่มข้อมูลสถานที่ฝึกงาน</h5>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- ข้อมูลทั่วไป -->
          <div class="mb-3">
            <h5>ข้อมูลทั่วไป</h5>
            <label for="company" class="form-label">บริษัท <span class="text-red">*</span></label>
            <input v-model="internship.company" type="text" id="company" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">ตำแหน่ง <span class="text-red">*</span></label>
            <input v-model="internship.position" type="text" id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">ที่ตั้ง <span class="text-red">*</span></label>
            <input v-model="internship.location" type="text" id="location" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">เบอร์ติดต่อ <span class="text-red">*</span></label>
            <input v-model="internship.tel" type="text" id="tel" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="zipCode" class="form-label">รหัสไปรษณีย์</label>
            <input v-model="internship.zipCode" type="text" id="zipCode" class="form-control">
          </div>
          <div class="mb-3">
            <label for="mail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
            <input v-model="internship.mail" type="text" id="mail" class="form-control" required>
          </div>
          <!-- รายละเอียดอื่นๆ -->
          <h5>รายละเอียดอื่นๆ</h5>
          <div class="mb-3">
            <label for="type" class="form-label">ประเภทหน่วยงาน</label>
            <input v-model="internship.type" type="text" id="type" class="form-control"
              placeholder="Ex. งานรัฐวิสาหกิจ/เอกชน/อื่นๆ">
          </div>
          <!-- <div class="mb-3">
            <label for="branches" class="form-label">สาขาที่รับ <span class="text-red">*</span></label>
            <VueMultiselect v-model="selectedBranches" :options="branchOptions" label="label"
              placeholder="กรุณาเลือกสาขา" multiple class="custom-select " />
          </div> -->
          <div class="mb-3">
            <label for="vacancies" class="form-label">อัตราที่รับ <span class="text-red">*</span></label>
            <input v-model="internship.vacancies" type="text" id="vacancies" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">เงินเดือน</label>
            <input v-model="internship.salary" type="text" id="salary" class="form-control">
          </div>
          <div class="mb-3">
            <label for="gender" class="form-label">เพศ <span class="text-red">*</span></label>
            <select v-model="internship.gender" id="gender" class="form-control" required>
              <option value="" disabled>-- กรุณาเลือก --</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="ไม่จำกัด">ไม่จำกัด</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="educationLevel" class="form-label">ระดับการศึกษา <span class="text-red">*</span></label>
            <select v-model="internship.educationLevel" id="educationLevel" class="form-control" required>
              <option value="" disabled>-- กรุณาเลือก --</option>
              <option value="ปวช.">ปวช.</option>
              <option value="ปวส.">ปวส.</option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
            </select>
          </div>
          <!-- ข้อมูลผู้ประสานงาน -->
          <h5>ข้อมูลผู้ประสานงาน</h5>
          <div class="mb-3">
            <label for="contactPerson" class="form-label">ชื่อผู้ติดต่อ <span class="text-red">*</span></label>
            <input v-model="internship.contactPerson" type="text" id="contactPerson" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="contactPosition" class="form-label">ตำแหน่ง</label>
            <input v-model="internship.contactPosition" type="text" id="contactPosition" class="form-control">
          </div>
          <div class="mb-3">
            <label for="contactEmail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
            <input v-model="internship.contactEmail" type="text" id="contactEmail" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="contactTel" class="form-label">เบอร์โทร <span class="text-red">*</span></label>
            <input v-model="internship.contactTel" type="text" id="contactTel" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="otherContact" class="form-label">ช่องทางการติดต่ออื่นๆ</label>
            <input v-model="internship.otherContact" type="text" id="otherContact" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';
import VueMultiselect from 'vue-multiselect';
// import 'vue-multiselect/dist/vue-multiselect.min.css';

const options = ref(['list', 'of', 'options']);
const router = useRouter();

const selectedBranches = ref([]);
const branchOptions = ref([
  { label: 'สาขา 1' },
  { label: 'สาขา 2' },
  { label: 'สาขา 3' },
]);

const internship = ref({
  company: '',
  position: '',
  location: '',
  tel: '',
  zipCode: '',
  mail: '',
  type: '',
  vacancies: '',
  salary: '',
  gender: '',
  educationLevel: '',
  contactPerson: '',
  contactPosition: '',
  contactEmail: '',
  contactTel: '',
  otherContact: '',
});

const submitForm = async () => {
  try {
    const response = await axios.post(`${config.api_path}/internship`, {
      ...internship.value,
      branches: selectedBranches.value,
    });
    if (response) {
      Swal.fire({
        title: "Success",
        text: "เพิ่มข้อมูลสถานที่ฝึกงานเรียบร้อยแล้ว",
        icon: "success",
        timer: 2000
      });
      router.push('/admin-index/internship-admin');
    }
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "ไม่สามารถเพิ่มข้อมูลสถานที่ฝึกงานได้",
      icon: "error",
    });
  }
};
</script>

<style scoped>
.custom-button {
  background-color: #4CAF50;
  /* สีเขียวอ่อน */
  color: white;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.custom-button:hover {
  background-color: #3e8e41;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.custom-select {
  width: 100%;
  text-decoration: none;
}
</style>
