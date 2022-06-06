<template>
  <div class="recommend" v-loading:[title]="loading">
    <scroll class="recommend-scroll">
      <div>
        <div class="slider-wrapper">
          <div class="slider-content">
            <slider :sliders="sliders" v-if="sliders.length"></slider>
          </div>
        </div>
        <div class="recommend-content">
          <div class="recommend-content-title" v-show="!loading">
            热门歌单推荐
          </div>
          <div
            class="recommend-content-item"
            v-for="album in albums"
            :key="album.id"
          >
            <div class="icon"><img v-lazy="album.pic" alt="" /></div>
            <div class="text">
              <h3 class="name">{{ album.username }}</h3>
              <p class="des">{{ album.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Slider from '../components/base/slider/slider.vue';
import { getRecommend } from '@/service/recommend';
import Scroll from '../components/base/scroll/scroll.vue';
export default {
  components: {
    Slider,
    Scroll
  },
  data() {
    return {
      sliders: [],
      albums: [],
      title: 'loading...'
    };
  },
  computed: {
    loading() {
      return !this.sliders.length && !this.albums.length;
    }
  },
  async created() {
    let res = await getRecommend();
    this.sliders = res.sliders;
    this.albums = res.albums;
  }
};
</script>

<style lang="scss" scoped>
.recommend {
  position: absolute;
  width: 100%;
  top: 88px;
  bottom: 0;
  overflow: hidden;
  .recommend-scroll {
    height: 100%;
    overflow: hidden;
    .slider-wrapper {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 40%;
      overflow: hidden;

      .slider-content {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    }

    .recommend-content {
      &-title {
        font-size: $font-size-medium;
        color: $color-theme;
        text-align: center;
        height: 65px;
        line-height: 65px;
      }

      &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          margin-right: 20px;
          width: 60px;
          box-sizing: border-box;

          img {
            width: 100%;
          }
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;

          .name {
            font-size: $font-size-medium;
            color: $color-text;
            margin-bottom: 10px;
          }

          .des {
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
    }
  }
}
</style>
