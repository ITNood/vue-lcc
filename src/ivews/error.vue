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
                    <span class="el-icon-close" style="background:#d44328"></span>
                    <p>{{$t('message.fail')}}</p>
                    <div class="amount"></div>
                    <p>{{error}}</p>
                </div>
                <router-link to="/shopCenter" class="over">{{$t('message.complete')}}</router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../API/index'
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/shopCenter",
      message: "",
      href: "",
      classIcon: "",
      error:''
    };
  },
  mounted() {
    let msg=window.localStorage.getItem("error")
    //alert(msg)
    this.error=msg
  },
  
};
//获取cookie
function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	}
	return "";
};
</script>

<style scoped>
</style>
