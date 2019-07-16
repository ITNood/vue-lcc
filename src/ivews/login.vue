<template>
  <div>
    <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon"/>
    <div id="login">
        <h5>{{$t('message.login')}}</h5>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" id="loginForm">
            <el-form-item prop="username" :label="$t('message.user')" class="login">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item prop="password" label="账号密码" class="login">
                <el-input v-model="loginForm.password" type="password" placeholder="请输入账号密码"></el-input>
            </el-form-item>


            <div class="login-bottom">
                <router-link to="/forget" class="forgetPassword">忘记密码</router-link>
                <el-button class="login-btn" @click="login('loginForm')"><i></i></el-button>
            </div>
        </el-form>
        <router-link to="" class="rules">隐私政策条款</router-link>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
        url:'/lang',
        message:'',
        href:'',
        classIcon:'',
        rules:{
            username:[
                {required:true,message:'用户名不能为空',trigger:'blur'}
            ],
            password:[
                {required:true,message:'密码不能为空',trigger:'blur'}
            ]
        },
        loginForm:{
            username:null,
            password:null
        }
    };
  },
  methods: {
      login(loginForm){

      }
  },
};
</script>

<style scoped>
</style>
