
const routes = [
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [

    ]
  },
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
    ]
  },
  {
    path: '/register',
    component: () => import('pages/Registro.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
