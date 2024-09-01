<template>
  <section class="content">
    <div class="card">
      <div class="card-header">
        <div class="card-title mb-2">
          ข้อมูลนักศึกษาชั้นปริญญาตรีชั้นปีที่ 2<br>
          <div class="btn-group">
            <button class="btn btn-primary dropdown-toggle action-btn" type="button" id="dropdownMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false">
              {{ selectedAction || "เลือกรายการ" }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" @click="setStatusFilter('ขออนุมัติ')" style="cursor: pointer;">ขออนุมัติ</a>
              </li>
              <li><a class="dropdown-item" @click="setStatusFilter('อนุมัติ')" style="cursor: pointer;">อนุมัติ</a></li>
              <li><a class="dropdown-item" @click="setStatusFilter('เข้ารับการฝึก')"
                  style="cursor: pointer;">เข้ารับการฝึก</a></li>
              <!-- <li><a class="dropdown-item" @click="setStatusFilter('ผ่าน')">ผ่าน</a></li> -->
              <li><a class="dropdown-item" @click="setStatusFilter('ประเมินเสร็จสิ้น')"
                  style="cursor: pointer;">ประเมินเสร็จสิ้น</a></li>
              <li><a class="dropdown-item" @click="setStatusFilter('ไม่ผ่าน')" style="cursor: pointer;">ไม่ผ่าน</a></li>
              <li><a class="dropdown-item" @click="setStatusFilter('ไม่อนุมัติ')"
                  style="cursor: pointer;">ไม่อนุมัติ</a></li>
              <li><a class="dropdown-item" @click="setStatusFilter('ทั้งหมด')"
                  style="cursor: pointer;">รายชื่อทั้งหมด</a></li>
            </ul>
          </div>
          <!-- ปุ่มดาวน์โหลด -->
          <div class="btn-group m-1">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="downloadMenuButton"
              data-bs-toggle="dropdown" aria-expanded="false">
              ดาวน์โหลด
            </button>
            <ul class="dropdown-menu" aria-labelledby="downloadMenuButton">
              <li v-if="sortedUsers.some(user => user.evaluationDetails && user.evaluationDetails.length > 0)">
                <a class="dropdown-item" @click="downloadEvaluator('student', sortedUsers)" style="cursor: pointer;">
                  ข้อมูลการประเมินจากสถานประกอบการ
                </a>
              </li>
              <li>
                <a class="dropdown-item" @click="downloadExcel('student', sortedUsers)" style="cursor: pointer;">
                  ข้อมูลส่วนตัว
                </a>
              </li>
              <li
                v-if="sortedUsers.some(user => user.evaluationUniversityDetails && user.evaluationUniversityDetails.length > 0)"
                style="cursor: pointer;">
                <a class="dropdown-item" @click="downloadSearchHight('student', sortedUsers)">
                  ข้อมูลการประเมินจากอาจารย์นิเทศ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="text-center">ลำดับ</th>
            <th>รหัสนักศึกษา</th>
            <th>ชื่อ-นามสกุล</th>
            <th>สาขา</th>
            <th>ชั้นปี</th>
            <th class="text-center">ข้อมูลสถานประกอบการ</th>
            <th>การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in sortedUsers" :key="user.id">
            <td class="text-center">{{ index + 1 }}</td>
            <td>{{ user.studentID }}</td>
            <td>{{ user.firstName }} {{ user.lastName }}</td>
            <td>{{ user.branch }}</td>
            <td>{{ user.year }}</td>
            <td class="text-center">
              <button class="btn btn-success" @click="showModal(user.id)">ดูข้อมูล</button>
            </td>
            <td>
              <button v-if="selectedAction === 'อนุมัติ' && user.status === 'อนุมัติ'" class="btn btn-warning m-1"
                @click="updateUserStatus(user.id, 'เข้ารับการฝึก')">
                เข้ารับการฝึก
              </button>
              <router-link :to="`/edit-cr2/${user.id}`">
                <button class="btn btn-primary m-1">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
              </router-link>
              <button @click="deleteUser(user.id)" class="btn btn-danger m-1">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Component -->
    <div v-if="isModalVisible" class="modal fade show" tabindex="-1" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="infoModalLabel">ข้อมูลผู้ใช้</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="modalData">
            <p>รหัสนักศึกษา: {{ modalData.studentID }}</p>
            <p>ชื่อ-นามสกุล: {{ modalData.firstName }} {{ modalData.lastName }}</p>
            <p>สาขา: {{ modalData.branch }}</p>
            <p>ชั้นปี: {{ modalData.year }}</p>
            <p>สถานะ: {{ modalData.status }}</p>
            <p>เบอร์โทรศัพท์: {{ modalData.phoneNumber }}</p>
            <p v-if="modalData.email">Email: {{ modalData.email }}</p>
            <p v-else></p>
            <div v-if="modalData.companyDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>สถานประกอบการ: {{ modalData.companyDetails.companyName }}</p>
              <p>แผนก: {{ modalData.companyDetails.companyDepartment }}</p>
              <p>
                ชื่อ-นามสกุลผู้ประสานงาน:
                {{ modalData.companyDetails.contactFirstName }} {{ modalData.companyDetails.contactLastName }}
              </p>
              <p>เบอร์โทรศัพท์: {{ modalData.companyDetails.companyPhone }}</p>
              <p v-if="modalData.companyDetails.companyEmail">Email: {{ modalData.companyDetails.companyEmail }}</p>
              <p v-else></p>
              <p>ที่ตั้งสถานประกอบการ: {{ modalData.companyDetails.companyAddress }}</p>
            </div>
            <div v-else-if="modalData.collegeDetails">
              <p class="text-bold">ข้อมูลสถานที่ฝึกประสบการณ์</p>
              <p>สถานประกอบการ: {{ modalData.collegeDetails.collegeName }}</p>
              <p>
                ชื่อ-นามสกุลผู้ประสานงาน:
                {{ modalData.collegeDetails.contactFirstName }} {{ modalData.collegeDetails.contactLastName }}
              </p>
              <p>เบอร์โทรศัพท์: {{ modalData.collegeDetails.collegePhone }}</p>
              <p v-if="modalData.collegeDetails.collegeEmail">Email: {{ modalData.collegeDetails.collegeEmail }}</p>
              <p v-else></p>
              <p>ที่ตั้งวิทยาลัย: {{ modalData.collegeDetails.collegeAddress }}</p>
            </div>
            <div v-else>
              <p>ไม่มีข้อมูลสถานประกอบการ</p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">ปิด</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import Swal from "sweetalert2";
import config from "../../../../config";
import axios from "axios";
import { makeModalDraggable } from "@/utils/draggable";
import { downloadExcel as downloadEvaluator, downloadExcelHight as downloadSearchHight, downloadExcelHightEvaluation } from "@/utils/downloadSearch";
import { downloadExcel } from "@/utils/downloadBeforeEvaluation";
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const branch = userData.branch || null;

if (!branch) {
  console.log('No userData found in localStorage');
} else {
  console.log('Branches:', branch);

  branch.forEach((branchItem, index) => {
    console.log(`Branch ${index + 1}:`, branchItem.name);
  });
}

const users = ref([]);
const isModalVisible = ref(false);
const modalData = ref(null);
const selectedAction = ref("");

// ฟังก์ชันดึงข้อมูล
const fetchData = async (users, status = null) => {
  try {
    await axios.put(`${config.api_path}/check-evaluations`);
    const response = await axios.get(`${config.api_path}/users`);
    let filteredUsers = response.data.filter((user) =>
      user.year === "ป.ตรี ปีที่ 2" && branch.some(b => b.name === user.branch)
    );

    if (status && status !== "ทั้งหมด") {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }

    users.value = filteredUsers;
    console.log(users.value); // ตรวจสอบข้อมูลหลังจากกรอง
  } catch (error) {
    Swal.fire({
      title: "error",
      text: `Cr2 Error: ${error.message}`,
      icon: "error",
    });
  }
};

// ฟังก์ชันแสดง modal
const showModal = async (id) => {
  isModalVisible.value = true;
  try {

    const response = await axios.get(`${config.api_path}/user/${id}`);
    modalData.value = response.data;
    makeModalDraggable(); // ใช้ถ้ามีความจำเป็นในการลาก Modal
  } catch (error) {
    Swal.fire({
      title: "error",
      text: `Cr2 Error Fetching Data: ${error.message}`,
      icon: "error",
    });
  }
};

// ฟังก์ชันสำหรับปิด modal
const closeModal = () => {
  isModalVisible.value = false;
};

// ฟังก์ชันสำหรับการตั้งค่า filter สถานะ
const setStatusFilter = (status) => {
  selectedAction.value = status === "ทั้งหมด" ? "รายชื่อทั้งหมด" : status;
  fetchData(users, status);
};

// ฟังก์ชันอัปเดตสถานะผู้ใช้
const updateUserStatus = async (id, newStatus) => {
  try {
    const response = await axios.put(`${config.api_path}/user/${id}`, {
      status: newStatus,
    });
    if (response.data.message === "Success") {
      Swal.fire({
        title: "สำเร็จ",
        text: "อัปเดตสถานะสำเร็จ",
        icon: "success",
      });
      fetchData(users, selectedAction.value); // รีเฟรชข้อมูล
    }
  } catch (error) {
    Swal.fire({
      title: "error",
      text: `Cr2 Error Updating Status: ${error.message}`,
      icon: "error",
    });
  }
};

// ฟังก์ชันลบผู้ใช้
const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: "คุณแน่ใจหรือไม่?",
    text: "คุณจะไม่สามารถย้อนกลับได้!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "ใช่, ลบเลย!",
    cancelButtonText: "ยกเลิก",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${config.api_path}/users/${id}`);
      users.value = users.value.filter((user) => user.id !== id);
      Swal.fire({
        title: "สำเร็จ",
        text: "ลบข้อมูลผู้ใช้สำเร็จ",
        icon: "success",
      });
      fetchData(users, selectedAction.value); // รีเฟรชข้อมูล
    } catch (error) {
      Swal.fire({
        title: "error",
        text: `Cr2 Error DeleteData: ${error.message}`,
        icon: "error",
      });
    }
  }
};

// ดึงข้อมูลเมื่อโหลดหน้า
onMounted(() => {
  fetchData(users);
  console.log(users.value); // ตรวจสอบว่ามีข้อมูลหรือไม่หลังจากการดึงข้อมูล
});

const sortedUsers = computed(() => {
  return users.value.slice().sort((a, b) => a.id - b.id);
});
</script>

<style scoped>
.action-btn {
  width: 150px;
  /* กำหนดความกว้างคงที่ให้ปุ่ม */
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
