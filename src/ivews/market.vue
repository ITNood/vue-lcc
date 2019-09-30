<template>
  <div>
    <el-header
      id="marketTop"
      height="50px"
    >
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">{{$t('message.market')}}</el-col>
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
      <span>{{$t('message.form')}}</span>
      <span>www.okcoin.com</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
        class="submit"
          @click="centerDialogVisible = false"
        >{{$t('message.confirm')}}</el-button>
      </span>
    </el-dialog>
    <Bottom />
    <div class="container" style="margin:0 20px;">
        <ul class="marketList">
            <li v-for="(item,index) in items" :key="index">
                <i><img :src="item.img"></i>
                <el-row class="bagContent">
                    <el-col :span="12">
                        <h5 style="line-height:43px;font-size:20px">{{item.name}}</h5>
                        <!-- <p>{{item.text}}</p> -->
                    </el-col>
                    <el-col class="text-right" :span="12">
                        <h5>${{item.price}}</h5>
                        <p :style="{color:(item.percent>=0?'#05ce7e':'#e53c1d')}">{{item.percent>=0 ?'+':''}}{{item.price}}%</p>
                    </el-col>
                </el-row>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import Bottom from "../components/bottom";
import api from '../API/index';

export default {
  components: {
    Bottom
  },
  data() {
    return {
        centerDialogVisible:false,
        items:[]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('coinMarket/index').then(result=>{
        if(result.status==200){
          that.items=that.items.concat(result.res)
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
