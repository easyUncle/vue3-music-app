import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//引入全局样式
import '@/assets/scss/index.scss';
import LazyPlugin from 'vue3-lazy';
import loadingDirective from '@/components/base/loading/directive';

createApp(App)
  .use(store)
  .use(router)
  .use(LazyPlugin, {
    loading: require('@/assets/images/music.png')
  })
  .directive('loading', loadingDirective)
  .mount('#app');
