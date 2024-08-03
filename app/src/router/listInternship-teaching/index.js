
import InternshipOrTeaching from '../../views/listInternship-teaching/InternshipOrTeaching.vue'
import ListInternshiped from '../../views/listInternship-teaching/ListInternshiped.vue'

import InternshipedCivil from '../../views/listInternship-teaching/list-branch/InternshipedCivil.vue'
import InternshipedElectrical from '../../views/listInternship-teaching/list-branch/InternshipedElectrical.vue'
import InternshipedMechanical from '../../views/listInternship-teaching/list-branch/InternshipedMechanical.vue'
import IndustrialIndustry from '../../views/listInternship-teaching/list-branch/IndustrialIndustry.vue'
import ElectronicsTelecommunications from '../../views/listInternship-teaching/list-branch/ElectronicsTelecommunications.vue'
import Computer from '../../views/listInternship-teaching/list-branch/Computer.vue'
import Welder from '../../views/listInternship-teaching/list-branch/Welder.vue'
import Teachinged from '../../views/listInternship-teaching/Teachinged.vue'


const routeInternshipAndTeaching = [
    {
        path: '/welder',
        name: 'welder',
        component: Welder
    },
    {
        path: '/computer',
        name: 'computer',
        component: Computer
    },
    {
        path: '/electronics-telecommunications',
        name: 'electronics-telecommunications',
        component: ElectronicsTelecommunications
    },
    {
        path: '/industrial-industry',
        name: 'industrial-industry',
        component: IndustrialIndustry
    },
    {
        path: '/internship-teaching',
        name: 'internship-teaching',
        component: InternshipOrTeaching
    },
    {
        path: '/internshiped',
        name: 'internshiped',
        component: ListInternshiped
    }
    ,
    {
        path: '/internshiped-civil',
        name: 'internshiped-civil',
        component: InternshipedCivil
    }
    ,
    {
        path: '/internshiped-electrical',
        name: 'internshiped-electrical',
        component: InternshipedElectrical
    }
    ,
    {
        path: '/internshiped-mechanical',
        name: 'internshiped-mechanical',
        component: InternshipedMechanical
    }
    ,
    {
        path: '/teachinged-list',
        name: 'teachinged-list',
        component: Teachinged
    }
]

export default routeInternshipAndTeaching