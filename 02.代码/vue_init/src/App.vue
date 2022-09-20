<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <button @click="handleClick">添加</button> -->
    <input ref="input666" v-if="isEdit" type="text">
    <button v-else @click="showInput">添加</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      msg:"我是初始化数据",
      isEdit:false
    }
  },
  methods:{
    // handleClick(){
    //   console.log('1',this.msg)

    //   this.msg = "我是修改之后的数据";

    //   console.log('2',this.msg)
    // },
    showInput(){
      this.isEdit = true;

      console.log(this.isEdit)

      // 当DOM更新结束之后,才会执行nextTick的回调函数
      // 一定能获取到最新的DOM结构
      this.$nextTick(()=>{
        this.$refs.input666.focus();
      })
    }
  }
}
</script>

<style>
</style>
