import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/logs',
      name: 'Logs',
      component: () => import('../views/LogsView.vue'),
      children: [
        {
          path: ':id',
          name: 'Driver Logs',
          component: () => import('../views/DriverLogsView.vue')
        }
      ]
    }
  ]
})

export default router
