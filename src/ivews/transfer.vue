<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane label="资产转账" name="first">
             <ul class="outside">
            <li>
                <p>我的Usdt</p>
                <h5>{{usdt}}</h5>
            </li>
            <li>
                <p>会员账号</p>
                <el-input v-model="username" placeholder="请输入会员账号"></el-input>
            </li>
            <li>
                <p>转出数量</p>
                <el-input v-model="amount" placeholder="请输入转出数量"></el-input>
            </li>
        </ul>
        <el-button class="submit" @click="submit()">确认</el-button>
        </el-tab-pane>
        <el-tab-pane label="转账记录" name="second">
            <div class="transfer">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.text}}</h5>
                       <span>{{item.amount}}</span>
                   </li>
                </ul>
            </div>
        </el-tab-pane>
  </el-tabs>
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
      url:'/usdt',
      message:'资产转账',
      href:'',
      classIcon:'',
      activeName:'first',
      usdt:'0.00',
      username:'',
      amount:'',
      items:[
          {
              date:'2018/07/17',
              text:'兑换',
              amount:'200.00注册积分'
          }
      ]
  }
 }
}
</script>

<style scoped>

</style>
