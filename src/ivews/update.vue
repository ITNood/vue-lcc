<template>
 <div>
     <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon" />
     <div class="container" style="margin-bottom:20px;">
         <ul class="update">
             <li>
                 <p>{{$t('message.level')}}</p>
                 <div class="padding-left updateList">
                     <b>V{{number}}</b>{{text}}
                 </div>
             </li>
             <li>
                 <p>{{$t('message.updateLevel')}}</p>
                 <div class="padding-left updateList">
                     <b>V{{rank}}</b>
                     <el-select v-model="payId" @change="select($event)" class="updateSelect" :placeholder="$t('message.selectLevel')">
                         <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
                     </el-select>
                 </div>
             </li>

             <li>
                 <p>{{$t('message.balance')}}</p>
                 <div class="updateList">
                     {{point}} {{$t('message.integral')}}
                 </div>
             </li>
             <li style="border-bottom:none;">
                 <p>{{$t('message.interests')}}</p>
                 <ul class="updateRights">
                     <li>
                         {{$t('message.matchAmount')}}<i>{{amount}}</i>
                     </li>
                     <li>
                         {{$t('message.salary')}}<i>{{week}}</i>
                     </li>
                     <li>
                         {{$t('message.weekCap')}}<i>{{max}}</i>
                     </li>
                 </ul>
             </li>
         </ul>
         <el-button class="submit" @click="submit2()">{{$t('message.confirm')}}</el-button>
         <div class="buyTips" style="text-align:center;color:#999">{{$t('message.chance')}}</div>
     </div>
     <!--支付方式-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="85%"
      center
      :close-on-click-modal="false"
      id="open"
    >
      <span>升级需支付 {{point}} 积分</span>
      <div class="pay">
          <p>支付方式</p>
          <el-select v-model="type" class="paySelect" placeholder="请选择" @change="change($event)">
              <el-option v-for="item in todos" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
        class="submit"
          @click="submit1()"
        >确 定</el-button>
      </span>
    </el-dialog>
      <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
     
 </div>
</template>

<script>
import api from '../API/index'
import Top from '../components/top'
import Pin from '../components/pin'
export default {
  components:{
     Top,
     Pin
  },
 data() {
  return {
      url: "/home",
      message: this.$t('message.upgrade'),
      href: "",
      classIcon: "",
      number:'',
      rank:'',
      text:'',
      payId:'',
      point:0,
      amount:'0.00',
      week:'0.00',
      max:'0.00',
      options:[],
      now:'',
      id:'',
      show:false,
      centerDialogVisible:false,
      type:'',
      todos:[]
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
                 that.todos=that.todos.concat(result.res.pay)
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
     change(){
        console.log(this.type)
     },
     submit(pwd){
         let that=this
         api.minicart.template.choices('home/createInvest',{id:that.payId,payId:that.type,security:pwd}).then(result=>{
             if(result.status==200){
                 that.$message.success(result.msg)
                 setTimeout(() => {
                     that.$router.push('/home')
                 }, 500);
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     },
     submit2(){
         let that=this
         let id=that.payId
         if(id){
            this.centerDialogVisible=true
         }else {
            that.$message.error('请选择升级级别！')
         }
         
     },
     submit1(){
         let that=this
         let id=that.type
         if(id){
             that.$refs.child.open(that.show);
             that.centerDialogVisible=false
         }else {
            that.$message.error('请选择支付方式！')
         }
     }
 },
}
</script>

<style scoped>
</style>
