<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <el-form :model="form" ref="form" class="addPublic">
            <el-form-item label="真实姓名" prop="truename">
                <el-input  v-model="form.truename" placeholder="请输入您的真实姓名"></el-input>
            </el-form-item>

            <el-form-item label="银行名称" prop="bankName">
                <el-input  v-model="form.bankName" placeholder="请输入银行名称"></el-input>
            </el-form-item>

             <el-form-item label="银行卡号" prop="bankAccount">
                <el-input  v-model="form.bankAccount" placeholder="请输入银行卡号"></el-input>
            </el-form-item>

            <el-form-item label="开户支行" prop="bankBranch">
                <el-input  v-model="form.bankBranch" placeholder="请输入开户支行"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="edit()" v-if="show">确认</el-button>
        <el-button class="submit" @click="bank()" v-else>确认</el-button>
    </div>
  </div>
</template>

<script>
import api from '../API/index.js'
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/takeWay",
      message: "USDT",
      href: "",
      classIcon: "",
      show:false,
      form:{
          bankBranch:'',
          bankAccount:'',
          bankName:'',
          truename:'',
          type:1,
          id:''
      }
    };
  },
  mounted() {
      this.getData()
      let id=this.$route.query.id
      if(id){
          this.show=true
      }else{
          this.show=false
      }
  },
  methods: {
      bank(){
          let that=this
         
          let data=that.form
          api.minicart.template.choices('insertPayAddress',data).then(result=>{
              if(result.status==200){
                  that.$message.success(result.msg)
                //   setTimeout(() => {
                //       that.$router.push('/takeWay')
                //   }, 500);
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误！')
          })
      },
      //编辑bank
      edit(){
          let that=this
           let id=that.$route.query.id
          console.log(id)
          that.form.id=id
          let data=that.form
          api.minicart.template.choices('updatePayAddress',data).then(result=>{
              if(result.status==200){
                  that.$message.success(result.msg)
                  setTimeout(() => {
                      that.$router.push('/takeWay')
                  }, 500);
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误!')
          })
      },
      getData(){
          let that=this
          let id=that.$route.query.id
          api.minicart.template.choices('getPayAddress',{id,id}).then(result=>{
              if(result.status==200){
                  that.form.truename=result.res.bank.truename
                  that.form.bankName=result.res.bank.bank_name
                  that.form.bankAccount=result.res.bank.address
                  that.form.bankBranch=result.res.bank.bank_branch
              }else if(result.status==400){
                  that.$messge.error(result.msg)
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
