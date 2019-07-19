<template>
 <div>
     <el-footer id="footer" height="50px">
         <router-link active-class="current" v-for="(item,index) in items"  :key="index" class="icon iconfont" :to="item.url" :class="item.classFont" ></router-link>
     </el-footer>
 </div>
</template>

<script>
export default {
    name:'Bottom',
 data() {
  return {
      items:[
          {
              url:'/home',
              classFont:'icon-tianchongxing-'
          },
          {
              url:'/market',
              classFont:'icon-chartpie-fill'
          },
          {
              url:'/my',
              classFont:'icon-shezhi'
          }
      ]
  }
 }
}
</script>

<style scoped>

</style>
