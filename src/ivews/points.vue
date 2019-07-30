<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs" class="tablist">
        <el-tab-pane :label="$t('message.pointTransfer')" name="first">
            <div class="pointsAccount">
                <el-row>
                    <el-col :span="12">
                        <div class="bag" style="border-right:1px solid #313743">
                            <p>USDT</p>
                            <h5>{{usdt}}</h5>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bag">
                            <p>{{$t('message.point')}}</p>
                            <h5>{{number}}</h5>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <ul class="outside">
                <li>
                    <p>{{$t('message.vipAccount')}}</p>
                    <el-input v-model="username" :placeholder="$t('message.membership')"></el-input>
                </li>
                <li>
                    <p>{{$t('message.transferbag')}}</p>
                    <el-select v-model="type" @change="select()" class="tranPoints">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </li>
                <li>
                    <p>{{$t('message.transfernumber')}}</p>
                    <el-input v-model="amount" :placeholder="$t('message.entertranNumber')"></el-input>
                </li>
            </ul>
            <el-button class="submit" @click="submit1()">{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
       <el-tab-pane :label="$t('message.transferHistry')" name="second">
            <div class="transfer">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.text}}</h5>
                       <span>{{item.amount}}{{item.name}}</span>
                   </li>
                </ul>
            </div>
       </el-tab-pane>
  </el-tabs>
    <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
 </div>
</template>

<script>
import Pin from '../components/pin'
import Top from '../components/top'
import api from '../API/index'
export default {
     components:{
        Top,
        Pin
    },
 data() {
  return {
      url:'/assets',
      message:this.$t('message.pointTransfer'),
      href:'',
      classIcon:'',
      usdt:'0.00',
      number:'0.00',
      activeName:'first',
      show:false,
      items:[],
      options:[
          {
              value:1,
              label:'USDT'
          },
          {
              value:2,
              label:this.$t('message.point')
          }
      ],
      type:1,
      username:'',
      amount:''
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('transferRecord').then(result=>{
             if(result.status==200){
                 that.usdt=result.res.register
                 that.number=result.res.passage//

                 //记录
                 that.items=that.items.concat(result.res.record)
             }else if(result.status==400){
                 alert(result.msg)
             }
         }).catch(err=>{
             alert(this.$t('message.error'))
         })
     },
     select(){
         console.log(this.value)
     },
     submit(pwd){
         let that=this
         api.minicart.template.choices('transfer/create',{amount:that.amount,type:that.type,username:that.username,security:pwd}).then(result=>{
             if(result.status==200){
                 alert(result.msg)
                 window.location.reload()
             }else if(result.status==400){
                 alert(result.msg)
             }
         }).catch(err=>{
             alert(this.$t('message.error'))
         })
     },
     submit1(){
         let that=this
         let user=that.username
         let number=that.amount
         if(user&&number){
            that.$refs.child.open(that.show);
         }else {
             alert(this.$t('message.accountnull'))
         }
         
      }
 },
}
</script>

<style scoped>

</style>
