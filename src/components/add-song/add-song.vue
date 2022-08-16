<template>
  <teleport to="body">
    <div class="add-song" v-show="visible">
      <div class="header">
        <div class="title">添加歌曲到列表</div>
        <div class="close" @click="hide">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-input-wrapper">
        <search-input v-model="query"></search-input>
      </div>
      <div>
        <switches :switches="['最近播放', '搜索历史']"></switches>
      </div>
    </div>
  </teleport>
</template>

<script>
import SearchInput from '@/components/search/search-input';
import { ref } from 'vue';
import Switches from '@/components/base/switches/switches.vue';
export default {
  name: 'add-song',
  components: {
    SearchInput,
    Switches
  },
  setup() {
    const query = ref('');
    const visible = ref(false);
    //methods
    function show() {
      visible.value = true;
    }
    function hide() {
      visible.value = false;
    }
    return {
      query,
      visible,
      show,
      hide
    };
  }
};
</script>

<style lang="scss" scoped>
.add-song {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 300;
  background: $color-background;

  .header {
    width: 100%;
    position: relative;
    height: 44px;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: $font-size-large;

    .title {
      color: $color-text;
    }

    .close {
      position: absolute;
      right: 8px;
      color: $color-theme;
      padding: 12px;
    }
  }

  .search-input-wrapper {
    margin: 20px;
  }
}
</style>
