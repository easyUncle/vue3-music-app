import BScroll from '@better-scroll/core';
import ObserveDOM from '@better-scroll/observe-dom';
import { onDeactivated, onActivated, onMounted, onUnmounted, ref } from 'vue';
BScroll.use(ObserveDOM);
export function initScroll(rootRef, options, emit) {
  let scroll = ref(null);
  onMounted(() => {
    const scrollVal = (scroll.value = new BScroll(rootRef.value, {
      observeDOM: true,
      ...options
    }));
    if (options.probeType > 0) {
      scrollVal.on('scroll', position => {
        emit('scroll', position);
      });
    }
  });
  onUnmounted(() => {
    scroll.value.destroy();
  });

  onActivated(() => {
    alert('scroll');
    scroll.value.enable();
    scroll.value.refresh();
  });
  onDeactivated(() => {
    scroll.value.disable();
  });
  return {
    scroll
  };
}
