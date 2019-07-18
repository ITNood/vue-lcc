<template>
  <div>
    <el-header
      height="50px"
      id="top"
    >
      <el-col :span="6">
        <router-link
          to=""
          class="el-icon-arrow-left back"
        ></router-link>
      </el-col>
      <el-col :span="12">
        <h5 style="height:50px;">{{title}}</h5>
      </el-col>
      <el-col :span="6">
        <el-button class="observation">申述</el-button>
      </el-col>
    </el-header>
    <!--申诉-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
    >
      <span>是否发起申诉？</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible  = false">取 消</el-button>
        <el-button
          type="primary"
          @click="appeal()"
        >确 定</el-button>
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
          <p>{{item.date}}</p>
          <div
            :class="item.role==1 ? 'actived':'newContent'"
            v-if="item.is_system==0"
          >
            <img :src="item.avatar">
            <h5>{{item.username}}</h5>
            <span>{{item.detail}}<img :src="item.img" @click="look($event)"></span>
          </div>
          <div
            v-else
            class="appealed"
          >
            <span>{{item.username}}发起申诉，客服人员即将介入处理，请耐心等候。</span>
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
              placeholder="输入您的对话..."
            ></el-input>
          </el-form-item>
        </el-form>

        <div
          id="send"
          @click="send1()"
        >发送</div>
      </div>
    </div>

    <div
      id="lookPicter"
      v-show="show2"
    >
      <div class="center">
        <div class="look-picter">
          <img
            :src="imageSrc"
            alt=""
          >
          <div
            class=" close-picter el-icon-close"
            @click="show2=!show2"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import api from "../API/index.js";
export default {
  data() {
    return {
      centerDialogVisible: false,
      ruleForm: {
        img: "",
        content: "",
        id: ""
      },
      items: [],
      imageSrc:'',
      show2:false
    };
  },
  mounted() {
    this.WebSocketTest();
  },
  //数据更新后滚动
  updated() {
    //this.scrollToBottom();
  },

  methods: {
    //滚动条到底部
    scrollToBottom() {
      this.$nextTick(() => {
        let container = this.$el.querySelector("#wechat>li:last-child");
        let height=this.$el.querySelector("#wechat>li:last-child").offsetHeight;
        console.log(height)
        container.scrollIntoView('+height')
      });
    },

    //查看图片
    look(ev){
      console.log(ev)
      this.imageSrc=ev.target.currentSrc
      this.show2=true
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
    // appeal() {
    //   this.centerDialogVisible = false;
    //   let id = this.$route.query.id;
    //   api.minicart.template
    //     .choices("chat/complaint", { id: id })
    //     .then(result => {
    //       if (result.status == 200) {
    //         alert(result.msg);
    //       } else if (result.status == 400) {
    //         alert(resulr.msg);
    //       }
    //     })
    //     .catch(err => {
    //       alert(err.msg);
    //     });
    // },

    //发送
    // send1() {
    //   let that = this;
    //   that.ruleForm.id = this.$route.query.id;
    //   let data = that.ruleForm;
    //   api.minicart.template
    //     .choices("chat/reply", data)
    //     .then(result => {
    //       if (result.status == 200) {
    //         that.ruleForm.content = "";
    //         that.ruleForm.img = "";
    //         this.$refs.pathClear.value = "";
    //       } else if (result.status == 400) {
    //         alert(result.msg);
    //       }
    //     })
    //     .catch(err => {
    //       alert(err.msg);
    //     });
    // },
    //

    //长连接
    WebSocketTest() {
      let id = this.$route.query.id;
      let that = this;
      if ("WebSocket" in window) {
        console.log("您的浏览器支持 WebSocket!");
        // 打开一个 web socket
        var ws = new WebSocket("ws://192.168.0.105:2020");

        ws.onopen = function() {
          var json = JSON.stringify({
            token: window.localStorage.getItem("token"),
            id: id,
            type: 1
          });
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
