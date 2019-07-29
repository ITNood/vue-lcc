<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <el-tabs
      v-model="activeName"
      id="tabs"
    >
      <el-tab-pane
        :label="$t('message.pay')"
        name="first"
      >
        <div class="maxSalary">
          <div class="percent">
            <el-progress
              type="circle"
              :percentage="percent"
              :width="100"
              color="#2059ff"
              :stroke-width="5"
              :show-text="false"
            ></el-progress>
            <div class="progressText">
              <h5>{{percent}}%</h5>
              <p>{{$t('message.cap')}}</p>
            </div>
          </div>
          <el-row class="salaryList">
            <el-col :span="8">
              <div class="salaryContent">
                <h5>{{total}}</h5>
                <p>{{$t('message.capweek')}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="salaryContent">
                <h5>{{amount}}</h5>
                <p>{{$t('message.earning')}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="salaryContent">
                <h5>{{wages}}</h5>
                <p>{{$t('message.payCard')}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <ul class="getSalary">
          <li>
            <p>{{$t('message.getNumebr')}}</p>
            <div class="get-out">
              <el-input
                v-model="value"
                v-on:input="change"
                :placeholder="$t('message.please')"
              ></el-input>
              <el-button
                class="take"
                @click="get()"
              >{{$t('message.getAll')}}</el-button>
            </div>
          </li>
          <li>
            {{$t('message.charge')}}<i>{{fee}}</i>
          </li>
          <li
            v-for="(todo,index) in todos"
            :key="index"
          >
            {{todo.name}}<i>{{value*todo.ratio}}</i>
          </li>
          <!-- <li>
                    自定兑换现金余额<i>{{cash}}</i>
                </li> -->
        </ul>
        <el-button
          class="submit"
          @click="submit1()"
        >{{$t('message.confirm')}}</el-button>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('message.getHistry')"
        name="second"
      >
        <div class="transfer">
          <ul class="transferHistry">
            <li
              v-for="(item,index) in items"
              :key="index"
            >
              <p>{{item.date}}</p>
              <h5>{{item.text}}{{item.name}}</h5>
              <span>{{item.amount}}</span>
            </li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--密码组件-->
    <Pin
      @submit="submit"
      ref="child"
      :centerDialogVisible="show"
    />
  </div>
</template>

<script>
import api from "../API/index";
import Top from "../components/top";
import Pin from "../components/pin";
export default {
  components: {
    Top,
    Pin
  },
  data() {
    return {
      url: "/assets",
      message: this.$t('message.pay'),
      href: "",
      classIcon: "",
      activeName: "first",
      items: [],
      percent: 0,
      total: 0,
      amount: 0,
      wages: 0,
      value: "",
      fee: 0,
      fee1: "",
      todos: [],
      show: false
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let that = this;
      api.minicart.template
        .choices("resultTakeOutRecord")
        .then(result => {
          if (result.status == 200) {
            that.todos = that.todos.concat(result.res.set);
            that.fee1 = result.res.fee;
            that.total = result.res.capsAmount; //封顶
            that.amount = result.res.income; //本周收益
            that.wages = result.res.result;
            that.percent = result.res.percent;
            that.items=that.items.concat(result.res.record)
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t('message.error'));
        });
    },
    //全部取出
    get() {
      let that = this;
      let number = that.wages;
      that.value = number;
      that.fee = number * that.fee1;
    },
    change() {
      let that = this;
      //   console.log(that.value)
      that.fee = that.value * that.fee1;
    },
    submit1() {
      let that = this;
      let value = that.value;
      if (value) {
        that.$refs.child.open(that.show);
      }else{
          that.$message.error(this.$t('message.please'))
      }
    },
    submit(pwd) {
        let that=this
        api.minicart.template.choices('resultTakeOutCreate',{amount:that.value,security:pwd}).then(result=>{
            if(result.status==200){
                that.$message.success(result.msg)
                window.location.reload()
            }else if(result.status==400){
                that.$message.error(result.msg)
            }
        }).catch(err=>{
            that.$message.error(this.$t('message.error'))
        })
    }
  }
};
</script>

<style scoped>
</style>
