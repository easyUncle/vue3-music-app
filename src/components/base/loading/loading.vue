<template>
  <div class="loading">
    <img src="./loading.gif" class="icon" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'loading',
  data() {
    return {
      title: '正在加载...'
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    }
  }
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .icon {
    margin: 0 auto;
    display: block;
    width: 24px;
    height: 24px;
  }
  .title {
    color: $color-text-l;
    font-size: $font-size-small-s;
  }
}
</style>
