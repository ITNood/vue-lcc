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
                       <h5>{{item.text}}</h5>
                       <span>{{item.amount}}</span>
                   </li>
                </ul>
            </div>
    </div>
  </div>
</template>

<script>
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/shopCenter",
      message: "现金账单",
      href: "",
      classIcon: "",
      items:[
          {
              date:'2018/07/17',
              text:'兑换',
              amount:'200.00注册积分'
          }
      ]
    };
  }
};
</script>

<style scoped>
</style>
