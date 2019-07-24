<template>
 <div>
      <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane label="积分兑换" name="first">
            <div class="pointsAccount">
                <el-row>
                    <el-col :span="12">
                        <div class="bag" style="border-right:1px solid #313743">
                            <p>现金积分</p>
                            <h5>{{cash}}</h5>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="bag">
                            <p>通行积分</p>
                            <h5>{{number}}</h5>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <ul class="outside">
                
                <li>
                    <p>兑换类型</p>
                    <el-select v-model="type" @change="select()" placeholder="请选择兑换积分类型" class="tranPoints">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </li>
                <li>
                    <p>兑换数量</p>
                    <el-input v-model="amount" placeholder="请输入兑换数量"></el-input>
                </li>
            </ul>
            <el-button class="submit" @click="submit1()">确认</el-button>
        </el-tab-pane>
       <el-tab-pane label="转账记录" name="second">
            <div class="transfer">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.text}}{{item.name}}</h5>
                       <span>{{item.amount}}</span>
                   </li>
                </ul>
            </div>
       </el-tab-pane>
  </el-tabs>
  <!--密码组件-->
  <Pin @submit="submit" ref="child" :centerDialogVisible="show" />
 </div>
</template>

<script>
import api from '../API/index'
import Top from '../components/top'
import Pin from '../components/pin'
export default {
    components:{
        Top,
        Pin
    },
 data() {
  return {
      url:'/assets',
      message:'兑换',
      href:'',
      classIcon:'',
      activeName:'first',
      cash:'0.00',
      number:'0.00',
      options:[
          {
              id:1,
              label:'现金积分兑换通行积分'
          }
      ],
      items:[],
      type:1,
      amount:'',
      show:false

  }
 },
 mounted() {
     this.getData()
 },
 methods: {
     getData(){
         let that=this
         api.minicart.template.choices('changeRecord').then(result=>{
             if(result.status==200){
                 that.cash=result.res.cash
                 that.number=result.res.passage
                 that.items=that.items.concat(result.res.record)
             }else if(rsult.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     },
     select(){
         console.log(this.value)
     },
     submit(pwd){
         let that=this
         api.minicart.template.choices('changeBalance',{type:that.type,amount:that.amount,security:pwd}).then(result=>{
             if(result.status==200){
                 that.$message.success(result.msg)
                 setTimeout(() => {
                     window.location.reload()
                 }, 1000);
             }else if(result.status==400){
                 that.$message.error(result.msg)
             }
         }).catch(err=>{
             that.$message.error('错误!')
         })
     },
     submit1(){
         let that=this
         let number=that.amount
         if(number>0){
             that.$refs.child.open(that.show);
         }else {
             that.$message.warning('兑换数量不能为0')
         }
     }
 },
}
</script>

<style scoped>

</style>
