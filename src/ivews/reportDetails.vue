<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
        <div class="work">
            <div class="workContent">
                <li v-for="(item,index) in items" :key="index">
                    <p>{{item.date}}</p>
                    <div class="workbg">
                        <h5>{{item.title}}</h5>
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <div id="bottom">
        <el-row>
            <el-col :span="6"><el-button class="solve">已解决</el-button></el-col>
            <el-col :span="18"><router-link to="" class="reply">回 复</router-link></el-col>
        </el-row>
        
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
      url: "/report",
      message: "工单详情",
      href: "",
      classIcon: "",
      items:[
          {
              date:'2018/07/19',
              title:'标题',
              text:'文本'
          }
      ]
    };
  }
};
</script>

<style scoped>
</style>
