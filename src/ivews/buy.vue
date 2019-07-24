<template>
  <div>
    <Top :pathUrl="url" :title="message" :appUrl="href" :font="classIcon" />
    <div class="container" style="margin-bottom:20px;">
      <div class="buyTips">每个用户只限购买一份配套, 配套只允许一次升级机会，请慎重选择。</div>
      <ul id="buyList">
        <li
          v-for="(item,index) in items"
          :key="index"
        >
          <el-row :gutter="15">
            <el-col
              :span="12"
              class="rights"
            >
              <span>V{{item.level}}</span>{{item.name}}
            </el-col>
            <el-col :span="12">
              <el-button
                class="buy-btn"
                :value="item.id"
                :number="item.invest"
                @click="buy($event)"
              >购买</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <ul
                class="rightList"
                style="border-right:1px solid #999;"
              >
                <li>周薪资:<span>{{item.week_dividend}}</span></li>
                <li>周封顶:<span>{{item.week_cap}}</span></li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul class="rightList">
                <li>配套金额:<span>{{item.given_amount}}</span></li>
                <li>售价:<span style="color:#2059ff">{{item.invest}}积分</span></li>
              </ul>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <!--支付方式-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="85%"
      center
      :close-on-click-modal="false"
      id="open"
    >
      <span>您将购买一级权益卡，需支付 {{invest}} 积分</span>
      <div class="pay">
          <p>支付方式</p>
          <el-select v-model="type" class="paySelect" placeholder="请选择" @change="change($event)">
              <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
          </el-select>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
        class="submit"
          @click="submit1()"
        >确 定</el-button>
      </span>
    </el-dialog>
 <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
  </div>
</template>

<script>
import api from '../API/index'
import Top from "../components/top";
import Pin from '../components/pin'
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      centerDialogVisible: false,
      type:'',
      url: "/home",
      message: "购买配套",
      href: "",
      classIcon: "",
      items: [],
      options:[],
      id:'',
      show:false,
      invest:''
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('home/viewInvest').then(result=>{
        if(result.status==200){
          that.items=that.items.concat(result.res.nextLevel)
          that.options=that.options.concat(result.res.pay)
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误！')
      })
    },
    buy(ev) {
      let that=this
      that.centerDialogVisible=true
      that.id=ev.target.parentNode.value
      console.log(that.id)
      //console.log(ev)
      that.items.map(result=>{
        if(result.id==that.id){
          console.log(result)
          that.invest=result.invest
        }
      })
    },
    change(ev){

    },
    submit(pwd){
      let that=this
      api.minicart.template.choices('home/createInvest',{id:that.id,payId:that.type,security:pwd}).then(result=>{
        if(result.status==200){
          that.$message.success(result.msg)
          setTimeout(() => {
            that.$router.push('/home')
          }, 500);
        }else if(result.status==400){
          that.$message.error(result.msg)
        }
      }).catch(err=>{
        that.$message.error('错误!')
      })
    },
    submit1(){
      let that=this
      that.centerDialogVisible=false
      that.$refs.child.open(that.show);
    }
  }
};
</script>

<style scoped>

</style>
