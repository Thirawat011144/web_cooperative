import { createRouter, createWebHistory } from 'vue-router';

import routeHome from './HomeRouter'
import routeAuth from './authRouter'
import routeAdmin from './admin/adminRouter';
import routeUser from './user/userRouter';
import routeEditAdmin from './admin/EditAdminRouter'
import routeNews from './newsRouter'
import routeTeacher from './teacher/TeacherRouter'
import routeEstablishment from './Internship';
import routePracticeTeaching from './practice-teaching';
import routeDownloads from './downloads';
import routeInternshipAndTeaching from './listInternship-teaching/index';
import routeEvaluation from './evaluation';

const routes = [
  ...routeHome,
  ...routeAuth,
  ...routeAdmin,
  ...routeUser,
  ...routeEditAdmin,
  ...routeNews,
  ...routeTeacher,
  ...routeEstablishment,
  ...routePracticeTeaching,
  ...routeDownloads,
  ...routeInternshipAndTeaching,
  ...routeEvaluation
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, scrollBehavior(to, from, savedPosition) {
    return { top: 130 };  // เลื่อนไปยังตำแหน่งบนสุดเสมอเมื่อมีการเปลี่ยนเส้นทาง
  }
});

export default router;