import HomeView from '../views/HomeView.vue';
import Cooperative from '../views/cooperative/Cooperative.vue'
// import ListPracticeTeaching from '../views/practice-teaching/ListPracticeTeaching.vue'
// import TeacherIndex from '@/views/teacher/index.vue'
import ChoiceLogin from '@/views/auth/ChoiceLogin.vue'

import { checkAuth } from './AuthIndex';
const routeHome = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: checkAuth
  },
  {
    path: '/cooperative',
    name: 'cooperative',
    component: Cooperative
  },
  {
    path: '/login-choice',
    name: 'login-choice',
    component: ChoiceLogin
  }
  ,
]

export default routeHome