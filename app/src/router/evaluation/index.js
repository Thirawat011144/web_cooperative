import { checkAuth } from './authRouteFunction'

import HomeEvaluation from '../../views/evaluation/HomeEvaluation.vue'
import InformationEvaluation from '../../views/evaluation/InformationEvaluation.vue'

import ListStudentTEC4 from '../../views/evaluation/list-student/ListStudentTEC4.vue'
import ListStudentTEC2 from '@/views/evaluation/list-student/ListStudentTEC2.vue'
import ListStudentUVCR from '../../views/evaluation/list-student/ListStudentUVCR.vue'
import ListStudentVCR2 from '@/views/evaluation/list-student/ListStudentVCR2.vue'

import ListEvaluationOneTEC4 from '../../views/evaluation/list-student-evaluation-tec4/ListEvaluationOne.vue'
import ListEvaluationOneTEC2 from '../../views/evaluation/list-student-evaluation-tec2/ListEvaluationOneTEC2.vue'
import ListEvaluationOneUVCR from '../../views/evaluation/list-student-evaluation-uvcr/ListEvaluationOneUVCR.vue'
import ListEvaluationOneVCR from '../../views/evaluation/list-student-evaluation-vcr/ListEvaluationOneVCR.vue'

import ListEvaluationTwoTEC4 from '../../views/evaluation/list-student-evaluation-tec4/ListEvaluationTwo.vue'
import ListEvaluationTwoTEC2 from '../../views/evaluation/list-student-evaluation-tec2/ListEvaluationTwoTEC2.vue'
import ListEvaluationTwoUVCR from '../../views/evaluation/list-student-evaluation-uvcr/ListEvaluationTwoUVCR.vue'
import ListEvaluationTwoVCR from '../../views/evaluation/list-student-evaluation-vcr/ListEvaluationTwoVCR.vue'

import ListEvaluationThreeTEC4 from '../../views/evaluation/list-student-evaluation-tec4/ListEvaluationThree.vue'
import ListEvaluationThreeTEC2 from '../../views/evaluation/list-student-evaluation-tec2/ListEvaluationThreeTEC2.vue'
import ListEvaluationThreeUVCR from '../../views/evaluation/list-student-evaluation-uvcr/ListEvaluationThreeUVCR.vue'
import ListEvaluationThreeVCR from '../../views/evaluation/list-student-evaluation-vcr/ListEvaluationThreeVCR.vue'

import EvaluationOneTEC4 from '../../views/evaluation/evaluation-tec4/EvaluationOne.vue'
import EvaluationOneTEC2 from '../../views/evaluation/evaluation-tec2/EvaluationOneTEC2.vue'
import EvaluationOneVCR from '../../views/evaluation/evaluation-vcr/EvaluationOneVCR.vue'

import EvaluationTwoTEC4 from '../../views/evaluation/evaluation-tec4/EvaluationTwo.vue'
import EvaluationTwoTEC2 from '../../views/evaluation/evaluation-tec2/EvaluationTwoTEC2.vue'

import EvaluationThreeTEC4 from '../../views/evaluation/evaluation-tec4/EvaluationThree.vue'
import EvaluationThreeTEC2 from '../../views/evaluation/evaluation-tec2/EvaluationThreeTEC2.vue'

import EvaluationOneForMentor from '../../views/evaluation/evaluation-vcr/EvaluationOneForMentor.vue'
// import DataTEC4 from '../../views/evaluation/data-evaluation/DataTEC4.vue'

const routeEvaluation = [
    {
        path: '/home-evaluation',
        name: 'home-evaluation',
        component: HomeEvaluation,
        beforeEnter: checkAuth,
        children: [

            // {
            //     path: 'data-tec4/:id',
            //     name: 'data-tec4/:id',
            //     component: DataTEC4,
            // },
            {
                path: 'evaluation',
                name: 'evaluation',
                component: InformationEvaluation,
            },
            //----------------------------------------------------------------------------
            {
                path:'evaluation-one-mentor/:id',
                name:'evaluation-one-mentor',
                component:EvaluationOneForMentor
            },
            //-----------------------------------------------------------------------------
            {
                path: 'evaluation-three/:id',
                name: 'evaluation-three/:id',
                component: EvaluationThreeTEC4,
            },
            {
                path: 'evaluation-three-tec2/:id',
                name: 'evaluation-three-tec2/:id',
                component: EvaluationThreeTEC2,
            },
            //-----------------------------------------------------------------------------
            {
                path: 'evaluation-two/:id',
                name: 'evaluation-two/:id',
                component: EvaluationTwoTEC4,
            },
            {
                path: 'evaluation-two-tec2/:id',
                name: 'evaluation-two-tec2/:id',
                component: EvaluationTwoTEC2,
            },

            //------------------------------------------------------------------------------
            {
                path:'evaluation-one/:id',
                name:'evaluation-one',
                component:EvaluationOneTEC4
            }
            ,
            {
                path: 'evaluation-one-tec2/:id',
                name: 'evaluation-one-tec2/:id',
                component: EvaluationOneTEC2
            }
            ,
            {
                path: 'evaluation-one-vcr/:id',
                name: 'evaluation-one-vcr/:id',
                component: EvaluationOneVCR
            }
            ,
            //-------------------------------------------------------------------------------
            {
                path: 'list-evaluation-three',
                name: 'list-evaluation-three',
                component: ListEvaluationThreeTEC4,
            },
            {
                path: 'list-evaluation-three-tec2',
                name: 'list-evaluation-three-tec2',
                component: ListEvaluationThreeTEC2,
            },
            {
                path: 'list-evaluation-three-uvcr',
                name: 'list-evaluation-three-uvcr',
                component: ListEvaluationThreeUVCR,
            },
            {
                path: 'list-evaluation-three-vcr',
                name: 'list-evaluation-three-vcr',
                component: ListEvaluationThreeVCR,
            },
            //-------------------------------------------------------------------------------
            {
                path: 'list-evaluation-two',
                name: 'list-evaluation-two',
                component: ListEvaluationTwoTEC4,
            },
            {
                path: 'list-evaluation-two-tec2',
                name: 'list-evaluation-two-tec2',
                component: ListEvaluationTwoTEC2,
            },
            {
                path: 'list-evaluation-two-uvcr',
                name: 'list-evaluation-two-uvcr',
                component: ListEvaluationTwoUVCR,
            },
            {
                path: 'list-evaluation-two-vcr',
                name: 'list-evaluation-two-vcr',
                component: ListEvaluationTwoVCR,
            },

            // ------------------------------------------------------------------------------
            {
                path: 'list-evaluation-one',
                name: 'list-evaluation-one',
                component: ListEvaluationOneTEC4
            }
            ,
            {
                path: 'list-evaluation-one-tec2',
                name: 'list-evaluation-one-tec2',
                component: ListEvaluationOneTEC2
            }
            ,
            {
                path: 'list-evaluation-one-uvcr',
                name: 'list-evaluation-one-uvcr',
                component: ListEvaluationOneUVCR
            }
            ,
            {
                path: 'list-evaluation-one-vcr',
                name: 'list-evaluation-one-vcr',
                component: ListEvaluationOneVCR
            }
            ,
            // ----------------------------------------------------------------------------------

            {
                path: 'student-ev-tec4',
                name: 'student-ev-tec4',
                component: ListStudentTEC4
            },
            {
                path: 'student-ev-tec2',
                name: 'student-ev-tec2',
                component: ListStudentTEC2
            },
            {
                path: 'student-ev-uvcr',
                name: 'student-ev-uvcr',
                component: ListStudentUVCR
            },
            {
                path: 'student-ev-vcr2',
                name: 'student-ev-vcr2',
                component: ListStudentVCR2
            },
        ]
    },
]

export default routeEvaluation