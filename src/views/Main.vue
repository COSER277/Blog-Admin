<template>
  <div class="main">
    <el-container>
      <el-header class="header" ref="nav">
        <!-- 已登录 -->
        <el-button
          type="danger"
          @click="logout"
          v-if="islogin"
          style="margin-right:20px"
          size="mini"
        >注销</el-button>
        <p v-if="islogin" style="margin-right:20px;color:#fff;">欢迎！{{ user.username }}</p>
        <!-- 未登录 -->
        <p v-else-if="!islogin" style="margin-right:20px;color:#fff;">请先登录</p>
        <!-- 未登录 -->
        <el-link @click="login">
          <el-avatar
            v-if="!islogin"
            class="avatar"
            style="cursor: pointer;"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          ></el-avatar>
        </el-link>
        <!-- 已登录 -->
        <el-link @click="showInfo">
          <el-avatar
            v-if="islogin"
            class="avatar"
            style="cursor: pointer;background-size:cover;"
            :src="user.backImg"
          ></el-avatar>
        </el-link>
      </el-header>

      <el-container>
        <el-aside width="12rem" class="nav" id="nav" style="background: rgb(238, 241, 246)">
          <el-menu router :default-openeds="['1']" :default-active="$route.path" unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document"></i>内容管理
              </template>
              <el-menu-item-group>
                <template slot="title">书本</template>
                <el-menu-item index="/books/edit">新建书本</el-menu-item>
                <el-menu-item index="/books/list">书本列表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">文章</template>
                <el-menu-item index="/articles/edit">新建文章</el-menu-item>
                <el-menu-item index="/articles/list">文章列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-paperclip"></i>分类/标签
              </template>
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/edit">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>

              <el-menu-item-group>
                <template slot="title">标签</template>
                <el-menu-item index="/tags/edit">新建标签</el-menu-item>
                <el-menu-item index="/tags/list">标签列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-video-camera-solid"></i>广告位管理
              </template>
              <el-menu-item-group>
                <template slot="title">广告</template>
                <el-menu-item index="/banners/edit">新建广告</el-menu-item>
                <el-menu-item index="/banners/list">广告列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-share"></i>资源管理
              </template>
              <el-menu-item-group>
                <template slot="title">代码库</template>
                <el-menu-item index="/codes/edit">新建代码库</el-menu-item>
                <el-menu-item index="/codes/list">代码库列表</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <template slot="title">资源链</template>
                <el-menu-item index="/sources/edit">新建资源链</el-menu-item>
                <el-menu-item index="/sources/list">资源链列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-attract"></i>友链管理
              </template>
              <el-menu-item-group>
                <template slot="title">友人</template>
                <el-menu-item index="/friends/edit">新建友链</el-menu-item>
                <el-menu-item index="/friends/list">友链列表</el-menu-item>
              </el-menu-item-group>
              <!-- <el-menu-item-group>
                <template slot="title">官方</template>
                <el-menu-item index="/offices/edit">新建官链</el-menu-item>
                <el-menu-item index="/offices/list">官链列表</el-menu-item>
              </el-menu-item-group>-->
            </el-submenu>
            <el-menu-item :index="'/about/edit/'+user._id">
              <i class="el-icon-setting"></i>站点设置
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-main class="content-view" v-if="islogin">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {
      islogin: true,

      user: {}
    };
  },
  components: {},
  methods: {
    async fetchToken() {
      const res = await this.$http.get("/vaildtoken");
      // console.log(res.data);
      this.user = Object.assign({}, this.user, res.data.data);
    },
    async logout() {
      //清楚localStorage.token
      //想后端发起登出的请求
      this.$confirm(`主人是否退出龙宫？喵~?`, "提示", {
        confirmButtonText: "是的",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "退出成功，欢迎主人下次回来看我哟~!"
          });
          localStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    },
    showInfo() {
      this.$router.push(`/about/edit/${this.user._id}`);
    },
    async login() {
      this.$router.push("/login");
    }
  },
  mounted() {
    var height = document.documentElement.clientHeight;
    //console.log(document.getElementsByClassName("nav")[0].style.height);
    document.getElementsByClassName("nav")[0].style.height = height + "px";
    document.getElementsByClassName("content-view")[0].style.height =
      height + "px";
  },
  created() {
    this.fetchToken();
  }
};
</script>

<style lang="scss">
.main {
  width: 100%;
  display: flex;
  position: relative;
  .header {
    position: absolute;
    top: 0rem;
    right: 0;
    display: flex;
    justify-content: flex-end; //垂直
    align-items: center;
    // float: right;
    width: 100%;
    height: 4rem;
    background-color: #545c64;
    border-bottom: 0.001rem solid #000;
    .avatar {
      text-align: center;
    }
    .el-avatar > img {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
  }
  .nav {
    position: relative;
    top: 4rem;
    left: 0;
    width: 200px;
    height: 100%;

    //padding-top: 4rem;
  }
  .content-view {
    position: relative;
    top: 4rem;
    left: 0;
    //padding-left: 200px;

    width: 100%;
  }
}
</style>
