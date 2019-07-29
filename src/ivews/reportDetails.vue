<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
      <div class="work">
        <div class="workContent">
          <li
            v-for="(item,index) in items"
            :key="index"
          >
            <p>{{item.date}}</p>
            <div class="workbg">
              <h5>{{item.title}}<i
                  class="icon iconfont icon-huixingzhen"
                  @click="look($event)"
                  v-if="item.pic"
                ></i></h5>
              <input
                type="hidden"
                :value="item.pic"
              >
              <p>{{item.detail}}</p>
            </div>
          </li>
        </div>
      </div>
    </div>
    <div id="bottom">
      <el-row>
        <el-col :span="6">
          <el-button class="solve">{{status}}</el-button>
        </el-col>
        <el-col :span="18">
          <el-button
            class="reply"
            @click="reply()"
            :disabled="disabled"
          >{{$t('message.reply')}}</el-button>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      class="openDialog"
    >
      <span><img :src="pic"></span>
    </el-dialog>
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
      url: "/report",
      message: this.$t('message.reportDetails'),
      href: "",
      classIcon: "",
      centerDialogVisible: false,
      items: [],
      pic: "",
      status: "",
      disabled: false
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
        .choices("feedbackDetail", { id: id })
        .then(result => {
          if (result.status == 200) {
            if (result.res.state == 1) {
              that.status = this.$t('message.wait');
              that.disabled = false;
            } else if (result.state == 2) {
              that.status = that.$t('message.Processing');
              that.disabled = false;
            } else if (result.state == 3) {
              that.status = that.$t('message.processed');
              that.disabled = true;
            }
            that.items=that.items.concat(result.res.data)
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t('message.error'));
        });
    },
    look(ev) {
      let img = this.pic;
      if (img) {
        console.log(ev);
        console.log(ev.target.parentNode.parentNode.children[1].defaultValue);
        let img = ev.target.parentNode.parentNode.children[1].defaultValue;
        this.img = img;
        this.centerDialogVisible = true;
      }
    },
    reply(ev) {
      let id = this.$route.query.id;
      console.log(id);
      this.$router.push("/reply?id=" + id + "");
    }
  }
};
</script>

<style scoped>
</style>
