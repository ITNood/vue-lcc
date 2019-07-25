<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <div class="shop">
      <div class="shopCash">
        <p>我的商户现金</p>
        <h5><span>$</span>{{dollar}}</h5>
        <p>￥{{rmb}}</p>
      </div>
      <el-row>
        <el-col
          :span="12"
          class="cashList"
        >
          <h6>${{data}}</h6>
          <p>今日收入</p>
        </el-col>
        <el-col
          :span="12"
          class="cashList"
        >
          <h6>${{week}}</h6>
          <p>本周收入</p>
        </el-col>
      </el-row>
    </div>
    <div class="shoper">
      <div class="shopbg">
        <a @click="scan()">
          <i class="icon iconfont icon-saoyisao"></i>
          <span class="el-icon-arrow-right"></span>
          扫一扫收款
        </a>
        <router-link to="/cash">
          <i class="icon iconfont icon-qianbao2"></i>
          <span class="el-icon-arrow-right"></span>
          商户现金提现
        </router-link>

        <router-link to="/cashBill">
          <i class="icon iconfont icon-zhangdan"></i>
          <span class="el-icon-arrow-right"></span>
          商户现金账单
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import api from "../API/index";
import jsBridge from '../assets/js/jsbridge-mini.js'
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/my",
      message: "商家中心",
      href: "",
      classIcon: "",
      dollar: 0,
      rmb: 0,
      data: 0,
      week: 0,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      api.minicart.template
        .choices("cashWithdrwaRecord")
        .then(result => {
          if (result.status == 200) {
            that.dollar = result.res.balance;
            that.rmb = result.res.yuan;
            that.data = result.res.today;
            that.week = result.res.week;
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error("错误!");
        });
    },
    scan() {
      jsBridge.scan(
        {
          needResult: true //默认为false，扫描结果由App处理；true则直接返回扫描结果
        },
        function(code) {
          if (code) {
            window.localStorage.setItem("code", code);
            this.$router.push('/takeMoney')
          } else {
            alert("扫码失败或取消了扫码");
          }
        }
      );
    }
  }
};
</script>

<style scoped>
</style>
