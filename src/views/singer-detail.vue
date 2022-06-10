<template>
  <div class="singer-detail">
    <music-list :pic="pic" :title="title" :songs="songs"></music-list>
  </div>
</template>

<script>
import { getSingerDetail } from '../service/singer';
import { processSongs } from '@/service/song';
import MusicList from '../components/music-list/music-list.vue';
import { SINGER_KEY } from '@/assets/js/constants';
import storage from 'good-storage';

export default {
  name: 'singer-detail',
  props: {
    singer: Object
  },
  components: {
    MusicList
  },
  data() {
    return {
      songs: [],
      selectSinger: null
    };
  },
  computed: {
    computedSinger() {
      let ret = null;
      let singer = this.singer;
      let cache = storage.get(SINGER_KEY);
      if (singer) {
        ret = singer;
      } else {
        if (cache && cache.mid === this.$route.params.id) {
          ret = cache;
        }
      }
      return ret;
    },
    pic() {
      const computedSinger = this.computedSinger;
      return computedSinger && computedSinger.pic;
    },
    title() {
      const computedSinger = this.computedSinger;
      return computedSinger && computedSinger.name;
    }
  },

  async created() {
    if (!this.computedSinger) {
      const path = this.$route.matched[0].path;
      this.$router.push({
        path
      });
    }
    const id = this.$route.params.id;
    const result = await getSingerDetail(id);
    this.songs = await processSongs(result.songs);
  }
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
