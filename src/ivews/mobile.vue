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

          <!-- <el-form-item label="图形验证码" prop="code"  class="login">
              <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
              <img src="http://www.hxfc.com/getVerifyCode" id="code" onclick="this.src='http://www.hxfc.com/getVerifyCode?d='+Math.random();">
          </el-form-item> -->

          <el-form-item label="短信验证码" prop="oldCode"  class="login">
              <el-input placeholder="请输入短信验证码" v-model="form.oldCode"></el-input>
              <el-button class="send" @click="send()" :disabled="disabled">{{text}}{{text2}}</el-button>
          </el-form-item>

          <el-form-item label="新手机号码"  class="login selectcountry">
            <el-select v-model="form.value" @change="change()">
                <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
             <!-- <el-select v-model="form.value" @change="change()" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select> -->
            <el-input placeholder="请输入新手机号码" v-model="form.newMobile" class="mobile"></el-input>
          </el-form-item>

          <el-form-item label="短信验证码" prop="newCode"  class="login">
              <el-input placeholder="请输入短信验证码" v-model="form.newCode"></el-input>
              <el-button class="send" @click="newSend()" :disabled="disabled2">{{newText}}{{newText2}}</el-button>
          </el-form-item>
      </el-form>
      <el-button @click="mobile()" class="submit">确认</el-button>
    </div>
  </div>
</template>

<script>
import api from '../API/index'
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
      text: "",
      text2: "发送验证码",
      disabled:false,
      newText2:'发送验证码',
      newText:'',
      disabled2:false,
      form:{
          value:'1',
          oldCode:'',
          newCode:'',
          newMobile:'',
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
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('getUser').then(result=>{
        if(result.status==200){
          that.mobile=result.res.mobile
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误!')
      })
    },
    change(){
      console.log(this.form.value)
    },
    //发送旧手机验证码
    send(){
      let that=this
      let data=that.form
      api.minicart.template.choices('getOldPhoneCode',data).then(result=>{
        if(result.status==200){
          const TIME_COUNT = 60;
            if (!that.timer) {
              that.disabled=true
              that.text = TIME_COUNT;
              that.text2 = "s后重新发送";
              that.timer = setInterval(() => {
                if (that.text > 0 && that.text <= TIME_COUNT) {
                  that.text--;
                } else {
                  that.disabled=false
                  clearInterval(that.timer);
                  that.timer = null;
                  that.text = "重新发送";
                  that.text2 = "";
                }
              }, 1000);
            }
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误！')
      })
    },

    //新手机发送验证码
    newSend(){
      let that=this
      let data=that.form
      api.minicart.template.choices('getNewPhoneCode',data).then(result=>{
        if(result.status==200){
          const TIME_COUNT = 60;
            if (!that.timer) {
              that.disabled2=true
              that.newText = TIME_COUNT;
              that.newText2 = "s后重新发送";
              that.timer = setInterval(() => {
                if (that.newText > 0 && that.newText <= TIME_COUNT) {
                  that.newText--;
                } else {
                  that.disabled2=false
                  clearInterval(that.timer);
                  that.timer = null;
                  that.newText = "重新发送";
                  that.newText2 = "";
                }
              }, 1000);
            }
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误！')
      })
    },

    //提交
    mobile(){
      let that=this
      let data=that.form
      api.minicart.template.choices('updatePhone',data).then(result=>{
        if(result.status==200){
          that.$message.success(result.msg)
          setTimeout(() => {
            that.$router.push('/my')
          }, 500);
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误!')
      })
    }
  },
};
</script>

<style scoped>
</style>
