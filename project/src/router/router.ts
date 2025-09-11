import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: { name: 'home' },
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      name: 'genreSlug',
      path: '/genres/:genreSlug',
      component: () => import('@/views/MoviesByGenreView.vue'),
    },
    {
      name: 'genres',
      path: '/genres',
      component: () => import('@/views/GenresView.vue'),
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
