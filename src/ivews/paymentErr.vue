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
                    <p>{{$t('message.paymenterr')}}</p>
                    <div class="amount"></div>
                    <p>{{error}}</p>
                </div>
                <router-link to="/my" class="over">{{$t('message.complete')}}</router-link>
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
      url: "/my",
      message: "",
      href: "",
      classIcon: "",
      error:''
    };
  },
  mounted() {
    console.log(this.$store.state.paymentErr)
    let msg=window.localStorage.getItem("paymentErr")
    //alert(msg)
    this.error=msg
  },
  
};
</script>

<style scoped>
</style>
