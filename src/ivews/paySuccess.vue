<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
      <div class="payPublic">
        <div class="paybg">
          <i></i>
          <i></i>
          <div class="payContent">
            <span class="el-icon-check"></span>
            <p>{{$t('message.successful')}}</p>
            <div class="amount">- {{amount}}</div>
            <p>{{$t('message.pass')}}</p>
          </div>
          <router-link
            to="/code"
            class="over"
          >{{$t('message.complete')}}</router-link>
        </div>
      </div>
    </div>
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
      url: "/code",
      message: "",
      href: "",
      classIcon: "",
      amount: ""
    };
  },
  mounted() {
    let that = this;
    let amount = getCokie("amount");
    that.amount = amount;
  }
};
//获取cookie
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}
</script>

<style scoped>
</style>
