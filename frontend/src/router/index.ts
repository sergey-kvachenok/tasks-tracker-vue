import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import('@/views/Tasks.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    redirect: '/about/features',
    children: [
      {
        path: 'features',
        name: 'AboutFeatures',
        component: () => import('@/views/about/Features.vue')
      },
      {
        path: 'tech-stack',
        name: 'AboutTechStack',
        component: () => import('@/views/about/TechStack.vue')
      }
    ]
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetails',
    component: () => import('@/views/TaskDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
