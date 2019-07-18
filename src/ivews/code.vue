<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div
      class="container"
      style="margin-top:70px;"
    >
      <div class="codeContent">
        <h5>向商家付款<i class="one"></i><i class="two"></i></h5>
        <img :src="code">
        <p>扫一扫，即可付款</p>
        <ul class="know" style="margin-top:50px;">
          <p>温馨提示：</p>
          <li>本二维码在一分钟内有效，请将此二维码给予商家扫描。</li>
          <li>付款后将自动扣除等值FC</li>
        </ul>
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
      url: "/lcc",
      message: "二维码付款",
      href: "",
      classIcon: "",
      code: ""
    };
  }
};
</script>

<style scoped>
</style>
