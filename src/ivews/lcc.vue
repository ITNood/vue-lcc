<template>
 <div>
     <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon" />
     <div class="container">
         <div class="lcc">
             <h1><span>$</span>{{lcc}}</h1>
             <p>{{number}}FC</p>
             <router-link to="/bagDetails?id=7">钱包明细</router-link>
         </div>
         <div class="charts">
             <Echarts :time="date" :data="data"/>
         </div>
         <el-row :gutter="20">
             <el-col :span="12"><el-button class="submit" @click="btn1()" style="background:#e43c1d">买入</el-button></el-col>
             <el-col :span="12"><el-button class="submit" @click="btn2()" style="background:#05cf7f">出售</el-button></el-col>
         </el-row>
         <Buy  @btn1="btn1" ref="child1" :dialogVisible="show2" :num="number"/>
         <Sell @btn2="btn2" ref="child2" :centerDialogVisible="show1"/>
          <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
     </div>
 </div>
</template>

<script>
import Top from '../components/top'
import Echarts from '../components/echarts'
import Buy from '../components/lcc/buy'
import Sell from '../components/lcc/sell'
import api from '../API/index'
import Pin from '../components/pin'
export default {
    components:{
        Top,
        Echarts,
        Buy,
        Sell,
        Pin
     },
 data() {
  return {
      url: "/home",
      message: "FC",
      href: "/code",
      classIcon: "icon-erweima icon iconfont",
      lcc:'0.00',
      number:'100',
      show2:false,
      show1:false,
      number:1,
      date:'',
      data:'',
      show:false
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('getTrend').then(result=>{
             if(result.status==200){
                 that.date=result.res.todayData.date
                 that.data=result.res.todayData.data
                 that.lcc=result.res.fc
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     },
     submit(){

     },
     btn1(data){
        // this.$refs.child.open(this.show);
         this.$refs.child1.buy(this.show2);
     },
     btn2(data){
         this.$refs.child2.sell(this.show1); 
     }
 },
}
</script>

<style scoped>

</style>
