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
            <p>{{$t('message.paymentsucc')}}</p>
            <div class="amount">- {{amount}}</div>
            <!-- <p>{{$t('message.business')}}</p> -->
          </div>
          <router-link
            to="/my"
            class="over"
          >{{$t('message.complete')}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
// import {mapState} from 'vuex'/
export default {
  components: {
    Top
  },
//     computed:({
//       ...mapState(["paymentSucc"])
//   }),
  data() {
    return {
      url: "/my",
      message: "",
      href: "",
      classIcon: "",
      amount: ''
    };
  },
  mounted() {
    console.log(this.$store.state.paymentSucc)
    //let msg = window.localStorage.getItem("paymentSucc");
    this.amount = this.$store.state.paymentSucc;
  }
};
</script>

<style scoped>
</style>
