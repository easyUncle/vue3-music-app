<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item, index) in items"
      :key="index"
      :class="{ activeSwitch: modelValue == index }"
      @click="switchitem(index)"
    >
      {{ item }}
    </li>
    <div class="active-bar" :style="barStyle"></div>
  </ul>
</template>

<script>
export default {
  name: 'switches',
  props: {
    items: {
      type: Array,
      default: () => {
        return [];
      }
    },
    modelValue: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      //   currentIndex: 0
    };
  },
  computed: {
    barStyle() {
      const x = 120 * this.modelValue;
      return {
        transform: `translate3d(${x}px,0,0)`,
        transition: 'all 0.3s'
      };
    }
  },
  methods: {
    switchitem(index) {
      this.$emit('update:modelValue', index);
    }
  }
};
</script>

<style lang="scss" scoped>
.switches {
  width: 240px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid $color-highlight-background;
  border-radius: 5px;
  position: relative;

  .switch-item {
    width: 120px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: $color-text-d;
  }

  .activeSwitch {
    color: $color-text;
  }

  .active-bar {
    background: $color-highlight-background;
    height: 30px;
    width: 120px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -10;
  }
}
</style>
