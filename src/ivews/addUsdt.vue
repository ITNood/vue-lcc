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
            <el-form-item label="USDT地址" prop="usdt">
                <el-input type="textarea" v-model="form.usdt" placeholder="请输入或长按粘贴您的USDT地址"></el-input>
            </el-form-item>
        </el-form>
        <el-button class="submit" @click="submit()" v-if="show">确认</el-button>
        <el-button class="submit" @click="edit()" v-else>确认</el-button>
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
      url: "/takeWay",
      message: "USDT",
      href: "",
      classIcon: "",
      show:true,
      form:{
          usdt:'',
          type:2,
          id:'',
      }
    };
  },
  mounted() {
      this.getData()
      let id=this.$route.query.id
      if(id){
          this.show=false
      }else{
          this.show=true
      }
  },
  methods: {
      submit(){
          let that=this
          let data=that.form
          api.minicart.template.choices('insertPayAddress',data).then(result=>{
              if(result.status==200){
                  that.$message.success(result.msg)
                  setTimeout(() => {
                      that.$router.push('/takeWay')
                  }, 500);
              }else if(result.status==400){
                  that.$message.error(result.msg)
              }
          }).catch(err=>{
              that.$message.error('错误！')
          })
      },
      edit(){
          let that=this
          let id=that.$route.query.id
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
                  that.form.usdt=result.res.usdt.address
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
