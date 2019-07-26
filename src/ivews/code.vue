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
      style="margin-top:70px;"
    >
      <div class="codeContent">
        <h5>{{$t('message.payment')}}<i class="one"></i><i class="two"></i></h5>
        <img :src="code">
        <p>{{$t('message.sweep')}}</p>
        <ul
          class="know"
          style="margin-top:50px;"
        >
          <p>{{$t('message.reminder')}}：</p>
          <li>{{$t('message.minute')}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/lcc",
      message: this.$t('message.codePay'),
      href: "",
      classIcon: "",
      code: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      api.minicart.template
        .choices("myPayCode")
        .then(result => {
          if (result.status == 200) {
            that.code = result.res.img;
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t('message.error'));
        });
    },
    //-----------------------------------------------
    WebSocketTest() {
      if ("WebSocket" in window) {
        // console.log("您的浏览器支持 WebSocket!");
        // 打开一个 web socket
        var ws = new WebSocket("ws://www.hsfc.com:2350");
        ws.onopen = function() {
          var json = JSON.stringify({
            token: window.localStorage.getItem("token"),
            //'id': getQueryString("id"),
            //'type': getQueryString("type"),
            heartbeat: 1
          });
          ws.send(json);
          var t1 = window.setInterval(function() {
            ws.send(json);
          }, 30000);
        };

        ws.onmessage = function(evt) {
          console.log(JSON.parse(evt.data));
          var data = JSON.parse(evt.data);
          // var data=evt.data
          if (data.res.status == 200) {
            window.localStorage.setItem("amount", data.res.amount);
            this.$router.push('/paySuccess')
          } else if (data.res.status == 400) {
            window.localStorage.setItem("errorMsg", data.res.msg);
            this.$router.push('/payError')
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
    }
  }
};
</script>

<style scoped>
</style>
