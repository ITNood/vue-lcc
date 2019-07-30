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
                <h5>{{amount}}Usdt</h5>
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
      <!--订单详情-->
      <div class="orderText">
        <ul class="public">
          <li>
            {{$t('message.orderNo')}}<span>{{order}}</span>
          </li>
          <li>
            {{$t('message.username')}}<span>{{username}}</span>
          </li>
           <li>
            {{$t('message.payclass')}}<span>{{$t('message.bankCard')}}</span>
          </li>
          <!-- <li>
            打款类型
            <span>
              <el-select
                v-model="value"
                class="selectPay"
                @change="change"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
          </li> -->
        </ul>
        <ul
          class="public"
        >
          <li>
            {{$t('message.truename')}}<span>{{name}}</span>
          </li>
          <li>
            {{$t('message.bank')}}<span>{{bank}}</span>
          </li>
          <li>
            {{$t('message.bankaccount')}}<span>{{account}}</span>
          </li>
          <li>
            {{$t('message.bankbranch')}}<span>{{bankAddress}}</span>
          </li>
        </ul>
       
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
      <el-button
        class="submit"
        :disabled="disabled"
        @click="submit1()"
      >{{$t('message.confirmPay')}}</el-button>
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
import api from "../API/index";
import Top from "../components/top";
import Pin from "../components/pin";
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      pathUrl: "/outRecharge",
      title: this.$t('message.recOrder'),
      font: "el-icon-chat-dot-square",
      amount: "",
      date: "",
      dollar: 0,
      rmb: 0,
      order: "",
      username: "",
      show:false,
      options: [
        {
          value: 1,
          label: this.$t('message.bankCard')
        }
        // {
        //     value:2,
        //     label:'USDT'
        // }
      ],
      value: 1,
      name: "",
      bank: "",
      account: "",
      bankAddress: "",
      img: "",
      disabled: false,
      usdtAddress: "",
      type: 1,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("rechargeDetail", { id: id })
        .then(result => {
          if (result.status == 200) {
            //订单
            that.amount = result.res.amount;
            that.date = result.res.date;
            that.dollar = result.res.dollar;
            that.rmb = result.res.yuan;
            that.order = result.res.orderNo;
            that.username = result.res.truename;
            if(result.res.img){
              that.img=result.res.img
            }

            //银行卡
            that.name = result.res.truename;
            that.bank = result.res.bankName;
            that.account = result.res.bankAccount;
            that.bankAddress = result.res.bankBranch;

            //按钮
            if (result.res.state==1) {
              that.disabled = false;
            } else {
              that.disabled = true;
            }
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(this.$t('message.error'));
        });
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
      let id = that.$route.query.id;
      let img = that.img;
      let type = that.type;
      api.minicart.template
        .choices("rechargeConfirmPay", {
          id: id,
          type: type,
          img: img,
          security: pwd
        })
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
          alert(this.$t('message.error'));
        });
    },
    submit1(){
      let that=this
      that.$refs.child.open(that.show);
    },
    //聊天
    chat() {
      let that = this;
      let id = that.$route.query.id;
      that.$router.push("/chat?id=" + id +"&type=1");
    }
  }
};
</script>

<style scoped>
#order .orderList {
  height: 106px !important;
}
</style>
