<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
      <div class="lcc">
        <h1><span>$</span>{{usdt}}</h1>
        <p>{{number}}LCC</p>
      </div>

      <div
        class="finance"
        style="padding:0;border-top:2px solid #2059ff"
      >
        <ul class="financeList">
          <li
            v-for="(list,index) in lists"
            :key="index"
          >
            <router-link :to="list.url">
              <span
                class="icon iconfont"
                :class="list.classIcon"
              ></span>
              <h5 style="line-height:35px;">{{list.title}}</h5>
              <i class="el-icon-arrow-right"></i>
            </router-link>
          </li>
        </ul>

        <!--钱包记录-->
        <div class="histry">
            <p>钱包记录</p>
            <ul class="histryList">
                <li v-for="(item,index) in items" :key="index">
                    <p>{{item.date}}</p>
                    <h5>{{item.detail}}</h5>
                    <span>{{item.amount}}</span>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import api from '../API/index'
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/home",
      message: "USDT",
      href: "",
      classIcon: "",
      usdt: "0.00",
      number: 100,
      lists: [
        {
          url: "/recharge",
          classIcon: "icon-qingyingyongxuanzhong",
          title: "区链充值"
        },
        {
          url: "/outRecharge",
          classIcon: "icon-zichan-quanbushebei",
          title: "场外充值"
        },
        {
          url: "/transfer",
          classIcon: "icon-zhuanhuan",
          title: "资产转账"
        }
      ],
      items:[]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('balanceRecord',{id:1}).then(result=>{
        if(result.status==200){
          that.usdt=result.res.usdt
          that.items=that.items.concat(result.res.data)
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
