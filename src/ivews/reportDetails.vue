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
                        <h5>{{item.title}}<i class="icon iconfont icon-huixingzhen" @click="look($event)" v-if="item.state==1"></i></h5>
                        <input type="hidden" :value="item.img">
                        <p>{{item.text}}</p>
                    </div>
                </li>
            </div>
        </div>
    </div>
    <div id="bottom">
        <el-row>
            <el-col :span="6"><el-button class="solve">已解决</el-button></el-col>
            <el-col :span="18"><el-button class="reply" @click="reply()">回 复</el-button></el-col>
        </el-row>
    </div>
    <el-dialog :visible.sync="centerDialogVisible" width="80%" center class="openDialog">
        <span><img :src="img"></span>
    </el-dialog>
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
      centerDialogVisible:false,
      items:[
          {
              state:1,
              date:'2018/07/19',
              title:'标题',
              text:'文本',
              img:require('../assets/img/1.png')
          }
      ],
      img:''
    };
  },
  methods: {
    look(ev){
      console.log(ev)
      console.log(ev.target.parentNode.parentNode.children[1].defaultValue)
      let img=ev.target.parentNode.parentNode.children[1].defaultValue
      this.img=img
      this.centerDialogVisible=true
    },
    reply(ev){
      let id = this.$route.query.id;
      console.log(id);
      this.$router.push("/reply?id=" + id + "");
    }
  },
};
</script>

<style scoped>

</style>
