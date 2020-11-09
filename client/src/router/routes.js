
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
        path: '/dashboard_admin',
        component: () => import('pages/dashboardAdmin.vue')
      },
      {
        path: '/ver_contrato/:id',
        component: () => import('pages/VerContrato.vue')
      },
      {
        path: '/ver_contrato_admin/:id',
        component: () => import('pages/VerContratoAdmin.vue')
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
    path: '/prueba',
    component: () => import('pages/Prueba.vue')
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
