<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
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
              <span>V{{index+1}}</span>{{item.number}}级权益卡
            </el-col>
            <el-col :span="12">
              <el-button
                @click="buy($event)"
                class="buy-btn"
                :value="item.id"
              >购买</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <ul
                class="rightList"
                style="border-right:1px solid #999;"
              >
                <li>周薪资:<span>{{item.week}}</span></li>
                <li>周封顶:<span>{{item.weekMax}}</span></li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul class="rightList">
                <li>配套金额:<span>{{item.amount}}</span></li>
                <li>售价:<span style="color:#2059ff">{{item.price}}积分</span></li>
              </ul>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <!--支付方式-->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="80%"
      center
      :close-on-click-modal="false"
      id="open"
    >
      <span>您将购买一级权益卡，需支付 {{point}} 积分</span>
      <div class="pay">
          <p>支付方式</p>
          <el-select v-model="value" class="paySelect" placeholder="请选择" @change="change($event)">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
        class="submit"
          @click="submit()"
        >确 定</el-button>
      </span>
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
      centerDialogVisible: false,
      point:null,
      value:'',
      url: "/home",
      message: "购买配套",
      href: "",
      classIcon: "",
      items: [
        {
          number: "一",
          week: "0.00",
          weekMax: "0.00",
          amount: "0.00",
          price: "0.00",
          id: "1"
        },
        {
          number: "一",
          week: "0.00",
          weekMax: "0.00",
          amount: "0.00",
          price: "0.00",
          id: "222"
        }
      ],
      options:[
          {
              label:'注册积分',
              value:'1'
          },
          {
              label:'合并积分',
              value:'2'
          }
      ]
    };
  },
  methods: {
    buy(ev) {
      this.centerDialogVisible=true
      console.log(ev);
    },
    change(ev){
        console.log(ev)
    },
    submit(){
        this.centerDialogVisible=false
    }
  }
};
</script>

<style scoped>

</style>
