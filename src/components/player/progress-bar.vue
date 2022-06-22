<template>
  <div class="progress-bar">
    <div class="bar-inner">
      <div class="progress" :style="progressStyle"></div>
      <div class="progress-btn-wrapper" :style="progressBtnStyle">
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
