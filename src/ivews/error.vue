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
                    <p>收款失败</p>
                    <div class="amount"></div>
                    <p>{{error}}</p>
                </div>
                <router-link to="/takeMoney" class="over">完成</router-link>
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
      url: "/code",
      message: "",
      href: "",
      classIcon: "",
      error:''
    };
  },
  
};
</script>

<style scoped>
</style>
