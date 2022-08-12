<template>
  <div
    class="suggest"
    v-loading:[loadingText]="loading"
    v-no-result:[noResultText]="noResult"
    ref="scrollRef"
  >
    <ul class="suggest-list">
      <li class="suggest-item" v-if="singer" @click="selectSinger(singer)">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li
        class="suggest-item"
        v-for="song in songs"
        :key="song.id"
        @click="selectSong(song)"
      >
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
      <div class="suggest-item" v-loading:[loadingText]="isPullUpLoad"></div>
    </ul>
  </div>
</template>

<script>
import { computed, ref, watch, nextTick } from 'vue';
import { search } from '@/service/search';
import usePullUp from './use-pull-up';
import { processSongs } from '@/service/song.js';

export default {
  name: 'suggest',
  props: {
    query: String,
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select-song', 'select-singer'],
  setup(props, { emit }) {
    const singer = ref(null);
    const songs = ref([]);
    const page = ref(1);
    const hasMore = ref(true);
    const loadingText = ref('');
    const noResultText = ref('抱歉,没有改歌曲或歌手');
    const autoLoadingMore = ref(false);
    // const prePullup = ref(false)

    //computed
    const noResult = computed(
      () => !singer.value && !songs.value.length && !hasMore.value
    );
    const loading = computed(
      () => !singer.value && !songs.value.length && hasMore.value
    );
    const preventPullUpLoad = computed(
      () => loading.value || autoLoadingMore.value
    );
    //watch
    watch(
      () => props.query,
      async () => {
        await firstSearch();
      }
    );

    //hook
    const { scrollRef, isPullUpLoad, scroll } = usePullUp(
      searchMore,
      preventPullUpLoad
    );

    async function firstSearch() {
      if (!props.query) return;
      singer.value = null;
      songs.value = [];
      page.value = 1;
      hasMore.value = true;
      const res = await search(props.query, page.value, props.showSinger);
      songs.value = await processSongs(res.songs);
      singer.value = res.singer;
      hasMore.value = res.hasMore;
      await nextTick();
      await makeItScrollable();
    }
    async function searchMore() {
      if (!hasMore.value || !props.query) {
        return;
      }
      page.value++;
      const res = await search(props.query, page.value, props.showSinger);
      songs.value = songs.value.concat(await processSongs(res.songs));
      hasMore.value = res.hasMore;
      await nextTick();
      await makeItScrollable();
    }
    async function makeItScrollable() {
      if (scroll.value.maxScrollY >= -1) {
        autoLoadingMore.value = true;
        await nextTick();
        await searchMore();
        autoLoadingMore.value = false;
      }
    }
    function selectSong(song) {
      console.log(song);
      emit('select-song', song);
    }
    function selectSinger(singer) {
      emit('select-singer', singer);
    }
    return {
      singer,
      songs,
      loading,
      loadingText,
      noResultText,
      noResult,
      scrollRef,
      isPullUpLoad,
      selectSong,
      selectSinger
    };
  }
};
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;

  .suggest-list {
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      color: $color-text-l;

      .icon {
        flex: 0 0 30px;
        width: 30px;

        .icon-music {
          font-size: $font-size-medium;
        }
      }

      .name {
        flex: 1;
        font-size: $font-size-medium;
        overflow: hidden;

        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .nomore {
      text-align: center !important;
      font-size: 14px !important;
    }
  }
}
</style>
