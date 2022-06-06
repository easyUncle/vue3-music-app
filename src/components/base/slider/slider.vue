<template>
  <div class="slide-wrapper" ref="rootRef">
    <div class="slide-content">
      <div
        class="slide-content-item"
        v-for="slider in sliders"
        :key="slider.id"
        @click="handleClick()"
      >
        <img :src="slider.pic" alt="" />
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dots"
        v-for="(dot, index) in sliders"
        :key="dot.id"
        :class="{ active: index === currentPageIdx }"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useSlideInit, handler } from './use-slider';
export default {
  name: 'slider',
  props: {
    sliders: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  setup() {
    let rootRef = ref(null);
    let { currentPageIdx } = useSlideInit(rootRef);
    let handleClick = handler;
    return {
      rootRef,
      currentPageIdx,
      handleClick
    };
  }
};
</script>

<style lang="scss" scoped>
.slide-wrapper {
  min-height: 1px;
  font-size: 0;

  .slide-content {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    &-item {
      display: inline-block;
      width: 100%;

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    transform: translateX(-50%);

    .dots {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      margin-right: 10px;

      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
