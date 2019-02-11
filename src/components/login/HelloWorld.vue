<template>
  <div class="wrapper" ref="hello">
    <text class="hello">欢迎使用绿白菜</text>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods:{
    toHome(){
      // var _this = this;
      // _this.toHomeTime = setTimeout(function(){
      //   _this.$router.push({name:'login'})
      // },500)
    }
  },
  mounted(){
    var _this = this;
    setTimeout(function(){
      _this.$router.push({name:'main'})
    },1000)
  }
}
</script>

<style scoped>
  .wrapper{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #73cc46;
  }
  .hello{
    font-size: 50px;
    text-align: center;
    color: #fff;
  }
</style>