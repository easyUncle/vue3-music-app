<template>
  <teleport to="body">
    <div class="playlist" v-show="playlist.length && visible" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <i class="icon" :class="modeIcon" @click="changeMode"></i>
          <span class="text">{{ modeText }}</span>
          <span class="cleaar" @click.stop=""><i class="icon-clear"></i></span>
        </div>
        <scroll class="list-content" ref="scrollRef">
          <ul ref="listRef">
            <li
              class="list-content-item"
              v-for="song in sequenceList"
              :key="song.id"
              @click="selectItem(song)"
            >
              <i class="current" :class="getCurrentIcon(song)"></i>
              <span class="text">{{ song.name }}</span>
              <span class="favorite">
                <i
                  :class="favoriteICon(song)"
                  @click.stop="toggleFavorite(song)"
                ></i>
              </span>
              <span class="delete">
                <i
                  class="icon-delete"
                  :class="{ disable: moving }"
                  @click.stop="deleteItem(song)"
                ></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-add">
          <div class="add">
            <i class="icon icon-add"></i>
            <span class="text">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-footer">关闭</div>
      </div>
    </div>
  </teleport>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, nextTick } from 'vue';
import Scroll from '../base/scroll/scroll.vue';
import { useMode } from './use-mode';
import { useFavorite } from './use-favorite';
export default {
  name: 'playlist',
  components: {
    Scroll
  },
  setup() {
    const listRef = ref(null);
    const scrollRef = ref(null);
    //vuex
    const store = useStore();
    const sequenceList = computed(() => store.state.sequenceList);
    const playlist = computed(() => store.state.playList);
    const currentSong = computed(() => store.getters.currentSong);

    //data
    const visible = ref(false);
    const moving = ref(false);

    //hook
    const { modeIcon, changeMode, modeText } = useMode();
    const { toggleFavorite, favoriteICon } = useFavorite();

    //methods
    async function show() {
      visible.value = true;
      await nextTick();
      scrollRef.value.scroll.refresh();
      scrollToCurrentSong();
    }
    function scrollToCurrentSong() {
      const currentIndex = sequenceList.value.findIndex(
        item => item.id === currentSong.value.id
      );
      console.log(currentIndex);
      if (currentIndex === -1) {
        return;
      }
      const target = listRef.value.children[currentIndex];
      scrollRef.value.scroll.scrollToElement(target, 300);
    }
    function getCurrentIcon(song) {
      return currentSong.value.id === song.id ? 'icon-play' : '';
    }
    function hide() {
      visible.value = false;
    }
    function deleteItem(song) {
      if (moving.value) {
        return;
      }
      moving.value = true;
      store.dispatch('removeSong', song);
      scrollToCurrentSong();
      if (!playlist.value.length) {
        hide();
      }
      setTimeout(() => {
        moving.value = false;
      }, 300);
    }
    function selectItem(song) {
      const currentIndex = playlist.value.findIndex(
        item => item.id === song.id
      );
      store.commit('setCurrentIndex', currentIndex);
    }
    return {
      listRef,
      show,
      hide,
      visible,
      sequenceList,
      playlist,
      scrollRef,
      getCurrentIcon,
      //播放模式
      modeIcon,
      changeMode,
      modeText,
      //收藏
      toggleFavorite,
      favoriteICon,
      deleteItem,
      selectItem,
      moving
    };
  }
};
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: $color-background-d;
  z-index: 200;
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    // box-sizing: border-box;
    width: 100%;
    z-index: 210;
    background: $color-highlight-background;
    .list-header {
      padding: 0 30px 0 20px;
      height: 54px;
      display: flex;
      align-items: center;
      .icon {
        color: $color-theme;
        font-size: $font-size-large-x;
      }
      .text {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-l;
        margin-left: 10px;
      }
      .cleaar {
        font-size: $font-size-medium;
        color: $color-text-l;
      }
    }
    .list-content {
      padding: 0 30px 0 20px;
      max-height: 240px;
      overflow: hidden;
      &-item {
        display: flex;
        height: 40px;
        align-items: center;
        overflow: hidden;
        .current {
          width: 20px;
          color: $color-theme;
          font-size: $font-size-small;
        }
        .text {
          font-size: $font-size-medium;
          flex: 1;
          color: $color-text-l;
        }
        .favorite,
        .delete {
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .favorite {
          margin-right: 10px;
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        font-size: $font-size-small;
        color: $color-text-ll;
        .icon {
          margin-right: 10px;
        }
      }
    }
    .list-footer {
      height: 50px;
      background: $color-background;
      font-size: $font-size-large;
      line-height: 50px;
      text-align: center;
      color: $color-text-ll;
      width: 100%;
    }
    .disable {
      color: $color-theme-d;
    }
  }
}
</style>
