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
      <div class="content" v-show="!query">
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
          <scroll class="list-scroll" v-if="currentIndex === 1">
            <search-list
              :searches="searchHistory"
              :showDelete="false"
            ></search-list>
          </scroll>
        </div>
      </div>
      <div class="suggest-result" v-show="query">
        <suggest
          :query="query"
          @select-song="selectSong"
          @select-singer="selectSinger"
        ></suggest>
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
import SearchList from '@/components/base/search-list/search-list.vue';
import Suggest from '@/components/search/suggest.vue';
export default {
  name: 'add-song',
  components: {
    SearchInput,
    Switches,
    Scroll,
    SongList,
    SearchList,
    Suggest
  },
  setup() {
    const query = ref('');
    const visible = ref(false);
    const currentIndex = ref(0);
    const store = useStore();
    //vuex
    const playHistory = computed(() => store.state.playHistory);
    const searchHistory = computed(() => store.state.historySeach);
    //methods
    function show() {
      visible.value = true;
    }
    function hide() {
      visible.value = false;
    }
    function selectSong() {}
    function selectSinger() {}
    return {
      query,
      visible,
      show,
      hide,
      currentIndex,
      playHistory,
      searchHistory,
      selectSong,
      selectSinger
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

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;

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
  .suggest-result {
    flex: 1;
    overflow: hidden;
    padding: 0 20px;
  }
}
</style>
