<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input
      type="text"
      class="input-inner"
      :placeholder="placeholder"
      v-model="query"
    />
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce';
export default {
  name: 'search-input',
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  emits: ['update:modelValue'],

  data() {
    return {
      query: this.modelValue
    };
  },
  created() {
    this.$watch(
      'query',
      debounce(300, newQuery => {
        this.$emit('update:modelValue', newQuery.trim());
      })
    );
    this.$watch('modelValue', newVal => {
      this.query = newVal;
    });
  },
  methods: {
    clear() {
      this.query = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 32px;
  background: #333;
  border-radius: 6px;

  .input-inner {
    outline: none;
    font-size: $font-size-medium;
    color: $color-text;
    background: #333;
    flex: 1;
    margin: 0 5px;
    line-height: 18px;

    &::placeholder {
      color: $color-text-l;
    }
  }

  .icon-search,
  .icon-dismiss {
    font-size: 24px;
    color: $color-text-l;
  }
}
</style>
