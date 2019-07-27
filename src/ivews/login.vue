<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div id="login">
      <h5>{{$t('message.login')}}</h5>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        id="loginForm"
      >
        <el-form-item
          prop="username"
          :label="$t('message.user')"
          class="login"
        >
          <el-input
            v-model="loginForm.username"
            :placeholder="$t('message.enter')"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="password"
          :label="$t('message.pwd')"
          class="login"
        >
          <el-input
            v-model="loginForm.password"
            type="password"
            :placeholder="$t('message.enterPwd')"
          ></el-input>
        </el-form-item>

        <div class="login-bottom">
          <router-link
            to="/forget"
            class="forgetPassword"
          >{{$t('message.forgetPwd')}}</router-link>
          <el-button
            class="login-btn"
            @click="login('loginForm')"
          ><i></i></el-button>
        </div>
      </el-form>
      <router-link
        to=""
        class="rules"
      >{{$t('message.pro')}}</router-link>
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
      url: "/lang",
      message: "",
      href: "",
      classIcon: "",
      rules: {
        username: [
          { required: true, message: this.$t('message.usernull'), trigger: "blur" }
        ],
        password: [{ required: true, message: this.$t('message.pwdnull'), trigger: "blur" }]
      },
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          let that = this;
          let data = that.loginForm;
          api.minicart.template
            .choices("login", data)
            .then(result => {
              if (result.status == 200) {
                if (!window.localStorage) {
                    return false;
                } else {
                  let storage = window.localStorage;
                  storage.setItem("token", result.res.token); //存储token
                  let token = window.localStorage.getItem("token"); //判断是否存在token并跳转路由
                  if (token) {
                     that.$router.push("/home");
                  } else {
                     that.$router.push("/login");
                  }
                }
              } else if (result.status == 400) {
                that.$message.error(result.msg);
              }
            })
            .catch(err => {
              console.log(111);
              that.$message.error(err.msg);
            });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
