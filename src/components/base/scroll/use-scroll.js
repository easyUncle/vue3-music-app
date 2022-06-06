import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import { onMounted, onUnmounted, ref } from 'vue';
BScroll.use(ObserveDOM);
export function initScroll(rootRef, options) {
  let scroll = ref(null);
  onMounted(() => {
    scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,
      ...options
    });
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });
  return {
    scroll
  };
}
