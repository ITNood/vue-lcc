<template>
  <div>
    <el-header
      height="50px"
      id="top"
    >
      <el-col :span="6">
        <a
          @click="back()"
          class="el-icon-arrow-left back"
        ></a>
      </el-col>
      <el-col :span="12">
        <h5 style="height:50px;"></h5>
      </el-col>
      <el-col :span="6">
        <el-button
          class="observation"
          @click="appeal()"
        >{{$t('message.represent')}}</el-button>
      </el-col>
    </el-header>
    <!--申诉-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
    >
      <span>{{$t('message.complaint')}}？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible  = false">{{$t('message.cancel')}}</el-button>
        <el-button
          type="primary"
          @click="appeal()"
        >{{$t('message.confirm')}}</el-button>
      </span>
    </el-dialog>

    <div class="chatContent">
      <ul
        id="wechat"
        ref="box"
      >
        <li
          v-for="(item,index) in items"
          :key="index"
        >
          <p :style="{'text-align':item.role==1?'right':'left'}">{{item.date}}</p>
          <div
            :class="item.role==1 ? 'actived':'newContent'"
            v-if="item.is_system==0"
          >
            <img :src="item.avatar">
            <h5>{{item.username}}</h5>
            <span>{{item.detail}}<img
                :src="item.img"
                @click="look($event)"
              ></span>
          </div>
          <div
            v-else
            class="appealed"
          >
            <span>{{item.username}}{{$t('message.patiently')}}。</span>
          </div>
        </li>
      </ul>
    </div>

    <!--底部-->
    <div id="chatfooter">
      <div class="foot">
        <div class="selectFiled">
          <input
            name="img"
            type="file"
            @change="uploadChange($event)"
            ref="pathClear"
          >
          <i class="el-icon-picture-outline"></i>
        </div>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item
            prop="content"
            class="inputText"
          >
            <el-input
              v-model="ruleForm.content"
              :placeholder="$t('message.dialog')+'...'"
            ></el-input>
          </el-form-item>
        </el-form>

        <div
          id="send"
          @click="send1()"
        >{{$t('message.send1')}}</div>
      </div>
    </div>

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      class="dialogbg"
      center
    >
      <img :src="imageSrc">
      <span
        slot="footer"
        class="dialog-footer"
      >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../API/index.js";
export default {
  data() {
    return {
      centerDialogVisible: false,
      ruleForm: {
        img: "",
        content: "",
        id: "",type:''
      },
      items: [],
      imageSrc: "",
      show2: false
    };
  },
  mounted() {
   // console.log(11)
    this.WebSocketTest();
     
  },
  //数据更新后滚动
  updated() {
   this.scrollToBottom();
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    //滚动条到底部
    scrollToBottom() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#wechat>li:last-child");
        let height = this.$el.querySelector("#wechat>li:last-child")
          .offsetHeight;
        //console.log(height);
        container.scrollIntoView("+height");
      });
    },

    //查看图片
    look(ev) {
      console.log(ev);
      this.imageSrc = ev.target.currentSrc;
      this.show = true;
    },

    uploadChange(ev) {
      // console.log(ev.target.files);
      var file = ev.target.files[0];
      let that = this;
      if (window.FileReader) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        //监听文件读取结束后事件
        reader.onloadend = function(e) {
          // 图片base64
          // console.log(e.target.result);
          that.ruleForm.img = e.target.result;
          // console.log(that.ruleForm.img);
        };
      }
    },

    //申诉
    appeal() {
      this.centerDialogVisible = false;
      let id = this.$route.query.id;
      let type=this.$route.query.type
      api.minicart.template
        .choices("chat/complaint", { id: id,type:type })
        .then(result => {
          if (result.status == 200) {
            alert(result.msg);
          } else if (result.status == 400) {
            alert(resulr.msg);
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },

    //发送
    send1() {
      let that = this;
      that.ruleForm.id = that.$route.query.id;
      that.ruleForm.type=that.$route.query.type
      let data = that.ruleForm;
      api.minicart.template
        .choices("chat/reply", data)
        .then(result => {
          if (result.status == 200) {
            that.ruleForm.content = "";
            that.ruleForm.img = "";
            this.$refs.pathClear.value = "";
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },

    //长连接
    WebSocketTest() {
      let that = this;
      let id = that.$route.query.id;
      let type = that.$route.query.type;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        // 打开一个 web socket
        var ws = new WebSocket("ws://66.42.54.253:2020");//66.42.54.253  192.168.0.105

        ws.onopen = function() {
          var json = JSON.stringify({
            token: window.localStorage.getItem("token"),
            id: id,
            type: 1,
            type_id: type
          });
          console.log(11)
          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(json);
          var t1 = window.setInterval(function() {
            ws.send(JSON.stringify({ type: 2 }));
          }, 30000);
          console.log("数据发送中...");
        };

        //接收数据
        ws.onmessage = function(evt) {
          const data = JSON.parse(evt.data);
          console.log(data);
          that.items = that.items.concat(data.res);
        };

        ws.onclose = function() {
          // 关闭 websocket
          console.log("连接已关闭...");
        };
      } else {
        // 浏览器不支持 WebSocket
        console.log("您的浏览器不支持 WebSocket!");
      }
    }
  }
};
</script>

<style scoped>
</style>
