<template>
  <div id="app">
    <router-view />
    <!-- <i class="toutiao toutiao-dianzan"></i> -->
    <ToutiaoIcon icon="wode"></ToutiaoIcon>
    <ToutiaoIcon icon="dianzan"></ToutiaoIcon>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <span class="heyma">黑马</span>
  </div>
</template>

<style lang="less">
.heyma {
  font-size: 60px;
}
</style>
