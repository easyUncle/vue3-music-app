<template>
  <teleport to="body">
    <transition name="slide-down">
      <div class="message" v-show="visible" @click="hide">
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'message',
  props: {
    delay: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.timer = setTimeout(() => {
        this.hide();
        clearTimeout(this.timer);
      }, this.delay);
    },
    hide() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.message {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 400;
  background: $color-dialog-background;
  &.slide-down-leave-active,
  &.slide-down-enter-active {
    transition: all 0.3s;
  }
  &.slide-down-leave-to,
  &.slide-down-enter-from {
    transform: translate3d(0, -100%, 0);
  }
}
</style>
