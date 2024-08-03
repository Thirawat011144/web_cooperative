import ListInternship from '../../views/Internship/ListInternship.vue'
import DataInternship from '../../views/Internship/DataInternship.vue'

const routeEstablishment= [
    {
        path: '/internship',
        name: 'internship',
        component: ListInternship
    },
    {
        path:'/data-internship/:id',
        name:'data-internship',
        component:DataInternship
    }
]

export default routeEstablishment