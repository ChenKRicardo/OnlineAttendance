
import { RouteRecordRaw } from 'vue-router';
import _ from 'lodash';
const Login = () => import('@/page/Login.vue');
const Home = () => import('@/page/Home.vue');
const Sign = () => import('@/page/Sign.vue');
const Exception = () => import('@/page/Exception/Exception.vue');
const Apply = () => import('@/page/Apply/Apply.vue');
const Check = () => import('@/page/Check.vue');
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/sign',
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: 'sign',
        name: 'sign',
        component: Sign,
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true
        },
      },
      {
        path: 'exception',
        name: 'exception',
        component: Exception,
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true,
        }
      },
      {
        path: 'apply',
        name: 'apply',
        component: Apply,
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true,
        }
      },
      {
        path: 'check',
        name: 'check',
        component: Check,
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true,
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default routes