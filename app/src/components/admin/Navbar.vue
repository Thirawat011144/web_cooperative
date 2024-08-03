<script setup>
import config from "../../../config";
import Swal from "sweetalert2";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useSearchStore } from '../../store/Search';

const router = useRouter();

const searchQuery = ref("");
const searchStore = useSearchStore();

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
            localStorage.removeItem(config.branch)
            localStorage.removeItem(config.companyData)
            localStorage.removeItem(config.idCard)
            localStorage.removeItem(config.phoneNumber)
            localStorage.removeItem('userData');
            router.push("/");
        }
    });
};

const searchUsers = async () => {
    if (searchQuery.value.trim() === "") {
        searchStore.setSearchResults([]);
        return;
    }
    try {
        const response = await axios.get(`${config.api_path}/users/search`, {
            params: {
                query: searchQuery.value,
            },
        });
        searchStore.setSearchResults(response.data);
        router.push('/admin-index/search')
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
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <!-- <li class="nav-item d-none d-sm-inline-block">
                    <a href="index3.html" class="nav-link">Home</a>
                </li> -->
                <!-- <li class="nav-item d-none d-sm-inline-block">
                    <a href="#" class="nav-link">Contact</a>
                </li> -->
            </ul>
            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Navbar Search -->
                <li class="nav-item mr-2">
                    <form class="form-inline" @submit.prevent="searchUsers">
                        <div class="input-group input-group-sm custom-search-input me-5">
                            <input class="form-control form-control-navbar " type="search" placeholder="Search"
                                aria-label="Search" v-model="searchQuery" />

                            <div class="input-group-append">
                                <button class="btn btn-navbar btn-primary" type="submit">
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
    </div>
</template>

<style scoped>
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
