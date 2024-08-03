import UserIndex from '@/views/user/UserIndex.vue';
import { checkAuth } from './authRouterFunction';
import formTraining from '../../components/user/formTraining.vue'
import DataStudent from '../../views/user/DataStudent.vue'
import HomeViewUser from '../../views/user/HomeViewUser.vue'

import DownloadUser from '../../components/user/home/Navbar/DownloadUser.vue'

import FormTeaching from '../../components/user/FormTeaching.vue'
const routeUser = [
  {
    path: '/user-index',
    name: 'user-index',
    component: UserIndex,
    beforeEnter: checkAuth,
    children: [
      {
        path: 'form',
        name: 'form',
        component: formTraining
      },
      {
        path: 'data-student',
        name: 'data-student',
        component: DataStudent
      }
      ,
      {
        path: 'form-teaching',
        name: 'form-teaching',
        component: FormTeaching
      }
    ]
  },
  {
    path: '/homeview',
    name: 'homeview',
    component: HomeViewUser,
    beforeEnter: checkAuth,
  }
  ,
  {
    path: '/download-user',
    name: '/download-user',
    component: DownloadUser,
    // beforeEnter: checkAuth,
  }
]

export default routeUser;