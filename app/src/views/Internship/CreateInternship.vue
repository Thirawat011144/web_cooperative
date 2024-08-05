<template>
  <div class="content mt-4">
    <div class="card bg-white">
      <h5 class="card-header">แบบฟอร์มเพิ่มข้อมูลสถานประกอบการ</h5>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <!-- ข้อมูลทั่วไป -->
          <div class="mb-3">
            <h5>ข้อมูลทั่วไป</h5>
            <label for="company" class="form-label">บริษัท <span class="text-red">*</span></label>
            <input v-model="internship.company" @input="logValue('company', internship.company)" type="text"
              id="company" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="title" class="form-label">ตำแหน่ง <span class="text-red">*</span></label>
            <input v-model="internship.position" @input="logValue('position', internship.position)" type="text"
              id="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="location" class="form-label">ที่ตั้ง <span class="text-red">*</span></label>
            <input v-model="internship.location" @input="logValue('location', internship.location)" type="text"
              id="location" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">เบอร์ติดต่อ <span class="text-red">*</span></label>
            <input v-model="internship.tel" @input="logValue('tel', internship.tel)" type="text" id="tel"
              class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="zipCode" class="form-label">รหัสไปรษณีย์</label>
            <input v-model="internship.zipCode" @input="logValue('zipCode', internship.zipCode)" type="text"
              id="zipCode" class="form-control">
          </div>
          <div class="mb-3">
            <label for="mail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
            <input v-model="internship.mail" @input="logValue('mail', internship.mail)" type="text" id="mail"
              class="form-control" required>
          </div>
          <!-- รายละเอียดอื่นๆ -->
          <h5>รายละเอียดอื่นๆ</h5>
          <div class="mb-3">
            <label for="type" class="form-label">ประเภทหน่วยงาน</label>
            <input v-model="internship.type" @input="logValue('type', internship.type)" type="text" id="type"
              class="form-control" placeholder="Ex. งานรัฐวิสาหกิจ/เอกชน/อื่นๆ">
          </div>
          <!-- <div v-for="(branch, index) in internship.branch" :key="index" class="mb-3">
            <label :for="'branchName_' + index" class="form-label">สาขาที่รับสมัคร<span
                class="text-red">*</span></label>
            <select :id="'branch_' + index" v-model="branch.name" class="form-select">
              <option value="สาขาวิชาช่างก่อสร้าง">สาขาวิชาช่างก่อสร้าง</option>
              <option value="สาขาวิชาช่างไฟฟ้ากำลัง">สาขาวิชาช่างไฟฟ้ากำลัง</option>
              <option value="สาขาวิชาช่างยนต์">สาขาวิชาช่างยนต์</option>
              <option value="สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล">สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล</option>
              <option value="สาขาวิชาช่างอิเล็กทรอนิกส์">สาขาวิชาช่างอิเล็กทรอนิกส์</option>
              <option value="สาขาวิชาช่างเทคนิคคอมพิวเตอร์">สาขาวิชาช่างเทคนิคคอมพิวเตอร์</option>
            </select>
            <button type="button" @click="removeBranch(index)" class="btn btn-danger mt-2">ลบ</button>
          </div>
          <button type="button" @click="addBranch" class="btn btn-success mb-3">เพิ่ม</button> -->

          <div class="mb-3 mt-2">
            <label for="vacancies" class="form-label">อัตราที่รับ <span class="text-red">*</span></label>
            <input v-model="internship.vacancies" @input="logValue('vacancies', internship.vacancies)" type="number"
              id="vacancies" class="form-control" required>
          </div>
          <div class="mb-3 mt-2">
            <label for="branch" class="form-label">สาขาที่รับ(ระบุเป็นสาขางานที่ต้องการ หรือ เป็นระบุเจาะจงเป็นสาขา)
              <span class="text-red">*</span></label>
            <input v-model="internship.branch" @input="logValue('branch', internship.branch)" type="text" id="vacancies"
              class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">เงินเดือน</label>
            <input v-model="internship.salary" @input="logValue('salary', internship.salary)" type="text" id="salary"
              class="form-control">
          </div>
          <div class="mb-3">
            <label for="gender" class="form-label">เพศ <span class="text-red">*</span></label>
            <select v-model="internship.gender" @change="logValue('gender', internship.gender)" id="gender"
              class="form-control" required>
              <option value="" disabled>-- กรุณาเลือก --</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
              <option value="ไม่จำกัด">ไม่จำกัด</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="educationLevel" class="form-label">ระดับการศึกษา <span class="text-red">*</span></label>
            <select v-model="internship.educationLevel" @change="logValue('educationLevel', internship.educationLevel)"
              id="educationLevel" class="form-control" required>
              <option value="" disabled>-- กรุณาเลือก --</option>
              <option value="ปวช.">ระดับชั้นประกาศนียบัตรวิชาชีพ</option>
              <option value="ปวส.">ระดับชั้นประกาศนียบัตรวิชาชีพชั้นสูง</option>
              <option value="ปวช,ปวส.">ทั้งระดับชั้นประกาศนียบัตรวิชาชีพชั้นและระดับชั้นประกาศนียบัตรวิชาชีพชั้นสูง
              </option>
              <option value="ปริญญาตรี">ปริญญาตรี</option>
              <option value="ท้ังหมดทุกระดับชั้น">ท้ังหมดทุกระดับชั้น</option>
            </select>
          </div>
          <!-- ข้อมูลผู้ประสานงาน -->
          <h5>ข้อมูลผู้ประสานงาน</h5>
          <div class="mb-3">
            <label for="contactPerson" class="form-label">ชื่อผู้ติดต่อ <span class="text-red">*</span></label>
            <input v-model="internship.contactPerson" @input="logValue('contactPerson', internship.contactPerson)"
              type="text" id="contactPerson" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="contactPosition" class="form-label">ตำแหน่ง</label>
            <input v-model="internship.contactPosition" @input="logValue('contactPosition', internship.contactPosition)"
              type="text" id="contactPosition" class="form-control">
          </div>
          <div class="mb-3">
            <label for="contactEmail" class="form-label">อีเมล์ <span class="text-red">*</span></label>
            <input v-model="internship.contactEmail" @input="logValue('contactEmail', internship.contactEmail)"
              type="text" id="contactEmail" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="contactTel" class="form-label">เบอร์โทร <span class="text-red">*</span></label>
            <input v-model="internship.contactTel" @input="logValue('contactTel', internship.contactTel)" type="text"
              id="contactTel" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="otherContact" class="form-label">ช่องทางการติดต่ออื่นๆ</label>
            <input v-model="internship.otherContact" @input="logValue('otherContact', internship.otherContact)"
              type="text" id="otherContact" class="form-control">
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

const router = useRouter();

const selectedBranches = ref([]);

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
  branch: ''
  // branch: [{ name: '' }]
});

// const addBranch = () => {
//   internship.value.branch.push({ name: '' });
// }

// const removeBranch = (index) => {
//   internship.value.branch.splice(index, 1);
// }

const submitForm = async () => {
  console.log('Submitted data:', internship.value); // log ข้อมูลก่อนส่งไปเซิร์ฟเวอร์
  try {
    const response = await axios.post(`${config.api_path}/internship`, {
      ...internship.value,
      // branches: selectedBranches.value,
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
    console.log('Error:', error); // log ข้อความ error หากมีปัญหาในการส่งข้อมูล
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
