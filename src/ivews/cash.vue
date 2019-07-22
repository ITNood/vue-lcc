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
                <el-input v-model="amount" placeholder="请输入提现金额"></el-input>
            </li>
            <li>
                <p>提现到账</p>
                <h5>${{dollar}} / ￥{{rmb}}</h5>
            </li>
        </ul>
        <el-button class="submit" @click="submit()">确认</el-button>
        </el-tab-pane>
        <el-tab-pane label="提现订单" name="second">
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
</template>

<script>
import Top from "../components/top";
export default {
  components: {
    Top
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
      items:[
          {
              state:2,
              id:1,
              date:'2018/10/2',
              dollar:100,
              rmb:120,
              amount:100

          }
      ]
    };
  }
};
</script>

<style scoped>
</style>
