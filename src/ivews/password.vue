<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />

    <el-tabs
      id="tabs"
      v-model="activeName"
    >
      <!--登录密码-->
      <el-tab-pane
        :label="$t('message.loginpwd')"
        name="first"
      >
        <el-form
          :rules="rules"
          :model="ruleForm"
          ref="ruleForm"
          class="demo-ruleForm"
        >

          <el-form-item
            class="text public login"
            prop="oldPwd"
            :label="$t('message.original')"
          >
            <el-input
              class="registry"
              v-model="ruleForm.oldPwd"
              :placeholder="$t('message.originalPwd')"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item
            class="text public login"
            prop="pwd"
            :label="$t('message.newPwd')"
          >
            <el-input
              class="registry"
              v-model="ruleForm.pwd"
              :placeholder="$t('message.enternewPwd')"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item
            class="text public login"
            prop="confirmPwd"
            :label="$t('message.confirmnewPwd')"
          >
            <el-input
              class="registry"
              v-model="ruleForm.confirmPwd"
              :placeholder="$t('message.confirmLogin')"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          class="submit"
          @click="loginPassword('ruleForm')"
        >{{$t('message.confirm')}}</el-button>
      </el-tab-pane>

      <!--PIN密码-->
      <el-tab-pane
        :label="$t('message.pincode')"
        name="second"
      >
        <div class="pay-tool">
          <div class="pay-tool-title border-bottom">
            <span class="icon1 icon-back"></span>
            <p>{{tips}}</p>
          </div>
          <!--密码输入框-->
          <div class="pay-tool-content">
            <div class="pay-tool-inputs">
              <div
                class="item"
                v-for="i in items"
                :key="i"
              ><span
                  class="icon_dot"
                  v-if="password[i]"
                ></span></div>
            </div>
          </div>
          <!--键盘-->
          <div class="pay-tool-keyboard">
            <ul>
              <li
                @click="keyUpHandle($event)"
                v-for="val in keys"
                :key="val"
              >
                {{ val }}
              </li>
              <li
                class="del"
                @click="delHandle"
              >
                <span class="icon-del el-icon-back"></span>
              </li>
            </ul>
          </div>
        </div>
        <!--表单-->
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          class="demo-ruleForm"
          style="display:none"
        >
          <el-form-item prop="oldPwd">
            <el-input v-model="ruleForm2.oldPwd"></el-input>
          </el-form-item>
          <el-form-item prop="pwd">
            <el-input v-model="ruleForm2.pwd"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPwd">
            <el-input v-model="ruleForm2.confirmPwd"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../API/index.js";
import Top from "../components/top";
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0];
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.inputpwd')));
      } else {
        if (this.ruleForm.confirmPwd !== "") {
          this.$refs.ruleForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.again')));
      } else if (value !== this.ruleForm.pwd) {
        callback(new Error(this.$t('message.disaccord')));
      } else {
        callback();
      }
    };
    return {
      url: "/my",
      message: this.$t('message.password'),
      href: "",
      classIcon: "",
      activeName: "first",
      tips: this.$t('message.setPwd'),
      a: 1,
      ruleForm: {
        oldPwd: "",
        pwd: "",
        confirmPwd: ""
      },
      rules: {
        oldPwd: [
          { required: true, message: this.$t('message.enternewPwd'), trigger: "blur" }
        ],
        pwd: [{ required: true, validator: validatePass, trigger: "blur" }],
        confirmPwd: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      rules2: {},
      ruleForm2: {
        confirmPwd: "",
        pwd: "",
        oldPwd: ""
      },

      items: [0, 1, 2, 3, 4, 5],
      keys: keys(),
      password: []
    };
  },
  mounted() {
    this.isSetPassword();
  },
  methods: {
    //修改登录密码
    loginPassword(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          let that = this;
          let data = that.ruleForm;
          api.minicart.template
            .choices("changePassword", data)
            .then(response => {
              if (response.status == 200) {
                alert(response.msg);
                //window.location.reload();
                window.localStorage.removeItem("token");
                 that.$router.push('/login')
              } else if (response.status == 400) {
                alert(response.msg);
              }
            })
            .catch(err => {
              alert(this.$t('message.error'));
            });
        }
      });
    },

    //判断是否设置了安全密码
    isSetPassword() {
      let that = this;
      api.minicart.template
        .choices("isSetPayPwd")
        .then(response => {
          if (response.status == 200) {
            console.log(response);
            if (response.res == true) {
              that.tips = this.$t('message.oldPin');
              that.a = 1;
            } else if (response.res == false) {
              that.tips = this.$t('message.setPwd');
              that.a = 2;
            }
          } else if (response.status == 400) {
            alert(response.msg);
          }
        })
        .catch(err => {
          alert(err.msg);
        });
    },
    keyUpHandle(e) {
      let text = e.currentTarget.innerText;
      let len = this.password.length;
      if (!text || len >= 6) return;
      this.password.push(text);
      this.ajaxData();
    },
    //删除密码
    delHandle() {
      if (this.password.length <= 0) return false;
      this.password.shift();
    },
    ajaxData() {
      if (this.password.length >= 6) {
        let data = this.ruleForm2;
        let that = this;
        //输完密码后执行操作
        console.log(parseInt(this.password.join(" ").replace(/\s/g, "")));
        if (this.a == 1) {
          let oldPwd = parseInt(this.password.join(" ").replace(/\s/g, ""));
          console.log(oldPwd);
          that.ruleForm2.oldPwd = oldPwd;
          this.clearPasswordHandle();
          this.a = 2;
          that.tips = this.$t('message.setnewPin');
        } else if (this.a == 2) {
          let pwd = parseInt(this.password.join(" ").replace(/\s/g, ""));
          console.log(pwd);
          that.ruleForm2.pwd = pwd;
          this.clearPasswordHandle();
          this.a = 3;
          that.tips = this.$t('message.confirmpin');
        } else if (this.a == 3) {
          let confirmPwd = parseInt(this.password.join(" ").replace(/\s/g, ""));
          console.log(confirmPwd);
          that.ruleForm2.confirmPwd = confirmPwd;
          //提交PIN密码
          api.minicart.template
            .choices("changeSafePwd", data)
            .then(response => {
              if (response.status == 200) {
                alert(response.msg);
              } else if (response.status == 400) {
                alert(response.msg);
                window.location.reload();
              }
            })
            .catch(err => {
              alert(err.msg);
            });
        }
      }
      return false;
    },
    clearPasswordHandle: function() {
      this.password = [];
    }
  },
  components: {
    Top
  }
};
</script>

<style scoped>
</style>
