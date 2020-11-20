/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false,
      needLogin: true
    },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: {
          title: '首页',
          keepAlive: true,
          needLogin: true
        }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: {
          title: '关于我',
          keepAlive: true,
          needLogin: true
        }
      },

      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/home/project'),
        meta: {
          title: '项目',
          keepAlive: true,
          needLogin: true
        }
      },

    ]
  }, {
    path: '/login',
    component: () => import('@/views/login/login'),
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: false,
      needLogin: false
    }
  }
  , {
    path: '/register',
    component: () => import('@/views/login/register'),
    name: 'Register',
    meta: {
      title: '注册',
      keepAlive: false,
      needLogin: false
    }
  }
]
