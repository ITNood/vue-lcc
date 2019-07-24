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
                    <p>时间</p>
                    <dd>{{date}}</dd>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="orderContent textRight">
                    <p>充值总额Usdt / Rmb</p>
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
            订单编号<span>{{order}}</span>
          </li>
          <li>
            会员昵称<span>{{username}}</span>
          </li>
          <li>
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
          </li>
        </ul>
        <ul
          class="public"
          v-if="show1"
        >
          <li>
            开户姓名<span>{{name}}</span>
          </li>
          <li>
            银行名称<span>{{bank}}</span>
          </li>
          <li>
            银行账号<span>{{account}}</span>
          </li>
          <li>
            银行支行<span>{{bankAddress}}</span>
          </li>
        </ul>
        <ul
          class="public"
          v-else
        >
          <li>USDT地址<span>{{usdtAddress}}</span></li>
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
              <p>上传凭证</p>
            </div>
          </div>
        </div>
      </div>
      <el-button
        class="submit"
        :disabled="disabled"
        @click="submit1()"
      >确认打款</el-button>
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
      title: "充值订单",
      font: "el-icon-chat-dot-square",
      amount: "",
      date: "",
      dollar: 0,
      rmb: 0,
      order: "",
      username: "",
      options: [
        {
          value: 1,
          label: "银行卡"
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
      disabled: true,
      usdtAddress: "",
      show1: true,
      type: 1,
      show: false
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

            //银行卡
            that.name = result.res.bank.truename;
            that.bank = result.res.bank.bank_name;
            that.account = result.res.bank.address;
            that.bankAddress = result.res.bank.bank_branch;

            //usdt地址
            that.usdtAddress = result.res.usdt.address;

            //按钮
            if (
              result.res.state == 1 ||
              result.res.state == 3 ||
              result.res.state == 4
            ) {
              that.disabled = true;
            } else {
              that.disabled = false;
            }
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error("错误!");
        });
    },
    change(val) {
      console.log(val);
      let that = this;
      that.type = val;
      if (val == 1) {
        that.show1 = true;
      } else {
        that.show1 = false;
      }
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
            that.$message.success(result.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error("错误!");
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
