<template>
  <div class="login">
    <el-card class="login-card">
      <div slot="header" class="clearfix">
        <span>*喵~*欢迎主人</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <el-form label="100px" @submit.native.prevent="login">
        <el-form-item label="账号">
          <el-input
            type="text"
            v-model="form.username"
            placeholder="@-喵-@:输入您的登录账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="@-喵-@:输入您的登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button type="primary" style="width:10rem" native-type="submit"
            >Let's Go!</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async login() {
      if (!this.form.username) {
        this.$message({
          type: "error",
          message: "账号不能为空"
        });
        return;
      }
      if (!this.form.password) {
        this.$message({
          type: "error",
          message: "密码不能为空"
        });
        return;
      } else {
        const res = await this.$http.post("login", this.form);
        if (res.data.code == "404") {
          return;
        }
        localStorage.token = res.data.token;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功,欢迎管理员回来!"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/lbg.jpg");
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  .el-card__header {
    font-weight: 700;
    font-size: 24px;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }
  .login-card {
    width: 25rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //margin: 0 auto;
  }
}
</style>
