<template>
  <div>
    <el-header
      id="marketTop"
      height="50px"
    >
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">市场</el-col>
        <el-col :span="6"><i
            class="icon iconfont icon-about_line"
            @click="centerDialogVisible=true"
          ></i></el-col>
      </el-row>
    </el-header>
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      class="marketDialog"
    >
      <span>本行情数据来源于</span>
      <span>www.okcoin.com</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
        class="submit"
          @click="centerDialogVisible = false"
        >确 认</el-button>
      </span>
    </el-dialog>
    <Bottom />
    <div class="container" style="margin:0 20px;">
        <ul class="marketList">
            <li v-for="(item,index) in items" :key="index">
                <i><img :src="item.img"></i>
                <el-row class="bagContent">
                    <el-col :span="12">
                        <h5>{{item.title}}</h5>
                        <p>{{item.text}}</p>
                    </el-col>
                    <el-col class="text-right" :span="12">
                        <h5>${{item.amount}}</h5>
                        <p :style="{color:(item.state==1?'#05ce7e':'#e53c1d')}">{{item.state==1?'+':'-'}}{{item.price}}%</p>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Bottom from "../components/bottom";
export default {
  components: {
    Bottom
  },
  data() {
    return {
        centerDialogVisible:false,
        items:[
            {
                img:require('../assets/img/market1.png'),
                title:'FC',
                text:'FnCun Token',
                amount:100,
                state:1,
                price:7.25
            },
            {
                img:require('../assets/img/market1.png'),
                title:'FC',
                text:'FnCun Token',
                amount:100,
                state:2,
                price:7.25
            }
        ]
    };
  }
};
</script>

<style scoped>
</style>
