<template>
  <div class="search-list">
    <div class="item" v-for="item in searchList" :key="item">
      <span class="text">{{ item }}</span>
      <span class="icon">
        <i class="icon-delete"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  setup() {}
};
</script>

<style></style>
