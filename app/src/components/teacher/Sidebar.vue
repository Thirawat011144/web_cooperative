<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import config from '../../../config'

const getUserName = computed(() => {
    const firstName = localStorage.getItem(config.firstName_name);
    if (!firstName) return '';
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
})

</script>

<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar bg-secondary sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="index3.html" class="brand-link">
            <img src="../../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8">
            <span class="brand-text font-weight-light">RMUTI</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="info">
                    <router-link to="/teacher-index"> <a href="#" class="d-block fw-bold">อาจารย์: {{ getUserName }}</a>
                    </router-link>
                </div>
            </div>
            <!-- SidebarSearch Form -->


            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <div class="nav-header text-white">
                        เมนู
                    </div>
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="fa-solid fa-house me-2"></i>
                            <p>หน้าแรก</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/teacher-index/information" class="nav-link">
                            <i class="fa-solid fa-user"></i> &nbsp;
                            <p>ข้อมูลส่วนตัว</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-solid fa-user-graduate"></i>
                            <p>
                                รายชื่อ
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link to="/teacher-index/list-cr2" class="nav-link ms-4">
                                    <p>ปวช ชั้นปีที่ 3</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/teacher-index/list-dcr2" class="nav-link ms-4">
                                    <p>ปวส ชั้นปีที่ 2</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/teacher-index/list-ec2" class="nav-link ms-4">
                                    <p>ป.ตรี ชั้นปีที่ 2</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/teacher-index/list-ec4" class="nav-link ms-4">
                                    <p>ป.ตรี ชั้นปีที่ 4</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/teacher-index/companies" class="nav-link">
                            <i class="fa-solid fa-building"></i> &nbsp;
                            <p>ข้อมูลสถานประกอบการ</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/teacher-index/college-teacher" class="nav-link">
                            <i class="fa-solid fa-school"></i> &nbsp;
                            <p>ข้อมูลสถานที่ฝึกสอน</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/teacher-index/dashboard" class="nav-link">
                            <i class="fa-solid fa-dashboard"></i> &nbsp;
                            <p>DashBoard</p>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link to="/home-evaluation" class="nav-link">
                            <i class="fa-solid fa-dashboard"></i> &nbsp;
                            <p>ประเมิน</p>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link to="/reset-password" class="nav-link">
                            <i class="fa-solid fa-unlock me-2"></i>
                            <p>เปลี่ยนรหัสผ่าน</p>
                        </router-link>
                    </li>

                    <!-- <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-regular fa-newspaper"></i>
                            <p>
                                News
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-news" class="nav-link">
                                    <p>CreateNews</p>
                                    <i class="fa-solid fa-plus ms-2"></i>
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/list-news" class="nav-link">
                                    <p>ListNews</p>
                                    <i class="fa-solid fa-book ms-4"></i>
                                </router-link>
                            </li>
                        </ul>
                    </li> -->
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>

        <router-view></router-view>

        <!-- /.sidebar -->
    </aside>
</template>


<style></style>