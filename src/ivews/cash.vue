<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <el-tabs
      v-model="activeName"
      id="tabs"
    >
      <el-tab-pane
        :label="$t('message.shopcash')"
        name="first"
      >
        <ul class="outside">
          <li>
            <p>{{$t('message.mycash')}}</p>
            <h5>￥{{usdt}}</h5>
          </li>
          <li>
            <p>{{$t('message.cashAmount')}}</p>
            <el-input
              v-model="amount"
              v-on:input="change()"
              :placeholder="$t('message.enterAmount')"
            ></el-input>
          </li>
          <li>
            <p>{{$t('message.cashAccount')}}</p>
            <h5>￥{{rmb}}</h5>
          </li>
        </ul>
        <el-button
          class="submit"
          @click="submit1($event)"
        >{{$t('message.confirm')}}</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('message.cashorder')"
        name="second"
      >
        <div class="pubilcOrder">
          <ul class="orderList">
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <a>
                <!-- <div class="status">
                            <h5>{{item.amount}}Usdt</h5>
                            <div class="orderStauts">
                                <span v-if="item.state==1">{{$t('message.matched')}}</span>
                                <span v-if="item.state==1">{{$t('message.ing')}}</span>
                                <span v-else-if="item.state==2">{{$t('message.end')}}</span>
                                <span v-else-if="item.state==3">{{$t('message.cancel')}}</span>
                                <span v-else-if="item.state==5">{{$t('message.ing')}}</span>
                                <i class="el-icon-arrow-right"></i>
                            </div>
                        </div> -->
                <el-row :gutter="15">
                  <el-col :span="8">
                    <div class="orderContent">
                      <p>{{$t('message.time')}}</p>
                      <dd>{{item.date}}</dd>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="orderContent textCenter">
                      <p>{{$t('message.cashAmount')}}</p>
                      <dd>{{item.amount}}</dd>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="orderContent textRight">
                      <p>{{$t('message.status')}}</p>
                      <dd v-if="item.state==1">{{$t('message.ing')}}</dd>
                      <dd v-else-if="item.state==2">{{$t('message.end')}}</dd>
                      <dd v-else-if="item.state==3">{{$t('message.cancel')}}</dd>
                    </div>
                  </el-col>
                </el-row>
              </a>
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
import Pin from "../components/pin";
import Top from "../components/top";
import api from "../API/index";
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/shopCenter",
      message: this.$t("message.shopcash"),
      href: "",
      classIcon: "",
      activeName: "first",
      usdt: 0,
      dollar: 0,
      rmb: 0,
      amount: "", //这个传跟密码
      show: false,
      fee: "",
      rate: "",
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
        .choices("cashWithdrwaRecord")
        .then(result => {
          if (result.status == 200) {
            that.usdt = result.res.balance;
            that.fee = result.res.fee;
            that.rate = result.res.rate;

            //提现订单
            that.items = that.items.concat(result.res.record);
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    },
    change(val) {
      // console.log(this.amount)
      let that = this;
      let number = that.amount;
      that.dollar = number * that.rate;
      that.rmb = number * that.fee;
    },
    submit(pwd) {
      // console.log(pwd+this.amount)
      let that = this;
      api.minicart.template
        .choices("cashWithdrwaSubmit", { amount: that.amount, security: pwd })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
            window.location.reload()
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    },
    submit1() {
      let that = this;
      let number = that.amount;
      if (number) {
        that.$refs.child.open(that.show);
      } else {
        alert(this.$t("message.enterAmount"));
      }
    }
  }
};
</script>

<style scoped>
</style>
