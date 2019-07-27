<template>
 <div>
      <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
        <div class="run">
            <div class="runData">
                <ul class="dataList" style="border-bottom:1px solid #313743;padding-bottom:25px;">
                    <li>
                        <h5>{{partner}}</h5>
                        <p>{{$t('message.invited')}}</p>
                    </li>
                    <li>
                        <h5>{{total}}</h5>
                        <p>{{$t('message.integ')}}</p>
                    </li>
                    <li>
                        <h5>{{left}}</h5>
                        <p>{{$t('message.left')}}</p>
                    </li>
                </ul>
                <ul class="dataList" style="padding:20px 0 10px;">
                    <li>
                        <h5>{{line}}</h5>
                        <p>{{$t('message.direct')}}</p>
                    </li>
                    <li>
                        <h5>{{all}}</h5>
                        <p>{{$t('message.performane')}}</p>
                    </li>
                    <li>
                        <h5>{{right}}</h5>
                        <p>{{$t('message.right')}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <!--直邀伙伴-->
        <div class="Invitation">
            <p>{{$t('message.invited')}}</p>
            <div class="inviteList">
                <ul class="inviteContent">
                    <li v-for="(item,index) in items" :key="index">
                        <img :src="item.avatar">
                        <span>{{index+1}}</span>
                        <el-row :gutter="8">
                            <el-col :span="12">{{item.username}}</el-col>
                            <el-col :span="12">{{item.mobile}}</el-col>
                        </el-row>
                    </li>
                </ul>
            </div>
        </div>
    </div>
 </div>
</template>

<script>
import api from '../API/index'
import Top from '../components/top'
export default {
    components:{
        Top
    },
 data() {
  return {
      url:'/my',
      message:this.$t('message.siged'),
      href:'',
      classIcon:'',
      partner:0,
      total:0,
      left:0,
      line:0,
      all:0,
      right:0,
      items:[]
  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('getResult').then(result=>{
             if(result.status==200){
                 that.partner=result.res.directNumber   //直邀伙伴
                 that.total=result.res.teamNumber       //综合伙伴
                 that.left=result.res.leftResult        //左区业绩
                 that.line=result.res.directResult      //直邀业绩
                 that.all=result.res.teamResult         //综合业绩
                 that.right=result.res.rightResult      //右区业绩

                 //直邀伙伴
                 that.items=that.items.concat(result.res.child)
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     }
 },
}
</script>

<style scoped>

</style>
