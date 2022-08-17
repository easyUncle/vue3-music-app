<template>
  <div class="user-center">
    <div class="header">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches
          :items="['我喜欢的', '最近播放']"
          v-model="currentIndex"
        ></switches>
      </div>
    </div>
    <div class="play-btn" @click="random">
      <i class="icon-play"></i>
      <span class="text">随机播放全部</span>
    </div>
    <div class="list-wrapper">
      <scroll class="list-scroll" v-if="currentIndex === 0">
        <div class="list-inner">
          <song-list :songs="favoriteList" @selectSong="selectSong">
          </song-list>
        </div>
      </scroll>
      <scroll class="list-scroll" v-if="currentIndex === 1">
        <div class="list-inner">
          <song-list :songs="playHistory" @selectSong="selectSong"> </song-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import Switches from '@/components/base/switches/switches.vue';
import Scroll from '@/components/base/scroll/scroll.vue';
import SongList from '@/components/base/song-list/song-list.vue';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'user',
  components: {
    Switches,
    Scroll,
    SongList
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  computed: {
    currentList() {
      return this.currentIndex === 0 ? this.favoriteList : this.playHistory;
    },
    ...mapState(['favoriteList', 'playHistory', 'playMode'])
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    random() {
      this.randomPlay(this.currentList);
    },
    selectSong({ index }) {
      const list = this.currentList;
      console.log(list);
      this.selectPlay({ list, index });
    },
    ...mapActions(['randomPlay', 'selectPlay']),
    ...mapMutations(['setPlayList', 'setSequenceList'])
  }
};
</script>

<style lang="scss" scoped>
.user-center {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background: $color-background;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px;

    // background: $color-background;
    .back {
      font-size: $font-size-large-x;
      color: $color-theme;
    }

    .switches-wrapper {
      margin: 0 auto;
    }
  }

  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid $color-text-l;
    color: $color-text-l;
    border-radius: 100px;
    font-size: 0;

    .icon-play {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: $font-size-medium-x;
    }

    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: $font-size-small;
    }
  }

  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;

    .list-scroll {
      height: 100%;
      overflow: hidden;

      .list-inner {
        padding: 20px 30px;
      }
    }
  }
}
</style>
