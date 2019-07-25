<template>
 <div>
     <Bottom/>
     <el-header class="myself" height="100%">
         <el-row>
             <el-col :span="24">
                 <i class="el-icon-switch-button close" @click="signOut"></i>
             </el-col>
         </el-row>
         <router-link class="means" to="/personality">
             <img :src="img">
             <div class="meansText">
                 <h5>{{username}}</h5>
                 <p>ID:{{id}}</p>
                 <i class="el-icon-arrow-right"></i>
             </div>
         </router-link>
     </el-header>
     <div class="container" style="margin-top:0">
         <el-row :gutter="15" class="sign">
             <el-col :span="12">
                 <router-link to="/sign"><i class="icon iconfont icon-hezuohuobantianchong"></i>{{$t('message.siged')}}</router-link>
             </el-col>
             <el-col :span="12">
                 <router-link to="/partner" style="background:#1d4cd3"><i class="icon iconfont icon-zhucetianjiahaoyou"></i>{{$t('message.partner')}}</router-link>
             </el-col>
         </el-row>
         <div class="myList">
             <div class="myHeight">
            <ul class="myselfList">
                <li v-show="show">
                    <router-link to="/report">
                        <i class="icon iconfont icon-dingdanwancheng"></i>
                        <div class="listText">{{$t('message.report')}}<span class="el-icon-arrow-right"></span></div>
                    </router-link>
                </li>
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="item.url">
                       <i class="icon iconfont" :class="item.font"></i>
                       <div class="listText">{{item.text}}<span class="el-icon-arrow-right"></span></div>
                    </router-link>
                </li>
            </ul>
            <ul class="myselfList" style="margin-top:25px;">
                <li v-for="(item,index) in todos" :key="index">
                    <router-link :to="item.url">
                       <i class="icon iconfont" :class="item.font"></i>
                       <div class="listText">{{item.text}}<span class="el-icon-arrow-right"></span></div>
                    </router-link>
                </li>
            </ul>
            </div>
         </div>
     </div>
 </div>
</template>

<script>
import api from '../API/index.js'
import Bottom from '../components/bottom'
export default {
    components:{
        Bottom,
    },
 data() {
  return {
      img:require('../assets/img/photo.png'),
      username:'',
      id:'',
      show:true,
      items:[
        //   {
        //       url:'/report',
        //       font:'icon-dingdanwancheng',
        //       text:'报单中心'
        //   },
          {
              url:'/service',
              font:'icon-fuwuleixing',
              text:this.$t('message.service')
          },
          {
              url:'/shopCenter',
              font:'icon-shangjia',
              text:this.$t('message.shoper')
          }
      ],
      todos:[
          {
              url:'/takeWay',
              font:'icon-meiyuanbizhuanyongzhanghu',
              text:this.$t('message.takeWay')
          },
          {
              url:'/mobile',
              font:'icon-mobile',
              text:this.$t('message.telphone')
          },
          {
              url:'/password',
              font:'icon-password',
              text:this.$t('message.password')
          },
          {
              url:'/language',
              font:'icon-diqiu',
              text:this.$t('message.language')
          },
          {
              url:'/about',
              font:'icon-guanyu',
              text:this.$t('message.about')
          }
      ]
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('getUser').then(result=>{
             if(result.status==200){
                 that.username=result.res.nickname    //昵称
                 that.id=result.res.id                //id
                 that.img=result.res.avatar           //头像
                 
                 //报单中心
                // if (result.res.isFeedback == 0) {
                //     that.show=false
                // } else if (result.res.isFeedback == 1) {
                //     that.show=true
                // }
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     },
     //退出登录
     signOut(){
         let that=this
         that.$confirm('是否退出登录?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
        api.minicart.template.choices('loginOut').then(result=>{
            if(result.status==200){
                that.$message.success(result.msg)
                window.localStorage.removeItem("token");
                setTimeout(() => {
                    that.$router.push('/login')
                }, 500);
            }else if(result.status==400){
                that.$message.error(result.msg)
            }
        }).catch(err=>{
            that.$message.error('错误!')
        })
        }).catch(() => {
           that.$message.info('已取消');          
        });
     }
 },
}
</script>

<style scoped>

</style>
