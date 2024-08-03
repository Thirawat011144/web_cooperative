import Register from '../views/auth/Register.vue';
import LoginEvaluation from '../views/auth/LoginEvaluation.vue'
import Login from '@/views/auth/Login.vue';
import RegisterTeacher from '@/views/auth/RegisterTeacher.vue';
import RegisterEvaluation from '@/views/auth/RegisterEvaluation.vue'
import ChoiceLogin from '@/views/auth/ChoiceLogin.vue'
import LoginStudent from '@/views/auth/LoginStudent.vue'
import LoginTeacher from '@/views/auth/LoginTeacher.vue'
import FormForgotPass from '@/views/auth/FormForgotPass.vue'
import FormChangePass from '@/views/auth/FormChangePass.vue'
import FormForgotPassEvaluator from '@/views/auth/FormForgotPassEvaluator.vue'
import FormChangePassEvaluator from '@/views/auth/FormChangePassEvaluator.vue'


const routerAuth = [
  {
    path: '/reset-password-evaluator',
    name: 'reset-password-evaluator',
    component: FormChangePassEvaluator
  }
  ,
  {
    path: '/forgot-pass-evaluator',
    // name: 'login-teacher',
    component: FormForgotPassEvaluator
  }
  ,
  {
    path: '/reset-password',
    name: 'reset-password',
    component: FormChangePass
  }
  ,
  {
    path: '/forgot-pass',
    // name: 'login-teacher',
    component: FormForgotPass
  }
  ,
  {
    path: '/login-teacher',
    name: 'login-teacher',
    component: LoginTeacher
  }
  ,
  {
    path: '/login-student',
    name: 'login-student',
    component: LoginStudent
  }
  ,
  {
    path: '/login-choice',
    name: 'login-choice',
    component: ChoiceLogin
  }
  ,
  {
    path: '/login-evaluation',
    name: 'login-evaluation',
    component: LoginEvaluation
  }
  ,
  {
    path: '/register-evaluation',
    name: 'register-evaluation',
    component: RegisterEvaluation
  }
  ,
  {
    path: '/register',
    name: 'register',
    component: Register
  }
  ,
  {
    path: '/teacher-register',
    name: 'teacher-register',
    component: RegisterTeacher
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

export default routerAuth