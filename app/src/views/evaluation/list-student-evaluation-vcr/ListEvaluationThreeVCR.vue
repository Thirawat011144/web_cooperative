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
// ดึงชื่อผู้ประเมินจาก localStorage

const fetchData = async () => {
    try {
        const usersResponse = await axios.get(`${config.api_path}/users`);
        const evaluationResponse = await axios.get(`${config.api_path}/data-evaluation-internship`);

        const evaluatedStudents = new Set(
            evaluationResponse.data
                .filter(evaluation => evaluation.time === "3" && evaluation.evaluatorName === evaluatorName)
                .map(evaluation => evaluation.studentId)
        );

        users.value = usersResponse.data.filter(user =>
            user.year === "ปวช 3" &&
            user.branch === currentStudyField &&
            !evaluatedStudents.has(user.studentID)
        );
    } catch (error) {
        Swal.fire({
            title: "error",
            text: (error.message, "Cr2 Error"),
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
                <div class="card-title mb-2">ข้อมูลนักศึกษาชั้นประกาศนีบัตรวิชาชีพ ชั้นปีที่ 3
                    <div>
                        <router-link :to="`/home-evaluation/list-evaluation-one-vcr`">
                            <button class="btn btn-primary m-1"> ครั้งที่ 1 </button>
                        </router-link>
                        <router-link :to="`/home-evaluation/list-evaluation-two-vcr`">
                            <button class="btn btn-primary m-1"> ครั้งที่ 2 </button>
                        </router-link>
                        <router-link :to="`/home-evaluation/list-evaluation-three-vcr`">
                            <button class="btn btn-primary m-1"> ครั้งที่ 3 </button>
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
                                <router-link :to="`/home-evaluation/evaluation-three-tec2/${user.id}`">
                                    <button class="btn btn-success">ประเมิน</button>
                                </router-link>
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
