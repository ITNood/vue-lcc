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
            <p>当前语言</p>
            <el-radio-group v-model="radio1" @change="changeRadio()">
                <el-radio label="1" border>English</el-radio>
                <el-radio label="2" border>简体中文</el-radio>
            </el-radio-group>
            <el-button class="submit" style="margin-top:120px;">确认</el-button>
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
      message: "切换语言",
      href: "",
      classIcon: "",
      radio1:'1',
    };
  },
  mounted() {
      
  },
  methods: {
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
};
</script>

<style scoped>
</style>
