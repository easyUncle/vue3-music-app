import { createRouter, createWebHashHistory } from 'vue-router';
const Recommend = () =>
  import('@/views/recommend' /* webpackChunkName: "recommend" */);
const Singer = () => import('@/views/singer' /* webpackChunkName: "singer" */);
const TopList = () =>
  import('@/views/top-list' /* webpackChunkName: "top-list" */);
const Search = () => import('@/views/search' /* webpackChunkName: "search" */);
const User = () => import('@/views/user' /* webpackChunkName: "user" */);
const SingerDetail = () =>
  import('@/views/singer-detail' /* webpackChunkName: "singer-detail" */);
const AlbumDetail = () =>
  import('@/views/album-detail' /* webpackChunkName: "album-detail" */);
const TopDetail = () =>
  import('@/views/top-detail' /* webpackChunkName: "top-detail" */);
const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: AlbumDetail
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    components: {
      user: User
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
