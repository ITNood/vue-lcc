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
                    <el-select v-model="value" @change="select()" placeholder="请选择兑换积分类型" class="tranPoints">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </li>
                <li>
                    <p>兑换数量</p>
                    <el-input v-model="amount" placeholder="请输入兑换数量"></el-input>
                </li>
            </ul>
            <el-button class="submit" @click="submit()">确认</el-button>
        </el-tab-pane>
       <el-tab-pane label="转账记录" name="second">
            <div class="transfer">
                <ul class="transferHistry">
                   <li v-for="(item,index) in items" :key="index" >
                       <p>{{item.date}}</p>
                       <h5>{{item.text}}</h5>
                       <span>{{item.amount}}</span>
                   </li>
                </ul>
            </div>
       </el-tab-pane>
  </el-tabs>
 </div>
</template>

<script>
import Top from '../components/top'
export default {
    components:{
        Top
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
      options:[],
      items:[],
      value:'',
      amount:''

  }
 },
 methods: {
     select(){
         console.log(this.value)
     }
 },
}
</script>

<style scoped>

</style>
