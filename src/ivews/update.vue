<template>
 <div>
     <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon" />
     <div class="container" style="margin-bottom:20px;">
         <ul class="update">
             <li>
                 <p>当前级别</p>
                 <div class="padding-left updateList">
                     <b>V{{number}}</b>{{text}}
                 </div>
             </li>
             <li>
                 <p>升级级别</p>
                 <div class="padding-left updateList">
                     <b>V{{rank}}</b>
                     <el-select v-model="value" @change="select($event)" class="updateSelect" placeholder="请选择升级级别">
                         <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
                     </el-select>
                 </div>
             </li>

             <li>
                 <p>补充差额</p>
                 <div class="updateList">
                     {{point}} 积分
                 </div>
             </li>
             <li style="border-bottom:none;">
                 <p>升级配套权益</p>
                 <ul class="updateRights">
                     <li>
                         配套金额<i>{{amount}}</i>
                     </li>
                     <li>
                         周薪资<i>{{week}}</i>
                     </li>
                     <li>
                         周封顶<i>{{max}}</i>
                     </li>
                 </ul>
             </li>
         </ul>
         <el-button class="submit" @click="submit()">确认</el-button>
         <div class="buyTips" style="text-align:center;color:#999">你还有1次升级机会，请慎重选择</div>
     </div>
     
 </div>
</template>

<script>
import api from '../API/index'
import Top from '../components/top'
export default {
  components:{
     Top
  },
 data() {
  return {
      url: "/home",
      message: "配套升级",
      href: "",
      classIcon: "",
      number:'',
      rank:'',
      text:'',
      value:'',
      point:'',
      amount:'0.00',
      week:'0.00',
      max:'0.00',
      options:[],
      now:'',
      id:''
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('home/viewInvest').then(result=>{
             if(result.status==200){
                 that.number=result.res.thisLevel.level
                 that.text=result.res.thisLevel.name
                 that.now=result.res.thisLevel.invest
                 that.options=that.options.concat(result.res.nextLevel)
             }
         }).catch(err=>{

         })
     },
     select(ev){
         console.log(ev)

         //this.rank=ev\
         let that=this
         that.id=ev
        that.options.map(item=>{
            if(item.id=== ev){
            console.log(item)
            that.rank=item.level//级别
            that.week=item.week_dividend  //周薪资
            that.amount=item.given_amount //配套金额
            that.max=item.week_cap
            that.point=item.invest-that.now
            }
        })
     },
     submit(){
         
     }
 },
}
</script>

<style scoped>
</style>
