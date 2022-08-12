<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="content" v-show="!query">
      <div class="search-hot">
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
      <div class="search-history">
        <h1 class="title">
          <span class="text">搜索历史</span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/components/search/search-input';
import { getHotKeys } from '@/service/search';
import { watch, ref } from 'vue';
import Suggest from '@/components/search/suggest';
export default {
  name: 'search',
  components: {
    SearchInput,
    Suggest
  },
  setup() {
    const query = ref('');
    const hotKeys = ref([]);

    getHotKeys().then(res => {
      hotKeys.value = res && res.hotkey;
    });
    watch(query, newVal => {
      console.log(newVal);
    });
    return {
      query,
      hotKeys
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

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;

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

  .search-result {
    padding: 0 20px;
    flex: 1;
    overflow: hidden;
  }
}
</style>
