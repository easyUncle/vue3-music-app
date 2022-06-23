<template>
  <div class="progress-bar" @click="onProgressClick">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        :style="progressBtnStyle"
        @touchstart.prevent="onTouchstart"
        @touchmove.prevent="onTouchmove"
        @touchend.prevent="onTouchend"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const PROGRESS_BTN_WIDTH = 16;
export default {
  props: {
    progress: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      offset: 0
    };
  },
  computed: {
    progressStyle() {
      const width = this.offset + 'px';
      return {
        width
      };
    },
    progressBtnStyle() {
      let transform = `translate3d(${this.offset}px,0,0)`;
      return {
        transform
      };
    }
  },
  watch: {
    progress(newProgress) {
      const barWidth = this.$el.clientWidth - PROGRESS_BTN_WIDTH;
      this.offset = barWidth * newProgress;
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    onTouchstart(e) {
      this.touch.beginWidth = this.$refs.progress.clientWidth;
      this.touch.x1 = e.touches[0].pageX;
    },
    onTouchmove(e) {
      const x2 = e.touches[0].pageX;
      const detal = x2 - this.touch.x1;
      const barWidth = this.$el.clientWidth - PROGRESS_BTN_WIDTH;
      const progress = Math.min(
        1,
        Math.max((this.touch.beginWidth + detal) / barWidth, 0)
      );
      this.offset = barWidth * progress;
      this.$emit('progress-changing', progress);
    },
    onTouchend() {
      const barWidth = this.$el.clientWidth - PROGRESS_BTN_WIDTH;
      const progress = this.$refs.progress.clientWidth / barWidth;
      this.$emit('progress-changed', progress);
    },
    onProgressClick(e) {
      console.log(e.pageX);
      const rect = this.$el.getBoundingClientRect();
      const barWidth = this.$el.clientWidth - PROGRESS_BTN_WIDTH;
      const offset = e.pageX - rect.left;
      const progress = Math.min(1, Math.max(0, offset / barWidth));
      this.$emit('progress-changed', progress);
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  .bar-inner {
    position: relative;
    height: 4px;
    background: $color-background-d;

    .progress {
      height: 100%;
      background: $color-theme;
    }

    .progress-btn-wrapper {
      position: absolute;
      top: -6px;
      left: 0;
      width: 30px;
      height: 30px;

      .progress-btn {
        position: relative;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
