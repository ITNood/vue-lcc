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
            <span
              class="el-icon-close"
              style="background:#d44328"
            ></span>
            <p>{{$t('message.payfail')}}</p>
            <div class="amount"></div>
            <p>{{error}}</p>
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
      error: ""
    };
  },
  mounted() {
    let that = this;
    let msg = getCookie("errorMsg");
    that.error = msg;
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
