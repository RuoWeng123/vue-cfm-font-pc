<template>
  <div class="drawer">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="container">
      <slot name="container"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myDrawer'
  }
</script>

<style lang="less" scoped>
.drawer{
  width: 400px;
  height: 100%;
  position: absolute;
  top:0px;
  right:0;
  .header{
    height: 50px;
    padding: 10px 14px;
  }

  .container{
    height: calc(~"100% - 70px");
    overflow: hidden;
  }
}
</style>
