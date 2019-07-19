<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <div class="about">
        <div class="aboutContent">
            <div class="aboutfont">
                <img src="../assets/img/about.png">
                <p>After one hundred, when art historians research in the 21st century, in the currency of the encryption image is likely to be an integral part of their discussion. In the discussion, the currency and its ubiquitous icon will become an important topic. The COINS to the encrypted currency world, basic equivalent to $to the mainstream of the global economic system.</p>
                <div class="downloadCode"><img :src="code" ></div>
                <div class="codefont">扫一扫，下载FC TOKEN</div>
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
      url: "/my",
      message: "关于我们",
      href: "",
      classIcon: "",
      code:require('../assets/img/code.jpg')
    };
  }
};
</script>

<style scoped>
</style>
