import Loading from './loading.vue';
import { createLoadingDirective } from '@/assets/js/create-loading-like-directive';
const loadingDirective = createLoadingDirective(Loading);
export default loadingDirective;
