<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
      <div class="reportList">
        <div class="reportContent">
          <div class="noReport" v-if="items==0">{{$t('message.none')}}</div>
          <ul class="hasReport" v-else>
              <li v-for="(item,index) in items" :key="index">
                  <router-link :to="{path:'/reportDetails',query:{id:item.id}}">
                      <h5>{{item.title}}</h5>
                      <p>{{item.date}}</p>
                      <div class="reportStauts">
                         <span v-if="item.state==1" :style="{color:(item.state==1?'#e53c1d':'')}">{{$t('message.wait')}}</span>
                         <span v-if="item.state==2" :style="{color:(item.state==2?'#3eb36f':'')}">{{$t('message.Processing')}}</span>
                         <span v-if="item.state==3" :style="{color:(item.state==3?'#999':'')}">{{$t('message.end')}}</span>
                         <i class="el-icon-arrow-right"></i>
                      </div>
                  </router-link>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <router-link class="subReport" to="/reply">{{$t('message.submitReport')}}</router-link>
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
      url: "/my",
      message: this.$t('message.report'),
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
      api.minicart.template.choices('feedbackList').then(result=>{
        if(result.status==200){
          that.items=that.items.concat(result.res)
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
