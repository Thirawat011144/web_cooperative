import EditCr2 from '../../views/admin/edit-student/EditCr2.vue';
import EditEc2 from '../../views/admin/edit-student/EditEc2.vue';
import EditEc4 from '../../views/admin/edit-student/EditEc4.vue';

import {checkAuth} from "./authRouteFunction"

const routeEditAdmin = [
    {
        path: '/edit-cr2/:id',
        name: 'edit-cr2',
        component: EditCr2,
        beforeEnter: checkAuth
    },
    {
        path: '/edit-ec2/:id',
        name: 'edit-ec2',
        component: EditEc2,
        beforeEnter:checkAuth
    },
    {
        path: '/edit-ec4/:id',
        name: 'edit-ec4',
        component: EditEc4,
        beforeEnter:checkAuth
    },
]

export default routeEditAdmin;