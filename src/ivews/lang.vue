<template>
  <div class="home lang">
    <div class="content">
      <div style="padding:0 50px;">
        <img src="../assets/img/logo.png">
        <h4>Borderless language</h4>
        <h4>communication</h4>
        <h4>barrier</h4>
        <i></i>
        <el-row :gutter="15">
            <el-col :span="12"><el-button @click="changEn()" class="language active">English</el-button></el-col>
            <el-col :span="12"><el-button @click="changCn()" class="language">简体中文</el-button></el-col>
        </el-row>
        <p>{{$t('message.text')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabPosition: 'English'
    };
  },
  //   created() {
  //       localStorage.lang == undefined ? "cn" : localStorage.lang;
  //   },
  methods: {
    changEn(en) {
      localStorage.setItem("lang", en);
      this.$i18n.locale = "en"
    },
    changCn(cn) {
      localStorage.setItem("lang", cn);
      this.$i18n.locale = "cn";
    }
  },
  created(){
        let that = this;
        console.log(localStorage.lang)
        localStorage.lang == undefined ? 'cn':localStorage.lang}
};
</script>

<style scoped>
</style>
