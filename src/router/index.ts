import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(),
  routes: [

    {
      path: '/',
      name: 'index',
      redirect: 'deving',
      component: () => import('../views/deving/index.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home.vue'),
          meta: {
            title: '首页',
            showBack: true
          }
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/search/index.vue'),
          meta: {
            title: '发现',
            showBack: true
          }
        },
        {
          path: '/collection',
          name: 'collection',
          component: () => import('../views/collection/index.vue'),
          meta: {
            title: '收藏',
            showBack: true
          }
        },
        {
          path: '/personal',
          name: 'personal',
          component: () => import('../views/personal/index.vue'),
          meta: {
            title: '我的',
            showBack: true
          }
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: () => import('../views/details/index.vue'),
          meta: {
            title: '详情',

          }
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../views/order/index.vue'),
          meta: {
            title: '订单页',

          }
        },
        {
          path: '/address',
          name: 'address',
          component: () => import('../views/order/address.vue'),
          meta: {
            title: '选择地址',

          }
        },
        {
          path: '/deving',
          name: 'deving',
          component: () => import('../views/deving/index.vue'),
          meta: {
            title: '称重',

          }
        }
      ]
    }
    ,
    {
      name: "login",
      path: '/login',
      component: () => import('../views/login/index.vue'),
    }

  ]
})

export default router
