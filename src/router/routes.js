const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: () => {
          const userRole = localStorage.getItem('userRole') || 'guest'
          const firstAccessible = menuMiddleware.find((item) => item.roles.includes(userRole))
          return firstAccessible ? firstAccessible.link : '/login'
        },
      },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue') },
      { path: 'professionals', component: () => import('pages/ProfessionalsPage.vue') },
      { path: 'patients', component: () => import('pages/PatientsPage.vue') },
      { path: 'resources', component: () => import('pages/ResourcesPage.vue') },
      { path: 'reports', component: () => import('pages/ReportsPage.vue') },
      { path: 'agenda', component: () => import('pages/AgendaPage.vue') },
      { path: 'patient-records', component: () => import('src/pages/PatientRecordsPage.vue') },
      { path: 'scheduling', component: () => import('pages/SchedulingPage.vue') },
      { path: 'prescriptions', component: () => import('pages/PrescriptionsPage.vue') },
      { path: 'my-plan', component: () => import('pages/PlanPage.vue') },
      { path: 'contact-us', component: () => import('pages/ContactPage.vue') },
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

import menuMiddleware from 'src/middleware/MenuMiddleware'