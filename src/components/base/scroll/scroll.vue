<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue';
import { initScroll } from './use-scroll';
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    let rootRef = ref(null);
    const { scroll } = initScroll(rootRef, props, emit);
    return {
      rootRef,
      scroll
    };
  }
};
</script>

<style></style>
