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
                        <p>直邀伙伴</p>
                    </li>
                    <li>
                        <h5>{{total}}</h5>
                        <p>综合伙伴</p>
                    </li>
                    <li>
                        <h5>{{left}}</h5>
                        <p>左区业绩</p>
                    </li>
                </ul>
                <ul class="dataList" style="padding:20px 0 10px;">
                    <li>
                        <h5>{{line}}</h5>
                        <p>直邀业绩</p>
                    </li>
                    <li>
                        <h5>{{all}}</h5>
                        <p>综合业绩</p>
                    </li>
                    <li>
                        <h5>{{right}}</h5>
                        <p>右区业绩</p>
                    </li>
                </ul>
            </div>
        </div>

        <!--直邀伙伴-->
        <div class="Invitation">
            <p>直邀伙伴</p>
            <div class="inviteList">
                <ul class="inviteContent">
                    <li v-for="(item,index) in items" :key="index">
                        <img :src="item.img">
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
import Top from '../components/top'
export default {
    components:{
        Top
    },
 data() {
  return {
      url:'/my',
      message:'签约管理',
      href:'',
      classIcon:'',
      partner:0,
      total:0,
      left:0,
      line:0,
      all:0,
      right:0,
      items:[
          {
              img:require('../assets/img/photo.png'),
              username:'kjsajjk',
              mobile:'13800138000'
          }
      ]
  }
 }
}
</script>

<style scoped>

</style>
