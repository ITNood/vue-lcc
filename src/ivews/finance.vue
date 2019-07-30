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
        <p>{{$t('message.vipay')}}</p>
        <div
          class="bill"
          style="background:#15234e"
          v-for="(todo,index) in todos"
          :key="index"
        >
          <div class="billTime">
            {{todo.date}}
            <span>{{todo.weekNumber>0? $t('message.ing'):$t('message.end')}}</span>
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
                <p>{{$t('message.weeks')}}</p>
              </div>
            </div>

            <ul class="meritsList">
              <li>
                {{$t('message.total')}}：<span>{{todo.totalSalary}}</span>
              </li>
              <li>
                {{$t('message.standard')}}：<span>{{todo.salary}}</span>
              </li>
              <li>
                {{$t('message.settling')}}：<span>{{todo.waitAmount}}</span>
              </li>
              <li>
                {{$t('message.settled')}}：<span>{{todo.getAmount}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--绩效薪酬-->
      <div class="merits">
        <p>{{$t('message.mance')}}</p>
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
                <span>{{item.weekNumber>0? $t('message.ing'):$t('message.end')}}</span>
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
                    <p>{{$t('message.weeks')}}</p>
                  </div>
                </div>

                <ul class="meritsList">
                  <li>
                    {{$t('message.total')}}：<span>{{item.totalSalary}}</span>
                  </li>
                  <li>
                    {{$t('message.standard')}}：<span>{{item.salary}}</span>
                  </li>
                  <li>
                    {{$t('message.settling')}}：<span>{{item.waitAmount}}</span>
                  </li>
                  <li>
                    {{$t('message.settled')}}：<span>{{item.getAmount}}</span>
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
      message: this.$t('message.pay'),
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
      todos:[],
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
          if(result.res.order1){
            that.todos=that.todos.concat(result.res.order1)
          }
          if(result.res.order2){
            that.items=that.items.concat(result.res.order2)
          }
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(that.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
