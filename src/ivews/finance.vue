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
        >
          <div class="billTime">
            {{date}}
            <span>进行中</span>
          </div>
          <div class="billContent">
            <div class="position">
              <el-progress
                type="circle"
                :percentage="percent"
                :width="80"
                :stroke-width="5"
                color="#2059ff"
                :show-text="false"
              ></el-progress>
              <div class="percentText">
                <h5>{{number}}</h5>
                <p>剩余周数</p>
              </div>
            </div>

            <ul class="meritsList">
              <li>
                薪酬总额：<span>{{total}}</span>
              </li>
              <li>
                薪酬标准：<span>{{pip}}</span>
              </li>
              <li>
                待结算周：<span>{{waitWeek}}</span>
              </li>
              <li>
                已结算周：<span>{{settle}}</span>
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
                <span>进行中</span>
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
                    <h5>{{item.number}}</h5>
                    <p>剩余周数</p>
                  </div>
                </div>

                <ul class="meritsList">
                  <li>
                    薪酬总额：<span>{{item.total}}</span>
                  </li>
                  <li>
                    薪酬标准：<span>{{item.pip}}</span>
                  </li>
                  <li>
                    待结算周：<span>{{item.waitWeek}}</span>
                  </li>
                  <li>
                    已结算周：<span>{{item.settle}}</span>
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
      number: 8,
      items: []
    };
  }
};
</script>

<style scoped>
</style>
