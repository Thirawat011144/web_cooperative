<template>
    <div class="flex-grow-1 p-3">
        <h2>ข้อมูลผู้ใข้งาน</h2>
        <div class="card" v-if="dataResult">
            <div class="card-body">
                <h5 class="card-title">
                    <span>ชื่อ:</span> {{ dataResult.firstName }} <span>นามสกุล:</span> {{ dataResult.lastName }}
                </h5>

                <p class="card-text">
                    <span>โทรศัพท์:</span> {{ dataResult.phoneNumber }}
                </p>
                <p class="card-text">
                    <span>สถานะ:</span> {{ dataResult.status }}
                </p>
                <p class="card-text">
                    <span>รหัสนักศึกษา:</span> {{ dataResult.studentID }}
                </p>
                <p class="card-text">
                    <span>สาขา:</span> {{ dataResult.branch }}
                </p>
                <p class="card-text">
                    <span>ชั้นปี:</span> {{ dataResult.year }}
                </p>
                <p class="card-text">
                    <span>Email:</span> {{ dataResult.email }}
                </p>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useDataStore } from '../../store/Search';

const searchData = useDataStore();
const dataResult = ref({});

const updateDataResults = () => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
        dataResult.value = JSON.parse(storedData);
    } else {
        dataResult.value = searchData.dataResults;
    }
}

onMounted(() => {
    updateDataResults();
});

watch(
    () => searchData.dataResults,
    (newResults) => {
        updateDataResults();
    }
);
</script>

<style scoped>
span {
    font-weight: bold;
}
</style>