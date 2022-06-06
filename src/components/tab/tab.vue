<template>
  <div class="tab">
    <router-link
      class="tab-item"
      v-for="item in tabs"
      :key="item.path"
      :to="item.path"
    >
      <span class="tab-item-text">{{ item.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: '推荐',
          path: '/recommend'
        },
        {
          name: '歌手',
          path: '/singer'
        },
        {
          name: '排行',
          path: '/top-list'
        },
        {
          name: '搜索',
          path: '/search'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.tab {
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  display: flex;
  &-item {
    flex: 1;
    text-align: center;
    .tab-item-text {
      color: $color-text-l;
      padding-bottom: 5px;
    }
    &.router-link-active {
      .tab-item-text {
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
    }
  }
}
</style>
