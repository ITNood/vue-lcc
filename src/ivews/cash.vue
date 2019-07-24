<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane label="商户现金提现" name="first">
             <ul class="outside">
            <li>
                <p>我的商户现金</p>
                <h5>${{usdt}}</h5>
            </li>
            <li>
                <p>提现金额</p>
                <el-input v-model="amount" v-on:input="change()" placeholder="请输入提现金额"></el-input>
            </li>
            <li>
                <p>提现到账</p>
                <h5>${{dollar}} / ￥{{rmb}}</h5>
            </li>
        </ul>
        <el-button class="submit" @click="submit1($event)">确认</el-button>
        </el-tab-pane>
        <el-tab-pane label="提现订单" name="second">
             <div class="pubilcOrder">
            <ul class="orderList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.state==1 || item.state==3  || item.state==4 ? '':{path:'/serviceRecharge',query:{id:item.id}}">
                        <div class="status">
                            <h5>{{item.amount}}Usdt</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">待匹配</span>
                                <span v-else-if="item.state==2">进行中</span>
                                <span v-else-if="item.state==3">已完成</span>
                                <span v-else-if="item.state==4">已取消</span>
                                <span v-else-if="item.state==5">进行中</span>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div>
                        <el-row :gutter="15">
                            <el-col :span="12">
                                <div class="orderContent">
                                    <p>时间</p>
                                    <dd>{{item.date}}</dd>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="orderContent textRight">
                                    <p>提现总额Usdt / Rmb</p>
                                    <dd>${{item.dollar}} / ￥{{item.yuan}}</dd>
                                </div>
                            </el-col>
                        </el-row>
                    </router-link>
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
import Top from "../components/top";
import api from '../API/index'
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/shopCenter",
      message: "提现",
      href: "",
      classIcon: "",
      activeName:'first',
      usdt:0,
      dollar:0,
      rmb:0,
      amount:'',//这个传跟密码
      show:false,
      fee:'',
      rate:'',
      items:[]
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
      getData(){
          let that=this
          api.minicart.template.choices('cashWithdrwaRecord').then(result=>{
              if(result.status==200){
                  that.usdt=result.res.balance
                  that.fee=result.res.fee
                  that.rate=result.res.rate

                  //提现订单
                  that.items=that.items.concat(result.res.record)
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误!')
          })
      },
      change(val){
         // console.log(this.amount)
          let that=this
          let number=that.amount
          that.dollar=number*that.rate
          that.rmb=number*that.fee
      },
      submit(pwd){
     // console.log(pwd+this.amount)
         let that=this
             api.minicart.template.choices('cashWithdrwaSubmit',{amount:that.amount,security:pwd}).then(result=>{
             if(result.status==200){
                 that.$message.success(result.msg)
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
         
      },
      submit1(){
          let that=this
          let number=that.amount
         if(number){
         that.$refs.child.open(that.show);
         }else{
             that.$message.warning('请输入提现金额！')
         }
      }
  },
};
</script>

<style scoped>
</style>
