<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  //import { engine } from '@/common/db'

  export default {
    name: 'app',

    data(){
      return {
        isRouterAlive:true
      }
    },
    methods:{
    },
    watch: {
      '$route.path': function(){
        this.$forceUpdate()
      }
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  body{
    margin:0px;
  }
</style>
