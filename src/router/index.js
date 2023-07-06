import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/proprieties',
          name: 'admin-proprieties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/new',
          name: 'new-propriety',
          component: () => import('../views/admin/NewProprietyView.vue')
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-propriety',
          component: () => import('../views/admin/EditProprietyView.vue')
        }
      ]
    }
  ]
})

export default router
