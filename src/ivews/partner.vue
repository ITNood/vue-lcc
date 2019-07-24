<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <el-form :model="form" ref="form">
            <el-form-item label="合伙人账号" prop="username" class="signed">
                <el-input v-model="form.username" placeholder="请输入您需邀请的合伙人账号"></el-input>
            </el-form-item>
            
            <p style="color:white">合伙人手机号码</p>
            <div class="custom">
                <el-form-item class="custom-one">
                    <el-select v-model="form.value" @change="change()" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="mobile" class="signed custom-two">
                    <el-input v-model="form.mobile" placeholder="请输入您合伙人的手机号码"></el-input>
                </el-form-item>
            </div>
            <p style="color:white">签约合伙人</p>
            <el-form-item class="signed">
                <el-select v-model="form.type" placeholder="" class="special" @change="selected()">
                    <el-option v-for="list in lists" :key="list.value" :label="list.label" :value="list.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="安置用户" prop="account" class="signed">
                <el-input v-model="form.pUser" :disabled="disabled" placeholder="请输入安置人账号"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="submit()">确认</el-button>
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
      url:'/my',
      message:'签约合伙人',
      href:'',
      classIcon:'',
      user:'',
      disabled:false,
      form:{
          username:'',
          value:1,
          type:1,
          pUser:'',
          mobile:''
      },
      options:[
          {
              value:1,
              label:'中国 +86'
          },
          {
              value:2,
              label:'新加坡 +65'
          },
          {
              value:3,
              label:'泰国 +66'
          },
          {
              value:4,
              label:'马来西亚 +60'
          },
          {
              value:5,
              label:'日本 +81'
          },
          {
              value:6,
              label:'韩国 +82'
          },
          {
              value:7,
              label:'美国 +1'
          },
          {
              value:8,
              label:'英国 +44'
          }
      ],
      lists:[
          {
              value:1,
              label:'自动小区深度'
          },
          {
              value:2,
              label:'自行输入用户'
          }
      ]
    };
  },
  mounted() {
      this.getData()
  },
  updated() {
       let number=this.form.type
      if(number==1){
          this.form.pUser=this.user;
          this.disabled=true
      }else{
          this.form.pUser=''
          this.disabled=false
      }
  },
  methods: {
      getData(){
          let that=this
          api.minicart.template.choices('getResult').then(result=>{
              if(result.status==200){
                  that.user=result.res.maxUser
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
      selected(){
          console.log(this.form.type)
          //console.log(val)
          let that=this
          let number=that.form.type
          if(number==1){
              that.form.pUser=that.user
              that.disabled=true
          }else {
              that.form.pUser=''
              that.disabled=false
          }
      },
      //提交
      submit(){
          let that=this
          let data=that.form
          api.minicart.template.choices('register',data).then(result=>{
              if(result.status==200){
                  that.$message.success(result.msg)
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
