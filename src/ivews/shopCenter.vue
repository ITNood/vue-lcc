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
        <p>{{$t('message.mycash')}}</p>
        <h5><span>$</span>{{dollar}}</h5>
        <p>￥{{rmb}}</p>
      </div>
      <el-row>
        <el-col
          :span="12"
          class="cashList"
        >
          <h6>${{data}}</h6>
          <p>{{$t('message.dayincome')}}</p>
        </el-col>
        <el-col
          :span="12"
          class="cashList"
        >
          <h6>${{week}}</h6>
          <p>{{$t('message.weekincome')}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="shoper">
      <div class="shopbg">
        <a @click="scan()">
          <i class="icon iconfont icon-saoyisao"></i>
          <span class="el-icon-arrow-right"></span>
          {{$t('message.clean')}}
        </a>
        <router-link to="/cash">
          <i class="icon iconfont icon-qianbao2"></i>
          <span class="el-icon-arrow-right"></span>
          {{$t('message.shopcash')}}
        </router-link>

        <router-link to="/cashBill">
          <i class="icon iconfont icon-zhangdan1"></i>
          <span class="el-icon-arrow-right"></span>
          {{$t('message.cashbill')}}
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
      message: this.$t('message.shoper'),
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
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t('message.error'));
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
            alert(this.$t('message.sweepFail'));
          }
        }
      );
    }
  }
};
</script>

<style scoped>
</style>
