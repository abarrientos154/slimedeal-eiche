
const routes = [
  {
    path: '/menu',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/ListContratos.vue')
      },
      {
        path: '/ver_contrato/:id',
        component: () => import('pages/VerContrato.vue')
      },
      {
        path: '/contratos_vigentes',
        component: () => import('pages/ContratosVigentes.vue')
      },
      {
        path: '/contratos_pendientes',
        component: () => import('pages/ContratosPendientes.vue')
      },
      {
        path: '/historial_contratos',
        component: () => import('pages/HistorialContratos.vue')
      },
      {
        path: '/contratos',
        component: () => import('pages/Contratos.vue')
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
