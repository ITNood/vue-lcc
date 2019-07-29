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
            <p>{{$t('message.transfer')}}</p>
          </router-link>
        </el-col>
        <el-col :span="6">
          <router-link to="/exchange">
            <i class="icon iconfont icon-duihuan"></i>
            <p>{{$t('message.exchange')}}</p>
          </router-link>
        </el-col>
        <el-col :span="6">
          <a @click="dialog=true">
            <i class="icon iconfont icon-gouwuche1"></i>
            <p>{{$t('message.buyTb')}}</p>
          </a>
        </el-col>
        <el-col :span="6">
          <router-link to="/salary">
            <i class="icon iconfont icon-qiandai"></i>
            <p>{{$t('message.pay')}}</p>
          </router-link>
        </el-col>
      </el-row>
      <div class="purse">
        <p>{{$t('message.wallet')}}</p>
        <ul class="purseList">
          <li>
            <img src="../assets/img/ctp.png">
            <div class="purseText">
              <h5>CTP</h5>
              <p>{{$t('message.point')}}</p>
            </div>
            <b>{{ctp}}</b>
          </li>
          <li>
            <img src="../assets/img/cash.png">
            <div class="purseText">
              <h5>CASH</h5>
              <p>{{$t('message.cash')}}</p>
            </div>
            <b>{{cash}}</b>
          </li>
          <li>
            <img src="../assets/img/xtb.png">
            <div class="purseText">
              <h5>XTB</h5>
              <p>{{$t('message.tbs')}}</p>
            </div>
            <b>{{ctp}}</b>
          </li>
          <li>
            <img src="../assets/img/ccf.png">
            <div class="purseText">
              <h5>CCF</h5>
              <p>{{$t('message.fund')}}</p>
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
            <p>{{$t('message.cashPoint')}}</p>
            <div>{{cashPoints}}</div>
        </li>
        <li>
            <p>{{$t('message.tbPrice')}}</p>
            <div>${{price}}</div>
        </li>
        <li>
          <p>{{$t('message.share')}}</p>
          <el-input-number
            v-model="number"
            @change="handleChange1"
            :min="1"
          ></el-input-number>
        </li>
        <li>
            <p>{{$t('message.payable')}}</p>
            <div>${{points}}</div>
        </li>
      </ul>
      <el-button class="submit" @click="submit1()">{{$t('message.confirm')}}</el-button>
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
      message: this.$t('message.wallet'),
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
              that.$message.error(this.$t('message.error'))
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
        that.$message.error(this.$t('message.error'))
      })
    }
  }
};
</script>

<style scoped>
</style>
