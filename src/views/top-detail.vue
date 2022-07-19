<template>
  <div class="top-detail">
    <music-list
      :pic="pic"
      :title="title"
      :songs="songs"
      :loading="loading"
      rank
    ></music-list>
  </div>
</template>

<script>
import createDetailLikeComponent from '@/assets/js/create-detail-like-component';
import { getTopDetail } from '@/service/top-list';
import { TOP_KEY } from '@/assets/js/constants';
export default createDetailLikeComponent('top-detail', TOP_KEY, getTopDetail);
</script>

<style lang="scss" scoped>
.top-detail {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  z-index: 10;
}
</style>
