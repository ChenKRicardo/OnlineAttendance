import { createRouter, createWebHistory } from "vue-router";
import _ from 'lodash'
import routes from './routes';
import { useUserStore } from '@/store/user';
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (to.meta.auth) {
    if (token) {
      userStore.getUserInfos()
      next()
    } else {
      next('/login')
    }
  } else {
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }
  }

})
export default router