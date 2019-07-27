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
                    <p>{{$t('message.collection')}}</p>
                    <div class="amount">- {{amount}}</div>
                    <p>{{$t('message.business')}}</p>
                </div>
                <router-link to="/takeMoney" class="over">{{$t('message.complete')}}</router-link>
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
  },
  mounted() {
    let msg=window.localStorage.getItem('success')
    this.amount=msg
  },
};
</script>

<style scoped>
</style>
