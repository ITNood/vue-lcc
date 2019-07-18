<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
        <el-row :gutter="15" class="asssts">
            <el-col :span="6" v-for="(list,index) in lists" :key="index">
                <router-link :to="list.url">
                    <i :class="list.icon" class="icon iconfont"></i>
                    <p>{{list.text}}</p>
                </router-link>
            </el-col>
        </el-row>
        <div class="purse">
            <p>钱包资产</p>
            <ul class="purseList">
                <li>
                    <img src="../assets/img/ctp.png">
                    <div class="purseText">
                        <h5>CTP</h5>
                        <p>通行积分</p>
                    </div>
                    <b>{{ctp}}</b>
                </li>
                <li>
                    <img src="../assets/img/cash.png">
                    <div class="purseText">
                        <h5>CASH</h5>
                        <p>现金积分</p>
                    </div>
                    <b>{{cash}}</b>
                </li>
                <li>
                    <img src="../assets/img/xtb.png">
                    <div class="purseText">
                        <h5>XTB</h5>
                        <p>兴源通宝</p>
                    </div>
                    <b>{{ctp}}</b>
                </li>
                <li>
                    <img src="../assets/img/ccf.png">
                    <div class="purseText">
                        <h5>CCF</h5>
                        <p>通证基金</p>
                    </div>
                    <b>{{ctp}}</b>
                </li>
            </ul>
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
      url:'/home',
      message:'钱包资产',
      href:'',
      classIcon:'',
      lists:[
          {
              url:'/points',
              icon:'icon-zhuanhuan',
              text:'转账',
          },
          {
              url:'/exchange',
              icon:'icon-duihuan',
              text:'兑换',
          },
          {
              url:'',
              icon:'icon-gouwuche1',
              text:'买入通宝',
          },
          {
              url:'/salary',
              icon:'icon-qiandai',
              text:'薪酬',
          }
      ],
      ctp:'0.00',
      cash:'0.00',
      xtb:'0.00',
      ccf:'0.00'
  }
 }
}
</script>

<style scoped>

</style>
