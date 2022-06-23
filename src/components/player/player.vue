<template>
  <div class="player" v-show="playList.length">
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" />
      </div>
      <div class="top">
        <div class="back" @click="goBack">
          <i class="icon-back"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div ref="cdWrapperRef" class="cd-wrapper">
            <div ref="cdRef" class="cd">
              <img ref="cdImageRef" class="image" :src="currentSong.pic" />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric"></div>
          </div>
        </div>
        <!-- <scroll
            class="middle-r"
            ref="lyricScrollRef"
            :style="middleRStyle"
          >
            <div class="lyric-wrapper">
              <div v-if="currentLyric" ref="lyricListRef">
                <p
                  class="text"
                  :class="{'current': currentLineNum ===index}"
                  v-for="(line,index) in currentLyric.lines"
                  :key="line.num"
                >
                  {{line.txt}}
                </p>
              </div>
              <div class="pure-music" v-show="pureMusicLyric">
                <p>{{pureMusicLyric}}</p>
              </div>
            </div>
          </scroll> -->
      </div>
      <div class="bottom">
        <div class="dot-wrapper">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="progress-wrapper">
          <span class="time time-l">{{ formateTime(currentTime) }}</span>
          <div class="progress-bar-wrapper">
            <progress-bar
              :progress="progress"
              @progress-changing="onProgressChanging"
              @progress-changed="onProgressChanged"
            ></progress-bar>
          </div>
          <span class="time time-r">{{
            formateTime(currentSong.duration)
          }}</span>
        </div>
        <div class="operators">
          <div class="icon i-left" :class="disableCls">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon i-left" :class="disableCls">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon i-center" :class="disableCls">
            <i @click="togglePlay" :class="playIcon"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon i-right" :class="disableCls">
            <i
              class="icon-not-favorite"
              @click="toggleFavorite(currentSong)"
              :class="favoriteICon(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @play="play"
      @canplay="canplay"
      @error="error"
      @ended="end"
      @timeupdate="updateTime"
    ></audio>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref, watch } from 'vue';
import { useMode } from './use-mode';
import { PLAY_MODE } from '../../assets/js/constants';
import { useFavorite } from './use-favorite';
import ProgressBar from './progress-bar.vue';
import { formateTime } from '@/assets/js/util';

export default {
  name: 'player',
  components: {
    ProgressBar
  },
  setup() {
    const audioRef = ref(null);
    let onChanging = false;
    //vuex
    const store = useStore();
    const currentSong = computed(() => store.getters.currentSong);
    const playList = computed(() => store.state.playList);
    const fullScreen = computed(() => store.state.fullScreen);
    const playing = computed(() => store.state.playing);
    const currentIndex = computed(() => store.state.currentIndex);
    const playMode = computed(() => store.state.playMode);
    //data
    let songReady = ref(false);
    let currentTime = ref(0);
    //hooks
    const { modeIcon, changeMode } = useMode();
    const { toggleFavorite, favoriteICon } = useFavorite();
    //播放状态派生播放按钮
    const playIcon = computed(() =>
      playing.value ? 'icon-pause' : 'icon-play'
    );
    //icon样式控制
    const disableCls = computed(() => (songReady.value ? '' : 'disable'));
    //播放进度条监控
    const progress = computed(
      () => currentTime.value / currentSong.value.duration
    );
    //监听当前歌曲,全换播放url和播放状态
    watch(currentSong, newSong => {
      const audioVal = audioRef.value;
      songReady.value = false;
      audioVal.src = newSong.url;
      currentTime.value = 0;
      audioVal.play();
      store.commit('setPlaying', true);
    });
    //监听播放状态,控制歌曲播放与停止
    watch(playing, newState => {
      const audioVal = audioRef.value;
      if (newState) {
        audioVal.play();
      } else {
        audioVal.pause();
      }
    });
    function goBack() {
      store.commit('setFullScreen', false);
    }
    function pause() {
      store.commit('setPlaying', false);
    }
    function play() {
      store.commit('setPlaying', true);
    }
    function prev() {
      if (!songReady.value) {
        return;
      }

      let currentVal = currentIndex.value;
      const len = playList.value.length;
      if (len === 1) {
        loop();
      } else {
        if (currentVal === 0) {
          currentVal = len - 1;
        } else {
          currentVal -= 1;
        }
      }
      store.commit('setCurrentIndex', currentVal);
    }
    function next() {
      if (!songReady.value) {
        return;
      }
      let currentVal = currentIndex.value;
      const len = playList.value.length;
      if (len === 1) {
        loop();
      } else {
        if (currentVal === len - 1) {
          currentVal = 0;
        } else {
          currentVal += 1;
        }
        store.commit('setCurrentIndex', currentVal);
      }
    }
    function loop() {
      const audioVal = audioRef.value;
      audioVal.currentTime = 0;
      audioVal.play();
      store.commit('setPlaying', true);
    }
    function togglePlay() {
      store.commit('setPlaying', !playing.value);
    }
    //当浏览器可以开始播放音频/视频时触发
    function canplay() {
      if (songReady.value) return;
      songReady.value = true;
    }
    function error() {
      songReady.value = true;
    }
    function end() {
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }
    function updateTime(e) {
      if (!onChanging) {
        currentTime.value = e.target.currentTime;
      }
    }
    function onProgressChanging(progress) {
      onChanging = true;
      currentTime.value = progress * currentSong.value.duration;
    }
    function onProgressChanged(progress) {
      onChanging = false;
      audioRef.value.currentTime = currentTime.value =
        progress * currentSong.value.duration;
      if (!playing.value) {
        store.commit('setPlaying', true);
      }
    }
    return {
      audioRef,
      currentSong,
      playList,
      fullScreen,
      playIcon,
      goBack,
      togglePlay,
      pause,
      play,
      prev,
      next,
      canplay,
      disableCls,
      error,
      //mode
      modeIcon,
      changeMode,
      end,
      //favorite
      toggleFavorite,
      favoriteICon,
      //进度条
      progress,
      updateTime,
      currentTime,
      onProgressChanging,
      onProgressChanged,
      //时间格式化
      formateTime
    };
  }
};
</script>

<style lang="scss" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .top {
      position: relative;
      margin-bottom: 25px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }

      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }

      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }

    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;

            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }

            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }

      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;

            &.current {
              color: $color-text;
            }
          }

          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }

    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;

      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;

          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }

      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      .operators {
        display: flex;
        align-items: center;

        .icon {
          flex: 1;
          color: $color-theme;

          &.disable {
            color: $color-theme-d;
          }

          i {
            font-size: 30px;
          }
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          i {
            font-size: 40px;
          }
        }

        .i-right {
          text-align: left;
        }

        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }

    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;

      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }

    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;

      .top {
        transform: translate3d(0, -100px, 0);
      }

      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
