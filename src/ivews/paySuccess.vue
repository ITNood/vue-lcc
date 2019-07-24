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
                    <p>支付成功</p>
                    <div class="amount">- {{amount}}</div>
                    <p>兴源通证</p>
                </div>
                <router-link to="/code" class="over">完成</router-link>
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
      amount:''
    };
  },
  mounted() {
    let that=this
    let amount=window.localStorage.getItem('amount')
    that.amount=amount
  },
};
</script>

<style scoped>
</style>
