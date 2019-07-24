<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div
      class="container"
      style="margin-bottom:0;"
    >
      <el-row
        :gutter="15"
        class="asssts"
      >
        <el-col :span="6">
          <router-link to="/points">
            <i class="icon iconfont icon-zhuanhuan"></i>
            <p>转账</p>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/exchange">
            <i class="icon iconfont icon-duihuan"></i>
            <p>兑换</p>
          </router-link>
        </el-col>
        <el-col :span="6">
          <a @click="dialog=true">
            <i class="icon iconfont icon-gouwuche1"></i>
            <p>买入通宝</p>
          </a>
        </el-col>
        <el-col :span="6">
          <router-link to="/salary">
            <i class="icon iconfont icon-qiandai"></i>
            <p>薪酬</p>
          </router-link>
        </el-col>
      </el-row>
      <div class="purse">
        <p>钱包资产</p>
        <ul class="purseList">
          <li>
            <img src="../assets/img/ctp.png">
            <div class="purseText">
              <h5>CTP</h5>
              <p>通行积分</p>
            </div>
            <b>{{ctp}}</b>
          </li>
          <li>
            <img src="../assets/img/cash.png">
            <div class="purseText">
              <h5>CASH</h5>
              <p>现金积分</p>
            </div>
            <b>{{cash}}</b>
          </li>
          <li>
            <img src="../assets/img/xtb.png">
            <div class="purseText">
              <h5>XTB</h5>
              <p>兴源通宝</p>
            </div>
            <b>{{ctp}}</b>
          </li>
          <li>
            <img src="../assets/img/ccf.png">
            <div class="purseText">
              <h5>CCF</h5>
              <p>通证基金</p>
            </div>
            <b>{{ctp}}</b>
          </li>
        </ul>
      </div>
    </div>

    <!--买入通宝-->
    <el-dialog
      :visible.sync="dialog"
      width="80%"
      id="buyer"
      center
    >
    <ul class="lccList">
        <li>
            <p>我的现金积分</p>
            <div>{{cashPoints}}</div>
        </li>
        <li>
            <p>兴源通宝单价</p>
            <div>${{price}}</div>
        </li>
        <li>
          <p>交易份额</p>
          <el-input-number
            v-model="number"
            @change="handleChange1"
            :min="1"
          ></el-input-number>
        </li>
        <li>
            <p>应付现金积分</p>
            <div>${{points}}</div>
        </li>
      </ul>
      <el-button class="submit" @click="submit1()">确认</el-button>
    </el-dialog>
  <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import Pin from '../components/pin'
import api from "../API/index";
import Top from "../components/top";
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/home",
      message: "钱包资产",
      href: "",
      classIcon: "",
      ctp: "0.00",
      cash: "0.00",
      xtb: "0.00",
      ccf: "0.00",
      dialog: false,
      number:1,
      points:0,
      price:0,
      cashPoints:0,
      show:false
    };
  },
  mounted() {
    this.getData();
    this.getResult()
  },
  updated() {
      let number=this.number
        console.log(number)
        this.points=number*this.price
  },
  methods: {
      getResult(){
          let that=this
          api.minicart.template.choices('tongbaoRecord').then(result=>{
              if(result.status==200){
                  that.cashPoints=result.res.cash
                  that.price=result.res.price
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误!')
          })
      },
      handleChange1(){
          let that=this
          let number=that.number
          that.points=number*that.price
      },
    getData() {
      let that = this;
      api.minicart.template
        .choices("home/myAssets")
        .then(result => {
          if (result.status == 200) {
            that.ctp = result.res.ctp;
            that.cash = result.res.cash;
            that.xtb = result.res.xtb;
            that.ccf = result.res.ccf;
          }
        })
        .catch(err => {});
    },
    submit1(){
        let that=this
        that.$refs.child.open(that.show);
        that.dialog=false
    },
    submit(pwd){
      let that=this
      api.minicart.template.choices('tongbaoCreate',{number:that.number,security:pwd}).then(result=>{
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
  }
};
</script>

<style scoped>
</style>
