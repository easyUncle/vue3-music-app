<template>
  <div class="album-detail">
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
import { getAlbum } from '@/service/recommend';
import { ALBUM_KEY } from '@/assets/js/constants';
export default createDetailLikeComponent('singer-detail', ALBUM_KEY, getAlbum);
</script>

<style lang="scss" scoped>
.album-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background: $color-background;
}
</style>
