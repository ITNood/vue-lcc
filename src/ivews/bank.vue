<template>
  <div>
    <Top
      :pathUrl="url"
      :title="message"
      :appUrl="href"
      :font="classIcon"
    />
    <div class="container">
      <el-form
        :model="form"
        ref="form"
        class="addPublic"
      >
        <el-form-item
          :label="$t('message.real')"
          prop="truename"
        >
          <el-input
            v-model="form.truename"
            :placeholder="$t('message.enterReal')"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.bank')"
          prop="bankName"
        >
          <el-input
            v-model="form.bankName"
            :placeholder="$t('message.enterbank')"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.bankCard')"
          prop="bankAccount"
        >
          <el-input
            v-model="form.bankAccount"
            :placeholder="$t('message.enterbankcard')"
          ></el-input>
        </el-form-item>

        <el-form-item
          :label="$t('message.openbank')"
          prop="bankBranch"
        >
          <el-input
            v-model="form.bankBranch"
            :placeholder="$t('message.bankname')"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        class="submit"
        @click="edit()"
        v-if="show"
      >{{$t('message.confirm')}}</el-button>
      <el-button
        class="submit"
        @click="bank()"
        v-else
      >{{$t('message.confirm')}}</el-button>
    </div>
  </div>
</template>

<script>
import api from "../API/index.js";
import Top from "../components/top";
export default {
  components: {
    Top
  },
  data() {
    return {
      url: "/takeWay",
      message: this.$t('message.bankCard'),
      href: "",
      classIcon: "",
      show: false,
      form: {
        bankBranch: "",
        bankAccount: "",
        bankName: "",
        truename: "",
        type: 1,
        id: ""
      }
    };
  },
  mounted() {
    this.getData();
    let id = this.$route.query.id;
    if (id) {
      this.show = true;
    } else {
      this.show = false;
    }
  },
  methods: {
    bank() {
      let that = this;

      let data = that.form;
      api.minicart.template
        .choices("insertPayAddress", data)
        .then(result => {
          if (result.status == 200) {
            that.$message.success(result.msg);
            setTimeout(() => {
              that.$router.push("/takeWay");
            }, 500);
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t("message.error"));
        });
    },
    //编辑bank
    edit() {
      let that = this;
      let id = that.$route.query.id;
      console.log(id);
      that.form.id = id;
      let data = that.form;
      api.minicart.template
        .choices("updatePayAddress", data)
        .then(result => {
          if (result.status == 200) {
            that.$message.success(result.msg);
            setTimeout(() => {
              that.$router.push("/takeWay");
            }, 500);
          } else if (result.status == 400) {
            that.$message.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t("message.error"));
        });
    },
    getData() {
      let that = this;
      let id = that.$route.query.id;
      api.minicart.template
        .choices("getPayAddress", { id, id })
        .then(result => {
          if (result.status == 200) {
            if (result.res.bank) {
              that.form.truename = result.res.bank.truename;
              that.form.bankName = result.res.bank.bank_name;
              that.form.bankAccount = result.res.bank.address;
              that.form.bankBranch = result.res.bank.bank_branch;
            }
          } else if (result.status == 400) {
            that.$messge.error(result.msg);
          }
        })
        .catch(err => {
          that.$message.error(this.$t("message.error"));
        });
    }
  }
};
</script>

<style scoped>
</style>
