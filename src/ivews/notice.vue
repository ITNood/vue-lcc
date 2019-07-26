<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
        <div class="news">
            <ul class="newsList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="{path:'/noticeDetails',query:{id:item.id}}">
                       <p>{{item.date}}</p>
                       <div class="newsText">{{item.title}}<i class="el-icon-arrow-right"></i></div>
                    </router-link>
                </li>
            </ul>
        </div>
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
      url: "/home",
      message: this.$t('message.notice'),
      href: "",
      classIcon: "",
      items:[]
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('getNotice').then(result=>{
             if(result.status==200){
                 that.items=that.items.concat(result.res)
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error(this.$t('message.error'))
         })
     }
 },
}
</script>

<style scoped>

</style>
