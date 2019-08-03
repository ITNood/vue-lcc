<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible1"
      width="85%"
      center
      :close-on-click-modal="false"
      class="lccOpen"
    >
      <p>{{$t('message.selled')}}</p>
      <p>{{$t('message.selled1')}}</p>
      <b></b>
      <ul class="lccList">
        <li>
          <p>{{$t('message.share')}}</p>
          <el-input-number
            v-model="num1"
            @change="handleChange1"
            :min="1"
          ></el-input-number>
        </li>
        <li>
          {{$t('message.sellPrice')}}：
          <span style="right:8px">${{price1}}</span>
        </li>
        <li>
          {{$t('message.sellTotal')}}：
          <span style="right:8px">${{total1}}</span>
        </li>
      </ul>
      
      <div class="selectsell">
        <p style="margin-bottom:10px;">{{$t('message.takeWay')}}:</p>
        <el-radio v-model="radio" label="1" border><i class="icon iconfont icon-yinhangqia"></i>{{$t('message.site')}}</el-radio>
        <el-radio v-model="radio" label="2" border><i class="icon iconfont icon-meiyuan8"></i>{{$t('message.usdt')}}</el-radio>
      </div>
      <el-button
        class="submit"
        style="background:#05cf7f"
        @click="newsell()"
      >{{$t('message.sellOut')}}</el-button>
      <ul class="know">
        <p>{{$t('message.tips')}}</p>
        <li>*{{$t('message.submission')}}</li>
        <li>*{{$t('message.sell')}}</li>
        <li>*{{$t('message.one')}}</li>
      </ul>
      <!-- <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="centerDialogVisible = false"
        >确 定</el-button>
      </span> -->
    </el-dialog>
<Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import Pin from '../pin'
import api from '../../API/index'
export default {
  components:{Pin},
  name: "Sell",
  //props: ['centerData'],
  data() {
    return {
      show:false,
      centerDialogVisible1:false,
      num1: 1,
      price1: "0.00",
      total1: "0.00",
      radio:'',
      //tongbaoPrice:''
    };
  },
  mounted() {
    this.getData()
  },
  updated() {
    let that=this
    that.total1=(Math.floor(that.num1*that.price1*100)/100).toFixed(2)
    console.log(that.radio)
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('tongzhengRecord').then(result=>{
        if(result.status==200){
          that.price1=result.res.tongbaoPrice
          //that.tongbaoPrice=result.res.tongbaoPrice
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    },
    handleChange1(value) {
      console.log(value);
    },
    sell(flag){
      this.centerDialogVisible1=!this.centerDialogVisible1
    },
    submit(pwd){
      let that=this
      let number=that.num1
      let type=that.radio
          api.minicart.template.choices('tongzhengSell',{type:type,number:number,security:pwd}).then(result=>{
            if(result.status==200){
              alert(result.msg)
              setTimeout(() => {
                window.location.reload()
              }, 1000);
            }else if(result.status==400){
              alert(result.msg)
            }
          }).catch(err=>{
            alert(this.$t('message.error'))
          })
      
    },
    newsell(){
      let type=this.radio
      console.log(type)
      if(type){
         this.sell();
         this.$refs.child.open();
      }else{
        alert(this.$t('message.choose'))
      }
      
    },
  },
};
</script>

<style scoped>
</style>
