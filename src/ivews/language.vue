<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <div class="selectLang">
            <p>{{$t('message.nowlang')}}</p>
            <el-radio-group v-model="radio1" @change="changeRadio()">
                <el-radio label="1" border>English</el-radio>
                <el-radio label="2" border>简体中文</el-radio>
            </el-radio-group>
            <!-- <el-button class="submit" style="margin-top:120px;">确认</el-button> -->
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
      message: '',
      href: "",
      classIcon: "",
      radio1:'',
    };
  },
  updated() {
    console.log(this.$t('message.language'))
    this.message=this.$t('message.language')
  },
  mounted() {
     let lang=window.localStorage.getItem('lang')
      console.log(lang)
      if(lang==='cn'){
        this.radio1='2'
      }else if(lang==='en') {
        this.radio1='1'
      }
  },
  methods: {
      changeRadio(){
         console.log(this.radio1)
         let that=this
         let number=that.radio1
         if(number==1){
             window.localStorage.setItem("lang", 'en');
             this.$i18n.locale = "en"
             this.radio1='1'
         }else{
            window.localStorage.setItem("lang", 'cn');
            this.$i18n.locale = "cn";
            this.radio1='2'
         }
      }
  },
};
</script>

<style scoped>
</style>
