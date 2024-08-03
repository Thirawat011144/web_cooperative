<template>
  <div class="evaluation-container">
    <h2>การประเมินนักศึกษา</h2>
    <div>
      เกณฑ์การให้คะแนนการประเมินสมรรถนะทางวิชาชีพครูในการปฏิบัติการสอน แบ่งเป็น ๕ ระดับ ดังนี้ <br />
      ระดับ 1 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุงอย่างยิ่ง <br />
      ระดับ 2 ผลการประเมิน ต่ำกว่ามาตรฐานควรปรับปรุง <br />
      ระดับ 3 ผลการประเมิน มาตรฐานขั้นต่ำ <br />
      ระดับ 4 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดี <br />
      ระดับ 5 ผลการประเมิน สูงกว่ามาตรฐาน ระดับดีมาก <br /> <br />
    </div>
    <div v-if="student">
      <h4>ข้อมูลนักศึกษาที่ทำการประเมิน</h4>
      <p>ชื่อ: {{ student.firstName }} {{ student.lastName }}</p>
      <p>รหัสนักศึกษา: {{ student.studentID }}</p>
      <div>
        <label for="studentStatus">สถานะผู้ประเมินนักศึกษา:</label>
        <select class="form-select" id="studentStatus" v-model="selectedStatus" required>
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <form @submit.prevent="submitEvaluation">
        <div>
          <h5>ด้านการจัดการเรียนรู้</h5>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้กับมาตรฐานการเรียนรู้ของหลักสูตร
                แกนกลางและหลักสูตรสถานศึกษา</td>
              <td><input type="radio" :value="5" v-model.number="criteria" required></td>
              <td><input type="radio" :value="4" v-model.number="criteria"></td>
              <td><input type="radio" :value="3" v-model.number="criteria"></td>
              <td><input type="radio" :value="2" v-model.number="criteria"></td>
              <td><input type="radio" :value="1" v-model.number="criteria"></td>
            </tr>
            <tr>
              <td>สามารถวิเคราะห์ความสอดคล้องของสาระการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร
              </td>
              <td><input type="radio" :value="5" v-model.number="innovationAlignment" required></td>
              <td><input type="radio" :value="4" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="3" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="2" v-model.number="innovationAlignment"></td>
              <td><input type="radio" :value="1" v-model.number="innovationAlignment"></td>
            </tr>
            <tr>
              <td>สามารถเขียนแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร</td>
              <td><input type="radio" :value="5" v-model.number="learningPlan" required></td>
              <td><input type="radio" :value="4" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="3" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="2" v-model.number="learningPlan"></td>
              <td><input type="radio" :value="1" v-model.number="learningPlan"></td>
            </tr>
            <tr>
              <td>
                สามารถจัดการเรียนรู้ให้เป็นไปตามแผนการจัดการเรียนรู้เพื่อพัฒนาผู้เรียนให้มีปัญญารู้คิดและมีความเป็นนวัตกร
              </td>
              <td><input type="radio" :value="5" v-model.number="innovativeLearningPlan" required></td>
              <td><input type="radio" :value="4" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="3" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="2" v-model.number="innovativeLearningPlan"></td>
              <td><input type="radio" :value="1" v-model.number="innovativeLearningPlan"></td>
            </tr>
            <tr>
              <td>สามารถจัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนมีความสุขในการเรียน</td>
              <td><input type="radio" :value="5" v-model.number="joyfulLearningActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="3" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="2" v-model.number="joyfulLearningActivities"></td>
              <td><input type="radio" :value="1" v-model.number="joyfulLearningActivities"></td>
            </tr>
            <tr>
              <td>จัดกิจกรรมและสร้างบรรยากาศการเรียนรู้ให้ผู้เรียนโดยตระหนักถึงสุขภาวะของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="learnerWellbeingActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="3" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="2" v-model.number="learnerWellbeingActivities"></td>
              <td><input type="radio" :value="1" v-model.number="learnerWellbeingActivities"></td>
            </tr>
            <tr>
              <td>สามารถดูแล ช่วยเหลือ และพัฒนาผู้เรียนเป็นรายบุคคลตามศักยภาพ</td>
              <td><input type="radio" :value="5" v-model.number="individualStudentDevelopment" required></td>
              <td><input type="radio" :value="4" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="3" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="2" v-model.number="individualStudentDevelopment"></td>
              <td><input type="radio" :value="1" v-model.number="individualStudentDevelopment"></td>
            </tr>
            <tr>
              <td>สามารถรายงานผลการพัฒนาคุณภาพผู้เรียนได้อย่างเป็นระบบ</td>
              <td><input type="radio" :value="5" v-model.number="systematicQualityReporting" required></td>
              <td><input type="radio" :value="4" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="3" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="2" v-model.number="systematicQualityReporting"></td>
              <td><input type="radio" :value="1" v-model.number="systematicQualityReporting"></td>
            </tr>
            <tr>
              <td>สามารถทำวิจัยที่สอดคล้องกับปัญหาของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="studentProblemResearch" required></td>
              <td><input type="radio" :value="4" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="3" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="2" v-model.number="studentProblemResearch"></td>
              <td><input type="radio" :value="1" v-model.number="studentProblemResearch"></td>
            </tr>
            <tr>
              <td>สามารถประยุกต์ใช้เทคโนโลยีดิจิทัลในการจัดการเรียนรู้ เช่น CAI, google classroom, Kahoot เป็นต้น</td>
              <td><input type="radio" :value="5" v-model.number="digitalLearningTools" required></td>
              <td><input type="radio" :value="4" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="3" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="2" v-model.number="digitalLearningTools"></td>
              <td><input type="radio" :value="1" v-model.number="digitalLearningTools"></td>
            </tr>
            <tr>
              <td>สามารถปฏิบัติงานร่วมกับผู้อื่นอย่างสร้างสรรค์</td>
              <td><input type="radio" :value="5" v-model.number="collaborativeCreativity" required></td>
              <td><input type="radio" :value="4" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="3" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="2" v-model.number="collaborativeCreativity"></td>
              <td><input type="radio" :value="1" v-model.number="collaborativeCreativity"></td>
            </tr>
            <tr>
              <td>มีส่วนร่วมในกิจกรรมการพัฒนาวิชาชีพ</td>
              <td><input type="radio" :value="5" v-model.number="professionalGrowthActivities" required></td>
              <td><input type="radio" :value="4" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="3" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="2" v-model.number="professionalGrowthActivities"></td>
              <td><input type="radio" :value="1" v-model.number="professionalGrowthActivities"></td>
            </tr>
          </tbody>
        </table>
        <div>
          <h5>ด้านความสัมพันธ์กับชุมชน และผู้ปกครอง
          </h5>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ร่วมมือกับผู้ปกครองในการพัฒนาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา</td>
              <td><input type="radio" :value="5" v-model.number="parentCollaboration" required></td>
              <td><input type="radio" :value="4" v-model.number="parentCollaboration"></td>
              <td><input type="radio" :value="3" v-model.number="parentCollaboration"></td>
              <td><input type="radio" :value="2" v-model.number="parentCollaboration"></td>
              <td><input type="radio" :value="1" v-model.number="parentCollaboration"></td>
            </tr>
            <tr>
              <td>ร่วมมือกับผู้ปกครองในการแก้ปัญหาผู้เรียนให้มีคุณลักษณะที่พึงประสงค์ของสถานศึกษา</td>
              <td><input type="radio" :value="5" v-model.number="parentCollab" required></td>
              <td><input type="radio" :value="4" v-model.number="parentCollab"></td>
              <td><input type="radio" :value="3" v-model.number="parentCollab"></td>
              <td><input type="radio" :value="2" v-model.number="parentCollab"></td>
              <td><input type="radio" :value="1" v-model.number="parentCollab"></td>
            </tr>
            <tr>
              <td>สามารถสร้างเครือข่ายความร่วมมือกับผู้ปกครองเพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="parentNetwork" required></td>
              <td><input type="radio" :value="4" v-model.number="parentNetwork"></td>
              <td><input type="radio" :value="3" v-model.number="parentNetwork"></td>
              <td><input type="radio" :value="2" v-model.number="parentNetwork"></td>
              <td><input type="radio" :value="1" v-model.number="parentNetwork"></td>
            </tr>
            <tr>
              <td>สามารถสร้างเครือข่ายความร่วมมือกับชุมชน เข่น ปราชญ์ชาวบ้าน หน่วยงานปกครองของท้องถิ่น
                เพื่อสนับสนุนการเรียนรู้ที่มีคุณภาพของผู้เรียน</td>
              <td><input type="radio" :value="5" v-model.number="communityNetwork" required></td>
              <td><input type="radio" :value="4" v-model.number="communityNetwork"></td>
              <td><input type="radio" :value="3" v-model.number="communityNetwork"></td>
              <td><input type="radio" :value="2" v-model.number="communityNetwork"></td>
              <td><input type="radio" :value="1" v-model.number="communityNetwork"></td>
            </tr>
            <tr>
              <td>สามารถรายงานการศึกษาบริบทของชุมชนโดยเลือกประเด็นศึกษา ได้แก่ วิทยากรในชุมชน ปราชญ์ชาวบ้านในชุมชน
                แหล่งเรียนรู้ในชุมชน วัฒนธรรมของชุมชน เศรษฐกิจของชุมชน เป็นต้น</td>
              <td><input type="radio" :value="5" v-model.number="communityContextReport" required></td>
              <td><input type="radio" :value="4" v-model.number="communityContextReport"></td>
              <td><input type="radio" :value="3" v-model.number="communityContextReport"></td>
              <td><input type="radio" :value="2" v-model.number="communityContextReport"></td>
              <td><input type="radio" :value="1" v-model.number="communityContextReport"></td>
            </tr>
            <tr>
              <td>สามารถปฏิบัติตนในการอยู่ร่วมกับชุมชนได้อย่างเหมาะสม</td>
              <td><input type="radio" :value="5" v-model.number="communityEngagement" required></td>
              <td><input type="radio" :value="4" v-model.number="communityEngagement"></td>
              <td><input type="radio" :value="3" v-model.number="communityEngagement"></td>
              <td><input type="radio" :value="2" v-model.number="communityEngagement"></td>
              <td><input type="radio" :value="1" v-model.number="communityEngagement"></td>
            </tr>
            <tr>
              <td>สามารถรายงานการศึกษาวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่นโดยเลือกศึกษาตามประเด็น ได้แก่
                วิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น
                ปราชญ์ชาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น
                แหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น การอนุรักษ์วัฒนธรรมและภูมิปัญญาท้องถิ่น
                เป็นต้น</td>
              <td><input type="radio" :value="5" v-model.number="culturalStudyReport" required></td>
              <td><input type="radio" :value="4" v-model.number="culturalStudyReport"></td>
              <td><input type="radio" :value="3" v-model.number="culturalStudyReport"></td>
              <td><input type="radio" :value="2" v-model.number="culturalStudyReport"></td>
              <td><input type="radio" :value="1" v-model.number="culturalStudyReport"></td>
            </tr>
            <tr>
              <td>สามารถนำวัฒนธรรมชุมชนและภูมิปัญญาในท้องถิ่นมาบูรณาการในการจัดการเรียนรู้ในซั้นเรียนตามประเด็น ได้แก่
                องค์ความรู้ของวิทยากรด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น
                องค์ความรู้ของปราชญ์ซาวบ้านด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น
                องค์ความรู้จากแหล่งเรียนรู้ในชุมชนด้านวัฒนธรรมของชุมชนและภูมิปัญญาในท้องถิ่น เป็นต้น</td>
              <td><input type="radio" :value="5" v-model.number="culturalIntegration" required></td>
              <td><input type="radio" :value="4" v-model.number="culturalIntegration"></td>
              <td><input type="radio" :value="3" v-model.number="culturalIntegration"></td>
              <td><input type="radio" :value="2" v-model.number="culturalIntegration"></td>
              <td><input type="radio" :value="1" v-model.number="culturalIntegration"></td>
            </tr>
          </tbody>
        </table>
        <div>
          <h5>ด้านการปฏิบัติหน้าที่ครูและจรรยาบรรณของวิชาชีพ

          </h5>
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
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>มุ่งมั่นพัฒนาผู้เรียนให้เกิดการเรียนรู้ ทักษะปฏิบัติ และคุณลักษณะที่ดีงาม อย่างเต็มความสามารถด้วยวิธีการที่เหมาะสมกับระดับ ความสามารถและช่วงวัย</td>
              <td><input type="radio" :value="5" v-model.number="studentGrowth" required></td>
              <td><input type="radio" :value="4" v-model.number="studentGrowth"></td>
              <td><input type="radio" :value="3" v-model.number="studentGrowth"></td>
              <td><input type="radio" :value="2" v-model.number="studentGrowth"></td>
              <td><input type="radio" :value="1" v-model.number="studentGrowth"></td>
            </tr>
            <tr>
              <td>รักเมตตา เอาใจใส่ ช่วยเหลือและพัฒนาผู้เรียนอย่างเหมาะสม</td>
              <td><input type="radio" :value="5" v-model.number="studentCare" required></td>
              <td><input type="radio" :value="4" v-model.number="studentCare"></td>
              <td><input type="radio" :value="3" v-model.number="studentCare"></td>
              <td><input type="radio" :value="2" v-model.number="studentCare"></td>
              <td><input type="radio" :value="1" v-model.number="studentCare"></td>
            </tr>
            <tr>
              <td>ส่งเสริมการเรียนรู้อย่างต่อเนื่องด้วยความเอาใจใส่</td>
              <td><input type="radio" :value="5" v-model.number="continuousLearning" required></td>
              <td><input type="radio" :value="4" v-model.number="continuousLearning"></td>
              <td><input type="radio" :value="3" v-model.number="continuousLearning"></td>
              <td><input type="radio" :value="2" v-model.number="continuousLearning"></td>
              <td><input type="radio" :value="1" v-model.number="continuousLearning"></td>
            </tr>
            <tr>
              <td>การยอมรับความแตกต่างของผู้เรียนทางด้านเพศ เชื้อชาติ ศาสนา วัฒนธรรม และระดับการเรียนรู้</td>
              <td><input type="radio" :value="5" v-model.number="inclusivity" required></td>
              <td><input type="radio" :value="4" v-model.number="inclusivity"></td>
              <td><input type="radio" :value="3" v-model.number="inclusivity"></td>
              <td><input type="radio" :value="2" v-model.number="inclusivity"></td>
              <td><input type="radio" :value="1" v-model.number="inclusivity"></td>
            </tr>
            <tr>
              <td>กระตุ้นและเสริมสร้างแรงจูงใจในการเรียนรู้แก่ผู้เรียนโดยใช้การเสริมแรงทางบวก</td>
              <td><input type="radio" :value="5" v-model.number="positiveReinforcement" required></td>
              <td><input type="radio" :value="4" v-model.number="positiveReinforcement"></td>
              <td><input type="radio" :value="3" v-model.number="positiveReinforcement"></td>
              <td><input type="radio" :value="2" v-model.number="positiveReinforcement"></td>
              <td><input type="radio" :value="1" v-model.number="positiveReinforcement"></td>
            </tr>
            <tr>
              <td>ส่งเสริมให้ผู้เรียนแสดงความสามารถและความคิดริเริ่มสร้างสรรค์อย่างเต็มศักยภาพ</td>
              <td><input type="radio" :value="5" v-model.number="creativeExpression" required></td>
              <td><input type="radio" :value="4" v-model.number="creativeExpression"></td>
              <td><input type="radio" :value="3" v-model.number="creativeExpression"></td>
              <td><input type="radio" :value="2" v-model.number="creativeExpression"></td>
              <td><input type="radio" :value="1" v-model.number="creativeExpression"></td>
            </tr>
            <tr>
              <td>ติดตามข้อมูลข่าวสารการศึกษา สังคม การเมือง การปกครอง และเศรษฐกิจ โดยสามารถนำมาประยุกต์ เชื่อมโยงกับเนื้อหาในการจัดการเรียนรู้ได้อย่างมีประสิทธิภาพ</td>
              <td><input type="radio" :value="5" v-model.number="currentAffairsIntegration" required></td>
              <td><input type="radio" :value="4" v-model.number="currentAffairsIntegration"></td>
              <td><input type="radio" :value="3" v-model.number="currentAffairsIntegration"></td>
              <td><input type="radio" :value="2" v-model.number="currentAffairsIntegration"></td>
              <td><input type="radio" :value="1" v-model.number="currentAffairsIntegration"></td>
            </tr>
            <tr>
              <td>นำแนวคิด เทคนิควิธีการ หรือความรู้ใหม่ๆ ที่น่าสนใจ มาประยุกต์ใช้เป็นส่วนหนึ่งในการออกแบบการจัดกิจกรรรมการเรียนรู้ได้อย่างเหมาะสม</td>
              <td><input type="radio" :value="5" v-model.number="innovativeTeaching" required></td>
              <td><input type="radio" :value="4" v-model.number="innovativeTeaching"></td>
              <td><input type="radio" :value="3" v-model.number="innovativeTeaching"></td>
              <td><input type="radio" :value="2" v-model.number="innovativeTeaching"></td>
              <td><input type="radio" :value="1" v-model.number="innovativeTeaching"></td>
            </tr>
            <tr>
              <td>ประพฤติตนเป็นแบบอย่างที่ดีทั้งทางกาย วาจา และจิตใจ มีคุณธรรมจริยธรรม</td>
              <td><input type="radio" :value="5" v-model.number="ethicalRoleModel" required></td>
              <td><input type="radio" :value="4" v-model.number="ethicalRoleModel"></td>
              <td><input type="radio" :value="3" v-model.number="ethicalRoleModel"></td>
              <td><input type="radio" :value="2" v-model.number="ethicalRoleModel"></td>
              <td><input type="radio" :value="1" v-model.number="ethicalRoleModel"></td>
            </tr>
            <tr>
              <td>ปฏิบัติตนโดยยึดหลักความเป็นธรรมเท่าเทียม และมีส่วนช่วยให้คนในองค์กรอยู่ร่วมกันอย่างสันติ</td>
              <td><input type="radio" :value="5" v-model.number="fairnessAndHarmony" required></td>
              <td><input type="radio" :value="4" v-model.number="fairnessAndHarmony"></td>
              <td><input type="radio" :value="3" v-model.number="fairnessAndHarmony"></td>
              <td><input type="radio" :value="2" v-model.number="fairnessAndHarmony"></td>
              <td><input type="radio" :value="1" v-model.number="fairnessAndHarmony"></td>
            </tr>
            <tr>
              <td>ปฏิบัติตนตามข้อตกลง กฎกติกาของโรงเรียนด้วยความสมัครใจ ทั้งในด้านการปฏิบัติการสอนและการปฏิบัติหน้าที่อื่นในโรงเรียน</td>
              <td><input type="radio" :value="5" v-model.number="complianceAndCommitment" required></td>
              <td><input type="radio" :value="4" v-model.number="complianceAndCommitment"></td>
              <td><input type="radio" :value="3" v-model.number="complianceAndCommitment"></td>
              <td><input type="radio" :value="2" v-model.number="complianceAndCommitment"></td>
              <td><input type="radio" :value="1" v-model.number="complianceAndCommitment"></td>
            </tr>
            <tr>
              <td>ติดตามข้อมูลและปรับเปลี่ยนตนเองให้สอดคล้องการเปลี่ยนแปลง          ทางวิชาชีพ วิทยาการ เศรษฐกิจ สังคม และการเมือง</td>
              <td><input type="radio" :value="5" v-model.number="adaptiveProfessional" required></td>
              <td><input type="radio" :value="4" v-model.number="adaptiveProfessional"></td>
              <td><input type="radio" :value="3" v-model.number="adaptiveProfessional"></td>
              <td><input type="radio" :value="2" v-model.number="adaptiveProfessional"></td>
              <td><input type="radio" :value="1" v-model.number="adaptiveProfessional"></td>
            </tr>
            <tr>
              <td>ศรัทธา ชื่อสัตย์ สุจริต และรับผิดชอบต่อวิชาชีพครู</td>
              <td><input type="radio" :value="5" v-model.number="professionalIntegrity" required></td>
              <td><input type="radio" :value="4" v-model.number="professionalIntegrity"></td>
              <td><input type="radio" :value="3" v-model.number="professionalIntegrity"></td>
              <td><input type="radio" :value="2" v-model.number="professionalIntegrity"></td>
              <td><input type="radio" :value="1" v-model.number="professionalIntegrity"></td>
            </tr>
            <tr>
              <td>เป็นสมาชิกที่ดีขององค์กรวิชาชีพ</td>
              <td><input type="radio" :value="5" v-model.number="professionalMembership" required></td>
              <td><input type="radio" :value="4" v-model.number="professionalMembership"></td>
              <td><input type="radio" :value="3" v-model.number="professionalMembership"></td>
              <td><input type="radio" :value="2" v-model.number="professionalMembership"></td>
              <td><input type="radio" :value="1" v-model.number="professionalMembership"></td>
            </tr>
            <tr>
              <td>ให้บริการด้วยความจริงใจและเสมอภาค</td>
              <td><input type="radio" :value="5" v-model.number="sincereService" required></td>
              <td><input type="radio" :value="4" v-model.number="sincereService"></td>
              <td><input type="radio" :value="3" v-model.number="sincereService"></td>
              <td><input type="radio" :value="2" v-model.number="sincereService"></td>
              <td><input type="radio" :value="1" v-model.number="sincereService"></td>
            </tr>
            <tr>
              <td>ไม่เรียกรับหรือรับผลประโยชน์จากการใช้ตำแหน่งหน้าที่โดยมิชอบ</td>
              <td><input type="radio" :value="5" v-model.number="ethicalConduct" required></td>
              <td><input type="radio" :value="4" v-model.number="ethicalConduct"></td>
              <td><input type="radio" :value="3" v-model.number="ethicalConduct"></td>
              <td><input type="radio" :value="2" v-model.number="ethicalConduct"></td>
              <td><input type="radio" :value="1" v-model.number="ethicalConduct"></td>
            </tr>
            <tr>
              <td>อุทิศตนเพื่อช่วยเหลือเพื่อนผู้ร่วมประกอบวิชาชีพภายใต้หลักการที่ถูกต้อง</td>
              <td><input type="radio" :value="5" v-model.number="dedicatedSupport" required></td>
              <td><input type="radio" :value="4" v-model.number="dedicatedSupport"></td>
              <td><input type="radio" :value="3" v-model.number="dedicatedSupport"></td>
              <td><input type="radio" :value="2" v-model.number="dedicatedSupport"></td>
              <td><input type="radio" :value="1" v-model.number="dedicatedSupport"></td>
            </tr>
            <tr>
              <td>สร้างความสามัคคีในหมู่คณะ</td>
              <td><input type="radio" :value="5" v-model.number="teamHarmony" required></td>
              <td><input type="radio" :value="4" v-model.number="teamHarmony"></td>
              <td><input type="radio" :value="3" v-model.number="teamHarmony"></td>
              <td><input type="radio" :value="2" v-model.number="teamHarmony"></td>
              <td><input type="radio" :value="1" v-model.number="teamHarmony"></td>
            </tr>
            <tr>
              <td>ริเริ่ม วางแผน หรือ เป็นผู้น่าในการทำกิจกรรมเกี่ยวกับอนุรักษ์และพัฒนา เศรษฐกิจ สังคม ศาสนา ศิลปวัฒนธรรม ภูมิปัญญา หรือ สิ่งแวดล้อมโดยคำนึงถึงผลประโยชน์ของส่วนรวมเป็นสำคัญ</td>
              <td><input type="radio" :value="5" v-model.number="communityLeadership" required></td>
              <td><input type="radio" :value="4" v-model.number="communityLeadership"></td>
              <td><input type="radio" :value="3" v-model.number="communityLeadership"></td>
              <td><input type="radio" :value="2" v-model.number="communityLeadership"></td>
              <td><input type="radio" :value="1" v-model.number="communityLeadership"></td>
            </tr>
            <tr>
              <td>ปฏิบัติตนตามกฎระเบียบของสังคมภายใต้ระบอบประชาธิปไตยอันมีพระมหากษัตริย์ทรงเป็นประมุขอย่างเคร่งครัด</td>
              <td><input type="radio" :value="5" v-model.number="democraticCompliance" required></td>
              <td><input type="radio" :value="4" v-model.number="democraticCompliance"></td>
              <td><input type="radio" :value="3" v-model.number="democraticCompliance"></td>
              <td><input type="radio" :value="2" v-model.number="democraticCompliance"></td>
              <td><input type="radio" :value="1" v-model.number="democraticCompliance"></td>
            </tr>
          </tbody>
        </table>

        <div>
          <h5>ข้อเสนอแนะเพิ่มเติม</h5>
          <textarea v-model="additionalComments" class="form-control" rows="4"
            placeholder="ใส่ข้อเสนอแนะเพิ่มเติมที่นี่"></textarea>
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
const time = ref('2');

const criteria = ref(null);
const innovationAlignment = ref(null);
const learningPlan = ref(null);
const innovativeLearningPlan = ref(null);
const joyfulLearningActivities = ref(null);
const learnerWellbeingActivities = ref(null);
const individualStudentDevelopment = ref(null);
const systematicQualityReporting = ref(null);
const studentProblemResearch = ref(null);
const digitalLearningTools = ref(null);
const collaborativeCreativity = ref(null);
const professionalGrowthActivities = ref(null);

const parentCollaboration = ref(null);
const parentCollab = ref(null);
const parentNetwork = ref(null);
const communityNetwork = ref(null);
const communityContextReport = ref(null);
const communityEngagement = ref(null);
const culturalStudyReport = ref(null);
const culturalIntegration = ref(null);

const studentGrowth = ref(null);
const studentCare = ref(null);
const continuousLearning = ref(null);
const inclusivity = ref(null);
const positiveReinforcement = ref(null);
const creativeExpression = ref(null);
const currentAffairsIntegration = ref(null);
const innovativeTeaching = ref(null);
const ethicalRoleModel = ref(null);
const fairnessAndHarmony = ref(null);
const complianceAndCommitment = ref(null);
const adaptiveProfessional = ref(null);
const professionalIntegrity = ref(null);
const professionalMembership = ref(null);
const sincereService = ref(null);
const ethicalConduct = ref(null);
const dedicatedSupport = ref(null);
const teamHarmony = ref(null);
const communityLeadership = ref(null);
const democraticCompliance = ref(null);

const additionalComments = ref(''); // New state for additional comments
const selectedStatus = ref(''); // New state for selected status

const statusOptions = [
  { value: 'ครูพี่เลี้ยง', text: 'ครูพี่เลี้ยง' },
  { value: 'หัวหน้าแผนกวิชา', text: 'หัวหน้าแผนกวิชา' },
  { value: 'อาจารย์นิเทศ', text: 'อาจารย์นิเทศ' },
  { value: 'ผู้บริหารสถานศึกษา/ผู้ได้รับมอบหมาย', text: 'ผู้บริหารสถานศึกษา/ผู้ได้รับมอบหมาย' },
  { value: 'กรรมการบริหารสถานศึกษา/ตัวแทนชุมชน', text: 'กรรมการบริหารสถานศึกษา/ตัวแทนชุมชน' }
];

const fetchStudentData = async () => {
  try {
    const response = await axios.get(`${config.api_path}/user/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(config.token_name)}`
      }
    });
    student.value = response.data;
    selectedStatus.value = student.value.evaluatorStatus; // Set initial selected status
  } catch (error) {
    console.error('Error fetching student data:', error);
  }
};

const submitEvaluation = async () => {
  try {
    const idCard = localStorage.getItem(config.idCard);
    const phoneNumber = localStorage.getItem(config.phoneNumber);
    const evaluatorName = `${localStorage.getItem(config.firstName_name)} ${localStorage.getItem(config.token_lastName)}`;
    const payload = {
      evaluatorStatus: selectedStatus.value,
      time: time.value,
      evaluatorName: evaluatorName,
      phoneNumber: phoneNumber,
      studentId: student.value.studentID,
      idCard: idCard,
      criteria: criteria.value,
      innovationAlignment: innovationAlignment.value,
      learningPlan: learningPlan.value,
      innovativeLearningPlan: innovativeLearningPlan.value,
      joyfulLearningActivities: joyfulLearningActivities.value,
      learnerWellbeingActivities: learnerWellbeingActivities.value,
      individualStudentDevelopment: individualStudentDevelopment.value,
      systematicQualityReporting: systematicQualityReporting.value,
      studentProblemResearch: studentProblemResearch.value,
      digitalLearningTools: digitalLearningTools.value,
      collaborativeCreativity: collaborativeCreativity.value,
      professionalGrowthActivities: professionalGrowthActivities.value,

      parentCollaboration: parentCollaboration.value,
      parentCollab: parentCollab.value,
      parentNetwork: parentNetwork.value,
      communityNetwork: communityNetwork.value,
      communityContextReport: communityContextReport.value,
      communityEngagement: communityEngagement.value,
      culturalStudyReport: culturalStudyReport.value,
      culturalIntegration: culturalIntegration.value,

      studentGrowth: studentGrowth.value,
      studentCare: studentCare.value,
      continuousLearning: continuousLearning.value,
      inclusivity: inclusivity.value,
      positiveReinforcement: positiveReinforcement.value,
      creativeExpression: creativeExpression.value,
      currentAffairsIntegration: currentAffairsIntegration.value,
      innovativeTeaching: innovativeTeaching.value,
      ethicalRoleModel: ethicalRoleModel.value,
      fairnessAndHarmony: fairnessAndHarmony.value,
      complianceAndCommitment: complianceAndCommitment.value,
      adaptiveProfessional: adaptiveProfessional.value,
      professionalIntegrity: professionalIntegrity.value,
      professionalMembership: professionalMembership.value,
      sincereService: sincereService.value,
      ethicalConduct: ethicalConduct.value,
      dedicatedSupport: dedicatedSupport.value,
      teamHarmony: teamHarmony.value,
      communityLeadership: communityLeadership.value,
      democraticCompliance: democraticCompliance.value,


      additionalComments: additionalComments.value // Include additional comments in the payload
    };
    console.log("Payload:", payload);
    const response = await axios.post(`${config.api_path}/data-evaluation`, payload, {
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
      if (userYear === "ป.ตรี ปีที่ 4") {
        router.push('/home-evaluation/student-ev-tec4');
      } else if (userYear === "ป.ตรี ปีที่ 2") {
        router.push('/home-evaluation/student-ev-tec2');
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

textarea.form-control {
  width: 100%;
  resize: none;
}
</style>
