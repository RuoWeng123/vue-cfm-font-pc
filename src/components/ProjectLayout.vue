<template>
  <div class="project-layout-wrap">
    <div
      v-if="$slots.top"
      class="project-layout-top"
      :style="topStyle">
      <slot name="top"/>
    </div>
    <div class="project-layout-bottom">
      <div
        class="project-layout-left"
        :style="leftStyle">
        <slot name="left"/>
      </div>
      <div
        class="project-layout-right"
        :style="rightStyle">
        <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProjectLayout',
    props: {
      topStyle: {},
      leftStyle: {},
      rightStyle: {}
    }
  }
</script>

<style
  lang="scss"
  type="text/stylus"
  rel="stylesheet/stylus">
  @import "../styles/mixin";
  @import "../styles/var";
  .project-layout {
    &-wrap {
      @include utils-fullParent;
      @include utils-flexVertical;
      overflow: hidden;
    }

    &-top {
      padding: 0;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    &-bottom {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    &-left {
      width: 50%;
      padding-right: 8px;
      box-sizing: border-box;
    }

    &-right {
      width: 50%;
      padding-left: 8px;
      box-sizing: border-box;
    }
  }
</style>
