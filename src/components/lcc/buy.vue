<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="85%"
      center
      :close-on-click-modal="false"
      class="lccOpen"
    >
      <p>{{$t('message.buyed')}}</p>
      <p>{{$t('message.buyed1')}}</p>
      <b></b>
      <ul class="lccList">
        <li>
          <p>{{$t('message.share')}}</p>
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </li>
        <li>
          {{$t('message.buyPrice')}}：
          <span style="right:8px">${{price}}</span>
        </li>
        <li>
          {{$t('message.buyTotal')}}：
          <span style="right:8px">${{total}}</span>
        </li>
      </ul>
      <el-button
        class="submit"
        style="background:#e43c1d"
        @click="newbuy()"
      >{{$t('message.purch')}}</el-button>
      <ul class="know">
        <p>{{$t('message.tips')}}</p>
        <li>*{{$t('message.submission')}}</li>
        <li>*{{$t('message.tb')}}</li>
        <li>*{{$t('message.based')}}</li>
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
  name: "Buy",
  //props:['num'],
  data() {
    return {
      show:false,
      num: 1,
      dialogVisible:false,
      price: "0.00",
      total: "0.00",
      //tongbaoPrice:''
    };
  },
  mounted() {
    this.getData()
  },
  updated() {
    let that=this
    that.total=(Math.floor(that.num*that.price*100)/100).toFixed(2)
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('tongzhengbuyView').then(result=>{
        if(result.status==200){
          that.price=result.res.tongbaoPrice
          //that.tongbaoPrice=result.res.tongbaoPrice
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    },
    handleChange(value) {
      console.log(value);
    },
    submit(pwd){
      let that=this
      let amount=that.num
      api.minicart.template.choices('tongzhengCreate',{number:amount,security:pwd}).then(result=>{
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
    buy(flag){
         this.dialogVisible=!this.dialogVisible
    },
    newbuy(){
      this.buy();
      this.$refs.child.open();

    },
  }
};
</script>

<style scoped>
</style>
