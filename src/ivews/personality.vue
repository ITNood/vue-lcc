<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="personality">
      <div class="center">
        <div class="photo">
          <div class="selectPhoto">
            <img
              :src="imageUrl"
              class="avatar"
            >
          </div>

          <ul class="picter-list clear">
            <li
              v-for="(picter,index) in picters"
              :key="index"
            >
              <img
                :src="picter.list"
                @click="selectPhoto($event)"
              >
            </li>
            <!--添加头像-->
            <li>
              <div class="addAvatar">
                <input
                  type="file"
                  name="avatar"
                  style="opacity:0"
                  @change="uploadChange($event)"
                >
                <i class="el-icon-camera-solid"></i>
              </div>
            </li>
          </ul>

          <!--设置名称-->

          <el-form
            :rules="rules"
            :model="ruleForm"
            ref="ruleForm"
            class="demo-ruleForm"
          >

            <!-- <el-form-item
              class="text"
              prop="avatar"
              style="display:none"
            >
              <el-input
                class="set"
                v-model="ruleForm.avatar"
              >
              </el-input>
            </el-form-item> -->

            <el-form-item
              class="text"
              prop="nickname"
              :label="$t('message.name')"
            >
              <el-input
                class="set"
                v-model="ruleForm.nickname"
                :placeholder="$t('message.enter')"
                maxlength="6"
                minlength="2"
              >
              </el-input>
              <!-- <img
                :src="rondom"
                @click="getName()"
                class="rondom"
              > -->
            </el-form-item>
          </el-form>

          <el-button
            class="submit"
            @click="submitName('ruleForm')"
          >{{$t('message.confirm')}}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../API/index.js";
import Top from "../components/top";
export default {
  data() {
    return {
      url:'/my',
      message:this.$t('message.set'),
      href:'',
      classIcon:'',
      id: "",
      imageUrl: "",
      picters: [
        { list: require("../assets/img/1.png") },
        { list: require("../assets/img/2.png") },
        { list: require("../assets/img/3.png") },
        { list: require("../assets/img/4.png") },
        { list: require("../assets/img/5.png") },
        { list: require("../assets/img/6.png") },
        { list: require("../assets/img/7.png") },
        { list: require("../assets/img/8.png") },
        { list: require("../assets/img/9.png") },
        { list: require("../assets/img/10.png") },
        { list: require("../assets/img/11.png") }
      ],
      //rondom: require("../assets/img/random.png"),
      ruleForm: {
        nickname: "",
        avatar: ""
      },
      rules: {
        username: [
          { required: true, message: this.$t('message.enter'), trigeger: "blur" }
        ]
      }
    };
  },
  components: {
    Top
  },
  mounted() {
    this.getUser();
  },
  methods: {
    //上传图片
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
          that.imageUrl = e.target.result;
          // console.log(that.imageUrl);
        };
      }
    },

    //选择头像
    selectPhoto(ev) {
      //console.log(ev);
      //this.imageUrl = ev.target.currentSrc;
      let url = ev.target.currentSrc;
      console.log(url);
      var image = new Image();
      image.src = url;
      var base64 = getBase64Image(image);
      this.imageUrl = base64;
    },
    //个人信息
    getUser() {
      let that = this;
      api.minicart.template
        .choices("getUser")
        .then(response => {
          if (response.status == 200) {
            that.imageUrl = response.res.avatar;
            that.ruleForm.nickname = response.res.nickname;
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },

    //获取随机名称
    // getName() {
    //   let that = this;
    //   api.minicart.template
    //     .choices("getChinaName")
    //     .then(response => {
    //       if (response.status == 200) {
    //         this.ruleForm.nickname = response.res.name;
    //       }
    //     })
    //     .catch(err => {});
    // },

    //提交设置
    submitName(ruleForm) {
      let that = this;
      let data = this.ruleForm;
      console.log(this.imageUrl);
      let avatar = this.imageUrl; //获取头像
      console.log(avatar);
      this.ruleForm.avatar = avatar;
      api.minicart.template
        .choices("characterSet", data)
        .then(response => {
          console.log("成功");
          if (response.status == 200) {
            alert(response.msg);
            setTimeout(() => {
              this.$router.push("/my");
            }, 500);
          } else if (response.status == 400) {
           alert(response.msg);
          }
        })
        .catch(err => {
          console.log("失败");
          alert(err.msg);
        });
    }
  }
};
function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
}
</script>


<style scoped>
</style>
