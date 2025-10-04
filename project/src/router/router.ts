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
      name: 'detaials',
      path: '/about/:id',
      component: () => import('@/views/MovieDetailsView.vue'),
    },
    {
      name: 'account',
      path: '/account',
      component: () => import('@/views/AccountView.vue'),
      redirect: '/account/favorites',
      children: [
        {
          name: 'favorites',
          path: 'favorites',
          component: () => import('@/components/FavoritesMoviesList.vue'),
        },
        {
          name: 'setting',
          path: 'setting',
          component: () => import('@/components/SettingAccount.vue'),
        },
      ],
    },
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
});

export default router;
