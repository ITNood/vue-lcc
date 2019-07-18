<template>
 <div>
      <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs v-model="activeName" id="tabs">
        <el-tab-pane label="薪酬" name="first">
            <div class="maxSalary">
                <div class="percent">
                    <el-progress type="circle" :percentage="percent" :width="100" color="#2059ff" :stroke-width="5" :show-text="false"></el-progress>
                    <div class="progressText">
                        <h5>{{percent}}%</h5>
                        <p>距离封顶</p>
                    </div>
                </div>
                <el-row class="salaryList">
                    <el-col :span="8">
                        <div class="salaryContent">
                            <h5>{{total}}</h5>
                            <p>封顶金额/周</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="salaryContent">
                            <h5>{{amount}}</h5>
                            <p>本周收益/周</p>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="salaryContent">
                            <h5>{{wages}}</h5>
                            <p>绩效工资卡</p>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <ul class="getSalary">
                <li>
                    <p>取出数量</p>
                    <div class="get-out">
                        <el-input v-model="value" v-on:input="change" placeholder="请输入您需要取出的数量"></el-input>
                        <el-button class="take">全部取出</el-button>
                    </div>
                </li>
                <li>
                    手续费<i>{{fee}}</i>
                </li>
                <li>
                    自动兑换股权份额<i>{{stock}}</i>
                </li>
                <li>
                    自定兑换现金余额<i>{{cash}}</i>
                </li>
            </ul>
            <el-button class="submit" @click="submit()">确认</el-button>
        </el-tab-pane>
       <el-tab-pane label="取出记录" name="second">
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
      message:'薪酬',
      href:'',
      classIcon:'',
      activeName:'first',
      items:[],
      percent:50,
      total:0,
      amount:0,
      wages:0,
      value:'',
      fee:0,
      stock:0,
      cash:0

  }
 },
 methods: {
    change(){

    }
 },
}
</script>

<style scoped>

</style>
