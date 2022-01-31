import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import store from '../store'
import moment from "moment"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: () => import('../views/front/CategoryMain')
      },
      {
        path: 'complete-register',
        name: 'CompleteRegister',
        component: () => import('../views/auth/RegisterComplete')
      },
      {
        path: 'mail/activate/:id-:token',
        name: 'ActivateEmail',
        component: () => import('../views/auth/ActivateEmail')
      },
      {
        path: 'register',
        name: 'Register',
        component:() => import('../views/auth/Register')
      },
      {
        path: 'product/:id',
        name: 'ProductPage',
        component: () => import('../views/front/ProductPage')
      },
      {
        path: 'profile',
        name: 'Profile',
        meta: {
          requiresAuth: true,
          roleUsers: [0,1]
        },
        component: () => import('../views/front/ProfilePage')
      },
      {
        path: 'admin',
        name: 'AdminPage',
        meta: {
          requiresAuth: true,
          roleUsers: [1]
        },
        component: () => import('../layout/AdminLayout'),
        children: [
          {
            path: '',
            name: 'AdminMain',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/AdminMainPage'),
          },
          {
            path: 'users',
            name: 'UsersAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/AdminUsersPage'),
          },
          {
            path: 'category',
            name: 'CategoryAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/category/AdminCategoryPage'),
          },
          {
            path: 'category/add',
            name: 'CategoryAddAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/category/AdminCategoryNewPage'),
          },
          {
            path: 'category/edit/:id',
            name: 'CategoryEditAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/category/AdminCategoryEditPage'),
          },
          {
            path: 'product',
            name: 'ProductAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/product/AdminProductPage')
          },
          {
            path: 'product/add',
            name: 'ProductAddAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/product/AdminProductNewPage')
          },
          {
            path: 'product/edit/:id',
            name: 'ProductEditAdminPage',
            meta: {
              requiresAuth: true,
              roleUsers: [1]
            },
            component: () => import('../views/admin/product/AdminProductEditPage')
          }
      ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // eslint-disable-next-line no-unused-vars
  scrollBehavior (to, from, savedPosition) {
    return {
      el: '#app',
      top: 0
    }
  },
  routes
})



router.beforeEach((to, from, next) => {

  //const rec = to.matched.some(from.meta.roleUsers);
  const rec = to.meta.roleUsers
  //console.log(to.meta.roleUsers.indexOf(store.getters.roleUsers))

  // Короче тут проверяем что живой токен у пользователя :)
  require('moment-timezone');
  // Проверяем мы по той TimeZone которую установили на сервере.
  const Moscow = moment.tz(moment.now(),'Europe/Moscow')

  if(store.getters.tokenTime) {
    // Сравниваем 2 даты если текущая дата больше или ровна дате которая ровна дате жизни токена, то выполняем выход из системы.
    if(Moscow.format('YYYY-MM-DD HH:mm:ss') >= store.getters.tokenTime) {
      localStorage.clear()
      store.commit('isAuthenticated',false)
      store.commit('bearer',null)
      store.commit('tokenTime',null)
      store.commit('me',[])
      store.commit('role',"")
      next('/')
    }
  }
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!store.getters.isAuthenticated) {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }

  if(to.matched.some(record => record.meta.roleUsers)) {
    if(rec.includes(store.getters.roleUsers)) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
