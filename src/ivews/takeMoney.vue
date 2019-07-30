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
        <div class="takeMoney">
            <div class="usernamePhoto">
                <img :src="imgSrc">
            </div>
            <div class="moneyInput">
                <p>{{$t('message.takeAmont')}}</p>
                <div class="amount"><span>$</span>{{amount}}</div>
            </div>
        </div>
    </div>
    <!--键盘-->
    <div class="key">
        <ul>
            <li v-for="val in items" :key="val" @click="handlekeys($event)"> 
                {{val}}
            </li>
            <li
                class="del"
                @click="del"
              >
                <span class="el-icon-back"></span>
            </li>
        </ul>
        <el-button class="submit" style="width:85%;margin:30px auto;display:block" @click="submit()">{{$t('messageconfirm')}}</el-button>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
import api from '../API/index'

const items = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/shopCenter",
      message: this.$t('message.takeMoney'),
      href: "",
      classIcon: "",
      imgSrc:require('../assets/img/photo.png'),
      amount:'',
      items:items(),
      number:[],
      code:''
    };
  },
  methods: {
    getData(){
      let that=this
      let code=window.localStorage.getItem('code')
      that.code=code
      console.log(code)
      api.minicart.template.choices('getPayUser',{tokenStr:code}).then(result=>{
        if(result.status==200){
          that.imgSrc=result.res.avatar
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    },
    submit(){
      let that=this
      console.log(that.amount)
      api.minicart.template.choices('SweepCodePay',{tokenStr:that.code}).then(result=>{
        if(result.status==200){
          window.localStorage.setItem('success',result.msg)
          that.$router.push('/success')
        }else if(result.status==400){
          window.localStorage.setItem('error',result.msg)
          that.$router.push('/error')
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    },
      handlekeys(ev){
          let text=ev.currentTarget.innerText;
          this.amount+=text
          this.number=this.amount
        //   console.log(this.number)
        //   console.log(text)
         let len=this.number.length
         console.log(len)
      },
      del(){
          let len=this.amount.toString()
          let number = len.substr(0, len.length - 1)
          this.amount=number
          if(len<=0){
              return false
          }
          console.log(len)
      }
  },
};
</script>

<style scoped>
</style>
