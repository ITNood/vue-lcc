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
          <el-form-item :label="$t('message.nowphone')" prop="mobile"  class="login">
              <el-input v-model="form.mobile"></el-input>
          </el-form-item>

          <!-- <el-form-item label="图形验证码" prop="code"  class="login">
              <el-input placeholder="请输入验证码" v-model="form.code"></el-input>
              <img src="http://www.hxfc.com/getVerifyCode" id="code" onclick="this.src='http://www.hxfc.com/getVerifyCode?d='+Math.random();">
          </el-form-item> -->

          <el-form-item :label="$t('message.newCode')" prop="oldCode"  class="login">
              <el-input :placeholder="$t('message.enterPhoneCode')" v-model="form.oldCode"></el-input>
              <el-button class="send" @click="send()" :disabled="disabled">{{text}}{{text2}}</el-button>
          </el-form-item>

          <el-form-item :label="$t('message.newtelphonenumber')"  class="login selectcountry">
            <el-select v-model="form.value" @change="change()">
                <el-option v-for="item in items" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
             <!-- <el-select v-model="form.value" @change="change()" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select> -->
            <el-input :placeholder="$t('message.enternewnumber')" v-model="form.newMobile" class="mobile"></el-input>
          </el-form-item>

          <el-form-item :label="$t('message.newCode')" prop="newCode"  class="login">
              <el-input :placeholder="$t('message.enterPhoneCode')" v-model="form.newCode"></el-input>
              <el-button class="send" @click="newSend()" :disabled="disabled2">{{newText}}{{newText2}}</el-button>
          </el-form-item>
      </el-form>
      <el-button @click="mobile()" class="submit">{{$t('message.confirm')}}</el-button>
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
      message: this.$t('message.telphone'),
      href: "",
      classIcon: "",
      text: "",
      text2: this.$t('message.send'),
      disabled:false,
      newText2:this.$t('message.send'),
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
              label:this.$t('message.china')
          },
          {
              value:'2',
              label:this.$t('message.singapore')
          },
          {
              value:'3',
              label:this.$t('message.thailand')
          },
          {
              value:'4',
              label:this.$t('message.malaysia')
          },
          {
              value:'5',
              label:this.$t('message.japan')
          },
          {
              value:'6',
              label:this.$t('message.korea')
          },
          {
              value:'7',
              label:this.$t('message.usa')
          },
          {
              value:'8',
              label:this.$t('message.britain')
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
        that.$message.error(this.$t('message.error'))
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
              that.text2 = "s"+this.$t('message.post');
              that.timer = setInterval(() => {
                if (that.text > 0 && that.text <= TIME_COUNT) {
                  that.text--;
                } else {
                  that.disabled=false
                  clearInterval(that.timer);
                  that.timer = null;
                  that.text = this.$t('message.post');
                  that.text2 = "";
                }
              }, 1000);
            }
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error(this.$t('message.error'))
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
              that.newText2 = "s"+this.$t('message.post');
              that.timer = setInterval(() => {
                if (that.newText > 0 && that.newText <= TIME_COUNT) {
                  that.newText--;
                } else {
                  that.disabled2=false
                  clearInterval(that.timer);
                  that.timer = null;
                  that.newText = this.$t('message.post');
                  that.newText2 = "";
                }
              }, 1000);
            }
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error(this.$t('message.error'))
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
        that.$message.error(this.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
