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
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <a href="/admin-index" class="brand-link">
            <img src="../../../dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
                style="opacity: .8">
            <span class="brand-text font-weight-light">RMUTI</span>
        </a>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <!-- <div class="image">
                    <img src="../../../dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                </div> -->
                <div class="info">
                    <router-link to="/admin-index"> <a href="#" class="d-block fw-bold">Admin: {{ getUserName }}</a>
                    </router-link>
                </div>
            </div>
            <!-- SidebarSearch Form -->
            <!-- <div class="form-inline">
                <div class="input-group" data-widget="sidebar-search">
                    <input class="form-control form-control-sidebar" type="search" placeholder="Search"
                        aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-sidebar">
                            <i class="fas fa-search fa-fw"></i>
                        </button>
                    </div>
                </div>
            </div> -->

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                    data-accordion="false">
                    <div class="nav-header text-white">
                        เมนู
                    </div>
                    <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                    <!-- <li class="nav-item menu-open">
                        <a href="#" class="nav-link ">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                Dashboard
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="./index.html" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>Dashboard v1</p>
                                </a>
                            </li>
                        </ul>
                    </li> -->
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="fa-solid fa-house me-2"></i>
                            <p>หน้าแรก</p>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin-index/information-admin" class="nav-link">
                            <i class="fa-solid fa-user me-2"></i>
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
                                <router-link to="/admin-index/list-teachers" class="nav-link ms-4">
                                    <p>อาจารย์</p>
                                </router-link>
                            </li>

                            <li class="nav-item">
                                <router-link :to="{ name: 'list-cr2' }" class="nav-link ms-4">
                                    <p>ปวช ชั้นปีที่ 3</p>
                                </router-link>
                            </li>

                            <li class="nav-item">
                                <router-link :to="{ name: 'list-dcr' }" class="nav-link ms-4">
                                    <p>ปวส ชั้นปีที่ 2</p>
                                </router-link>
                            </li>

                            <li class="nav-item">
                                <router-link :to="{ name: 'list-ec2' }" class="nav-link ms-4">
                                    <p>ป.ตรี ชั้นปีที่ 2</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link to="/admin-index/list-ec4" class="nav-link ms-4 ">
                                    <p>ป.ตรี ชั้นปีที่ 4</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-regular fa-newspaper"></i>
                            <p>
                                ข่าวสาร
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-news" class="nav-link">
                                    <p>สร้างข่าว</p>
                                    <i class="fa-solid fa-plus ms-2"></i>
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/list-news" class="nav-link">
                                    <p>รายชื่อข่าวสาร</p>
                                    <i class="fa-solid fa-book ms-4"></i>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- Establishment -->

                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-solid fa-building"></i>
                            <p>
                                ข้อมูลสถานประกอบการ
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-es" class="nav-link">
                                    <p>ลงข้อมูลสถานประกอบการ</p>
                                    <!-- <i class="fa-solid fa-plus ms-2"></i> -->
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/internship-admin" class="nav-link">
                                    <p>ข้อมูลสถานประกอบการ</p>
                                    <!-- <i class="fa-solid fa-book ms-4"></i> -->
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- Practice -->
                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-solid fa-school"></i>
                            <p>
                                ข้อมูลสถานศึกษา
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-practice" class="nav-link">
                                    <p>ลงข้อมูลสถานประกอบการ</p>
                                    <!-- <i class="fa-solid fa-plus ms-2"></i> -->
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/practice" class="nav-link">
                                    <p>ข้อมูลสถานประกอบการ</p>
                                    <!-- <i class="fa-solid fa-book ms-4"></i> -->
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- Practice -->
                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-solid fa-file"></i>
                            <p>
                                จัดการไฟล์
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-download" class="nav-link">
                                    <p>ลงไฟล์สำหรับดาวน์โหลด</p>
                                    <!-- <i class="fa-solid fa-plus ms-2"></i> -->
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/list-download" class="nav-link">
                                    <p>รายการไฟล์</p>
                                    <!-- <i class="fa-solid fa-book ms-4"></i> -->
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- Contact -->
                    <li class="nav-item">
                        <a class="nav-link">
                            <i class="fa-solid fa-book"></i>
                            <p>
                                เกี่ยวกับสหกิจศึกษา
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/create-contact" class="nav-link">
                                    <p>เพิ่มข้อมูล</p>
                                    <!-- <i class="fa-solid fa-plus ms-2"></i> -->
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav nav-treeview">
                            <li class="nav-item ms-4">
                                <router-link to="/admin-index/cooperative-education" class="nav-link">
                                    <p>รายการไฟล์</p>
                                    <!-- <i class="fa-solid fa-book ms-4"></i> -->
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/reset-password" class="nav-link">
                            <i class="fa-solid fa-unlock me-2"></i>
                            <p>เปลี่ยนรหัสผ่าน</p>
                        </router-link>
                    </li>

                </ul>


            </nav>
            <!-- /.sidebar-menu -->
        </div>

        <router-view></router-view>

        <!-- /.sidebar -->
    </aside>
</template>


<style></style>