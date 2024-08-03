<script setup>
import axios from "axios";
import { ref, onMounted, computed } from 'vue';
import config from "../../../../config";
import Swal from 'sweetalert2';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const users = ref([]);
const currentStudyField = localStorage.getItem(config.currentStudyField);
const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`; // ดึงชื่อผู้ประเมินจาก localStorage

const fetchData = async () => {
    try {
        const usersResponse = await axios.get(`${config.api_path}/users`);
        const role = localStorage.getItem(config.evaluatorStatus);

        let evaluationResponse;
        if (role === 'อาจารย์นิเทศ') {
            evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship-university`);
        } else if (role === 'ผู้ดูแล') {
            evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship`);
        } else {
            throw new Error('Invalid role');
        }

        const evaluatedStudents = new Set(
            evaluationResponse.data
                .filter(evaluation => evaluation.time === "1" && evaluation.evaluatorName === evaluatorName)
                .map(evaluation => evaluation.studentId)
        );

        users.value = usersResponse.data.filter(user =>
            user.year === "ปวส 2" &&
            user.branch === currentStudyField &&
            user.status === "เข้ารับการฝึก" &&
            !evaluatedStudents.has(user.studentID)
        );
    } catch (error) {
        Swal.fire({
            title: "error",
            text: error.message,
            icon: "error"
        });
    }
};

const handleEvaluation = (userId) => {
    let role = localStorage.getItem(config.evaluatorStatus); // ดึง role จาก localStorage
    console.log(role);

    // ตรวจสอบและจัดการกับค่า null และค่าที่เป็นสตริง "null"
    if (role === null || role === 'null') {
        role = 'อาจารย์นิเทศ';
    }

    localStorage.setItem(config.evaluatorStatus, role);
    const roleTeacher = localStorage.getItem(config.role_name);
    const roleStatus = localStorage.getItem(config.evaluatorStatus);

    // Logging values for debugging
    console.log("User ID:", userId);
    console.log("Role Teacher:", roleTeacher);
    console.log("Role:", roleStatus);

    if (roleStatus === 'อาจารย์นิเทศ') {
        console.log("Navigating to: /home-evaluation/evaluation-one-vcr/" + userId);
        router.push(`/home-evaluation/evaluation-one-vcr/${userId}`);
    } else if (roleStatus === 'ผู้ดูแล') {
        console.log("Navigating to: /page-evaluation/" + userId);
        router.push(`/home-evaluation/evaluation-one-mentor/${userId}`);
    } else {
        console.log("Invalid role");
        Swal.fire({
            title: "error",
            text: "Role ไม่ถูกต้อง",
            icon: "error"
        });
    }
};

const sortedUsers = computed(() => {
    return users.value.slice().sort((a, b) => a.id - b.id);
});

onMounted(() => {
    fetchData();
});
</script>

<template>
    <section class="content mt-4">
        <div class="card">
            <div class="card-header">
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนีบัตรวิชาชีพชั้นสูง ชั้นปีที่ 2
                    <div>
                        <router-link :to="`/home-evaluation/list-evaluation-one-uvcr`">
                            <button class="btn btn-primary m-1"> ครั้งที่ 1 </button>
                        </router-link>
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
                                <button class="btn btn-success" @click="handleEvaluation(user.id)">ประเมิน</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&family=Sarabun:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800&display=swap');

body {
    font-family: 'Sarabun', sans-serif;
}
</style>
