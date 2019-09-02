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
      style="margin-bottom:0"
    >
      <div class="node">
        <div class="nodeprogress">
          <el-progress
            type="circle"
            class="nodepropress"
            :show-text="false"
            :percentage="percent"
            :width="100"
            color="#2059ff"
            :stroke-width="5"
          ></el-progress>
          <div class="propressTxt">
            <h5>{{percent}}%</h5>
            <p>{{$t('message.cap')}}</p>
          </div>
        </div>
        <el-row
          :gutter="10"
          class="nodelist"
        >
          <el-col :span="8">
            <h5>{{total}}</h5>
            <p>{{$t('message.amounted')}}</p>
          </el-col>
          <el-col :span="8">
            <h5>{{geted}}</h5>
            <p>{{$t('message.received')}}</p>
          </el-col>
          <el-col :span="8">
            <h5>{{price}}</h5>
            <p>{{$t('message.residual')}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="purse">
        <ul class="purseList">
          <li>
            <img src="../assets/img/lock.png">
            <div class="purseText">
              <h5>{{$t('message.lock')}}</h5>
            </div>
            <div class="floatright">
              <b>{{ctp}}</b>
              <router-link to="/wallet?id=12">{{$t('message.check')}}</router-link>
            </div>
          </li>
        </ul>
      </div>

      <div class="nodeHistry">
        <p>{{$t('message.nodeHistry')}}</p>
        <div id="listNodeHistry">
          <div class="nodeheight">
            <el-row
              :gutter="8"
              class="listNode"
              v-for="(item,index) in items"
              :key="index"
            >
              <el-col
                :span="8"
                style="color:#999"
              >{{item.date}}</el-col>
              <el-col
                :span="8"
                style="text-align:center"
              >{{item.username}}</el-col>
              <el-col
                :span="8"
                style="text-align:right"
              >+{{item.amount}}</el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import api from "../API/index";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/my",
      message: this.$t("message.node"),
      href: "",
      classIcon: "",
      nodepercent: "",
      percent: "",
      total: "",
      geted: "",
      price: "",
      items: [],
      ctp:''
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    getdata() {
      let that = this;
      api.minicart.template.choices("user/getNode").then(result => {
        if (result.status == 200) {
          that.geted = result.res.receive;
          that.total = result.res.maxAmount;
          that.price = result.res.remaining;
          that.percent = result.res.percent;
          that.ctp=result.res.lockFc
          that.items = that.items.concat(result.res.record);
        } else if (result.status == 400) {
          alert(result.msg);
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
