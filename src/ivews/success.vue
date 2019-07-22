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
                    <p>收款成功</p>
                    <div class="amount">- {{amount}}</div>
                    <p>商户现金</p>
                </div>
                <router-link to="/takeMoney" class="over">完成</router-link>
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
      amount:100
    };
  }
};
</script>

<style scoped>
</style>
