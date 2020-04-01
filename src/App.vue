<template>
  <div id="app">
    <div class="footer-bar">
      <router-link class="footer-bar-item" to="/">首页</router-link>
      <router-link class="footer-bar-item" to="/about">分类</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{margin:0;padding:0;}
  .footer-bar{
    display:flex;
    background:#eeeeee;
    position: fixed;
    bottom:0;
    width:100%;
    height:50px;
    line-height:50px;
    &-item{
      flex-grow:1;
      text-align:center;
    }
  }
</style>
