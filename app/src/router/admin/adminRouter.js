import AdminIndex from '@/views/admin/AdminIndex.vue';
import Search from '../../views/admin/Search.vue';
import config from '../../../config';
import { checkAuth } from "./authRouteFunction"

import informationAdmin from '../../components/admin/informationAdmin.vue'

import CreateContact from '../../views/cooperative/CreateContact.vue'
import ListCooperative from '../../views/cooperative/ListCooperative.vue'
import EditCooperative from '../../views/cooperative/EditCooperative.vue'

import FormCreateNews from '../../components/news/CreateNews.vue';
import ListNews from '../../components/news/ListNews.vue';
import EditNews from '../../components/news/EditNews.vue';

import CreateInternship from '../../views/Internship/CreateInternship.vue'
import Internship from '../../views/Internship/Internship.vue'
import EditInternship from '../../views/Internship/EditInternship.vue'

import CreatePracticeTeaching from '../../views/practice-teaching/CreatePracticeTeaching.vue'
import PracticeTeaching from '../../views/practice-teaching/PracticeTeaching.vue'
import EditPracticeTeaching from '../../views/practice-teaching/EditPracticeTeaching.vue'

import CreateDownload from '../../views/downloads/CreateDownload.vue'
import ListDownloads from '../../views/downloads/ListDownloads.vue'
import EditDownload from '../../views/downloads/EditDownload.vue'

import listTeachers from '../../views/admin/list-teacher/listTeachers.vue'

import Cr2 from '../../views/admin/list-student/Cr2.vue'
import DCR from '../../views/admin/list-student/DCR.vue'
import Ec2 from '../../views/admin/list-student/Ec2.vue'
import Ec4 from '../../views/admin/list-student/Ec4.vue'

import Cr2Req from '../../views/admin/list-student-request/Cr2Req.vue';
import DcrReq from '../../views/admin/list-student-request/DcrReq.vue';
import Ec2Req from '../../views/admin/list-student-request/Ec2Req.vue';
import Ec4Req from '../../views/admin/list-student-request/Ec4Req.vue';

import Ec4Approved from '../../views/admin/list-student-approved/Ec4Approved.vue'
import Ec2Approved from '../../views/admin/list-student-approved/Ec2Approved.vue'
import DcrApproved from '../../views/admin/list-student-approved/DcrApproved.vue'
import VCRApproved from '../../views/admin/list-student-approved/VCRApproved.vue'

import Cr2Active from "../../views/admin/list-student-active/Cr2Active.vue";
import DcrActive from "../../views/admin/list-student-active/DcrActive.vue";
import Ec2Active from "../../views/admin/list-student-active/Ec2Active.vue";
import Ec4Active from "../../views/admin/list-student-active/Ec4Active.vue";

import Cr2Success from "../../views/admin/list-student-success/Cr2Success.vue";
import DcrSuccess from "../../views/admin/list-student-success/DcrSuccess.vue";
import Ec2Success from "../../views/admin/list-student-success/Ec2Success.vue";
import Ec4Success from "../../views/admin/list-student-success/Ec4Success.vue";

import Cr2NotPass from '../../views/admin/list-student-notpass/Cr2NotPass.vue'
import DcrNotPass from '../../views/admin/list-student-notpass/DcrNotPass.vue'
import Ec2NotPass from '../../views/admin/list-student-notpass/Ec2NotPass.vue'
import Ec4NotPass from '../../views/admin/list-student-notpass/Ec4NotPass.vue'

import DataTEC4 from '../../views/evaluation/data-evaluation/DataTEC4.vue'
import DataTEC2 from '../../views/evaluation/data-evaluation/DataTEC2.vue'

const routeAdmin = [
  {
    path: '/admin-index',
    name: 'admin-index',
    component: AdminIndex,
    beforeEnter: checkAuth,
    children: [
      {
        path: 'information-admin',
        name: 'information-admin',
        component: informationAdmin
      },
      {
        path: 'data-tec2-admin/:id',
        name: 'data-tec2-admin/:id',
        component: DataTEC2
      },
      {
        path: 'data-tec4-admin/:id',
        name: 'data-tec4-admin/:id',
        component: DataTEC4
      },
      {
        path: 'edit-cooperative/:id',
        name: 'edit-cooperative',
        component: EditCooperative
      },
      {
        path: 'cooperative-education',
        name: 'cooperative-education',
        component: ListCooperative
      },
      {
        path: 'create-contact',
        name: 'create-contact',
        component: CreateContact
      },
      {
        path: 'edit-download/:id',
        name: 'edit-download',
        component: EditDownload
      },
      {
        path: 'list-download',
        name: 'list-download',
        component: ListDownloads
      },
      {
        path: 'create-download',
        name: 'create-download',
        component: CreateDownload
      },
      {
        path: 'edit-practice/:id',
        name: 'edit-practice',
        component: EditPracticeTeaching
      },
      {
        path: 'practice',
        name: 'practice',
        component: PracticeTeaching
      },
      {
        path: 'create-practice',
        name: 'create-practice',
        component: CreatePracticeTeaching
      },
      {
        path: 'edit-internship/:id',
        name: 'edit-internship',
        component: EditInternship
      }
      ,
      {
        path: 'internship-admin',
        name: 'internship-admin',
        component: Internship
      }
      ,
      {
        path: 'create-es',
        name: 'create-es',
        component: CreateInternship
      },
      {
        path: 'list-teachers',
        name: 'list-teachers',
        component: listTeachers
      },
      {
        path: 'list-cr2',
        name: 'list-cr2',
        component: Cr2,
      },
      {
        path: 'list-dcr',
        name: 'list-dcr',
        component: DCR,
      },
      {
        path: 'list-ec2',
        name: 'list-ec2',
        component: Ec2
      },
      {
        path: 'list-ec4',
        name: 'list-ec4',
        component: Ec4,
      },
      {
        path: 'cr2-req',
        name: 'cr2-req',
        component: Cr2Req
      },
      {
        path: 'dcr-req',
        name: 'dcr-req',
        component: DcrReq
      },
      {
        path: 'vcr2-approved',
        name: 'vcr2-approved',
        component: VCRApproved
      },
      {
        path: 'dcr-approved',
        name: 'dcr-approved',
        component: DcrApproved
      },
      {
        path: 'ec2-approved',
        name: 'ec2-approved',
        component: Ec2Approved
      },
      {
        path: 'ec4-approved',
        name: 'ec4-approved',
        component: Ec4Approved
      },
      {
        path: 'cr2-active',
        name: 'cr2-active',
        component: Cr2Active
      },
      {
        path: 'dcr-active',
        name: 'dcr-active',
        component: DcrActive
      },
      {
        path: 'cr2-success',
        name: 'cr2-success',
        component: Cr2Success
      },
      {
        path: 'dcr-success',
        name: 'dcr-success',
        component: DcrSuccess
      },
      {
        path: 'Ec2-req',
        name: 'Ec2-req',
        component: Ec2Req
      },
      {
        path: 'Ec2-active',
        name: 'Ec2-active',
        component: Ec2Active
      },
      {
        path: 'Ec2-success',
        name: 'Ec2-success',
        component: Ec2Success
      },
      {
        path: 'Ec4-req',
        name: 'Ec4-req',
        component: Ec4Req
      },
      {
        path: 'Ec4-active',
        name: 'Ec4-active',
        component: Ec4Active
      },
      {
        path: 'Ec4-success',
        name: 'Ec4-success',
        component: Ec4Success
      },
      {
        path: 'search',
        name: 'search',
        component: Search
      },
      {
        path: 'create-news',
        name: 'create-news',
        component: FormCreateNews
      },
      {
        path: 'list-news',
        name: 'list-news',
        component: ListNews
      },
      {
        path: 'edit-news/:id',
        name: 'edit-news',
        component: EditNews
      },
      {
        path: 'cr2-notpass',
        name: 'cr2-notpass',
        component: Cr2NotPass
      },
      {
        path: 'dcr-notpass',
        name: 'dcr-notpass',
        component: DcrNotPass
      },
      {
        path: 'Ec2-notpass',
        name: 'Ec2-notpass',
        component: Ec2NotPass
      },
      {
        path: 'Ec4-notpass',
        name: 'Ec4-notpass',
        component: Ec4NotPass
      },
    ]
  }
]

export default routeAdmin;