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
                <div class="codefont">{{$t('message.downloadFc')}}</div>
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
      url: "/my",
      message: '',
      href: "",
      classIcon: "",
      code:''
    };
  },
  updated() {
    this.message=this.$t('message.about')
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('uploadAddress').then(result=>{
        if(result.status==200){
          that.code=result.res.img
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
