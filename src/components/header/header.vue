<template>
  <div class="header">
    <div class="center">
      <img src="@/assets/images/music.png" alt="" class="logo" />
      <h1>JoJoMusic</h1>
    </div>
    <router-link class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.header {
  text-align: center;
  color: $color-theme;
  font-size: $font-size-large;
  display: flex;
  height: 44px;
  flex-direction: row;
  justify-content: center;

  .center {
    display: flex;
    flex-direction: row;
    align-items: center;

    .logo {
      display: inline-block;
      width: 30px;
      height: 32px;
      margin-right: 8px;
    }
  }

  .mine {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    .icon-mine {
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
}
</style>
