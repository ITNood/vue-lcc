<template>
  <div class="home lang">
    <div class="content">
      <div style="padding:0 50px;">
        <img src="../assets/img/logo1.png">
        <h4>Borderless language</h4>
        <h4>communication</h4>
        <h4>barrier</h4>
        <i></i>
        <!-- <el-row :gutter="15">
            <el-col :span="12"><el-button @click="changEn()" class="language active">English</el-button></el-col>
            <el-col :span="12"><el-button @click="changCn()" class="language">简体中文</el-button></el-col>
        </el-row> -->
        <div class="selectLang">
        <el-radio-group v-model="radio1" @change="changeRadio()">
                <el-radio label="1" border>English</el-radio>
                <el-radio label="2" border>简体中文</el-radio>
        </el-radio-group>
        </div>
        <router-link to="/login" style="color:white"><el-button class="submit">{{$t('message.login')}}</el-button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1:'1'
    };
  },
  methods: {
    // changEn() {
    //   window.localStorage.setItem("lang", 'en');
    //   this.$i18n.locale = "en"
    // },
    // changCn() {
    //   window.localStorage.setItem("lang", 'cn');
    //   this.$i18n.locale = "cn";
    // }
    changeRadio(){
         console.log(this.radio1)
         let that=this
         let number=that.radio1
         if(number==1){
             window.localStorage.setItem("lang", 'en');
             this.$i18n.locale = "en"
         }else{
            window.localStorage.setItem("lang", 'cn');
            this.$i18n.locale = "cn";
         }
      }
  },
  created(){
        let that = this;
        localStorage.lang == undefined ? 'cn':localStorage.lang
    }
};
</script>

<style scoped>
</style>
