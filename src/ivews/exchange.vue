<template>
 <div>
      <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane :label="$t('message.pointEx')" name="first">
            <div class="pointsAccount">
                <el-row>
                    <el-col :span="12">
                        <div class="bag" style="border-right:1px solid #313743">
                            <p>{{$t('message.cash')}}</p>
                            <h5>{{cash}}</h5>
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
                    <p>{{$t('message.exchangeClass')}}</p>
                    <el-select v-model="type" @change="select()" class="tranPoints">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </li>
                <li>
                    <p>{{$t('message.exchangeNumber')}}</p>
                    <el-input v-model="amount" :placeholder="$t('message.enterExchangenumber')"></el-input>
                </li>
            </ul>
            <el-button class="submit" @click="submit1()">{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
       <el-tab-pane :label="$t('message.transferHistry')" name="second">
            <div class="transfer">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.text}}{{item.name}}</h5>
                       <span>{{item.amount}}</span>
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
      url:'/assets',
      message:this.$t('message.exchange'),
      href:'',
      classIcon:'',
      activeName:'first',
      cash:'0.00',
      number:'0.00',
      options:[
          {
              id:1,
              label:this.$t('message.currentPoint')
          }
      ],
      items:[],
      type:1,
      amount:'',
      show:false

  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('changeRecord').then(result=>{
             if(result.status==200){
                 that.cash=result.res.cash
                 that.number=result.res.passage
                 that.items=that.items.concat(result.res.record)
             }else if(rsult.status==400){
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
         api.minicart.template.choices('changeBalance',{type:that.type,amount:that.amount,security:pwd}).then(result=>{
             if(result.status==200){
                 alert(result.msg)
                 setTimeout(() => {
                     window.location.reload()
                 }, 1000);
             }else if(result.status==400){
                 alert(result.msg)
             }
         }).catch(err=>{
             alert(this.$t('message.error'))
         })
     },
     submit1(){
         let that=this
         let number=that.amount
         if(number>0){
             that.$refs.child.open(that.show);
         }else {
             alert(this.$t('message.cannot'))
         }
     }
 },
}
</script>

<style scoped>

</style>
