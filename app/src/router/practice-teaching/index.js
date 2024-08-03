import ListPracticeTeaching from '../../views/practice-teaching/ListPracticeTeaching.vue'
import DataPracticeTeaching from '../../views/practice-teaching/DataPracticeTeaching.vue'


const routePracticeTeaching = [
  {
    path: '/list-practice',
    name: 'list-practice',
    component:ListPracticeTeaching
  },
  {
    path:'/data-practice/:id',
    name:'/data-practice',
    component:DataPracticeTeaching
  },
]

export default routePracticeTeaching;