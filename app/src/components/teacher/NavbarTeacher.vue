<script setup>
import config from "../../../config";
import Swal from "sweetalert2";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useSearchStore } from "../../store/Search";

const router = useRouter();

const searchFirstName = ref("");
const searchLastName = ref("");
const searchYear = ref("");
const searchBranch = ref("");
const showSearchModal = ref(false);
const studentID = ref(""); // กรอกได้เฉพาะ 2 ตัวแรกของรหัสนักศึกษา
const searchStore = useSearchStore();
const status = ref("");

const branchOptions1 = ref([
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมโยธา",
    text: "สาขาครุศาสตร์อุตสาหกรรมโยธา"
  },
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า",
    text: "สาขาครุศาสตร์อุตสาหกรรมไฟฟ้า",
  },
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมเครื่องกล",
    text: "สาขาครุศาสตร์อุตสาหกรรมเครื่องกล",
  },
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ",
    text: "สาขาครุศาสตร์อุตสาหกรรมอุตสาหการ",
  },
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม",
    text: "สาขาครุศาสตร์อุตสาหกรรมอิเล็กทรอนิกส์และโทรคมนาคม",
  },
  {
    value: "สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์",
    text: "สาขาครุศาสตร์อุตสาหกรรมคอมพิวเตอร์",
  },
  {
    value: "สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ",
    text: "สาขาครุศาสตร์อุตสาหการเชื่อมประกอบ",
  },
]);

const branchOptions2 = ref([
  { value: "สาขาวิชาช่างโยธา", text: "สาขาวิชาช่างโยธา" },
  { value: "สาขาวิชาช่างก่อสร้าง", text: "สาขาวิชาช่างก่อสร้าง" },
  { value: "สาขาวิชาช่างเครื่องมือกลอัตโนมัติ", text: "สาขาวิชาช่างเครื่องมือกลอัตโนมัติ" },
  { value: "สาขาวิชาช่างยนต์", text: "สาขาวิชาช่างยนต์" },
  { value: "สาขาวิชาช่างกลเกษตร", text: "สาขาวิชาช่างกลเกษตร" },
  { value: "สาขาวิชาช่างกลโรงงาน", text: "สาขาวิชาช่างกลโรงงาน" },
  { value: "สาขาวิชาช่างท่อและประสาน", text: "สาขาวิชาช่างท่อและประสาน" },
  { value: "สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล", text: "สาขาวิชาการออกแบบนวัตกรรมเครื่องจักรกล" },
  { value: "สาขาวิชาช่างอิเล็กทรอนิกส์", text: "สาขาวิชาช่างอิเล็กทรอนิกส์" },
  { value: "สาขาวิชาเทคโนโลยีคอมพิวเตอร์", text: "สาขาวิชาเทคโนโลยีคอมพิวเตอร์" },
]);

const branchOptions3 = ref([{ value: "สาขาวิชาช่างก่อสร้าง", text: "สาขาวิชาช่างก่อสร้าง" },
  { value: "สาขาวิชาช่างไฟฟ้ากำลัง", text: "สาขาวิชาช่างไฟฟ้ากำลัง" },
  { value: "สาขาวิชาช่างยนต์", text: "สาขาวิชาช่างยนต์" },
  { value: "สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล", text: "สาขาวิชาเทคโนโลยีการเขียนแบบเครื่องกล" },
  { value: "สาขาวิชาช่างอิเล็กทรอนิกส์", text: "สาขาวิชาช่างอิเล็กทรอนิกส์" },
  { value: "สาขาวิชาช่างเทคนิคคอมพิวเตอร์", text: "สาขาวิชาช่างเทคนิคคอมพิวเตอร์" },])

  const availableBranches = computed(() => {
  if (
    searchYear.value === "ป.ตรี ปีที่ 2" ||
    searchYear.value === "ป.ตรี ปีที่ 4"
  ) {
    return branchOptions1.value;
  }
  if (searchYear.value === "ปวส 2") {
    return branchOptions2.value;
  }
  if(searchYear.value === 'ปวช 3'){
    return branchOptions3.value;
  }
  return [];
});

const handleSignOut = () => {
  Swal.fire({
    title: "Sign Out",
    text: "ยืนยันการออกจากระบบ",
    icon: "question",
    showCancelButton: true,
    showConfirmButton: true,
  }).then((res) => {
    if (res.isConfirmed) {
      localStorage.removeItem(config.role_name);
      localStorage.removeItem(config.token_name);
      localStorage.removeItem(config.firstName_name);
      localStorage.removeItem(config.branch);
      localStorage.removeItem(config.companyData);
      localStorage.removeItem(config.idCard);
      localStorage.removeItem(config.phoneNumber);
      localStorage.removeItem("userData");
      router.push("/");
    }
  });
};

const openSearchModal = () => {
  showSearchModal.value = true;
};

const closeSearchModal = () => {
  showSearchModal.value = false;
};

const clearFields = () => {
  searchFirstName.value = "";
  searchLastName.value = "";
  studentID.value = ""; // ล้างค่ารหัสนักศึกษา
  searchYear.value = "";
  searchBranch.value = "";
};

const trimValue = (value) => value.trim();

const searchUsers = async () => {
  closeSearchModal();
  
  const trimmedFirstName = trimValue(searchFirstName.value);
  const trimmedLastName = trimValue(searchLastName.value);
  const trimmedStudentID = trimValue(studentID.value);
  const trimmedYear = trimValue(searchYear.value);
  const trimmedBranch = trimValue(searchBranch.value);
  const trimmedStatus = trimValue(status.value);

  if (
    trimmedFirstName === "" &&
    trimmedLastName === "" &&
    trimmedStudentID === "" &&
    trimmedYear === "" &&
    trimmedBranch === "" &&
    trimmedStatus === ""
  ) {
    searchStore.setSearchResults([]);
    return;
  }

  try {
    const response = await axios.get(`${config.api_path}/users/search`, {
      params: {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        studentID: trimmedStudentID, // ส่งรหัสนักศึกษาที่มีแค่ 2 ตัวแรก
        year: trimmedYear,
        branch: trimmedBranch,
        status: trimmedStatus,
      },
    });
    searchStore.setSearchResults(response.data);
    console.log(response.data);
    router.push("/admin-index/search");
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "ค้นหาผู้ใช้ไม่สำเร็จ",
      icon: "error",
    });
  }
};

</script>
<template>
  <div>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item mr-2">
          <form class="form-inline" @submit.prevent="openSearchModal">
            <div class="input-group input-group-sm custom-search-input me-5">
              <!-- ปุ่มสำหรับเปิด Modal การค้นหา -->
              <div class="input-group-append">
                <button
                  class="bg-primary btn btn-navbar btn-primary"
                  type="submit"
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </li>
        <!-- Sign Out Button -->
        <li class="nav-item">
          <button class="btn btn-danger btn-sm" @click="handleSignOut">
            Sign Out
          </button>
        </li>
      </ul>
    </nav>

    <!-- Search Modal -->
    <div v-if="showSearchModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ค้นหาข้อมูล</h5>
            <button type="button" class="close" @click="closeSearchModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- ชื่อ -->
            <div class="row mb-3">
              <label for="searchFirstName" class="col-sm-3 col-form-label"
                >ชื่อ</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="searchFirstName"
                  v-model="searchFirstName"
                  placeholder="Firstname"
                />
              </div>
            </div>

            <!-- นามสกุล -->
            <div class="row mb-3">
              <label for="searchLastName" class="col-sm-3 col-form-label"
                >นามสกุล</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="searchLastName"
                  v-model="searchLastName"
                  placeholder="Lastname"
                />
              </div>
            </div>

            <!-- รหัสนักศึกษา -->
            <div class="row mb-3">
              <label for="studentID" class="col-sm-3 col-form-label"
                >รหัสนักศึกษา</label
              >
              <div class="col-sm-9">
                <input
                  type="text"
                  class="form-control"
                  id="studentID"
                  v-model="studentID"
                  placeholder="Format 1 [64] or Format 2 [64322110094-5]"
                  maxlength="13"
                />
              </div>
            </div>

            <!-- ชั้นปี -->
            <div class="row mb-3">
              <label for="searchYear" class="col-sm-3 col-form-label"
                >ชั้นปี</label
              >
              <div class="col-sm-9">
                <select
                  class="form-control"
                  id="searchYear"
                  v-model="searchYear"
                >
                  <option value="">Year</option>
                  <option value="ปวช 3">ประกาศนีบัตรวิชาชีพชั้นปีที่ 3</option>
                  <option value="ปวส 2">
                    ประกาศนีบัตรวิชาชีพชั้นปีที่ชั้นสูง 2
                  </option>
                  <option value="ป.ตรี ปีที่ 2">ปริญญาตรี ชั้นปีที่ 2</option>
                  <option value="ป.ตรี ปีที่ 4">ปริญญาตรี ชั้นปีที่ 4</option>
                </select>
              </div>
            </div>

            <!-- สาขา -->
            <div class="row mb-3">
              <label for="searchBranch" class="col-sm-3 col-form-label"
                >สาขา</label
              >
              <div class="col-sm-9">
                <select
                  class="form-control"
                  id="searchBranch"
                  v-model="searchBranch"
                >
                  <option value="">Faculty</option>
                  <option
                    v-for="branch in availableBranches"
                    :key="branch.value"
                    :value="branch.value"
                  >
                    {{ branch.text }}
                  </option>
                </select>
              </div>
            </div>

            <!-- ชั้นปี -->
            <div class="row mb-3">
              <label for="status" class="col-sm-3 col-form-label">สถานะ</label>
              <div class="col-sm-9">
                <select class="form-control" id="status" v-model="status">
                  <option value="">Status</option>
                  <option value="ขออนุมัติ">ขออนุมัติ</option>
                  <option value="อนุมัติ">อนุมัติ</option>
                  <option value="เข้ารับการฝึก">เข้ารับการฝึก</option>
                  <option value="ผ่าน">ผ่าน</option>
                  <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                  <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                  <option value="ไม่ผ่าน">ไม่อนุมัติ</option>
                </select>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" @click="clearFields">
              ล้างค่า
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeSearchModal"
            >
              ปิด
            </button>
            <button type="button" class="btn btn-primary" @click="searchUsers">
              ค้นหา
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  max-width: 600px;
  margin: 1.75rem auto;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.custom-search-input .form-control {
  border-radius: 0.25rem;
  height: 32px;
}

.custom-search-input .btn-navbar {
  border-radius: 0.25rem;
  height: 32px;
}

.btn-sm {
  height: 32px;
}
</style>
