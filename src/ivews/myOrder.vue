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
        :label="$t('message.buyorder')"
        name="first"
      >
        <div class="buyOrder">
          <div class="buylist">
            <div class="pubilcOrder">
              <ul class="orderList">
                <li
                  v-for="(item,index) in items"
                  :key="index"
                >
                  <a>
                    <div class="status">
                      <h5>{{item.amount}}Usdt</h5>
                      <div class="orderStauts">
                        <span>{{$t('message.successed')}}</span>
                        <!-- <span v-if="item.state==1">{{$t('message.matched')}}</span>
                        <span v-else-if="item.state==2">{{$t('message.ing')}}</span>
                        <span v-else-if="item.state==3">{{$t('message.end')}}</span>
                        <span v-else-if="item.state==4">{{$t('message.cancel')}}</span>
                        <span v-else-if="item.state==5">{{$t('message.ing')}}</span> -->
                        <!-- <i class="el-icon-arrow-right"></i> -->
                      </div>
                    </div>
                    <el-row :gutter="15">
                      <el-col :span="10">
                        <div class="orderContent">
                          <p>{{$t('message.time')}}</p>
                          <dd>{{item.date}}</dd>
                        </div>
                      </el-col>
                      <el-col :span="14">
                        <div class="orderContent textRight">
                          <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                          <dd>${{item.dollar}} / ￥{{item.rmb}}</dd>
                        </div>
                      </el-col>
                    </el-row>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('message.sellorder')"
        name="second"
      >
        <el-tabs
          id="walletTab"
          v-model="currentName"
        >
          <el-tab-pane name="first">
            <span slot="label"><i class="icon iconfont icon-yinhangqia"></i>{{$t('message.site')}}</span>
            <!--场外收款-->
            <div class="sellOrder">
              <div class="sellList">
                <div class="pubilcOrder">
                  <ul class="orderList">
                    <li
                      v-for="(item,index) in todos"
                      :key="index"
                    >
                      <router-link :to="item.state==1 || item.state==3 || item.state==4 ? '':{path:'/orderDetails',query:{id:item.id}}">
                        <div class="status">
                          <h5>{{item.amount}}Usdt</h5>
                          <div class="orderStauts">
                            <span v-if="item.state==1">{{$t('message.matched')}}</span>
                            <span v-else-if="item.state==2">{{$t('message.ing')}}</span>
                            <span v-else-if="item.state==3">{{$t('message.end')}}</span>
                            <span v-else-if="item.state==4">{{$t('message.cancel')}}</span>
                            <span v-else-if="item.state==5">{{$t('message.ing')}}</span>
                            <i class="el-icon-arrow-right"></i>
                          </div>
                        </div>
                        <el-row :gutter="15">
                          <el-col :span="10">
                            <div class="orderContent">
                              <p>{{$t('message.time')}}</p>
                              <dd>{{item.date}}</dd>
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="orderContent textRight">
                              <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                              <dd>${{item.dollar}} / ￥{{item.rmb}}</dd>
                            </div>
                          </el-col>
                        </el-row>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="icon iconfont icon-meiyuan8"></i>{{$t('message.usdt')}}</span>
            <div class="sellOrder">
              <div class="sellList">
                <div class="pubilcOrder">
                  <ul class="orderList">
                    <li
                      v-for="(item,index) in lists"
                      :key="index"
                    >
                      <a>
                        <div class="status">
                          <h5>{{item.amount}}Usdt</h5>
                          <div class="orderStauts">
                            <span>{{items.state==1 ? $t('message.wait'):$t('message.processed')}}</span>
                          </div>
                        </div>
                        <el-row :gutter="15">
                          <el-col :span="10">
                            <div class="orderContent">
                              <p>{{$t('message.time')}}</p>
                              <dd>{{item.date}}</dd>
                            </div>
                          </el-col>
                          <el-col :span="14">
                            <div class="orderContent textRight">
                              <p>{{$t('message.totalRec')}}Usdt / Rmb</p>
                              <dd>${{item.dollar}} / ￥{{item.rmb}}</dd>
                            </div>
                          </el-col>
                        </el-row>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-tab-pane>
    </el-tabs>
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
      url: "/lcc",
      message: this.$t('message.myorder'),
      href: "",
      classIcon: "",
      activeName: "first",
      currentName: "first",
      items: [
        {
          amount: 100,
          date: "2019/07/26",
          dollar: 100,
          rmb: 100
        }
      ],
      todos: [
        {
          amount: 100,
          date: "2019/07/26",
          dollar: 100,
          rmb: 100,
          state: 2,
          id: 2
        }
      ],
      lists: [
        {
          amount: 100,
          date: "2019/07/26",
          dollar: 100,
          rmb: 100,
          state: 1
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>
