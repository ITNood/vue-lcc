<template>
  <div>
    <Top :pathUrl="url" />
    <div id="login">
      <h5>忘记密码</h5>
      <el-form :model="form" ref="form" >
          <el-form-item label="用户名" prop="username"  class="login">
              <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item label="手机号码" prop="mobile"  class="login selectcountry">
            <el-select v-model="form.country">
                <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input placeholder="请输入用户名" v-model="form.mobile" class="mobile"></el-input>
          </el-form-item>

          <el-form-item label="图形验证码" prop="code"  class="login">
              <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
              <img src="../assets/img/code.png" id="code">
          </el-form-item>

          <el-form-item label="短信验证码" prop="mobileCode"  class="login">
              <el-input placeholder="请输入短信验证码" v-model="form.mobileCode"></el-input>
              <el-button class="send">发送</el-button>
          </el-form-item>

          <el-form-item label="新登录密码" prop="password"  class="login">
              <el-input placeholder="请输入新的登录密码" v-model="form.password"></el-input>
          </el-form-item>

          <el-form-item label="确认新登录密码" prop="password"  class="login">
              <el-input placeholder="请确认新的登录密码" v-model="form.password"></el-input>
          </el-form-item>
      </el-form>
      <el-button @click="forget()" class="submit">确认</el-button>
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
      url: "/login",
      form:{
          country:'1'
      },
      items:[
          {
              value:'1',
              label:'中国 +86'
          },
          {
              value:'2',
              label:'新加坡 +65'
          },
          {
              value:'3',
              label:'泰国 +66'
          },
          {
              value:'4',
              label:'马来西亚 +60'
          },
          {
              value:'5',
              label:'日本 +81'
          },
          {
              value:'6',
              label:'韩国 +82'
          },
          {
              value:'7',
              label:'美国 +1'
          },
          {
              value:'8',
              label:'英国 +44'
          },
      ]
    };
  },
};
</script>

<style scoped>
</style>
