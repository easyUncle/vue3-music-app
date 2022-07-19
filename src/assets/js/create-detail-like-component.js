import { processSongs } from '@/service/song';
import MusicList from '@/components/music-list/music-list.vue';
import storage from 'good-storage';
export default function createDetailLikeComponent(name, key, fetch) {
  return {
    name,
    props: {
      data: Object
    },
    components: {
      MusicList
    },
    data() {
      return {
        songs: [],
        loading: true
      };
    },
    computed: {
      computedData() {
        let ret = null;
        let data = this.data;
        const id = this.$route.params.id;
        let cache = storage.get(key);
        console.log(cache, id, cache.id);
        if (data) {
          ret = data;
        } else {
          if (cache && (cache.mid == id || cache.id == id)) {
            ret = cache;
          }
        }
        return ret;
      },
      pic() {
        const computedData = this.computedData;
        return computedData && computedData.pic;
      },
      title() {
        const computedData = this.computedData;
        console.log(computedData);
        return computedData && (computedData.name || computedData.title);
      }
    },

    async created() {
      const data = this.computedData;
      if (!data) {
        const path = this.$route.matched[0].path;
        this.$router.push({
          path
        });
      }
      const result = await fetch(data);

      this.songs = await processSongs(result.songs);
      this.loading = false;
    }
  };
}
