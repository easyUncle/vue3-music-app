import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import { computed } from '@vue/reactivity';
import { nextTick, onMounted, ref, watch, onUnmounted } from 'vue';
import { useStore } from 'vuex';
BScroll.use(Slide);
export default function useMiniSlider() {
  const slide = ref(null);
  const sliderWrapperRef = ref(null);
  const store = useStore();
  const fullScreen = computed(() => store.state.fullScreen);
  const playList = computed(() => store.state.playList);
  const showSlide = computed(() => !fullScreen.value && !!playList.value);
  const currentIndex = computed(() => store.state.currentIndex);

  onMounted(() => {
    let slideVal;
    watch(showSlide, async newShowSlide => {
      await nextTick();
      if (newShowSlide) {
        if (!slideVal) {
          slideVal = slide.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true
            }
          });
          slideVal.on('slidePageChanged', page => {
            store.commit('setCurrentIndex', page.pageX);
          });
        } else {
          slideVal.refresh();
        }
        slideVal.goToPage(currentIndex.value, 0, 0);
      }
    });
    watch(currentIndex, newIndex => {
      if (slideVal && showSlide.value) {
        slideVal.goToPage(newIndex, 0, 0);
      }
    });
  });
  onUnmounted(() => {
    slide.value.destroy();
  });

  return {
    slide,
    sliderWrapperRef
  };
}
