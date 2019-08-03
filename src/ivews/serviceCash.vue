<template>
  <div>
    <el-header
      height="50px"
      id="top"
    >
      <el-col :span="6">
        <router-link
          :to="pathUrl"
          class="el-icon-arrow-left back"
        ></router-link>
      </el-col>
      <el-col :span="12">
        <h5>{{title}}</h5>
      </el-col>
      <el-col :span="6">
        <a
          @click="chat()"
          class="iconRight"
          :class="font"
        ></a>
      </el-col>
    </el-header>
    <div class="container">
        <div class="cashbg" style="margin-top:70px;">
      <div class="orderText">
        <ul class="public">
          <li>
            {{$t('message.orderNo')}}<span>{{order}}</span>
          </li>
          <li>
            {{$t('message.orderTime')}}<span>{{date}}</span>
          </li>
          <li>
            {{$t('message.username')}}<span>{{nickname}}</span>
          </li>
          <li>
            {{$t('message.payUs')}}<span>${{number}}</span>
          </li>
          <li>
            {{$t('message.payable1')}}<span>￥{{amount}}</span>
          </li>
          <li>
            {{$t('message.bank')}}<span>{{bank}}</span>
          </li>
          <li>
            {{$t('message.bankaccount')}}<span>{{account}}</span>
          </li>
          <li>
            {{$t('message.openbank')}}<span>{{address}}</span>
          </li>
        </ul>
      </div>
      </div>
      <!--上传凭证-->
      <div class="download">
        <div class="downloadContent">
          <input
            name="img"
            type="file"
            @change="uploadChange($event)"
          >
          <img
            :src="img"
            v-if="img"
          >
          <div
            v-else
            class="addPicture"
          >
            <div style="margin:0 auto;">
              <i class="el-icon-plus"></i>
              <p>{{$t('message.vouchers')}}</p>
            </div>
          </div>
        </div>
      </div>
      <el-button class="submit" @click="submit1()" :disabled="disabled">{{$t('message.thepay')}}</el-button>
    </div>
    <!--密码组件-->
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
  </div>
</template>

<script>
import Pin from "../components/pin";
import api from '../API/index'
export default {
  components: {
    Pin
  },
  data() {
    return {
      pathUrl: "/service",
      title: this.$t('message.cashorder'),
      font: "el-icon-chat-dot-square",
      show: false,
      order: "",
      date: "",
      nickname: "",
      number: "",
      amount: "",
      bank: "",
      account: "",
      address: "",
      img:'',
      disabled:false
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
      getData(){
          let that=this
          let id=that.$route.query.id
          api.minicart.template.choices('withdrawDetail',{id:id}).then(result=>{
              if(result.status==200){
                  that.order=result.res.orderNo
                  that.date=result.res.date
                  that.nickname=result.res.truename
                  that.number=result.res.amount
                  that.bank=result.res.bankName
                  that.amount=result.res.usdt
                  that.account=result.res.bankAccount
                  that.address=result.res.bankBranch
                  if(result.res.img){
                    that.img=result.res.img
                  }
                  if(result.res.state==1){
                    that.disabled=false
                  }else{
                    that.disabled=true
                  }
              }else if(result.status==400){
                  alert(result.msg)
              }
          }).catch(err=>{
              alert(this.$t('message.error'))
          })
      },
      uploadChange(ev) {
      //上传凭证
      var file = ev.target.files[0];
      let that = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          // 图片base64
          that.img = e.target.result;
          // that.ruleForm.img = e.target.result;
        };
      }
    },
    submit(pwd) {
        let that=this
        let id=that.$route.query.id
        api.minicart.template.choices('serviceConfirmPay',{id:id,img:that.img,security:pwd}).then(result=>{
            if(result.status==200){
                alert(result.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }else if(result.status==400){
                alert(result.msg)
            }
        }).catch(err=>{
            alert(this.$t('message.error'))
        })
    },
    submit1(){
        let that=this
        that.$refs.child.open(that.show);
    },
    //聊天
    chat() {
      let that = this;
      let id = that.$route.query.id;
      that.$router.push("/chat?id=" + id + "&type=2");
    }
  }
};
</script>

<style scoped>
</style>
