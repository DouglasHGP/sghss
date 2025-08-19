const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home/dashboard' },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'profissionais', component: () => import('pages/ProfessionalsPage.vue') },
      { path: 'pacientes', component: () => import('pages/PatientsPage.vue') },
      { path: 'recursos', component: () => import('pages/ResourcesPage.vue') },
      { path: 'relatorios', component: () => import('pages/ReportsPage.vue') },
      { path: 'agenda', component: () => import('pages/AgendaPage.vue') },
      { path: 'prontuarios', component: () => import('pages/PacientRecordsPage.vue') },
      { path: 'prescricoes', component: () => import('pages/PrescriptionsPage.vue') },
      {
        path: 'agendamento-presencial',
        component: () => import('pages/InPersonSchedulingPage.vue'),
      },
      { path: 'agendamento-online', component: () => import('pages/OnlineSchedulingPage.vue') },
      { path: 'plano', component: () => import('pages/PlanPage.vue') },
      { path: 'fale-conosco', component: () => import('pages/ContactPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
