<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <el-tabs v-model="activeName" id="serviceTabs">
            <el-tab-pane :label="$t('message.credit')" name="first">
                <div class="pointsAccount">
                <el-row>
                    <el-col :span="12">
                        <div class="bag" style="border-right:1px solid #313743">
                            <p>{{$t('message.dollar')}}</p>
                            <h5>${{dollar}}</h5>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bag">
                            <p>{{$t('message.rmb')}}</p>
                            <h5>￥{{rmb}}</h5>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <ul class="getSalary">
                <li>
                    <p>{{$t('message.creditLine')}}</p>
                    <div class="get-out">
                        <el-input v-model="amount" :placeholder="$t('message.enterCredit')"></el-input>
                        <el-button class="take" @click="getAll()">{{$t('message.getAll')}}</el-button>
                    </div>
                </li>
            </ul>
            <el-button class="submit" @click="submit1()">{{$t('message.confirm')}}</el-button>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.recOrder')" name="second">
                <div class="pubilcOrder">
            <ul class="orderList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.state==1 || item.state==5 ? '':{path:'/serviceRecharge',query:{id:item.id}}">
                        <div class="status">
                            <h5>{{item.amount}}Usdt</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">{{$t('message.matched')}}</span>
                                <span v-else-if="item.state==2">{{$t('message.ing')}}</span>
                                <span v-else-if="item.state==3">{{$t('message.end')}}</span>
                                <span v-else-if="item.state==4">{{$t('message.cancel')}}</span>
                                <span v-else-if="item.state==5">{{$t('message.ing')}}</span>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <div class="orderContent">
                                    <p>{{$t('message.time')}}</p>
                                    <dd>{{item.date}}</dd>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="orderContent textRight">
                                    <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                                    <dd>${{item.usdt}} / ￥{{item.rmb}}</dd>
                                </div>
                            </el-col>
                        </el-row>
                    </router-link>
                </li>
            </ul>
        </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('message.cashorder')" name="third">
                 <div class="pubilcOrder">
            <ul class="orderList">
                <li v-for="(item,index) in todos" :key="index">
                    <router-link :to="item.state==1 || item.state==3 || item.state==4 ? '':{path:'/serviceCash',query:{id:item.id}}">
                        <div class="status">
                            <h5>{{item.amount}}FC</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">{{$t('message.matched')}}</span>
                                <span v-else-if="item.state==2">{{$t('message.ing')}}</span>
                                <span v-else-if="item.state==3">{{$t('message.end')}}</span>
                                <span v-else-if="item.state==4">{{$t('message.cancel')}}</span>
                                <span v-else-if="item.state==5">{{$t('message.ing')}}</span>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <div class="orderContent">
                                    <p>{{$t('message.time')}}</p>
                                    <dd>{{item.date}}</dd>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="orderContent textRight">
                                    <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                                    <dd>${{item.usdt}} / ￥{{item.rmb}}</dd>
                                </div>
                            </el-col>
                        </el-row>
                    </router-link>
                </li>
            </ul>
        </div>
            </el-tab-pane>
        </el-tabs>
    </div>
     <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import api from '../API/index'
import Top from "../components/top";
import Pin from '../components/pin'

export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/my",
      message: this.$t('message.service'),
      href: "",
      classIcon: "",
      activeName:'first',
      dollar:0,
      rmb:0,
      amount:'',
      items:[],
      todos:[],
      show:false
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
      getData(){
          let that=this
          api.minicart.template.choices('service').then(result=>{
              if(result.status==200){
                  that.dollar=result.res.dollars
                  that.rmb=result.res.advance
                  //充值订单
                  if(result.res.rechargeOrder){
                      that.items=that.items.concat(result.res.rechargeOrder)
                  }
                  if(result.res.withdrawOrder){
                      that.todos=that.todos.concat(result.res.withdrawOrder)
                  }
              }
          }).catch(err=>{
              alert(that.$t('message.error'))
          })
      },
       //全部取出
     getAll(){
         let that=this
         let rmb=that.dollar
         if(rmb>0){
            that.amount=rmb
         }else{
             alert(taht.$t('message.it'))
         }
         
     },
     
     //信用余额
     submit(pwd){
         let that=this
         let number=that.amount
         api.minicart.template.choices('changeBalance',{amount:number,type:3,security:pwd}).then(result=>{
             if(result.status==200){
                 alert(result.msg)
                 setTimeout(() => {
                     window.location.reload()
                 }, 1000);
             }else if(result.status==400){
                 alert(result.msg)
             }
         }).catch(err=>{
             alert(that.$t('message.error'))
         })
     },
     submit1(){
         let that=this
         let number=that.amount
         if(number>0){
             that.$refs.child.open(that.show);
         }else {
             alert(that.$t('message.should'))
         }
     }
  },
};
</script>

<style scoped>
</style>
