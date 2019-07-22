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
            <el-tab-pane label="信用余额" name="first">
                <div class="pointsAccount">
                <el-row>
                    <el-col :span="12">
                        <div class="bag" style="border-right:1px solid #313743">
                            <p>美金额度</p>
                            <h5>${{dollar}}</h5>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bag">
                            <p>人民币额度</p>
                            <h5>￥{{rmb}}</h5>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <ul class="getSalary">
                <li>
                    <p>信用额度</p>
                    <div class="get-out">
                        <el-input v-model="amount" placeholder="请输入您需充值的信用额度"></el-input>
                        <el-button class="take" @click="getAll()">全部取出</el-button>
                    </div>
                </li>
            </ul>
            <el-button class="submit" @click="submit()">确认</el-button>
            </el-tab-pane>
            <el-tab-pane label="充值订单" name="second">
                <div class="pubilcOrder">
            <ul class="orderList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.state==1 || item.state==5 ? '':{path:'/serviceRecharge',query:{id:item.id}}">
                        <div class="status">
                            <h5>{{item.amount}}Usdt</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">匹配中</span>
                                <span v-else-if="item.state==2">进行中</span>
                                <span v-else-if="item.state==3"></span>
                                <span v-else-if="item.state==4"></span>
                                <span v-else-if="item.state==5"></span>
                                <span v-else-if="item.state==6"></span>
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
                                    <p>充值总额Usdt / Rmb</p>
                                    <dd>${{item.dollar}} / ￥{{item.rmb}}</dd>
                                </div>
                            </el-col>
                        </el-row>
                    </router-link>
                </li>
            </ul>
        </div>
            </el-tab-pane>
            <el-tab-pane label="提现订单" name="third">
                 <div class="pubilcOrder">
            <ul class="orderList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.state==1 || item.state==5 ? '':{path:'/serviceRecharge',query:{id:item.id}}">
                        <div class="status">
                            <h5>{{item.amount}}Usdt</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">匹配中</span>
                                <span v-else-if="item.state==2">进行中</span>
                                <span v-else-if="item.state==3"></span>
                                <span v-else-if="item.state==4"></span>
                                <span v-else-if="item.state==5"></span>
                                <span v-else-if="item.state==6"></span>
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
                                    <dd>${{item.dollar}} / ￥{{item.rmb}}</dd>
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
  </div>
</template>

<script>
import api from '../API/index'
import Top from "../components/top";

export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/my",
      message: "服务中心",
      href: "",
      classIcon: "",
      activeName:'first',
      dollar:0,
      rmb:0,
      amount:'',
      items:[
          {
              state:2,
              id:1,
              date:'2018/10/2',
              dollar:100,
              rmb:120

          }
      ]
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
              }
          }).catch(err=>{
              that.$message.error('错误!')
          })
      },
       //全部取出
     getAll(){
         let that=this
         let rmb=that.rmb
         if(rmb>0){
            that.amount=rmb
         }else{
             that.$message.warning('余额为0，请充值！')
         }
         
     },
     
     //信用余额
     submit(){
         let that=this
         let number=that.amount
         api.minicart.template.choices('changeBalance',{amount:number,type:3}).then(result=>{
             if(result.status==200){
                 that.$message.success(result.msg)
                 window.location.reload()
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     }
  },
};
</script>

<style scoped>
</style>
