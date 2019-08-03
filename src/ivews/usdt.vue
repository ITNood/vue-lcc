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
        <!-- <p>{{number}}LCC</p> -->
      </div>

      <div
        class="finance"
        style="padding:0;border-top:2px solid #2059ff"
      >
        <ul class="financeList" v-show="show">
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
            <p>{{$t('message.bagHistry')}}</p>
            <ul class="histryList">
                <li v-for="(item,index) in items" :key="index">
                    <p>{{item.date}}</p>
                    <h5>{{item.detail}}</h5>
                     <span v-if="item.state==1" style="color:#05ce7e">+{{item.amount}}</span>
                     <span v-else style="color:#e53c1d">-{{item.amount}}</span>
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
     // number: 100,
     show:false,
      lists: [
        {
          url: "/recharge",
          classIcon: "icon-qingyingyongxuanzhong",
          title: this.$t('message.zone')
        },
        {
          url: "/outRecharge",
          classIcon: "icon-zichan-quanbushebei",
          title: this.$t('message.outRecharge')
        },
        // {
        //   url: "/transfer",
        //   classIcon: "icon-zhuanhuan",
        //   title: this.$t('message.assets')
        // }
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
          if(result.res.isNode==0){
            that.show=false
          }else{
            that.show=true
          }
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
