import BScroll from '@better-scroll/core';
import Pullup from '@better-scroll/pull-up';
import ObserveDOM from '@better-scroll/observe-dom';
import { onMounted, onUnmounted, ref, onActivated, onDeactivated } from 'vue';

BScroll.use(Pullup);
BScroll.use(ObserveDOM);

export default function usePullUp(fetch, preventPullUpLoad) {
  const scroll = ref(null);
  const scrollRef = ref(null);
  const isPullUpLoad = ref(false);
  onMounted(() => {
    const scrollValue = (scroll.value = new BScroll(scrollRef.value, {
      pullUpLoad: true,
      observeDOM: true
    }));

    scrollValue.on('pullingUp', pullingUpHandler);

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollValue.finishPullUp();
        return;
      }
      isPullUpLoad.value = true;

      await fetch();

      scrollValue.finishPullUp();
      scrollValue.refresh();
      isPullUpLoad.value = false;
    }
  });

  onUnmounted(() => {
    scroll.value.destroy();
  });
  onActivated(() => {
    scroll.value.enable();
    scroll.value.refresh();
  });

  onDeactivated(() => {
    scroll.value.disable();
  });
  return {
    scrollRef,
    scroll,
    isPullUpLoad
  };
}
