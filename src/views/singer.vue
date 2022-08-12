<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers" @selectedSinger="selectSinger"></index-list>
    <router-view v-slot="{ Component }">
      <transition name="slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import IndexList from '../components/index-list/index-list.vue';
import { getSingerList } from '@/service/singer.js';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constants';

export default {
  data() {
    return {
      singers: [],
      selectedSinger: null
    };
  },
  components: {
    IndexList
  },
  async created() {
    const res = await getSingerList();
    this.singers = res.singers;
  },
  methods: {
    selectSinger(singer) {
      this.selectedSinger = singer;
      this.cacheSinger();
      this.$router.push({
        path: `/singer/${singer.mid}`
      });
    },
    cacheSinger() {
      //localStorage
      storage.set(SINGER_KEY, this.selectedSinger);
    }
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}
</style>
