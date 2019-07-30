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
            <el-form-item :label="$t('message.useraccount')" prop="username" class="signed">
                <el-input v-model="form.username" :placeholder="$t('message.neeInvite')"></el-input>
            </el-form-item>
            
            <p style="color:white">{{$t('message.mobile')}}</p>
            <div class="custom">
                <el-form-item class="custom-one">
                    <el-select v-model="form.value" @change="change()" >
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="mobile" class="signed custom-two">
                    <el-input v-model="form.mobile" :placeholder="$t('message.enterMobile')"></el-input>
                </el-form-item>
            </div>
            <p style="color:white">{{$t('message.partner')}}</p>
            <el-form-item class="signed">
                <el-select v-model="form.type" placeholder="" class="special" @change="selected()">
                    <el-option v-for="list in lists" :key="list.value" :label="list.label" :value="list.value"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item :label="$t('message.users')" prop="account" class="signed">
                <el-input v-model="form.pUser" :disabled="disabled" :placeholder="$t('message.reset')"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="submit()">{{$t('message.confirm')}}</el-button>
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
      message:this.$t('message.partner'),
      href:'',
      classIcon:'',
      user:'',
      disabled:false,
      form:{
          username:'',
          value:'1',
          type:1,
          pUser:'',
          mobile:''
      },
      options:[
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
      ],
      lists:[
          {
              value:1,
              label:this.$t('message.depth')
          },
          {
              value:2,
              label:this.$t('message.self')
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
                  alert(result.msg)
              }
          }).catch(err=>{
              alert(that.$t('message.error'))
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
                  alert(result.msg)
              }else if(result.status==400){
                  alert(result.msg)
              }
          }).catch(err=>{
              alert(that.$t('message.error'))
          })
      }
  },
};
</script>

<style scoped>
</style>
