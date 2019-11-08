<template>
  <div>
    <el-dialog
      :visible.sync="centerDialogVisible1"
      width="85%"
      center
      :close-on-click-modal="false"
      class="lccOpen"
    >
      <p>{{$t('message.shiftfc')}}</p>
      <!-- <p>{{$t('message.selled1')}}</p> -->
      <b></b>
      <ul class="lccList">
        <li>
          <p style="font-family: number;font-size:16px;line-height:40px;">{{$t('message.sharefc')}}：{{fc}}</p>
          <el-input-number
            v-model="num1"
            @change="handleChange1"
            :min="0"
            :step="100"
          ></el-input-number>
        </li>
        <!-- <li>
          {{$t('message.sellPrice')}}：
          <span style="right:8px">${{price1}}</span>
        </li>
        <li>
          {{$t('message.sellTotal')}}：
          <span style="right:8px">${{total1}}</span>
        </li> -->
      </ul>
      
      <!-- <div class="selectsell">
        <p style="margin-bottom:10px;">{{$t('message.takeWay')}}:</p>
        <el-radio v-model="radio" label="1" border><i class="icon iconfont icon-yinhangqia"></i>{{$t('message.site')}}</el-radio>
        <el-radio v-model="radio" label="2" border><i class="icon iconfont icon-meiyuan8"></i>{{$t('message.usdt')}}</el-radio>
      </div> -->
      <el-button
        class="submit"
        style="background:#05cf7f"
        @click="newsell()"
      >{{$t('message.shift')}}</el-button>
      <!-- <ul class="know">
        <p>{{$t('message.tips')}}</p>
        <li>*{{$t('message.submission')}}</li>
        <li>*{{$t('message.sell')}}</li>
        <li>*{{$t('message.one')}}</li>
      </ul> -->
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
  name: "Transfer",
  props: ['fc'],
  data() {
    return {
      show:false,
      centerDialogVisible1:false,
      num1: 0,
      price1: "0.00",
      total1: "0.00",
      radio:'',
      fc:0
      //tongbaoPrice:''
    };
  },
  mounted() {
    this.getData()
  },
//   updated() {
//     let that=this
//     that.total1=(Math.floor(that.num1*that.price1*100)/100).toFixed(2)
//     console.log(that.radio)
//   },
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
          api.minicart.template.choices('changeBalance',{type:4,amount:number,security:pwd}).then(result=>{
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
        let number=this.num1
        if(number>0){
            this.sell();
         this.$refs.child.open();
        }else{
            alert(this.$t('message.notransfer'))
        }
    },
  },
};
</script>

<style scoped>
</style>
