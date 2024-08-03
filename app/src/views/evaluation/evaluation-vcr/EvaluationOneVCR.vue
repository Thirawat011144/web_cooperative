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

            <div>
                <h2>คำชี้แจง</h2>
                โปรดบันทึกหมายเลข 5, 4, 3, 2, 1, หรือ -1 ตามความคิดเห็นของแต่ละหัวข้อการประเมิน
                โดยใช้เกณฑ์การประเมินค่าสำหรับระดับความคิดเห็นดังนี้ <br>
                ระดับ 5 ผลการประเมิน เห็นด้วยกับข้อความนั้นมากที่สุด <br>
                ระดับ 4 ผลการประเมิน เห็นด้วยกับข้อความนั้นมาก หรือเหมาะสมมาก <br>
                ระดับ 3 ผลการประเมิน เห็นด้วยกับข้อความนั้นมากปานกลาง หรือเหมาะสมมากปานกลาง <br>
                ระดับ 2 ผลการประเมิน เห็นด้วยกับข้อความนั้นน้อย หรือเหมาะสมน้อย <br>
                ระดับ 1 ผลการประเมิน เห็นด้วยกับข้อความนั้นน้อยที่สุด หรือเหมาะสมน้อยที่สุด <br>
                ระดับ -1 ผลการประเมิน ไม่มีความเห็นด้วย / ไม่มีข้อมูล / ไม่ต้องการประเมิน <br>
            </div>

            <form @submit.prevent="submitEvaluation">
                <h2>ส่วนที่ 1 สำหรับประเมินสถานประกอบการ</h2>
                <div>
                    <h5>การจัดการและการสนับสนุน</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>การประสานงานด้านการจัดการดูแลนักศึกษาในสถานประกอบการ ระหว่างบุคคล
                                และผู้นิเทศงานในสถานประกอบการ</td>
                            <td><input type="radio" :value="5" v-model.number="criteria" required></td>
                            <td><input type="radio" :value="4" v-model.number="criteria"></td>
                            <td><input type="radio" :value="3" v-model.number="criteria"></td>
                            <td><input type="radio" :value="2" v-model.number="criteria"></td>
                            <td><input type="radio" :value="1" v-model.number="criteria"></td>
                            <td><input type="radio" :value="-1" v-model.number="criteria"></td>
                        </tr>
                        <tr>
                            <td>การให้คำแนะนำดูแลนักศึกษาของฝ่ายบุคคล (การปฐมนิเทศ การแนะนำระเบียบวินัย การลางาน
                                สวัสดิการ การจ่ายค่าตอบแทน)</td>
                            <td><input type="radio" :value="5" v-model.number="hrGuidance" required></td>
                            <td><input type="radio" :value="4" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="3" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="2" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="1" v-model.number="hrGuidance"></td>
                            <td><input type="radio" :value="-1" v-model.number="hrGuidance"></td>
                        </tr>
                        <tr>
                            <td>บุคลากรในสถานประกอบการ ให้ความสนใจสนับสนุนและให้ความเป็นกันเองกับนักศึกษา</td>
                            <td><input type="radio" :value="5" v-model.number="employeeSupport" required></td>
                            <td><input type="radio" :value="4" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="3" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="2" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="1" v-model.number="employeeSupport"></td>
                            <td><input type="radio" :value="-1" v-model.number="employeeSupport"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ปริมาณงานและคุณภาพงานที่นักศึกษาได้รับมอบหมาย</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ปริมาณงานที่ได้รับมอบหมาย</td>
                            <td><input type="radio" :value="5" v-model.number="assignedWorkload" required></td>
                            <td><input type="radio" :value="4" v-model.number="assignedWorkload"></td>
                            <td><input type="radio" :value="3" v-model.number="assignedWorkload"></td>
                            <td><input type="radio" :value="2" v-model.number="assignedWorkload"></td>
                            <td><input type="radio" :value="1" v-model.number="assignedWorkload"></td>
                            <td><input type="radio" :value="-1" v-model.number="assignedWorkload"></td>
                        </tr>
                        <tr>
                            <td>คุณลักษณะงานที่ได้รับมอบหมายตรงกับสาขาวิชาเอกของนักศึกษา</td>
                            <td><input type="radio" :value="5" v-model.number="taskRelevanceToMajor" required></td>
                            <td><input type="radio" :value="4" v-model.number="taskRelevanceToMajor"></td>
                            <td><input type="radio" :value="3" v-model.number="taskRelevanceToMajor"></td>
                            <td><input type="radio" :value="2" v-model.number="taskRelevanceToMajor"></td>
                            <td><input type="radio" :value="1" v-model.number="taskRelevanceToMajor"></td>
                            <td><input type="radio" :value="-1" v-model.number="taskRelevanceToMajor"></td>
                        </tr>
                        <tr>
                            <td>งานที่ได้รับมอบหมายตรงกับที่สถานประกอบการเสนอไว้</td>
                            <td><input type="radio" :value="5" v-model.number="taskMatchesProposal" required></td>
                            <td><input type="radio" :value="4" v-model.number="taskMatchesProposal"></td>
                            <td><input type="radio" :value="3" v-model.number="taskMatchesProposal"></td>
                            <td><input type="radio" :value="2" v-model.number="taskMatchesProposal"></td>
                            <td><input type="radio" :value="1" v-model.number="taskMatchesProposal"></td>
                            <td><input type="radio" :value="-1" v-model.number="taskMatchesProposal"></td>
                        </tr>
                        <tr>
                            <td>งานที่ได้รับมอบหมายตรงกับความสนใจของนักศึกษา</td>
                            <td><input type="radio" :value="5" v-model.number="assignedTaskInterestMatch" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="assignedTaskInterestMatch"></td>
                            <td><input type="radio" :value="3" v-model.number="assignedTaskInterestMatch"></td>
                            <td><input type="radio" :value="2" v-model.number="assignedTaskInterestMatch"></td>
                            <td><input type="radio" :value="1" v-model.number="assignedTaskInterestMatch"></td>
                            <td><input type="radio" :value="-1" v-model.number="assignedTaskInterestMatch"></td>
                        </tr>
                        <tr>
                            <td>ความเหมาะสมของหัวข้อรายงานที่นักศึกษาได้รับ</td>
                            <td><input type="radio" :value="5" v-model.number="reportTopicSuitability" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="reportTopicSuitability"></td>
                            <td><input type="radio" :value="3" v-model.number="reportTopicSuitability"></td>
                            <td><input type="radio" :value="2" v-model.number="reportTopicSuitability"></td>
                            <td><input type="radio" :value="1" v-model.number="reportTopicSuitability"></td>
                            <td><input type="radio" :value="-1" v-model.number="reportTopicSuitability"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>การมอบหมายงานและนิเทศงานของผู้นิเทศงานในสถานประกอบการ</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>มีผู้นิเทศงานในสถานประกอบการดูแลนักศึกษาตั้งแต่วันแรกที่ทำงาน</td>
                            <td><input type="radio" :value="5" v-model.number="initialSupervisor" required></td>
                            <td><input type="radio" :value="4" v-model.number="initialSupervisor"></td>
                            <td><input type="radio" :value="3" v-model.number="initialSupervisor"></td>
                            <td><input type="radio" :value="2" v-model.number="initialSupervisor"></td>
                            <td><input type="radio" :value="1" v-model.number="initialSupervisor"></td>
                            <td><input type="radio" :value="-1" v-model.number="initialSupervisor"></td>
                        </tr>
                        <tr>
                            <td>ความรู้และประสบการณ์วิชาชีพของผู้นิเทศงานในสถานประกอบการ</td>
                            <td><input type="radio" :value="5" v-model.number="supervisorKnowledgeAndExperience"
                                    required></td>
                            <td><input type="radio" :value="4" v-model.number="supervisorKnowledgeAndExperience"></td>
                            <td><input type="radio" :value="3" v-model.number="supervisorKnowledgeAndExperience"></td>
                            <td><input type="radio" :value="2" v-model.number="supervisorKnowledgeAndExperience"></td>
                            <td><input type="radio" :value="1" v-model.number="supervisorKnowledgeAndExperience"></td>
                            <td><input type="radio" :value="-1" v-model.number="supervisorKnowledgeAndExperience"></td>
                        </tr>
                        <tr>
                            <td>เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการปฏิบัติงาน</td>
                            <td><input type="radio" :value="5" v-model.number="supervisionTime" required></td>
                            <td><input type="radio" :value="4" v-model.number="supervisionTime"></td>
                            <td><input type="radio" :value="3" v-model.number="supervisionTime"></td>
                            <td><input type="radio" :value="2" v-model.number="supervisionTime"></td>
                            <td><input type="radio" :value="1" v-model.number="supervisionTime"></td>
                            <td><input type="radio" :value="-1" v-model.number="supervisionTime"></td>
                        </tr>
                        <tr>
                            <td>เวลาผู้นิเทศงานในสถานประกอบการให้แก่นักศึกษาด้านการเขียนรายงาน</td>
                            <td><input type="radio" :value="5" v-model.number="reportWritingSupervisionTime" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="reportWritingSupervisionTime"></td>
                            <td><input type="radio" :value="3" v-model.number="reportWritingSupervisionTime"></td>
                            <td><input type="radio" :value="2" v-model.number="reportWritingSupervisionTime"></td>
                            <td><input type="radio" :value="1" v-model.number="reportWritingSupervisionTime"></td>
                            <td><input type="radio" :value="-1" v-model.number="reportWritingSupervisionTime"></td>
                        </tr>
                        <tr>
                            <td>ความสนใจของผู้นิเทศงานในสถานประกอบการต่อการสอนงานและสั่งงาน</td>
                            <td><input type="radio" :value="5" v-model.number="supervisorInterestInGuidance" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="supervisorInterestInGuidance"></td>
                            <td><input type="radio" :value="3" v-model.number="supervisorInterestInGuidance"></td>
                            <td><input type="radio" :value="2" v-model.number="supervisorInterestInGuidance"></td>
                            <td><input type="radio" :value="1" v-model.number="supervisorInterestInGuidance"></td>
                            <td><input type="radio" :value="-1" v-model.number="supervisorInterestInGuidance"></td>
                        </tr>
                        <tr>
                            <td>การให้ความสำคัญต่อการประเมินผลการปฏิบัติงานและเขียนรายงานของผู้นิเทศงานในสถานประกอบการ
                            </td>
                            <td><input type="radio" :value="5" v-model.number="supervisorEvaluationPriority" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="supervisorEvaluationPriority"></td>
                            <td><input type="radio" :value="3" v-model.number="supervisorEvaluationPriority"></td>
                            <td><input type="radio" :value="2" v-model.number="supervisorEvaluationPriority"></td>
                            <td><input type="radio" :value="1" v-model.number="supervisorEvaluationPriority"></td>
                            <td><input type="radio" :value="-1" v-model.number="supervisorEvaluationPriority"></td>
                        </tr>
                        <tr>
                            <td>การจัดทำแผนปฏิบัติงานตลอดระยะเวลาของการปฏิบัติงานให้กับนักศึกษา
                            </td>
                            <td><input type="radio" :value="5" v-model.number="workPlanDevelopment" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="workPlanDevelopment"></td>
                            <td><input type="radio" :value="3" v-model.number="workPlanDevelopment"></td>
                            <td><input type="radio" :value="2" v-model.number="workPlanDevelopment"></td>
                            <td><input type="radio" :value="1" v-model.number="workPlanDevelopment"></td>
                            <td><input type="radio" :value="-1" v-model.number="workPlanDevelopment"></td>
                        </tr>
                    </tbody>
                </table>
                <h2>ส่วนที่ 2 สำหรับประเมินนักศึกษา</h2>
                <div>
                    <h5>การพัฒนาตนเอง</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>บุคลิกภาพ</td>
                            <td><input type="radio" :value="5" v-model.number="personality" required></td>
                            <td><input type="radio" :value="4" v-model.number="personality"></td>
                            <td><input type="radio" :value="3" v-model.number="personality"></td>
                            <td><input type="radio" :value="2" v-model.number="personality"></td>
                            <td><input type="radio" :value="1" v-model.number="personality"></td>
                            <td><input type="radio" :value="-1" v-model.number="personality"></td>
                        </tr>
                        <tr>
                            <td>วุฒิภาวะ</td>
                            <td><input type="radio" :value="5" v-model.number="maturity" required></td>
                            <td><input type="radio" :value="4" v-model.number="maturity"></td>
                            <td><input type="radio" :value="3" v-model.number="maturity"></td>
                            <td><input type="radio" :value="2" v-model.number="maturity"></td>
                            <td><input type="radio" :value="1" v-model.number="maturity"></td>
                            <td><input type="radio" :value="-1" v-model.number="maturity"></td>
                        </tr>
                        <tr>
                            <td>การปรับตัว</td>
                            <td><input type="radio" :value="5" v-model.number="adaptation" required></td>
                            <td><input type="radio" :value="4" v-model.number="adaptation"></td>
                            <td><input type="radio" :value="3" v-model.number="adaptation"></td>
                            <td><input type="radio" :value="2" v-model.number="adaptation"></td>
                            <td><input type="radio" :value="1" v-model.number="adaptation"></td>
                            <td><input type="radio" :value="-1" v-model.number="adaptation"></td>
                        </tr>
                        <tr>
                            <td>การเรียนรู้</td>
                            <td><input type="radio" :value="5" v-model.number="learning" required></td>
                            <td><input type="radio" :value="4" v-model.number="learning"></td>
                            <td><input type="radio" :value="3" v-model.number="learning"></td>
                            <td><input type="radio" :value="2" v-model.number="learning"></td>
                            <td><input type="radio" :value="1" v-model.number="learning"></td>
                            <td><input type="radio" :value="-1" v-model.number="learning"></td>
                        </tr>
                        <tr>
                            <td>การแสดงความคิดเห็น</td>
                            <td><input type="radio" :value="5" v-model.number="expressingOpinions" required></td>
                            <td><input type="radio" :value="4" v-model.number="expressingOpinions"></td>
                            <td><input type="radio" :value="3" v-model.number="expressingOpinions"></td>
                            <td><input type="radio" :value="2" v-model.number="expressingOpinions"></td>
                            <td><input type="radio" :value="1" v-model.number="expressingOpinions"></td>
                            <td><input type="radio" :value="-1" v-model.number="expressingOpinions"></td>
                        </tr>
                        <tr>
                            <td>มนุษย์สัมพันธ์</td>
                            <td><input type="radio" :value="5" v-model.number="humanRelations" required></td>
                            <td><input type="radio" :value="4" v-model.number="humanRelations"></td>
                            <td><input type="radio" :value="3" v-model.number="humanRelations"></td>
                            <td><input type="radio" :value="2" v-model.number="humanRelations"></td>
                            <td><input type="radio" :value="1" v-model.number="humanRelations"></td>
                            <td><input type="radio" :value="-1" v-model.number="humanRelations"></td>
                        </tr>
                        <tr>
                            <td>ทัศนคติ</td>
                            <td><input type="radio" :value="5" v-model.number="attitude" required></td>
                            <td><input type="radio" :value="4" v-model.number="attitude"></td>
                            <td><input type="radio" :value="3" v-model.number="attitude"></td>
                            <td><input type="radio" :value="2" v-model.number="attitude"></td>
                            <td><input type="radio" :value="1" v-model.number="attitude"></td>
                            <td><input type="radio" :value="-1" v-model.number="attitude"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>การมีส่วนร่วมกับองค์กร</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>การมีส่วนร่วมกับองค์กร</td>
                            <td><input type="radio" :value="5" v-model.number="organizationEngagement" required></td>
                            <td><input type="radio" :value="4" v-model.number="organizationEngagement"></td>
                            <td><input type="radio" :value="3" v-model.number="organizationEngagement"></td>
                            <td><input type="radio" :value="2" v-model.number="organizationEngagement"></td>
                            <td><input type="radio" :value="1" v-model.number="organizationEngagement"></td>
                            <td><input type="radio" :value="-1" v-model.number="organizationEngagement"></td>
                        </tr>
                        <tr>
                            <td>การแสดงออกทางความคิดและข้อเสนอแนะในที่ประชุม</td>
                            <td><input type="radio" :value="5" v-model.number="meetingFeedbackAndIdeas" required></td>
                            <td><input type="radio" :value="4" v-model.number="meetingFeedbackAndIdeas"></td>
                            <td><input type="radio" :value="3" v-model.number="meetingFeedbackAndIdeas"></td>
                            <td><input type="radio" :value="2" v-model.number="meetingFeedbackAndIdeas"></td>
                            <td><input type="radio" :value="1" v-model.number="meetingFeedbackAndIdeas"></td>
                            <td><input type="radio" :value="-1" v-model.number="meetingFeedbackAndIdeas"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติตามระเบียบวินัยขององค์กร</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ความประพฤติ คุณธรรม จริยธรรม และการปฏิบัติตามระเบียบวินัยขององค์กร</td>
                            <td><input type="radio" :value="5" v-model.number="ethicsAndDiscipline" required></td>
                            <td><input type="radio" :value="4" v-model.number="ethicsAndDiscipline"></td>
                            <td><input type="radio" :value="3" v-model.number="ethicsAndDiscipline"></td>
                            <td><input type="radio" :value="2" v-model.number="ethicsAndDiscipline"></td>
                            <td><input type="radio" :value="1" v-model.number="ethicsAndDiscipline"></td>
                            <td><input type="radio" :value="-1" v-model.number="ethicsAndDiscipline"></td>
                        </tr>
                        <tr>
                            <td>การปฏิบัติตนเป็นตัวอย่างที่ดีในด้านความซื่อสัตย์และความรับผิดชอบ</td>
                            <td><input type="radio" :value="5" v-model.number="integrityAndResponsibility" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="integrityAndResponsibility"></td>
                            <td><input type="radio" :value="3" v-model.number="integrityAndResponsibility"></td>
                            <td><input type="radio" :value="2" v-model.number="integrityAndResponsibility"></td>
                            <td><input type="radio" :value="1" v-model.number="integrityAndResponsibility"></td>
                            <td><input type="radio" :value="-1" v-model.number="integrityAndResponsibility"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ความรู้ความสามารถพื้นฐานที่จำเป็นต่อการปฏิบัติงานที่ได้รับมอบหมายให้สำเร็จ</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ความรู้และทักษะพื้นฐานที่จำเป็นต่อการปฏิบัติงาน มอบหมายงานให้สำเร็จ</td>
                            <td><input type="radio" :value="5" v-model.number="basicKnowledgeAndSkills" required></td>
                            <td><input type="radio" :value="4" v-model.number="basicKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="3" v-model.number="basicKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="2" v-model.number="basicKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="1" v-model.number="basicKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="-1" v-model.number="basicKnowledgeAndSkills"></td>
                        </tr>
                        <tr>
                            <td>การนำความรู้และทักษะไปประยุกต์ใช้ในงานที่ได้รับมอบหมาย</td>
                            <td><input type="radio" :value="5" v-model.number="applicationOfKnowledgeAndSkills"
                                    required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="applicationOfKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="3" v-model.number="applicationOfKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="2" v-model.number="applicationOfKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="1" v-model.number="applicationOfKnowledgeAndSkills"></td>
                            <td><input type="radio" :value="-1" v-model.number="applicationOfKnowledgeAndSkills"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ความก้าวหน้าของการจัดทำรายงาน</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ความก้าวหน้าและความสมบูรณ์ของการจัดทำรายงาน</td>
                            <td><input type="radio" :value="5" v-model.number="reportProgressAndCompletion" required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="reportProgressAndCompletion"></td>
                            <td><input type="radio" :value="3" v-model.number="reportProgressAndCompletion"></td>
                            <td><input type="radio" :value="2" v-model.number="reportProgressAndCompletion"></td>
                            <td><input type="radio" :value="1" v-model.number="reportProgressAndCompletion"></td>
                            <td><input type="radio" :value="-1" v-model.number="reportProgressAndCompletion"></td>
                        </tr>
                        <tr>
                            <td>การสื่อสารข้อมูลในรายงานอย่างชัดเจนและเป็นระบบ</td>
                            <td><input type="radio" :value="5" v-model.number="clearAndSystematicCommunication"
                                    required>
                            </td>
                            <td><input type="radio" :value="4" v-model.number="clearAndSystematicCommunication"></td>
                            <td><input type="radio" :value="3" v-model.number="clearAndSystematicCommunication"></td>
                            <td><input type="radio" :value="2" v-model.number="clearAndSystematicCommunication"></td>
                            <td><input type="radio" :value="1" v-model.number="clearAndSystematicCommunication"></td>
                            <td><input type="radio" :value="-1" v-model.number="clearAndSystematicCommunication"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>สรุปโดยรวมของนักศึกษา</h5>
                </div>
                <table class="evaluation-table">
                    <thead>
                        <tr>
                            <th class="text-center">เกณฑ์การประเมิน</th>
                            <th>5</th>
                            <th>4</th>
                            <th>3</th>
                            <th>2</th>
                            <th>1</th>
                            <th>-1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>สรุปโดยรวมของนักศึกษา</td>
                            <td><input type="radio" :value="5" v-model.number="studentOverallEvaluation" required></td>
                            <td><input type="radio" :value="4" v-model.number="studentOverallEvaluation"></td>
                            <td><input type="radio" :value="3" v-model.number="studentOverallEvaluation"></td>
                            <td><input type="radio" :value="2" v-model.number="studentOverallEvaluation"></td>
                            <td><input type="radio" :value="1" v-model.number="studentOverallEvaluation"></td>
                            <td><input type="radio" :value="-1" v-model.number="studentOverallEvaluation"></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <h5>ข้อคิดเห็นเพิ่มเติม/Other Comments</h5>
                    <textarea v-model="other" style="width:160%; height:100px;"></textarea>
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

const criteria = ref('');
const hrGuidance = ref('');
const employeeSupport = ref('');
const assignedWorkload = ref('');
const taskRelevanceToMajor = ref('');
const taskMatchesProposal = ref('');
const assignedTaskInterestMatch = ref('');
const reportTopicSuitability = ref('');
const initialSupervisor = ref('');
const supervisorKnowledgeAndExperience = ref('');
const supervisionTime = ref('');
const reportWritingSupervisionTime = ref('');
const supervisorInterestInGuidance = ref('');
const supervisorEvaluationPriority = ref('');
const workPlanDevelopment = ref('');
const personality = ref(null);
const maturity = ref('');
const adaptation = ref('');
const learning = ref('');
const expressingOpinions = ref('');
const humanRelations = ref('');
const attitude = ref('');

const organizationEngagement = ref('');
const meetingFeedbackAndIdeas = ref('');

const ethicsAndDiscipline = ref('');
const integrityAndResponsibility = ref('');

const basicKnowledgeAndSkills = ref('');
const applicationOfKnowledgeAndSkills = ref('');

const reportProgressAndCompletion = ref('');
const clearAndSystematicCommunication = ref('');

const studentOverallEvaluation = ref('');
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
        const phoneNumber = localStorage.getItem(config.phoneNumber)
        const evaluatorStatus = localStorage.getItem(config.evaluatorStatus);
        const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;
        const payload = {
            evaluatorStatus: evaluatorStatus,
            time: time.value,
            evaluatorName: evaluatorName,
            idCard:idCard,
            studentId: student.value.studentID,
            criteria: criteria.value,
            hrGuidance: hrGuidance.value,
            employeeSupport: employeeSupport.value,
            phoneNumber: phoneNumber,

            assignedWorkload: assignedWorkload.value,
            taskRelevanceToMajor: taskRelevanceToMajor.value,
            taskMatchesProposal: taskMatchesProposal.value,
            assignedTaskInterestMatch: assignedTaskInterestMatch.value,
            reportTopicSuitability: reportTopicSuitability.value,

            initialSupervisor: initialSupervisor.value,
            supervisorKnowledgeAndExperience: supervisorKnowledgeAndExperience.value,
            supervisionTime: supervisionTime.value,
            reportWritingSupervisionTime: reportWritingSupervisionTime.value,
            supervisorInterestInGuidance: supervisorInterestInGuidance.value,
            supervisorEvaluationPriority: supervisorEvaluationPriority.value,
            workPlanDevelopment: workPlanDevelopment.value,

            personality: personality.value,
            maturity: maturity.value,
            adaptation: adaptation.value,
            learning: learning.value,
            expressingOpinions: expressingOpinions.value,
            humanRelations: humanRelations.value,
            attitude: attitude.value,

            organizationEngagement: organizationEngagement.value,
            meetingFeedbackAndIdeas: meetingFeedbackAndIdeas.value,

            ethicsAndDiscipline: ethicsAndDiscipline.value,
            integrityAndResponsibility: integrityAndResponsibility.value,

            basicKnowledgeAndSkills: basicKnowledgeAndSkills.value,
            applicationOfKnowledgeAndSkills: applicationOfKnowledgeAndSkills.value,

            reportProgressAndCompletion: reportProgressAndCompletion.value,
            clearAndSystematicCommunication: clearAndSystematicCommunication.value,

            studentOverallEvaluation: studentOverallEvaluation.value,
            other: other.value,
        }
        console.log(payload)
        const response = await axios.post(`${config.api_path}/data-evaluation-internship-university`, payload, {
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

            if (evaluatorStatus === 'อาจารย์นิเทศ' && userYear === "ป.ตรี ปีที่ 2") {
                router.push('/teacher-index/student-tec2active');
            } else if (evaluatorStatus === 'ผู้ดูแล' && userYear === "ปวส 2") {
                router.push('/home-evaluation/student-ev-uvcr');
            } else if(evaluatorStatus === 'อาจารย์นิเทศ' && userYear === 'ปวช 3'){
                router.push('/teacher-index/list-cr2');
            } else if(evaluatorStatus === 'อาจารย์นิเทศ' && userYear === 'ปวส 2'){
                router.push('/teacher-index/student-uvcractive');
            } else {    
                router.push('/home-evaluation/student-ev-vcr2');
            }
            console.log("userYear",userYear)
            console.log("evaluatorStatus",evaluatorStatus)
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
}

.evaluation-table th {
    background-color: #f2f2f2;
    font-weight: bold;
    text-align: center;
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
