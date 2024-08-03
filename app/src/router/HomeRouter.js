import HomeView from '../views/HomeView.vue';
import Cooperative from '../views/cooperative/Cooperative.vue'
// import ListPracticeTeaching from '../views/practice-teaching/ListPracticeTeaching.vue'
// import TeacherIndex from '@/views/teacher/index.vue'
const routeHome = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path:'/cooperative',
    name:'cooperative',
    component:Cooperative
  }
]

export default routeHome