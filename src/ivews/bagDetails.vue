<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <div class="transfer">
          <ul class="transferHistry">
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <p>{{item.date}}</p>
              <h5>{{item.detail}}</h5>
              <span>{{item.state=1?'+':'-'}}{{item.amount}}</span>
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
      url: "/lcc",
      message: "钱包记录",
      href: "",
      classIcon: "",
      items:''
    };
  },
  mounted() {
      this.getData()
  },
  methods: {
      getData(){
          let that=this
          let id=that.$route.query.id
          api.minicart.template.choices('balanceRecord',{id:id}).then(result=>{
              if(result.status==200){
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
