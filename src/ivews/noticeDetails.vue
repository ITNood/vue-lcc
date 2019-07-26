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
            <div class="newsList">
                <div class="newsTitle">
                    <p>{{date}}</p>
                    <h5>{{title}}</h5>
                </div>
                <div class="newsFont" v-html="details">{{details}}</div>
            </div>
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
      url: "/notice",
      message: this.$t('message.notice'),
      href: "",
      classIcon: "",
      date:'',
      title:'',
      details:''
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         let id=that.$route.query.id
         api.minicart.template.choices('noticeDetail',{id:id}).then(result=>{
             if(result.status==200){
                 that.date=result.res.date
                 that.title=result.res.title
                 that.details=result.res.detail
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
