<template>
  <div class="music-list">
    <div class="back" @click="handleBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" :style="bgImageStyle" ref="bgImage">
      <div class="play-btn-wrapper" :style="playStyle" @click="random">
        <div class="play-btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      v-loading="loading"
      v-no-result:[noResultTitle]="noResult"
      class="list"
      :style="scrollStyle"
      :probe-type="3"
      @scroll="scrollEvent"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @selectSong="selectSong"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from '../base/song-list/song-list.vue';
import Scroll from '../base/scroll/scroll.vue';
import { mapActions } from 'vuex';
const TITLE_HEIGHT = 40;
export default {
  name: 'music-list',
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    pic: {
      type: String
    },
    loading: Boolean
  },
  data() {
    return {
      scrollY: 0,
      bgImageHeight: 0,
      maxListTranslateY: 0,
      noResultTitle: '抱歉,该歌手暂无数据'
    };
  },
  components: {
    SongList,
    Scroll
  },
  computed: {
    bgImageStyle() {
      const backgroundImage = `url(${this.pic})`;
      const scrollY = this.scrollY;
      let paddingTop = '70%';
      let height = 0;
      let zIndex = 0;
      let scale = 1;
      let translateZ = 0;
      if (scrollY > this.maxListTranslateY) {
        paddingTop = 0;
        height = `${TITLE_HEIGHT}px`;
        translateZ = 1;
        zIndex = 10;
      }
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.bgImageHeight);
      }
      return {
        backgroundImage,
        paddingTop,
        height,
        zIndex,
        transform: `scale(${scale}) translateZ(${translateZ}px)`
      };
    },
    playStyle() {
      let display = 'block';
      if (this.scrollY > this.maxListTranslateY) {
        display = 'none';
      }
      return {
        display
      };
    },
    filterStyle() {
      const scrollY = this.scrollY;
      const bgImageHeight = this.bgImageHeight;
      const blur = scrollY > 0 ? (scrollY / bgImageHeight) * 20 : 0;
      return {
        backdropFilter: `blur(${blur}px)`
      };
    },
    scrollStyle() {
      return {
        top: `${this.bgImageHeight}px`
      };
    },
    noResult() {
      return !this.loading && !this.songs.length;
    }
  },
  methods: {
    scrollEvent(pos) {
      this.scrollY = -pos.y;
    },
    handleBack() {
      this.$router.go(-1);
    },
    selectSong({ index }) {
      this.selectPlay({
        list: this.songs,
        index
      });
    },
    random() {
      this.randomPlay(this.songs);
    },
    ...mapActions(['selectPlay', 'randomPlay'])
  },
  async mounted() {
    this.bgImageHeight = this.$refs.bgImage.clientHeight;
    //歌单最大上移距离
    this.maxListTranslateY = this.bgImageHeight - TITLE_HEIGHT;
  }
};
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
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
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    top: 250px;
    bottom: 0;
    width: 100%;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
