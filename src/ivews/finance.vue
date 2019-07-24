<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container" style="margin-bottom:0;">
      <div class="merits">
        <p>Vip薪酬</p>
        <div
          class="bill"
          style="background:#15234e"
          v-for="(todo,index) in todos"
          :key="index"
        >
          <div class="billTime">
            {{todo.date}}
            <span>{{todo.weekNumber>0?'进行中':'已完成'}}</span>
          </div>
          <div class="billContent">
            <div class="position">
              <el-progress
                type="circle"
                :percentage="todo.percent"
                :width="80"
                :stroke-width="5"
                color="#2059ff"
                :show-text="false"
              ></el-progress>
              <div class="percentText">
                <h5>{{todo.weekNumber}}</h5>
                <p>剩余周数</p>
              </div>
            </div>

            <ul class="meritsList">
              <li>
                薪酬总额：<span>{{todo.totalSalary}}</span>
              </li>
              <li>
                薪酬标准：<span>{{todo.salary}}</span>
              </li>
              <li>
                待结算周：<span>{{todo.waitAmount}}</span>
              </li>
              <li>
                已结算周：<span>{{todo.getAmount}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--绩效薪酬-->
      <div class="merits">
        <p>绩效薪酬</p>
        <div class="performance">
          <div class="performContent">
            <div
              class="bill"
              style="margin-bottom:10px;"
              v-for="(item,index) in items"
              :key="index"
            >
              <div class="billTime">
                {{item.date}}
                <span>{{item.weekNumber>0?'进行中':'已完成'}}</span>
              </div>
              <div class="billContent">
                <div class="position">
                  <el-progress
                    type="circle"
                    :percentage="item.percent"
                    :width="80"
                    :stroke-width="5"
                    color="#2059ff"
                    :show-text="false"
                  ></el-progress>
                  <div class="percentText">
                    <h5>{{item.weekNumber}}</h5>
                    <p>剩余周数</p>
                  </div>
                </div>

                <ul class="meritsList">
                  <li>
                    薪酬总额：<span>{{item.totalSalary}}</span>
                  </li>
                  <li>
                    薪酬标准：<span>{{item.salary}}</span>
                  </li>
                  <li>
                    待结算周：<span>{{item.waitAmount}}</span>
                  </li>
                  <li>
                    已结算周：<span>{{item.getAmount}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      url: "/home",
      message: "薪酬",
      href: "",
      classIcon: "",
      percent: 25,
      date: "",
      total: 0,
      pip: 0,
      waitWeek: 0,
      settle: 0,
      number: '',
      items: [],
      todos:[]
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('home/myInvest').then(result=>{
        if(result.status==200){
          that.todos=that.todos.concat(result.res.order1)
          that.items=that.items.concat(result.res.order2)
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
