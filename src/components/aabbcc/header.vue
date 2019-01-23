<template>
    <div class="headerBox_G">
        <text class="headerBox_G_pageTip">{{ title }}</text>
        <image class="headerBox_G_toBack" :src="headerBox_G_toBack" style="width:31px;height:44px;" @click="toBack_G"></image>
    </div>
</template>

<script>
export default {
    props:['title'],
    data(){
        return{
            headerBox_G_toBack:'http://192.168.2.201:8082/images/toBack.png'
        }
    },
    methods:{
        toBack_G(){
            this.$router.back(-1);
        }
    }
}
</script>

<style scoped>
.headerBox_G{
  height:90px;
  width:750px;
  border-bottom-width:2px;
  border-bottom-color:#eaeaea;
  border-bottom-style:solid;
}
.headerBox_G_toBack{
  position:absolute;
  left:20px;
  top:22px;
}
.headerBox_G_pageTip{
  color:#333333;
  font-size:36px;
  line-height:88px;
  text-align:center;
}
</style>