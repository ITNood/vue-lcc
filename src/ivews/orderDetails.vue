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
          <li>
            {{$t('message.bank')}}<span>{{bank}}</span>
          </li>
          <li>
            {{$t('message.bankaccount')}}<span>{{bankname}}</span>
          </li>
          <li>
            {{$t('message.bankbranch')}}<span>{{bankaddress}}</span>
          </li>
        </ul>
      </div>
      <div class="voucher">
        <img
          :src="imgSrc"
          @click="look()"
        >
      </div>
      <el-button
        class="submit"
        @click="submit()"
        v-show="show"
      >{{$t('message.confirmtake')}}</el-button>
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
    </div>
  </div>
</template>

<script>
import api from "../API/index";
export default {
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
      bank: "",
      bankname: "",
      bankaddress: "",
      centerDialogVisible: false,
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
            that.amount = result.res.amount;
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
              that.show=true
            }else{
              that.disabled=false
            }
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t("message.error"));
        });
    },
    submit() {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("completeWithdraw", { id: id })
        .then(result => {
          if (result.status == 200) {
            that.$message.success(result.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t("message.error"));
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
