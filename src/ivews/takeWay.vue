<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <div class="waylist">
            <p>{{$t('message.mybank')}}</p>
            <el-card class="box-card" >
                <div class="carContent" v-if="account">
                    <p>{{name}}</p>
                    <h5>{{account}}</h5>
                    <el-button class="edit" @click="bank()">{{$t('message.edit')}}</el-button>
                </div>
                <router-link v-else class="addCar" to="/bank">
                    <i class="el-icon-plus"></i>
                    <p>{{$t('message.addbank')}}</p>
                </router-link>
            </el-card>
        </div>
        <div class="waylist">
            <p>{{$t('message.myusdt')}}</p>
            <el-card class="box-card">
                <div class="carContent" v-if="address">
                    <p>{{$t('message.usdtAddress')}}</p>
                    <h5 style="font-size:14px;">{{address}}</h5>
                    <el-button class="edit" @click="usdt()">{{$t('message.edit')}}</el-button>
                </div>
                 <router-link v-else class="addCar" to="/addUsdt">
                    <i class="el-icon-plus"></i>
                    <p>{{$t('message.addusdt')}}</p>
                </router-link>
            </el-card>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../API/index.js'
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/my",
      message: this.$t('message.takeWay'),
      href: "",
      classIcon: "",
      account:'',
      address:'',
      bankID:'',
      usdtID:''
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
      getData(){
          let that=this
          api.minicart.template.choices('getPayAddress').then(result=>{
              if(result.status==200){
                  //银行卡
                  if(result.res.bank){
                     that.name=result.res.bank.bank_name
                     that.account=result.res.bank.address
                     that.bankID=result.res.bank.id
                  }
                  //usdt
                  if(result.res.usdt){
                      that.address=result.res.usdt.address
                      that.usdtID=result.res.usdt.id
                  }
              }else if(result.status==400){
                  alert(result.msg)
              }
          }).catch(err=>{
              alert(err.msg)
          })
      },
      //编辑bank
      bank(){
          let that=this
          let id=that.bankID
          that.$router.push('/bank?id='+id+'')
      },
      //编辑usdt
      usdt(){
          let that=this
          let id=that.usdtID
          that.$router.push('/addUsdt?id='+id+'')
      }
  },
};
</script>

<style scoped>
</style>
