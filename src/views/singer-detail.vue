<template>
  <div class="singer-detail">
    <music-list
      :pic="pic"
      :title="title"
      :songs="songs"
      :loading="loading"
    ></music-list>
  </div>
</template>

<script>
import createDetailLikeComponent from '@/assets/js/create-detail-like-component';
import { getSingerDetail } from '../service/singer';
import { SINGER_KEY } from '@/assets/js/constants';
export default createDetailLikeComponent(
  'singer-detail',
  SINGER_KEY,
  getSingerDetail
);
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
