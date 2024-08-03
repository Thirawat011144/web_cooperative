import { checkAuth } from './authRouterFunction'

import TeacherIndex from '../../views/teacher/index.vue'
import information from '../../components/teacher/information.vue'
import SearchTeacher from '../../views/teacher/SearchTeacher.vue'
import Companies from '../../views/teacher/Companies.vue'
import CollegeTeacher from '../../views/teacher/College.vue'
import Dashboard from '../../views/teacher/Dashboard.vue'

import Cr2 from '../../views/teacher/list-student/Cr2.vue';
import Dcr2 from '../../views/teacher/list-student/Dcr2.vue'
import Ec2 from '../../views/teacher/list-student/Ec2.vue';
import EC4 from '../../views/teacher/list-student/EC4.vue';

import StudentVCRreq from '../../views/teacher/list-student-request/StudentVCRreq.vue'
import StudentUCRreq from '../../views/teacher/list-student-request/StudentUCRreq.vue'
import StudentTEC2req from '../../views/teacher/list-student-request/StudentTEC2req.vue'
import StudentTEC4req from '../../views/teacher/list-student-request/StudentTEC4req.vue'

import StudentTEC4approved from '../../views/teacher/list-student-approved/StudentTEC4approved.vue'
import StudentTEC2approved from '../../views/teacher/list-student-approved/StudentTEC2approved.vue'
import StudentUVCRapproved from '../../views/teacher/list-student-approved/StudentUVCRapproved.vue'
import StudentVCRapproved from '../../views/teacher/list-student-approved/StudentVCRapproved.vue'

import StudentVCR2active from '../../views/teacher/list-student-active/StudentVCR2active.vue'
import StudentUVCRactive from '../../views/teacher/list-student-active/StudentUVCRactive.vue'
import StudentTEC2active from '../../views/teacher/list-student-active/StudentTEC2active.vue'
import StudentTEC4active from '../../views/teacher/list-student-active/StudentTEC4active.vue'

import StudentVCR2success from '../../views/teacher/list-student-success/StudentVCR2success.vue'
import StudentUVCRsuccess from '../../views/teacher/list-student-success/StudentUVCRsuccess.vue'
import StudentTEC2success from '../../views/teacher/list-student-success/StudentTEC2success.vue'
import StudentTEC4success from '../../views/teacher/list-student-success/StudentTEC4success.vue'

import DataTEC2 from '../../views/evaluation/data-evaluation/DataTEC2.vue'
import DataTEC4 from '../../views/evaluation/data-evaluation/DataTEC4.vue'

import StudentVCR2notpass from '../../views/teacher/list-student-notpass/StudentVCR2NotPass.vue'
import StudentUVCRnotpass from '../../views/teacher/list-student-notpass/StudentUVCRNotPass.vue'
import StudentTEC2notpass from '../../views/teacher/list-student-notpass/StudentTEC2NotPass.vue'
import StudentTEC4notpass from '../../views/teacher/list-student-notpass/StudentTEC4NotPass.vue'


const routeTeacher = [
    {
        path: '/teacher-index',
        name: 'teacher-home',
        component: TeacherIndex,
        beforeEnter: checkAuth,
        children: [
            {
                path: 'data-tec2/:id',
                name: 'data-tec2/:id',
                component: DataTEC2
            },
            {
                path: 'data-tec4/:id',
                name: 'data-tec4/:id',
                component: DataTEC4
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'college-teacher',
                name: 'college-teacher',
                component: CollegeTeacher
            },
            {
                path: 'companies',
                name: 'companies',
                component: Companies
            },
            {
                path: 'search-teacher',
                name: 'search-teacher',
                component: SearchTeacher
            }
            ,
            {
                path: 'information',
                name: 'information',
                component: information
            },
            {
                path: 'list-cr2',
                name: 'list-list-cr2',
                component: Cr2
            },
            {
                path: 'list-dcr2',
                name: 'list-list-dcr2',
                component: Dcr2
            },
            {
                path: 'list-ec2',
                name: 'list-listec2',
                component: Ec2
            },
            {
                path: 'list-ec4',
                name: 'list-listec4',
                component: EC4
            },
            {
                path: 'student-vcr2req',
                name: 'student-vcr2req',
                component: StudentVCRreq
            },
            {
                path: 'student-uvcr2req',
                name: 'student-uvcr2req',
                component: StudentUCRreq
            },
            {
                path: 'student-tec2req',
                name: 'student-tec2req',
                component: StudentTEC2req
            },
            {
                path: 'student-tec4req',
                name: 'student-tec4req',
                component: StudentTEC4req
            },
            {
                path: 'student-vcr-approved',
                name: 'student-vcr-approved',
                component: StudentVCRapproved
            },
            {
                path: 'student-uvcr-approved',
                name: 'student-uvcr-approved',
                component: StudentUVCRapproved
            },
            {
                path: 'student-tec2approved',
                name: 'student-tec2approved',
                component: StudentTEC2approved
            },
            {
                path: 'student-tec4approved',
                name: 'student-tec4approved',
                component: StudentTEC4approved
            },
            {
                path: 'student-vcr2active',
                name: 'student-vcr2active',
                component: StudentVCR2active
            },
            {
                path: 'student-uvcractive',
                name: 'student-uvcr2active',
                component: StudentUVCRactive
            },
            {
                path: 'student-tec2active',
                name: 'student-tec2active',
                component: StudentTEC2active
            },
            {
                path: 'student-tec4active',
                name: 'student-tec4active',
                component: StudentTEC4active
            },
            {
                path: 'student-vcr2success',
                name: 'student-vcr2success',
                component: StudentVCR2success
            },
            {
                path: 'student-uvcrsuccess',
                name: 'student-uvcrsuccess',
                component: StudentUVCRsuccess
            },
            {
                path: 'student-tec2success',
                name: 'student-tec2success',
                component: StudentTEC2success
            },
            {
                path: 'student-tec4success',
                name: 'student-tec4success',
                component: StudentTEC4success
            },
            {
                path: 'student-vcr2notpass',
                name: 'student-vcr2notpass',
                component: StudentVCR2notpass
            },
            {
                path: 'student-uvcrnotpass',
                name: 'student-uvcrnotpass',
                component: StudentUVCRnotpass
            },
            {
                path: 'student-tec2notpass',
                name: 'student-tec2notpass',
                component: StudentTEC2notpass
            },
            {
                path: 'student-tec4notpass',
                name: 'student-tec4notpass',
                component: StudentTEC4notpass
            },
        ]
    }
]

export default routeTeacher