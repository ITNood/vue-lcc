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
      <div class="orderText">
          <ul class="public">
            <li>
              订单编号<span>{{order}}</span>
            </li>
            <li>
              会员昵称<span>{{username}}</span>
            </li>
            <li>
              打款类型<span>{{takeWay}}</span>
            </li>
          </ul>
      </div>
      <div class="voucher">
          <img :src="imgSrc" @click="look()">
      </div>
      <el-button class="submit">确认收款</el-button>
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
export default {
  data() {
    return {
      pathUrl: "/myOrder",
      title: "订单详情",
      font: "el-icon-chat-dot-square",
      amount: 100,
      date: "2019/07/26",
      dollar: 100,
      rmb: 100,
      order:'22222',
      username:'李四',
      takeWay:'银行卡',
      imgSrc:require('../assets/img/about.jpg'),
      centerDialogVisible:false
    };
  },
  methods: {
      look(){
          this.centerDialogVisible=true
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
