<template>
  <div>
    <Bottom />
    <el-header
      class="myself"
      height="100%"
    >
      <el-row>
        <el-col :span="24">
          <i
            class="el-icon-switch-button close"
            @click="signOut"
          ></i>
        </el-col>
      </el-row>
      <router-link
        class="means"
        to="/personality"
      >
        <img :src="img">
        <div class="meansText">
          <h5>{{username}}</h5>
          <p>ID:{{id}}</p>
          <i class="el-icon-arrow-right"></i>
        </div>
      </router-link>
    </el-header>
    <div
      class="container"
      style="margin-top:0"
    >
      <el-row
        :gutter="15"
        class="sign"
      >
        <el-col :span="12">
          <router-link to="/sign"><i class="icon iconfont icon-hezuohuobantianchong"></i>{{$t('message.siged')}}</router-link>
        </el-col>
        <el-col :span="12">
          <router-link
            to="/partner"
            style="background:#1d4cd3"
          ><i class="icon iconfont icon-zhucetianjiahaoyou"></i>{{$t('message.partner')}}</router-link>
        </el-col>
      </el-row>
      <div class="myList">
        <div class="myHeight">
          <ul class="myselfList">
            <li v-show="scan">
              <a @click="scanCode()">
                <i class="icon iconfont icon-saoyisao"></i>
                <div class="listText">{{$t('message.scan')}}<span class="el-icon-arrow-right"></span></div>
              </a>
            </li>
            <li v-show="show">
              <router-link to="/report">
                <i class="icon iconfont icon-dingdanwancheng"></i>
                <div class="listText">{{$t('message.report')}}<span class="el-icon-arrow-right"></span></div>
              </router-link>
            </li>
            <li v-show="show1">
              <router-link to="/service">
                <i class="icon iconfont icon-fuwuleixing"></i>
                <div class="listText">{{$t('message.service')}}<span class="el-icon-arrow-right"></span></div>
              </router-link>
            </li>
            <li v-show="show2">
              <router-link to="/shopCenter">
                <i class="icon iconfont icon-shangjia"></i>
                <div class="listText">{{$t('message.shoper')}}<span class="el-icon-arrow-right"></span></div>
              </router-link>
            </li>
            <li v-show="node">
              <router-link to="/node">
                <i class="icon iconfont icon-jiedian"></i>
                <div class="listText">{{$t('message.node')}}<span class="el-icon-arrow-right"></span></div>
              </router-link>
            </li>
          </ul>
          <ul
            class="myselfList"
            style="margin-top:25px;"
          >
            <li
              v-for="(item,index) in todos"
              :key="index"
            >
              <router-link :to="item.url">
                <i
                  class="icon iconfont"
                  :class="item.font"
                ></i>
                <div class="listText">{{item.text}}<span class="el-icon-arrow-right"></span></div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index.js";
import Bottom from "../components/bottom";
import jsBridge from "../assets/js/jsbridge-mini.js";
import { mapState } from "vuex";
export default {
  components: {
    Bottom
  },
  data() {
    return {
      img: require("../assets/img/photo.png"),
      username: "",
      id: "",
      show: true,
      show1: false,
      show2: false,
      node: false,
      scan: false,
      todos: [
        {
          url: "/takeWay",
          font: "icon-meiyuanbizhuanyongzhanghu",
          text: this.$t("message.takeWay")
        },
        {
          url: "/mobile",
          font: "icon-mobile",
          text: this.$t("message.telphone")
        },
        {
          url: "/password",
          font: "icon-password",
          text: this.$t("message.password")
        },
        {
          url: "/language",
          font: "icon-diqiu",
          text: this.$t("message.language")
        },
        {
          url: "/about",
          font: "icon-guanyu",
          text: this.$t("message.about")
        }
      ]
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    //扫码
    scanCode() {
      jsBridge.scan(
        {
          needResult: true //默认为false，扫描结果由App处理；true则直接返回扫描结果
        },
        function(code) {
          if (code) {
            //localStorage.setItem("resultCode", JSON.stringify(code));
            // this.$router.push('/payCode')
            this.$store.commit("codeResult", code);
            window.location.href = "#/payCode";
          } else {
            alert(this.$t("message.sweepFail"));
          }
        }
      );
    },
    getData() {
      let that = this;
      api.minicart.template
        .choices("getUser")
        .then(result => {
          if (result.status == 200) {
            that.username = result.res.nickname; //昵称
            that.id = result.res.id; //id
            that.img = result.res.avatar; //头像

            //扫码
            if (result.res.is_sweep == 0) {
              this.scan = false;
            } else {
              this.scan = true;
            }

            //报单中心
            if (result.res.isFeedback == 0) {
              that.show = false;
            } else if (result.res.isFeedback == 1) {
              that.show = true;
            }

            //超级节点
            if (result.res.isNode == true) {
              that.node = true;
            } else {
              that.node = false;
            }
            //服务中心
            if (result.res.isService == 0) {
              this.show1 = false;
            } else if (result.res.isService == 1) {
              that.show1 = true;
            }
            //商户中心
            if (result.res.merchant == true) {
              that.show2 = true;
            } else if (result.res.merchant == false) {
              that.show2 = false;
            }
          }
        })
        .catch(err => {
          alert(this.$t("message.error"));
        });
    },
    //退出登录
    signOut() {
      let that = this;
      that
        .$confirm(this.$t("message.notlogin") + "?", {
          confirmButtonText: this.$t("message.confirm"),
          cancelButtonText: this.$t("message.cancel")
        })
        .then(() => {
          api.minicart.template
            .choices("loginOut")
            .then(result => {
              if (result.status == 200) {
                alert(result.msg);
                window.localStorage.removeItem("token");
                setTimeout(() => {
                  that.$router.push("/login");
                }, 500);
              } else if (result.status == 400) {
                alert(result.msg);
              }
            })
            .catch(err => {
              alert(this.$t("message.error"));
            });
        })
        .catch(() => {
          alert(this.$t("message.Cancelled"));
        });
    }
  }
};
</script>

<style scoped>
</style>
