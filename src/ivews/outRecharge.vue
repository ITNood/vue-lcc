<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs
      v-model="activeName"
      id="tabs"
    >
      <el-tab-pane
        :label="$t('message.usdtRec')"
        name="first"
      >
        <ul class="outside">
          <li>
            <p>{{$t('message.myusdt')}}</p>
            <h5>{{usdt}}</h5>
          </li>
          <li>
            <p>{{$t('message.numberRec')}}</p>
            <el-input
              v-model="amount"
              v-on:input="change"
              :placeholder="$t('message.enternumberRec')"
            ></el-input>
          </li>
          <li>
            <p>{{$t('message.needpay')}}</p>
            <h5><span>$</span>{{dollar}} / <span>￥</span>{{rmb}}</h5>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('message.recOrder')"
        name="second"
      >
        <div class="pubilcOrder">
          <ul class="orderList">
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <router-link :to="item.state==1 || item.state==3 || item.state==4 ? '':{path:'/rechargeOrder',query:{id:item.id}}">
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
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />

  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
import Pin from "../components/pin";
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/usdt",
      message: this.$t('message.outRecharge'),
      href: "",
      classIcon: "",
      activeName: "first",
      usdt: "0.00",
      amount: "",
      dollar: "0.00",
      rmb: "0.00",
      fee: "",
      rate: "",
      show: false,
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      api.minicart.template
        .choices("recharge/order")
        .then(result => {
          if (result.status == 200) {
            that.usdt = result.res.register;
            that.fee = result.res.fee;
            that.rate = result.res.rate;
            //充值订单
            that.items = that.items.concat(result.res.record);
          } else if (result.status == 400) {
          }
        })
        .catch(err => {
          that.$message.error(this.$t('message.error'));
        });
    },
    change() {
      let that = this;
      let number = that.amount;
      that.dollar = Math.floor((number * that.rate * 100) / 100).toFixed(2);
      that.rmb = Math.floor((number * that.fee * 100) / 100).toFixed(2);
    },
    submit(pwd) {
      let that = this;
      let number = that.amount;
      api.minicart.template
        .choices("recharge/create", { amount: number, security: pwd })
        .then(result => {
          if (result.status == 200) {
            that.$message.success(result.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t('message.error'));
        });
    },
    submit1() {
      let that = this;
      let number = that.amount;
      if (number > 0) {
        that.$refs.child.open(that.show);
      } else {
        that.$message.warning(this.$t('message.should'));
      }
    }
  }
};
</script>

<style scoped>
</style>
