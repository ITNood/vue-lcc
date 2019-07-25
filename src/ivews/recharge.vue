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
          <p>链类型：{{cut}}</p>
          <img :src="codeUrl">
          <el-button
            class="hold"
            @click="hold()"
          >保存二维码到相册</el-button>
          <div class="address">
            <p>充币地址</p>
            <span>{{address}}</span>
            <el-button
              ref="copy"
              class="copy"
              :data-clipboard-text="address"
              @click="copy"
            >复制</el-button>
          </div>
        </div>
        <ul
          class="know"
          style="margin-top:20px;"
        >
          <p>充值提示</p>
          <li>*本次充值仅支持ERC20(即ETH层层协议)，先自行确认否则资产不能到帐且无法退回；</li>
          <li>*请勿向上述地址充值任何非USDT资产，否则资产将不可找回；</li>
          <li>*您充值至上述地址后，需要整个网络节点的确认，网络确认后到帐，即可正确使用；</li>
          <li>*最小充值金额为：1 USDT，小于最小金额的充值将不能上帐且无法退回。</li>
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
      message: "区链充值",
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
        that.$message.error('错误!')
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
          message: "复制失败",
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
