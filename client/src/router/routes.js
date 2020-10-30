
const routes = [
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/contratos',
        component: () => import('pages/ListContratos.vue')
      },
      {
        path: '/ver_contrato/:id',
        component: () => import('pages/VerContrato.vue')
      }
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
