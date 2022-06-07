<template>
  <div class="singer" v-loading="!singers.length">
    <index-list :data="singers"></index-list>
  </div>
</template>

<script>
import IndexList from '../components/index-list/index-list.vue';
import { getSingerList } from '@/service/singer.js';
export default {
  data() {
    return {
      singers: []
    };
  },
  components: {
    IndexList
  },
  async created() {
    const res = await getSingerList();
    console.log(res);
    this.singers = res.singers;
  }
};
</script>

<style lang="scss" scoped>
.singer {
  position: fixed;
  top: 80px;
  bottom: 0;
  overflow: hidden;
  width: 100%;
}
</style>
