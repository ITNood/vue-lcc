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
      style="margin-bottom:0;"
    >
      <div class="run1">
        <div class="runData">
          <ul
            class="dataList clear"
            style="border-bottom:1px solid #313743;padding-bottom:25px;"
          >
            <li>
              <h5>{{data1}}</h5>
              <p>{{$t('message.invited')}}</p>
            </li>
            <li>
              <h5>{{data2}}</h5>
              <p>{{$t('message.integ')}}</p>
            </li>
            <li>
              <h5>{{data3}}</h5>
              <p>{{$t('message.left')}}</p>
            </li>
          </ul>
          <ul
            class="dataList"
            style="padding:20px 0 10px;"
          >
            <li>
              <h5>{{data4}}</h5>
              <p>{{$t('message.direct')}}</p>
            </li>
            <li>
              <h5>{{data5}}</h5>
              <p>{{$t('message.performane')}}</p>
            </li>
            <li>
              <h5>{{data6}}</h5>
              <p>{{$t('message.right')}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!--直邀伙伴-->
      <div class="Invitation">
        <p>{{$t('message.invited')}}</p>
        <div class="inviteList">
          <ul class="inviteContent">
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <img :src="item.avatar">
              <!-- <span></span> -->
              <el-row :gutter="8">
                <el-col :span="8">{{item.username}}</el-col>
                <el-col :span="8" style="text-align:center">{{item.mobile}}</el-col>
                <el-col :span="8" style="text-align:right">{{item.invest}}</el-col>
              </el-row>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/my",
      message: this.$t("message.siged"),
      href: "",
      classIcon: "",
      data1: "",
      data2: "",
      data3: "",
      data4: "",
      data5: "",
      data6: "",
      items: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      api.minicart.template
        .choices("getResult")
        .then(result => {
          if (result.status == 200) {
            setTimeout(() => {
              that.data1 = result.res.directNumber; //直邀伙伴
              that.data2 = result.res.teamNumber; //综合伙伴
              that.data3 = result.res.leftResult; //左区业绩
              that.data4 = result.res.directResult; //直邀业绩
              that.data5 = result.res.teamResult; //综合业绩
              that.data6 = result.res.rightResult; //右区业绩
              that.items = that.items.concat(result.res.child);
            }, 500);
            //直邀伙伴
          } else if (resule.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(that.$t("message.error"));
        });
    }
  }
};
</script>

<style scoped>
</style>
