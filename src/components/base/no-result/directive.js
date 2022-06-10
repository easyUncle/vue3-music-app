import { createLoadingDirective } from '@/assets/js/create-loading-like-directive';
import NoResult from './no-result.vue';

const NoResultDirective = createLoadingDirective(NoResult);

export default NoResultDirective;
