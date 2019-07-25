<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
      <!--订单详情-->
      <div class="cashbg">
        <div class="orderText">
          <ul class="public">
            <li>
              订单编号<span>{{order}}</span>
            </li>
            <li>
              订单时间<span>{{date}}</span>
            </li>
            <li>
              会员昵称<span>{{username}}</span>
            </li>
            <li>
              充值数量<span>{{number}}</span>
            </li>
            <li>
              付款金额<span>{{amount}}</span>
            </li>
          </ul>
        </div>
      </div>

      <el-row
        :gutter="15"
        style="margin-top:50px;"
        class="cash-btn"
      >
        <el-col :span="7">
          <el-button @click="look()">查看凭证</el-button>
        </el-col>
        <el-col :span="17">
          <el-button class="pay-btn" @click="submit1()">确认收款</el-button>
        </el-col>
      </el-row>
    </div>
    <!--查看凭证-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      class="dialogbg"
      center
    >
      <img :src="img">
      <span
        slot="footer"
        class="dialog-footer"
      >
      </span>
    </el-dialog>
     <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import api from '../API/index'
import Top from "../components/top";
import Pin from '../components/pin'
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/cash",
      message: "提现订单",
      href: "/chat",
      classIcon: "el-icon-chat-dot-square",
      amount: '',
      date: "",
      order: "",
      username: "",
      number: "",
      value: "",
      img: "",
      centerDialogVisible: false,
      show:false
    };
  },
  methods: {
    getData(){
        let that=this
        let id=that.$route.query.id
        api.minicart.template.choices('withdrawDetail',{id:id}).then(result=>{
            if(result.status==200){
                that.order=result.res.orderNo
                that.number=result.res.amount
                that.username=result.res.truename
                that.date=result.res.date
                that.amount=result.res.payment
                if(result.res.img){
                    that.img=result.res.img
                }
            }else if(result.status==400){
                that.$message.error(result.msg)
            }
        }).catch(err=>{
            that.$message.error('错误!')
        })
    },
    submit(pwd){
        let that=this
        let id=that.$route.query.id
        api.minicart.template.choices('completeWithdraw',{id:id,security:pwd}).then(result=>{
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
    look() {
      let that = this;
      that.centerDialogVisible = true;
    },
    chat() {
      let that = this;
      let id = that.$route.query.id;
      that.$router.push("/chat?id=" + id + "&type=2");
    }
  }
};
</script>

<style scoped lang="less">

</style>
