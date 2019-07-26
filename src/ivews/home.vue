<template>
  <div>
    <Bottom />
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="12"><img src="../assets/img/logo1.png" style="width:35px;margin-top:5px;"></el-col>
        <el-col :span="12"><router-link :to="url" class="buy"><span>V{{vip}}</span>{{text}}</router-link></el-col>
      </el-row>
    </div>
    <div class="total">
      <p>{{$t('message.value')}}</p>
      <h1><span>$</span>{{account}}<i class="icon-ziyuanldpi icon iconfont"></i></h1>
    </div>

    <div class="money">
      <p>{{$t('message.coins')}}</p>
      <el-row :gutter="15">
        <el-col :span="12">
          <div class="list">
            <p>FC</p>
            <h5><span>$</span>{{lcc}}</h5>
            <p>0.001</p>
            <router-link to="/lcc">{{$t('message.operation')}}</router-link>
            <i class="lcc"></i>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="list">
            <p>USDT</p>
            <h5><span>$</span>{{usdt}}</h5>
            <p>0.001</p>
            <router-link to="/usdt">{{$t('message.operation')}}</router-link>
            <i class="usdt"></i>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="finance">
      <p>{{$t('message.finance')}}</p>
      <ul class="financeList">
        <li v-for="(list,index) in lists" :key="index">
          <router-link :to="list.url">
            <span class="icon iconfont" :class="list.classIcon"></span>
            <h5>{{list.title}}</h5>
            <p>{{list.text}}</p>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '../API/index'
import Bottom from "../components/bottom";
export default {
  components: {
    Bottom
  },
  data() {
    return {
      url:'',
      text:'',
      account:'0.00',
      lcc:'0.00',
      usdt:'0.00',
      vip:'',
      lists:[
        {
          url:'/assets',
          title:this.$t('message.wallet'),
          text:this.$t('message.baglist'),
          classIcon:'icon-qianbao'
        },
        {
          url:'/finance',
          title:this.$t('message.bill'),
          text:this.$t('message.vip'),
          classIcon:'icon-caiwuguanlivg'
        },
        {
          url:'/news',
          title:this.$t('message.email'),
          text:this.$t('message.notification'),
          classIcon:'icon-xiaoxi'
        },
        {
          url:'/notice',
          title:this.$t('message.notice'),
          text:this.$t('message.noticeText'),
          classIcon:'icon-gonggao'
        }
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
          that.vip=result.res.level

          that.account=result.res.total

          that.lcc=result.res.fc

          that.usdt=result.res.usdt

          if(result.res.levelState == 0){
            that.text=this.$t('message.match')+">>"
            that.url="/buy"
          }else {
            that.text=this.$t('message.upgrade')+">>"
            that.url="/update"
          }

        }
      }).catch(err=>{

      })
    }
  },
};
</script>

<style scoped>
</style>
