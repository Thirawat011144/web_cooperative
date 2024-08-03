<template>
    <div class="evaluation-container">
        <h1>แบบฟอร์มนิเทศนักศึกษาฝึกงาน</h1>
        <section class="company-info" v-if="student">
            <h2>ข้อมูลสถานประกอบการ</h2>
            <label>ชื่อสถานประกอบการ: <span>{{ student.companyDetails.companyName }}</span></label> <br>
            <label>สถานที่ตั้ง: <span>{{ student.companyDetails.companyAddress }}</span></label> <br>
            <label>โทรศัพท์: <span>{{ student.companyDetails.companyPhone }}</span></label>
        </section>

        <div v-if="student">
            <h4>ข้อมูลนักศึกษาที่ทำการประเมิน</h4>
            <p>ชื่อ: {{ student.firstName }} {{ student.lastName }}</p>
            <p>รหัสนักศึกษา: {{ student.studentID }}</p>
            <p>สาขา: {{ student.branch }}</p>

            <div>
                <h2>คำชี้แจง</h2>
                <p>1. ผู้ให้ข้อมูลแบบประเมินนี้ต้องเป็นพนักงานที่ปรึกษา (Job Supervisor)
                    ของนักศึกษาฝึกงานอาชีพสะสมหรือบุคคลที่ได้รับมอบหมายให้ทำหน้าที่แทน</p>
                <p>2. แบบประเมินนี้มีทั้งหมด 18 ข้อ โปรดให้ข้อมูลครบทุกข้อ เพื่อความสมบูรณ์ของการประเมินผล</p>
                <p>3. โปรดให้คะแนนในแต่ละหัวข้อประเมิน หากไม่มีข้อมูลให้ใส่เลข 0 และโปรดให้ความเห็นเพิ่มเติม (ถ้ามี)</p>
            </div>

            <form @submit.prevent="submitEvaluation">
                <div>
                    <h5>ผลสำเร็จของงาน/ Work Achievement</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th class="text-center">คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1. ปริมาณงาน (Quantity Of Work)
                                ปริมาณงานที่ปฏิบัติสำเร็จตามหน้าที่หรือตามที่ได้รับมอบหมายภายในระยะเวลาที่กำหนด
                                (ในระดับที่นักศึกษาจะปฏิบัติได้) และเทียบกับนักศึกษาทั่ว ๆ ไป</td>
                            <td class="score-cell">
                                <span class="score-prefix">20/</span>
                                <select v-model="workCriteria" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 21 }, (_, i) => 20 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>2. คุณภาพงาน (Quality Of Work) ทำงานได้ถูกต้องครบถ้วนสมบูรณ์ มีความประณีตเรียบร้อย
                                มีความรอบคอบ ไม่เกิดปัญหาติดตามมา งานไม่ค้าง ทำงานเสร็จทันเวลาหรือก่อนเวลาที่กำหนด</td>
                            <td class="score-cell">
                                <span class="score-prefix">20/</span>
                                <select v-model="qualityOfWork" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 21 }, (_, i) => 20 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ความรู้ความสามารถ/Knowledge and Ability</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th class="text-center">คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3. ความรู้ความสามารถทางวิชาการ(Academic Ability)
                                นักศึกษามีความรู้ทางวิชาการเพียงพอ ที่จะทำงานตามที่ได้รับมอบหมาย
                                (ในระดับที่นักศึกษาจะปฏิบัติได้)
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="academicAbility" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>4. ความสามารถในการเรียนรู้และประยุกต์วิชาการ (Ability to Learn and Apply Knowledge)
                                ความรวดเร็วในการเรียนรู้ เข้าใจข้อมูล ข่าวสาร และวิธีการทำงาน
                                ตลอดจนการนำความรู้ไปประยุกต์ใช้งาน
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="abilityToLearn" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>5. ความรู้ความชำนาญด้านปฏิบัติการ (Practical Ability)
                                เช่น การปฏิบัติงานในภาคสนาม ในห้องปฏิบัติการ
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="practicalAbility" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>6. วิจารณญาณและการตัดสินใจ (Judgment and Decision Making)
                                ตัดสินใจได้ดี ถูกต้อง รวดเร็ว มีการวิเคราะห์ ข้อมูลและปัญหาต่าง ๆ
                                อย่างรอบคอบก่อนการตัดสินใจ สามารถแก้ปัญหาเฉพาะหน้า
                                สามารถไว้วางใจให้ตัดสินใจได้ด้วยตัวเอง
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="judgmentAndDecision" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>7. การจัดการและวางแผน (Management and Planning)
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="managementAndPlanning" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>8. ทักษะการสื่อสาร (Communication Skills)
                                ความสามารถในการติดต่อสื่อสาร การพูด การเขียน และการนำเสนอ (Presentation)
                                สามารถสื่อให้เข้าใจได้ง่าย เรียบร้อย ชัดเจน ถูกต้อง รัดกุม มีลำดับขั้นตอนที่ดี
                                ไม่ก่อให้เกิดความสับสนต่อการทำงาน รู้จักสอบถาม
                                รู้จักชี้แจงผลการปฏิบัติงานและข้อขัดข้องให้ทราบ
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="communicationSkills" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>9. การพัฒนาด้านภาษาและวัฒนธรรมต่างประเทศ (Foreign Language and Cultural
                                Development)เช่น ภาษาอังกฤษ การทำงานกับชาวต่างชาติ
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="foreignLanguage" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>10. ความเหมาะสมต่อตำแหน่งงานที่ได้รับมอบหมาย (Suitability for Job Position)
                                สามารถพัฒนาตนเองให้ปฏิบัติงานตาม Job Position และ Job Description
                                ที่มอบหมายได้อย่างเหมาะสมหรือตำแหน่งงานนี้เหมาะสมกับนักศึกษาคนนี้หรือไม่เพียงใด
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="suitabilityForJob" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ความรับผิดชอบต่อหน้าที่/Responsibility</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th class="text-center">คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>11. ความรับผิดชอบและเป็นผู้ที่ไว้วางใจได้ (Responsibility and Dependability)
                                ดำเนินงานให้สำเร็จลุล่วงโดยคำนึงถึงเป้าหมาย
                                และความสำเร็จของงานเป็นหลักยอมรับผลที่เกิดจากการทำงานอย่างมีเหตุผล สามารถปล่อยให้ทำงาน
                                (กรณีงานประจำ) ได้โดยไม่ต้องควบคุมมากจนเกินไป
                                ความจำเป็นในการตรวจสอบขั้นตอนและผลงานตลอดเวลาสามารถไว้วางในให้รับผิดชอบงานที่มากกว่าเวลาประจำสามารถไว้วางใจได้แทบทุกสถานการณ์หรือในสถานการณ์ปกติเท่านั้น
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="responsibilityAndDependability" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>12. ความสนใจ อุตสาหะในการทำงาน (Interest in Work)
                                ความสนใจและความกระตือรือร้นในการทำงาน มีความอุตสาหะ ความพยายาม
                                ความตั้งใจที่จะทำงานได้สำเร็จ ความมานะบากบั่น ไม่ย่อท้อต่ออุปสรรคและปัญหา
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="interestInWork" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>13. ความสามารถเริ่มต้นทำงานได้ด้วยตนเอง (Initiative or Self Starter)
                                เมื่อได้รับคำชี้แนะ สามารถเริ่มทำงานได้เอง โดยไม่ต้องรอคำสั่ง (กรณีงานประจำ)
                                เสนอตัวเข้าช่วยงานแทบทุกอย่าง มาขอรับงานใหม่ ๆ ไปทำ
                                ไม่ปล่อยเวลาว่างให้ล่วงเลยไปโดยเปล่าประโยชน์
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="initiative" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>14. การตอบเสนอต่อการสั่งการ (Responsibility and Dependability)
                                ยินดีรับคำสั่ง คำแนะนำ คำวิจารณ์ ไม่แสดงความอึดอัดใจ เมื่อได้รับคำติเตือนและวิจารณ์
                                ความรวดเร็วในการปฏิบัติตามคำสั่ง การปรับตัวปฏิบัติตามคำแนะนำ ข้อเสนอแนะและวิจารณ์
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="dependability" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ลักษณะส่วนบุคคล/Personality</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th class="text-center">คะแนน</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>15. บุคลิกภาพและการวางตัว (Personality)
                                มีบุคลิกภาพและวางตัวได้เหมาะสม เช่น ทัศนคติ วุฒิภาวะ ความอ่อนน้อมถ่อมตน การแต่งกาย
                                กิริยาวาจา การตรงต่อเวลา และอื่น ๆ
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="personality" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>16. มนุษยสัมพันธ์ (Interpersonal Skills)
                                สามารถร่วมงานกับผู้อื่น การทำงานเป็นทีม สร้างมนุษย์สัมพันธ์ได้ดี
                                เป็นที่รักใคร่ชอบพอของผู้ร่วมงาน เป็นผู้ที่ช่วยก่อให้เกิดความร่วมมือประสานงาน
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="interpersonalSkills" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>17. ความมีระเบียบวินัย ปฏิบัติตามวัฒนธรรมขององค์กร (Discipline and Adaptability to
                                Formal Organization)
                                ความสนใจเรียบรู้ ศึกษา กฎระเบียบ นโยบายต่าง ๆ
                                และปฏิบัติตามโดยเต็มใจการปฏิบัติตามระเบียบบริหารบุคคล (การเข้างาน ลางาน)
                                ปฏิบัติตามกฎการรักษาความปลอดภัยในโรงงาน การควบคุมคุณภาพ 5ส และอื่น ๆ
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="discipline" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>18. คุณธรรมและจริยธรรม (Ethics and Morality)มีความซื่อสัตย์ สุจริต มีจิตใจสะอาด
                                รู้จักเสียสละ ไม่เห็นแก่ตัว เอื้อเฟื้อช่วยเหลือคนอื่น
                            </td>
                            <td class="score-cell">
                                <span class="score-prefix">10/</span>
                                <select v-model="ethicsAndMorality" class="score-select" required>
                                    <option disabled value="">เลือกคะแนน</option>
                                    <option v-for="score in Array.from({ length: 11 }, (_, i) => 10 - i)" :key="score"
                                        :value="score">
                                        {{ score }}
                                    </option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>โปรดให้ข้อคิดเห็นที่เป็นประโยชน์แก่นักศึกษา/Please give Comments on the student</h5>
                </div>
                <table class="comment-table">
                    <thead>
                        <tr>
                            <th class="text-center">จุดเด่นของนักศึกษา/Strength</th>
                            <th class="text-center">ข้อควรปรับปรุงของนักศึกษา/Improvement</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><textarea v-model="strength" rows="4" class="comment-textarea"></textarea></td>
                            <td><textarea v-model="improvement" rows="4" class="comment-textarea"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="job-offer-section">
                    <p>หากนักศึกษาผู้นี้สำเร็จการศึกษาแล้ว ท่านจะรับเข้าทำงานในสถานประกอบการนี้หรือไม่ (หากมีโอกาสเลือก)
                    </p>
                    <p>One this student graduate, will you be interested to offer him/her a job?</p>
                    <div class="job-offer-options">
                        <label><input type="radio" v-model="jobOffer" value="รับ"> รับ/Yes</label>
                        <label><input type="radio" v-model="jobOffer" value="ไม่แน่ใจ"> ไม่แน่ใจ/Not Sure</label>
                        <label><input type="radio" v-model="jobOffer" value="ไม่รับ"> ไม่รับ/No</label>
                    </div>
                </div>
                <div>
                    <h5>ข้อคิดเห็นเพิ่มเติม/Other Comments</h5>
                    <textarea v-model="other" rows="4" class="other-comment-textarea"></textarea>
                </div>
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
const time = ref('1');

const workCriteria = ref('');
const qualityOfWork = ref('');
const academicAbility = ref('')
const abilityToLearn = ref('')
const practicalAbility = ref('')
const judgmentAndDecision = ref('')
const managementAndPlanning = ref('')
const communicationSkills = ref('')
const foreignLanguage = ref('')
const suitabilityForJob = ref('')
const responsibilityAndDependability = ref('')
const interestInWork = ref('')
const initiative = ref('')
const dependability = ref('')
const personality = ref('')
const interpersonalSkills = ref('')
const discipline = ref('')
const ethicsAndMorality = ref('')
const strength = ref('');
const improvement = ref('');
const jobOffer = ref('');
const other = ref('');

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
        const idCard = localStorage.getItem(config.idCard)
        const phoneNumber = localStorage.getItem(config.phoneNumber);
        const evaluatorStatus = localStorage.getItem(config.evaluatorStatus);
        const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;

        // คำนวณคะแนนรวม
        const totalScore = parseInt(workCriteria.value) + parseInt(qualityOfWork.value) +
            parseInt(academicAbility.value) + parseInt(abilityToLearn.value) +
            parseInt(practicalAbility.value) + parseInt(judgmentAndDecision.value) +
            parseInt(managementAndPlanning.value) + parseInt(communicationSkills.value) +
            parseInt(foreignLanguage.value) + parseInt(suitabilityForJob.value) +
            parseInt(responsibilityAndDependability.value) + parseInt(interestInWork.value) +
            parseInt(initiative.value) + parseInt(dependability.value) +
            parseInt(personality.value) + parseInt(interpersonalSkills.value) +
            parseInt(discipline.value) + parseInt(ethicsAndMorality.value);


        // คำนวณคะแนนเฉลี่ยเป็นเปอร์เซ็นต์ของ 160
        const averageScore = (totalScore /200) * 100;

        const payload = {
    evaluatorStatus: evaluatorStatus,
    time: time.value,
    evaluatorName: evaluatorName,
    studentId: student.value.studentID,
    phoneNumber: phoneNumber,
    idCard: idCard,
    criteria: workCriteria.value,
    qualityOfWork: qualityOfWork.value,
    academicAbility: academicAbility.value,
    abilityToLearn: abilityToLearn.value,
    practicalAbility: practicalAbility.value,
    judgmentAndDecision: judgmentAndDecision.value,
    managementAndPlanning: managementAndPlanning.value,
    communicationSkills: communicationSkills.value,
    foreignLanguage: foreignLanguage.value,
    suitabilityForJob: suitabilityForJob.value,
    responsibilityAndDependability: responsibilityAndDependability.value,
    interestInWork: interestInWork.value,
    initiative: initiative.value,
    dependability: dependability.value,
    personality: personality.value,
    interpersonalSkills: interpersonalSkills.value,
    discipline: discipline.value,
    ethicsAndMorality: ethicsAndMorality.value,
    totalScore: totalScore,
    averageScore: averageScore,
    strength: strength.value,
    improvement: improvement.value,
    jobOffer: jobOffer.value,
    other: other.value
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

.evaluation-table,
.comment-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.evaluation-table th,
.evaluation-table td,
.comment-table th,
.comment-table td {
    border: 1px solid #ddd;
    padding: 8px;
    box-sizing: border-box;
}

.evaluation-table th,
.comment-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
    box-sizing: border-box;
}

.score-cell {
    display: flex;
    align-items: center;
    box-sizing: border-box;
}

.score-prefix {
    margin-right: 5px;
    /* white-space: nowrap; ป้องกันการตัดบรรทัด */
    padding: 12.5px
}

.score-select {
    flex-grow: 1;
    /* ให้ select ครอบคลุมพื้นที่ที่เหลือ */
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    box-sizing: border-box;
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

.comment-textarea {
    width: 100%;
    resize: vertical;
    box-sizing: border-box;
}

.job-offer-section {
    margin-bottom: 20px;
}

.job-offer-options {
    display: flex;
    flex-direction: column;
}

.job-offer-options label {
    margin-bottom: 5px;
}

.other-comment-textarea {
    width: 100%;
    resize: vertical;
    margin-bottom: 20px;
    box-sizing: border-box;
}
</style>
