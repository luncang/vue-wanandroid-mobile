import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import { getUser } from '../plugins/localStorage'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

//开启导航守卫
router.beforeEach((to, from, next) => {
  console.log(`needlogin:${to.meta.needLogin}`)

//需要登录的页面，如果未登录，则跳转到登录页面
  if (to.meta.needLogin && !getUser()) {
    next('/login')
    return
  }

  next()


})

export default router
