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
                <p>收款金额</p>
                <div class="amount"><span>$</span>{{amount}}</div>
            </div>
        </div>
    </div>
    <!--键盘-->
    <div class="key">
        <ul>
            <li v-for="val in keys" :key="val" @click="handlekey($event)"> 
                {{val}}
            </li>
            <li
                class="del"
                @click="delHandle"
              >
                <span class="el-icon-back"></span>
            </li>
        </ul>
        <el-button class="submit" style="width:85%;margin:30px auto;display:block">确认</el-button>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
const keys = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/shopCenter",
      message: "收款",
      href: "",
      classIcon: "",
      imgSrc:require('../assets/img/photo.png'),
      amount:'',
      keys:keys(),
      number:[]
    };
  },
  methods: {
      handlekey(ev){
          let text=ev.currentTarget.innerText;
          this.amount+=text
          this.number=this.amount
        //   console.log(this.number)
        //   console.log(text)
         let len=this.number.length
         console.log(len)
      },
      delHandle(){
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
