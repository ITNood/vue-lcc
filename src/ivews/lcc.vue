<template>
 <div>
     <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon" />
     <div class="container">
         <div class="lcc">
             <h1><span>$</span>{{lcc}}</h1>
             <p>{{number}}LCC</p>
             <router-link to="">钱包明细</router-link>
         </div>
         <div class="charts">
             <Echarts />
         </div>
         <el-row :gutter="20">
             <el-col :span="12"><el-button class="submit" @click="btn1()" style="background:#e43c1d">买入</el-button></el-col>
             <el-col :span="12"><el-button class="submit" @click="btn2()" style="background:#05cf7f">出售</el-button></el-col>
         </el-row>
         <Buy  @btn1="btn1" ref="child1" :dialogVisible="show"/>
         <Sell @btn2="btn2" :centerDialogVisible="show1"/>
     </div>
 </div>
</template>

<script>
import Top from '../components/top'
import Echarts from '../components/echarts'
import Buy from '../components/lcc/buy'
import Sell from '../components/lcc/sell'
export default {
    components:{
         Top,
         Echarts,
         Buy,
        Sell
     },
 data() {
  return {
      url: "/home",
      message: "LCC",
      href: "/code",
      classIcon: "icon-erweima icon iconfont",
      lcc:'0.00',
      number:'100',
      show:false,
      show1:false,
  }
 },
 methods: {
     btn1(data){
         this.$refs.child1.buy(this.show); 
        //  if(data!==undefined){
        //  this.show=!data
        //  }else{
        //     this.show=!this.show
        //  }
     },
     btn2(data){
           if(data!==undefined){
         this.show1=!data
         }else{
            this.show1=!this.show1
         }
     }
 },
}
</script>

<style scoped>

</style>
