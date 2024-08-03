<template>
    <div class="evaluation-container">
        <h2>การประเมินนักศึกษา</h2>
        <div>
            เกณฑ์การให้คะแนนการประเมินสมรรถนะทางวิชาชีพครูในการปฏิบัติการสอน แบ่งเป็น ๕ ระดับ ดังนี้ <br>
            ระดับ 1 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุงอย่างยิ่ง <br>
            ระดับ 2 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุง <br>
            ระดับ 3 ผลการประเมิน มาตรฐานขั้นต่ำ <br>
            ระดับ 4 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดี <br>
            ระดับ 5 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดีมาก <br> <br>
        </div>
        <div v-if="student">
            <h4>ข้อมูลนักศึกษาที่ทำการประเมิน</h4>
            <p>ชื่อ: {{ student.firstName }} {{ student.lastName }}</p>
            <p>รหัสนักศึกษา: {{ student.studentID }}</p>
            <!-- <p>รหัสนักศึกษา: {{ student.year }}</p> -->
            <form @submit.prevent="submitEvaluation">
                <div>
                    <h5>ด้านการจัดการเรียนรู้</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(criterion, index) in criteria" :key="index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [1, 2, 3, 4, 5]" :key="score">
                                <input type="radio" :id="'criterion' + index + '-' + score" :name="'criterion' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ด้านความสัมพันธ์กับชุมชนและผู้ปกครอง</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(criterion, index) in communityCriteria" :key="'community' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [1, 2, 3, 4, 5]" :key="score">
                                <input type="radio" :id="'community' + index + '-' + score" :name="'community' + index"
                                    v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ด้านการปฏิบัติหน้าที่ครูและจรรยาบรรณของวิชาชีพ</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(criterion, index) in professionalCriteria" :key="'professional' + index">
                            <td>{{ criterion.label }}</td>
                            <td v-for="score in [1, 2, 3, 4, 5]" :key="score">
                                <input type="radio" :id="'professional' + index + '-' + score"
                                    :name="'professional' + index" v-model="criterion.score" :value="score" required>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" class="btn btn-primary">ส่งการประเมิน</button>
            </form>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../../config';

const route = useRoute();
const router = useRouter();
const student = ref(null);
const time = ref('1')
// let userYear = '';

const criteria = ref([
    { label: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร แกนกลางและหลักสูตรสถานศึกษา', score: null },
    // { label: 'สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', score: null },
    // { label: 'สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', score: null },
    // { label: 'สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร', score: null },
    // { label: 'สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน', score: null },
    // { label: 'จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน', score: null },
    // { label: 'สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ', score: null },
    // { label: 'สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ', score: null },
    // { label: 'สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน', score: null },
    // { label: 'สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น', score: null },
    // { label: 'สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์', score: null },
    // { label: 'มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ', score: null },
]);

const communityCriteria = ref([
    { label: 'ร่วมมือกับผู้ปกครองในการพัฒนาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', score: null },
    // { label: 'ร่วมมือกับผู้ปกครองในการแก้ปัญหาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา', score: null },
    // { label: 'สามารถสร้างเครือข่ายความร่วมมือกับผู้ปกครองเพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', score: null },
    // { label: 'สามารถสร้างเครือข่ายความร่วมมือกับชุมชน เข่น ปราชญ์ชาวบ้าน หน่วยงานปกครองของท้องถิ่น เพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน', score: null },
    // { label: 'สามารถรายงานการศึกษาบริบทของชุมชนโดยเลือกประเด็นศึกษา  ได้แก่  วิทยากรในชุมชน  ปราชญ์ชาวบ้านในชุมชน  แหล่งเรียนรู้ในชุมชน  วัฒนธรรมของชุมชน  เศรษฐกิจของชุมชน  เป็นต้น', score: null },
    // { label: 'สามารถปฏิบัติตนในการอยู่ร่วมกับชุมชนได้อย่างเหมาะสม', score: null },
    // { label: 'สามารถรายงานการศึกษาวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่นโดยเลือกศึกษาตามประเด็น  ได้แก่ วิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น  ปราชญ์ชาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น   แหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น การอนุรักษ์วัฒนธรรมและภูมิปัญญาท้องถิ่น  เป็นต้น', score: null },
    // { label: 'สามารถนำวัฒนธรรมชุมชนและภูมิปัญญาในท้องถิ่นมาบูรณาการในการจัดการเรียนรู้ในชั้นเรียนตามประเด็น ได้แก่ องค์ความรู้ของวิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น องค์ความรู้ของปราชญ์ซาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น องค์ความรู้จากแหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น เป็นต้น', score: null },
]);

const professionalCriteria = ref([
    { label: 'มุ่งมั่นพัฒนาผู้เรียนให้เกิดการเรียนรู้ ทักษะปฏิบัติ และคุณลักษณะที่ดีงาม อย่างเต็มความสามารถด้วยวิธีการที่เหมาะสมกับระดับ ความสามารถและช่วงวัย', score: null },
    // { label: 'รักเมตตา เอาใจใส่ ช่วยเหลือและพัฒนาผู้เรียนอย่างเหมาะสม', score: null },
    // { label: 'ส่งเสริมการเรียนรู้อย่างต่อเนื่องด้วยความเอาใจใส่', score: null },
    // { label: 'การยอมรับความแตกต่างของผู้เรียนทางด้านเพศ เชื้อชาติ ศาสนา วัฒนธรรม และระดับการเรียนรู้', score: null },
    // { label: 'กระตุ้นและเสริมสร้างแรงจูงใจในการเรียนรู้แก่ผู้เรียนโดยใช้การเสริมแรงทางบวก', score: null },
    // { label: 'ส่งเสริมให้ผู้เรียนแสดงความสามารถและความคิดริเริ่มสร้างสรรค์อย่างเต็มศักยภาพ', score: null },
    // { label: 'ติดตามข้อมูลข่าวสารการศึกษา สังคม การเมือง การปกครอง และเศรษฐกิจ โดยสามารถนำมาประยุกต์ เชื่อมโยงกับเนื้อหาในการจัดการเรียนรู้ได้อย่างมีประสิทธิภาพ', score: null },
    // { label: 'นำแนวคิด เทคนิควิธีการ หรือความรู้ใหม่ๆ ที่น่าสนใจ มาประยุกต์ใช้เป็นส่วนหนึ่งในการออกแบบการจัดกิจกรรรมการเรียนรู้ได้อย่างเหมาะสม', score: null },
    // { label: 'ประพฤติตนเป็นแบบอย่างที่ดีทั้งทางกาย วาจา และจิตใจ มีคุณธรรมจริยธรรม', score: null },
    // { label: 'ปฏิบัติตนโดยยึดหลักความเป็นธรรมเท่าเทียม และมีส่วนช่วยให้คนในองค์กรอยู่ร่วมกันอย่างสันติ', score: null },
    // { label: 'ปฏิบัติตนตามข้อตกลง กฎกติกาของโรงเรียนด้วยความสมัครใจ ทั้งในด้านการปฏิบัติการสอนและการปฏิบัติหน้าที่อื่นในโรงเรียน', score: null },
    // { label: 'ติดตามข้อมูลและปรับเปลี่ยนตนเองให้สอดคล้องการเปลี่ยนแปลงทางวิชาชีพ วิทยาการ เศรษฐกิจ สังคม และการเมือง', score: null },
    // { label: 'ศรัทธา ชื่อสัตย์ สุจริต และรับผิดชอบต่อวิชาชีพครู', score: null },
    // { label: 'เป็นสมาชิกที่ดีขององค์กรวิชาชีพ', score: null },
    // { label: 'ให้บริการด้วยความจริงใจและเสมอภาค', score: null },
    // { label: 'ไม่เรียกรับหรือรับผลประโยชน์จากการใช้ตำแหน่งหน้าที่โดยมิชอบ', score: null },
    // { label: 'อุทิศตนเพื่อช่วยเหลือเพื่อนผู้ร่วมประกอบวิชาชีพภายใต้หลักการที่ถูกต้อง', score: null },
    // { label: 'สร้างความสามัคคีในหมู่คณะ', score: null },
    // { label: 'ริเริ่ม วางแผน หรือ เป็นผู้นำในการทำกิจกรรมเกี่ยวกับอนุรักษ์และพัฒนา เศรษฐกิจ สังคม ศาสนา ศิลปวัฒนธรรม ภูมิปัญญา หรือ สิ่งแวดล้อมโดยคำนึงถึงผลประโยชน์ของส่วนรวมเป็นสำคัญ', score: null },
    // { label: 'ปฏิบัติตนตามกฎระเบียบของสังคมภายใต้ระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขอย่างเคร่งครัด', score: null },
]);

const fetchStudentData = async () => {
    try {
        const response = await axios.get(`${config.api_path}/user/${route.params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
            }
        });

        student.value = response.data;
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
};


const submitEvaluation = async () => {
    try {
        const evaluatorStatus = localStorage.getItem(config.evaluatorStatus)
        const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;
        const payload = {
            evaluatorStatus: evaluatorStatus,
            time: time.value,
            evaluatorName: evaluatorName,
            studentId: student.value.studentID,
            criteria: criteria.value.concat(communityCriteria.value).concat(professionalCriteria.value)
        };
        console.log(payload);
        const response = await axios.post(`${config.api_path}/data-evaluation-internship`, payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
            }
        });
        if (response.data.message === "Success") {
            Swal.fire({
                title: "Success",
                text: "การประเมินสำเร็จ",
                icon: "success",
                timer: 2000
            });
            const userYear = student.value.year;
            console.log(userYear);

            if (userYear === "ป.ตรี ปีที่ 2") {
                router.push('/home-evaluation/student-ev-tec2');
            } else if (userYear === "ปวส 2") {
                router.push('/home-evaluation/student-ev-uvcr');
            } else {
                router.push('/home-evaluation/student-ev-vcr2');
            }
        }
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: "Error submitting evaluation: " + error.message,
            icon: "error"
        });
    }
};

onMounted(() => {
    fetchStudentData();
});
</script>

<style scoped>
.evaluation-container {
    padding: 20px;
}

.evaluation-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.evaluation-table th,
.evaluation-table td {
    border: 1px solid #ddd;
    padding: 8px;
    /* text-align: center; */
}

.evaluation-table th {
    background-color: #f2f2f2;
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}

.form-check-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.form-check {
    display: flex;
    align-items: center;
}

.form-check-label {
    margin-left: 5px;
}

.btn {
    margin-top: 20px;
}
</style>
