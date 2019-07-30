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
                      <h5>{{item.fc}}Usdt</h5>
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
                          <p>{{$t('message.buyTotal')}}</p>
                          <dd>${{item.tb}}</dd>
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
                          <h5>{{item.fc}}FC</h5>
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
                              <p>{{$t('message.sellTotal')}}Usdt / Rmb</p>
                              <dd>${{item.usdt}} / ￥{{item.rmd}}</dd>
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
                          <h5>{{item.fc}}FC</h5>
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
                              <p>{{$t('message.sellTotal')}}Usdt / Rmb</p>
                              <dd>${{item.usdt}} / ￥{{item.rmb}}</dd>
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
import api from '../API/index'
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
      items: [],
      todos: [],
      lists: []
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData(){
      let that=this
      api.minicart.template.choices('myOrder/index').then(result=>{
        if(result.status==200){
          that.items=that.items.concat(result.res.buy)
          that.todos=that.todos.concat(result.res.withdraw)
          that.lists=that.lists.concat(result.res.usdt)
        }else if(result.status==400){
          alert(result.msg)
        }
      }).catch(err=>{
        alert(this.$t('message.error'))
      })
    }
  },
};
</script>

<style scoped>
</style>
