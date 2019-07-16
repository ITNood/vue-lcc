<template>
 <div>
     <el-footer id="footer" height="50px">
         <router-link v-for="(item,index) in items" :key="index" class="icon iconfont" :to="item.url" :class="item.classFont" active-class="current"></router-link>
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
              url:'/home',
              classFont:'icon-chartpie-fill'
          },
          {
              url:'/home',
              classFont:'icon-shezhi'
          }
      ]
  }
 }
}
</script>

<style scoped>

</style>
