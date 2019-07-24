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
            订单号<span>{{order}}</span>
          </li>
          <li>
            订单时间<span>{{date}}</span>
          </li>
          <li>
            会员昵称<span>{{nickname}}</span>
          </li>
          <li>
            提现数量<span>{{number}}</span>
          </li>
          <li>
            应付金额<span>{{amount}}</span>
          </li>
          <li>
            银行名称<span>{{bank}}</span>
          </li>
          <li>
            银行账号<span>{{account}}</span>
          </li>
          <li>
            开户支行<span>{{address}}</span>
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
              <p>上传凭证</p>
            </div>
          </div>
        </div>
      </div>
      <el-button class="submit" @click="submit1()">确认付款</el-button>
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
      pathUrl: "/outRecharge",
      title: "提现订单",
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
      img:''
    };
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
                  that.account=result.res.bankAccount
                  that.address=result.res.bankBranch
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误！')
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
        let id=thta.$route.query.id
        api.minicart.template.choices('serviceConfirmPay',{id:id,img:that.img}).then(result=>{
            if(result.status==200){
                that.$message.success(result.msg)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }else if(result.status==400){
                that.$message.error(result.msg)
            }
        }).catch(err=>{
            that.$message.error('错误!')
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
