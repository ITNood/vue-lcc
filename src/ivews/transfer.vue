<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane :label="$t('message.assets')" name="first">
             <ul class="outside">
            <li>
                <p>{{$t('message.myusdt')}}</p>
                <h5>{{usdt}}</h5>
            </li>
            <li>
                <p>{{$t('message.vipAccount')}}</p>
                <el-input v-model="username" :placeholder="$t('message.membership')"></el-input>
            </li>
            <li>
                <p>{{$t('message.transfernumber')}}</p>
                <el-input v-model="amount" :placeholder="$t('message.entertranNumber')"></el-input>
            </li>
        </ul>
        <el-button class="submit" @click="submit()">{{$t('message.confirm')}}</el-button>
        </el-tab-pane>
        <el-tab-pane :label="$t('message.transferHistry')" name="second">
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
      message:this.$t('message.assets'),
      href:'',
      classIcon:'',
      activeName:'first',
      usdt:'0.00',
      username:'',
      amount:'',
      items:[]
  }
 }
}
</script>

<style scoped>

</style>
