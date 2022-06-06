import { createRouter, createWebHistory } from 'vue-router';
const Recommend = () =>
  import('@/views/recommend' /* webpackChunkName: "recommend" */);
const Singer = () => import('@/views/singer' /* webpackChunkName: "singer" */);
const TopList = () =>
  import('@/views/top-list' /* webpackChunkName: "top-list" */);
const Search = () => import('@/views/search' /* webpackChunkName: "search" */);
const User = () => import('@/views/user' /* webpackChunkName: "user" */);
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/top-list',
    component: TopList
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/user',
    component: User
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
