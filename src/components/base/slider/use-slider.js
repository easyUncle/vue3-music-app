import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { onMounted, ref, onUnmounted, onDeactivated, onActivated } from 'vue';

BScroll.use(Slide);

export function useSlideInit(rootRef) {
  let slider = ref(null);
  let currentPageIdx = ref(0);
  onMounted(() => {
    console.log(rootRef.value);
    const slideInstance = (slider.value = new BScroll(rootRef.value, {
      scrollX: true,
      scrollY: false,
      click: true,
      slide: true,
      momentum: false,
      bounce: false,
      probeType: 0
    }));
    slideInstance.on('slideWillChange', page => {
      currentPageIdx.value = page.pageX;
    });
  });
  onUnmounted(() => {
    slider.value.destroy();
  });
  onActivated(() => {
    slider.value.enable();
    slider.value.refresh();
  });

  onDeactivated(() => {
    slider.value.disable();
  });
  return {
    slider,
    currentPageIdx
  };
}

export function handler() {}
