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
      style="margin-bottom:0;"
    >
      <div class="recharge">
        <div class="rechargeContent">
          <p>{{$t('message.type')}}: {{cut}}</p>
          <img :src="codeUrl">
          <el-button
            class="hold"
            @click="hold()"
          >{{$t('message.picter')}}</el-button>
          <div class="address">
            <p>{{$t('message.address')}}</p>
            <span>{{address}}</span>
            <el-button
              ref="copy"
              class="copy"
              :data-clipboard-text="address"
              @click="copy"
            >{{$t('message.copy')}}</el-button>
          </div>
        </div>
        <ul
          class="know"
          style="margin-top:20px;"
        >
          <p>{{$t('message.recTips')}}</p>
          <li>*{{$t('message.tips1')}}</li>
          <li>*{{$t('message.tips2')}}</li>
          <li>*{{$t('message.tips3')}}</li>
          <li>*{{$t('message.tips4')}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import Clipboard from "clipboard";
import api from '../API/index'
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/usdt",
      message: this.$t('message.zone'),
      href: "",
      classIcon: "",
      cut: "",
      codeUrl: '',
      address: ""
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('rechargeUsdtAddress').then(result=>{
        if(result.status==200){
          that.cut=result.res.type
          that.codeUrl=result.res.img
          that.address=result.res.address
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error(this.$t('message.error'))
      })
    },
    hold() {
      //console.log('下载图片')
      let a = document.createElement("a");
      a.download = name || "pic"; // 设置图片地址
      a.href = this.codeUrl;
      a.click();
    },
    copy: function() {
      var _this = this;
      var clipboard = new Clipboard(".copy");

      clipboard.on("success", e => {
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        Message({
          message: this.$t('message.copyerror'),
          type: "warning"
        });
        // 释放内存
        clipboard.destroy();
      });
    }
  }
};
</script>

<style scoped>
</style>
