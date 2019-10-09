<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <div class="container">
      <div class="takeMoney">
        <!-- <div class="usernamePhoto">
          <img :src="imgSrc">
        </div> -->
        <div class="moneyInput">
          <p>{{$t('message.payamount')}}</p>
          <div class="amount"><span></span>{{amount}}</div>
        </div>
      </div>
    </div>
    <!--键盘-->
    <div class="key">
      <ul>
        <li
          v-for="val in items"
          :key="val"
          @click="handlekeys($event)"
        >
          {{val}}
        </li>
        <li
          class="del"
          @click="del"
        >
          <span class="el-icon-back"></span>
        </li>
      </ul>
      <el-button
        class="submit"
        style="width:85%;margin:30px auto;display:block"
        @click="submit1()"
      >{{$t('message.confirm')}}</el-button>
    </div>
    <!--密码组件-->
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
  </div>

</template>

<script>
import Top from "../components/top";
import api from "../API/index";
import Pin from "../components/pin";
import { Loading } from "element-ui";
const items = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0];
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/my",
      message: this.$t("message.payCode"),
      href: "",
      classIcon: "",
      //imgSrc: require("../assets/img/photo.png"),
      amount: "",
      items: items(),
      number: [],
      code: "",
      show: false,
      pwd: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let code = localStorage.getItem("resultCode");
      that.code = code;
    },
    WebSocketTest() {
      let load = Loading.service({ fullscreen: true, text: "Loading..." });
      let that = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        // 打开一个 web socket
        var ws = new WebSocket("ws://66.42.54.253:2351"); //66.42.54.253  192.168.0.105
        ws.onopen = function() {
          console.log(111);
          var json = JSON.stringify({
            token: localStorage.getItem("token"),
            type: 2,
            str: that.code,
            amount: that.amount,
            pwd: that.pwd
          });

          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(json);
          //   var t1 = window.setInterval(function() {
          //     ws.send(JSON.stringify({ type: 3 }));
          //   }, 30000);
          console.log("数据发送中...");
        };
        ws.onerror = function(error) {
          console.log("错误");
          console.log(error);
        };
        //接收数据
        ws.onmessage = function(evt) {
            console.log(evt)
          let result = JSON.parse(evt.data);
          console.log(result);
          if (result.status == 200) {
            load.close();
             localStorage.setItem("paymentSucc", JSON.stringify(result.res.fc));
            window.location.href = "#/paymentSucc";
            localStorage.removeItem('resultCode')
          } else if (result.status == 400) {
            load.close();
            // localStorage.setItem("paymentErr", JSON.stringify());
            that.$store.commit("setpaymentSucc",result.msg)
            window.location.href = "#/paymentErr";
            localStorage.removeItem('resultCode')
          }
        };

        ws.onclose = function() {
          // 关闭 websocket
          console.log("连接已关闭...");
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    },
    submit1() {
      let that = this;
      let number = that.amount;
      if (number > 0) {
        that.$refs.child.open(that.show);
      } else {
        alert(that.$t("message.paymuch"));
      }
    },
    submit(pwd) {
      this.pwd = pwd;
      this.WebSocketTest();
      //   let that = this;
      //   console.log(that.amount);
      //   //alert(that.code)
      //   api.minicart.template
      //     .choices({ str: that.code, amount: that.amount })
      //     .then(result => {
      //       if (result.status == 200) {
      //         window.localStorage.setItem("paymentSucc", JSON.stringify('that.amount'));
      //         //delCookie('code')//提交成功后删除code
      //         localStorage.removeItem('code')
      //         setTimeout(() => {
      //           that.$router.push("/success");
      //         }, 500);
      //       } else if (result.status == 400) {
      //         window.localStorage.setItem("paymentErr", JSON.stringify('result.msg'));
      //         //delCookie('code')//提交失败后删除code
      //         localStorage.removeItem('code')
      //         setTimeout(() => {
      //           that.$router.push("/error");
      //         }, 500);
      //       }
      //     })
      //     .catch(err => {
      //       alert(this.$t("message.error"));
      //     });
    },

    handlekeys(ev) {
      let text = ev.currentTarget.innerText;
      this.amount += text;
      this.number = this.amount;
      //   console.log(this.number)
      //   console.log(text)
      let len = this.number.length;
      // console.log(len)
    },
    del() {
      let len = this.amount.toString();
      let number = len.substr(0, len.length - 1);
      this.amount = number;
      if (len <= 0) {
        return false;
      }
      // console.log(len)
    }
  }
};
</script>

<style scoped>
</style>
