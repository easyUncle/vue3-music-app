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
        <switches
          :items="['最近播放', '搜索历史']"
          v-model="currentIndex"
        ></switches>
      </div>
      <div class="list-wrapper">
        <scroll class="list-scroll" v-if="currentIndex === 0">
          <song-list :songs="playHistory"></song-list>
        </scroll>
      </div>
    </div>
  </teleport>
</template>

<script>
import SearchInput from '@/components/search/search-input';
import { ref, computed } from 'vue';
import Switches from '@/components/base/switches/switches.vue';
import Scroll from '@/components/base/scroll/scroll';
import SongList from '@/components/base/song-list/song-list';
import { useStore } from 'vuex';
export default {
  name: 'add-song',
  components: {
    SearchInput,
    Switches,
    Scroll,
    SongList
  },
  setup() {
    const query = ref('');
    const visible = ref(false);
    const currentIndex = ref(0);
    const store = useStore();
    //vuex
    const playHistory = computed(() => store.state.playHistory);
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
      hide,
      currentIndex,
      playHistory
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
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    width: 100%;
    position: relative;
    text-align: center;
    font-size: $font-size-large;

    .title {
      height: 44px;
      line-height: 44px;
      color: $color-text;
    }

    .close {
      position: absolute;
      top: 0;
      right: 8px;
      color: $color-theme;
      padding: 12px;
    }
  }

  .search-input-wrapper {
    margin: 20px;
  }

  .list-wrapper {
    flex: 1;
    overflow: hidden;

    padding: 20px;

    .list-scroll {
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
