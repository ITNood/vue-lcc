<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
      style="background:transparent"
    />
    <div class="container">
        <div class="transfer" style="padding-top:20px;">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.detail}}</h5>
                       <span :style="{color:(item.state==1?'#00b46d':'#d44328')}">{{item.state==1?'+':'-'}}{{item.amount}}</span>
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
      url: "/shopCenter",
      message: this.$t('message.cashbill'),
      href: "",
      classIcon: "",
      items:[]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('merchantCashRecord').then(result=>{
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
};
</script>

<style scoped>
</style>
