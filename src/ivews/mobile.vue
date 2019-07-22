<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />

    <div class="container" style="margin-bottom:0;">
      <el-form :model="form" ref="form" >
          <el-form-item label="当前手机号码" prop="mobile"  class="login">
              <el-input v-model="form.mobile"></el-input>
          </el-form-item>

          <el-form-item label="图形验证码" prop="code"  class="login">
              <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
              <img src="../assets/img/code.png" id="code">
          </el-form-item>

          <el-form-item label="短信验证码" prop="mobileCode"  class="login">
              <el-input placeholder="请输入短信验证码" v-model="form.mobileCode"></el-input>
              <el-button class="send">发送</el-button>
          </el-form-item>

          <el-form-item label="新手机号码"  class="login selectcountry">
            <el-select v-model="form.country">
                <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input placeholder="请输入新手机号码" v-model="form.newMobile" class="mobile"></el-input>
          </el-form-item>

          <el-form-item label="短信验证码" prop="newMobileCode"  class="login">
              <el-input placeholder="请输入短信验证码" v-model="form.newMobileCode"></el-input>
              <el-button class="send">发送</el-button>
          </el-form-item>
      </el-form>
      <el-button @click="mobile()" class="submit">确认</el-button>
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
      url: "/my",
      message: "手机号码",
      href: "",
      classIcon: "",
      form:{
          country:'1',
          username:'',
          mobile:'',
          code:'',
          mobileCode:'',
          password:'',
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
  }
};
</script>

<style scoped>
</style>
