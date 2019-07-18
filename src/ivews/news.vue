<template>
 <div>
     <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
        <div class="news">
            <ul class="newsList">
                <li v-for="(item,index) in items" :key="index">
                    <router-link :to="{path:'/details',query:{id:item.id}}">
                       <p>{{item.date}}</p>
                       <div class="newsText">{{item.text}}<i class="el-icon-arrow-right"></i></div>
                    </router-link>
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
      url: "/home",
      message: "私人信箱",
      href: "",
      classIcon: "",
      items:[
          {
              id:2,
              date:'2019/07/18',
              text:'行文对抗赛垃圾'
          },
          {
              id:2,
              date:'2019/07/18',
              text:'行文对抗赛垃圾'
          }
      ]
  }
 }
}
</script>

<style scoped>

</style>
