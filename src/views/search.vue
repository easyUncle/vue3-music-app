<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <scroll class="scroll-wrap" v-show="!query">
      <div class="content">
        <div class="search-hot" v-show="hotKeys.length">
          <h3 class="title">热门搜索</h3>
          <ul>
            <li
              class="item"
              v-for="item in hotKeys"
              :key="item.id"
              @click="addQuery(item.key)"
            >
              <span>{{ item.key }}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searches.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <confirm
            :text="confirmText"
            @confirm="confirm"
            @cancel="cancel"
            v-model="visible"
          >
          </confirm>
          <search-list
            :searches="searches"
            @delete-item="deleteItem"
            @select-item="selectItem"
          ></search-list>
        </div>
      </div>
    </scroll>
    <div class="search-result" v-show="query">
      <suggest
        :query="query"
        @select-song="selectSong"
        @select-singer="selectSinger"
      ></suggest>
    </div>
    <router-view v-slot="{ Component }">
      <transition name="slide" appear>
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input';
import { getHotKeys } from '@/service/search';
import { watch, ref, computed } from 'vue';
import Suggest from '@/components/search/suggest';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { SINGER_KEY } from '@/assets/js/constants';
import storage from 'good-storage';
import SearchList from '@/components/base/search-list/search-list';
import { useSearchHistory } from '@/components/search/use-search-history';
import Confirm from '@/components/base/confirm/confirm';
import Scroll from '@/components/base/scroll/scroll';

export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },
  setup() {
    const query = ref('');
    const hotKeys = ref([]);
    const store = useStore();
    const selectedSinger = ref(null);
    const router = useRouter();
    const confirmText = ref('是否清空所有搜索历史');
    const visible = ref(false);

    getHotKeys().then(res => {
      hotKeys.value = (res && res.hotkey) || [];
    });
    watch(query, newVal => {
      console.log(newVal);
    });

    //computed
    const searches = computed(() => store.state.historySeach || []);

    //hooks
    const { saveSearchHistory, deleteSearchHistory, clearSearchHistory } =
      useSearchHistory();

    //methods
    function selectSong(song) {
      saveSearchHistory(query.value);
      store.dispatch('addSong', song);
    }
    function selectSinger(singer) {
      saveSearchHistory(query.value);
      selectedSinger.value = singer;
      cacheSinger();
      router.push({ path: `/singer/${singer.mid}` });
    }
    function cacheSinger() {
      storage.set(SINGER_KEY, selectedSinger.value);
    }
    function deleteItem(query) {
      deleteSearchHistory(query);
    }
    function selectItem(item) {
      query.value = item;
    }
    function confirm() {
      clearSearchHistory();
    }
    function cancel() {}
    function showConfirm() {
      visible.value = true;
    }
    return {
      query,
      hotKeys,
      selectSong,
      selectSinger,
      selectedSinger,
      searches,
      deleteItem,
      selectItem,
      confirmText,
      confirm,
      cancel,
      showConfirm,
      visible
    };
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .search-input-wrapper {
    margin: 20px;
  }

  .scroll-wrap {
    flex: 1;
    overflow: hidden;
    .content {
      padding: 0 20px;
      .search-hot {
        .title {
          font-size: $font-size-medium;
          color: $color-text-l;
          margin-bottom: 20px;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 6px;
          background: $color-highlight-background;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }

      .search-history {
        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);

          .text {
          }
        }
      }
    }
  }

  .search-result {
    padding: 0 20px;
    flex: 1;
    overflow: hidden;
  }
}
</style>
