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
      <!--订单详情-->
      <div class="cashbg">
        <div class="orderText">
          <ul class="public">
            <li>
              {{$t('message.orderNo')}}<span>{{order}}</span>
            </li>
            <li>
              {{$t('message.orderTime')}}<span>{{date}}</span>
            </li>
            <li>
              {{$t('message.username')}}<span>{{username}}</span>
            </li>
            <li>
              {{$t('message.numberRec')}}<span>{{number}}</span>
            </li>
            <li>
              {{$t('message.payamount')}}<span>{{amount}}</span>
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
          <el-button @click="look()">{{$t('message.view')}}</el-button>
        </el-col>
        <el-col :span="17">
          <el-button class="pay-btn" @click="submit1()" :disabled="disabled">{{$t('message.confirmtake')}}</el-button>
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
       pathUrl: "/service",
      title: this.$t('message.recOrder'),
      font: "el-icon-chat-dot-square",
      amount: '',
      date: "",
      order: "",
      username: "",
      number: "",
      value: "",
      img: "",
      centerDialogVisible: false,
      show:false,
      disabled:false,
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
        let that=this
        let id=that.$route.query.id
        api.minicart.template.choices('rechargeDetail',{id:id}).then(result=>{
            if(result.status==200){
                that.order=result.res.orderNo
                that.number=result.res.amount
                that.username=result.res.truename
                that.date=result.res.date
                that.amount=result.res.rmb
                if(result.res.img){
                    that.img=result.res.img
                }
                if(result.res.state==2){
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
    submit(pwd){
        let that=this
        let id=that.$route.query.id
        api.minicart.template.choices('serviceCompleteRecharge',{id:id,security:pwd}).then(result=>{
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
    look() {
      let that = this;
      let img=that.img
      if(img){
        that.centerDialogVisible = true;
      }else{
        alert(this.$t('message.yet'))
      }
      
    },
    chat() {
      let that = this;
      let id = that.$route.query.id;
      that.$router.push("/chat?id=" + id + "&type=1");
    }
  }
};
</script>

<style scoped lang="less">

</style>
