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
                    <p>{{$t('message.payfail')}}</p>
                    <div class="amount"></div>
                    <p>{{error}}</p>
                </div>
                <router-link to="/code" class="over">{{$t('message.complete')}}</router-link>
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
      error:'',
     
    };
  },
  mounted() {
    let that=this
    let msg=window.localStorage.getItem('errorMsg')
    that.error=msg
  },
};
</script>

<style scoped>
</style>
