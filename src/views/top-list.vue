<template>
  <div class="top" v-loading="showLoading">
    <scroll class="top-scroll">
      <div class="content">
        <ul class="topList">
          <li
            class="topList-item"
            v-for="item in topList"
            :key="item.id"
            @click="clickTopItem(item)"
          >
            <div class="icon">
              <img :src="item.pic" />
            </div>
            <div class="songs">
              <p
                v-for="(song, index) in item.songList"
                :key="song.id"
                class="songs-item"
              >
                {{ index + 1 }}. {{ song.songName }}-{{ song.singerName }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <router-view v-slot="{ Component }">
      <transition name="slide" appear>
        <component :is="Component" :data="selectedTop" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import Scroll from '@/components/base/scroll/scroll.vue';
import { getTopList } from '@/service/top-list';
import storage from 'good-storage';
import { TOP_KEY } from '@/assets/js/constants';

export default {
  components: {
    Scroll
  },
  data() {
    return {
      topList: [],
      showLoading: true,
      selectedTop: null
    };
  },
  created() {
    this.getTopList();
  },
  methods: {
    async getTopList() {
      this.topList = (await getTopList()).topList;
      this.showLoading = false;
    },
    clickTopItem(top) {
      this.selectedTop = top;
      storage.set(TOP_KEY, top);
      this.$router.push({
        path: `/top-list/${top.id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  .top-scroll {
    height: 100%;
    .content {
      .topList {
        &-item {
          overflow: hidden;
          display: flex;
          margin: 0 20px;
          padding-top: 20px;
          display: flex;
          height: 100px;
          .icon {
            flex: 0 0 100px;
            width: 100px;
            height: 100px;
            img {
              display: inline-block;
              width: 100px;
              height: 100px;
            }
          }

          .songs {
            display: flex;
            flex: 1;
            flex-direction: column;
            justify-content: center;
            padding: 0 20px;
            font-size: $font-size-small;
            color: $color-text-d;
            background: $color-highlight-background;
            overflow: hidden;
            &-item {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              height: 26px;
              line-height: 26px;
            }
          }
        }
      }
    }
  }
}
</style>
