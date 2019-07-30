<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div id="login">
      <h5>{{$t('message.forgetPwd')}}</h5>
      <el-form
        :model="form"
        ref="form"
      >
        <el-form-item
          :label="$t('message.user')"
          prop="username"
          class="login"
        >
          <el-input
            :placeholder="$t('message.enter')"
            v-model="form.username"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.telphone')"
          prop="mobile"
          class="login"
        >
          <!-- <el-select v-model="value">
                <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.id"></el-option>
            </el-select> -->
          <el-input
            :placeholder="$t('message.enterPhone')"
            v-model="form.mobile"
            class="mobile"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.code')"
          prop="code"
          class="login"
        >
          <el-input
            :placeholder="$t('message.enterCode')"
            v-model="form.code"
          ></el-input>
          <img
            src="../assets/img/code.png"
            id="code"
          >
        </el-form-item>

        <el-form-item
          :label="$t('message.newCode')"
          prop="mobildCode"
          class="login"
        >
          <el-input
            :placeholder="$t('message.enterPhoneCode')"
            v-model="form.mobildCode"
          ></el-input>
          <el-button
            class="send"
            @click="send()"
            :disabled="disabled"
          >{{text}}{{text2}}</el-button>
        </el-form-item>

        <el-form-item
          :label="$t('message.newPwd')"
          prop="password"
          class="login"
        >
          <el-input
            :placeholder="$t('message.enternewPwd')"
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.confirmnewPwd')"
          prop="confirmPwd"
          class="login"
        >
          <el-input
            :placeholder="$t('message.confirmLogin')"
            v-model="form.confirmPwd"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        @click="forget()"
        class="submit"
      >{{$t('message.confirm')}}</el-button>
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
      url: "/login",
      message: "",
      href: "",
      classIcon: "",
      form: {
        username: "",
        mobile: "",
        code: "",
        mobileCode: "",
        password: ""
      },
      text:'',
      text2:this.$t('message.send'),
      disabled:false
    };
  },
  methods: {
    send() {
      let that = this;
      let data = that.form;
      api.minicart.template
        .choices("getResetPhoneCode", data)
        .then(result => {
          if (result.status == 200) {
            const TIME_COUNT = 60;
            if (!that.timer) {
              that.disabled = true;
              that.text = TIME_COUNT;
              that.text2 = "s" + this.$t("message.post");
              that.timer = setInterval(() => {
                if (that.text > 0 && that.text <= TIME_COUNT) {
                  that.text--;
                } else {
                  that.disabled = false;
                  clearInterval(that.timer);
                  that.timer = null;
                  that.text = this.$t("message.post");
                  that.text2 = "";
                }
              }, 1000);
            }
          } else if (result.status == 400) {
            alert(result.msg);
          }
        })
        .catch(err => {
          alert(that.$t("message.error"));
        });
    },
    forget(){
        let that=this
        let data=that.form
        api.minicart.template.choices('resetPwd',data).then(result=>{
            if(result.status==200){
                alert(result.msg)
                that.$router.push('/login')
            }else if(result.status==400){
                alert(result.msg)
            }
        }).catch(err=>{
            alert(that.$t('message.error'))
        })
    }
  }
};
</script>

<style scoped>
</style>
