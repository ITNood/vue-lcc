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
      <div class="pubilcOrder">
        <ul class="orderList only">
          <li>
            <router-link to=''>
              <div class="status">
                <h5>{{amount}}FC</h5>
              </div>
              <el-row :gutter="15">
                <el-col :span="12">
                  <div class="orderContent">
                    <p>{{$t('message.time')}}</p>
                    <dd>{{date}}</dd>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="orderContent textRight">
                    <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                    <dd>${{dollar}} / ￥{{rmb}}</dd>
                  </div>
                </el-col>
              </el-row>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="orderText">
        <ul class="public">
          <li>
            {{$t('message.orderNo')}}<span>{{order}}</span>
          </li>
          <li>
            {{$t('message.username')}}<span>{{username}}</span>
          </li>

          <!-- <li>
            {{$t('message.bank')}}<span>{{bank}}</span>
          </li>
          <li>
            {{$t('message.bankaccount')}}<span>{{bankname}}</span>
          </li>
          <li>
            {{$t('message.bankbranch')}}<span>{{bankaddress}}</span>
          </li> -->
        </ul>
      </div>
      <!-- <div class="voucher">
        <img
          :src="imgSrc"
        >
      </div> -->
      <!-- <el-button
        class="submit"
        @click="submit()"
        :disabled="disabled"
      >{{$t('message.confirmtake')}}</el-button> -->
      <el-row
        :gutter="15"
        style="margin-top:50px;"
        class="cash-btn"
      >
        <el-col :span="7">
          <el-button @click="look()" >{{$t('message.view')}}</el-button>
        </el-col>
        <el-col :span="17">
          <el-button class="pay-btn" @click="submit1()" :disabled="disabled">{{$t('message.confirmtake')}}</el-button>
        </el-col>
      </el-row>
      <!--查看凭证-->
      <el-dialog
        :visible.sync="centerDialogVisible"
        width="80%"
        class="dialogbg"
        center
      >
        <img :src="imgSrc">
        <span
          slot="footer"
          class="dialog-footer"
        >
        </span>
      </el-dialog>
      <!--密码组件-->
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
    </div>
  </div>
</template>

<script>
import api from "../API/index";
import Pin from '../components/pin'
export default {
  components:{
    Pin
  },
  data() {
    return {
      pathUrl: "/myOrder",
      title: this.$t('message.od'),
      font: "el-icon-chat-dot-square",
      amount: "",
      date: "",
      dollar:"",
      rmb: "",
      order:"",
      username: "",
      takeWay: "",
      imgSrc: "",
      // bank: "",
      // bankname: "",
      // bankaddress: "",
      centerDialogVisible: false,
      disabled:false,
      show:false
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("withdrawDetail", { id: id })
        .then(result => {
          if (result.status == 200) {
            that.amount = result.res.fc;
            that.date = result.res.date;
            that.dollar = result.res.usdt;
            that.rmb = result.res.rmb;
            that.order = result.res.orderNo;
            that.username = result.res.truename;
            that.bank=result.res.bankName
            that.bankname=result.res.bankAccount
            that.bankaddress=result.res.bankBranch
            that.imgSrc = result.res.img;
            if(result.res.state==2){
              that.disabled=false
            }else{
              that.disabled=true
            }
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    },
    submit1(){
      let that=this
      that.$refs.child.open(that.show);
    },
    submit(pwd) {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("completeWithdraw", { id: id,security:pwd })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    },
    look() {
      this.centerDialogVisible = true;
    },
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
