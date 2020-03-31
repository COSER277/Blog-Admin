<template>
  <div class="about">
    <h1>{{ id ? "修改" : "" }}博客信息</h1>
    <el-form @submit.native.prevent="save" label-position="left">
      <el-tabs>
        <el-tab-pane label="站点配置">
          <el-form-item label="登录账号">
            <el-input type="text" v-model="form.username" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input type="text" v-model="form.password" style="width:500px"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="站点内容">
          <el-form-item label="站点名称">
            <el-input type="text" v-model="form.SiteName" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="站点描述">
            <el-input type="text" v-model="form.descr" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="text" v-model="form.authorDescr" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="Github">
            <el-input type="text" v-model="form.github" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="Github主页">
            <el-input type="text" v-model="form.githubPerson" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="Email">
            <el-input type="text" v-model="form.email" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label="站点背景图">
            <el-switch
              v-model="upload_type"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              active-text="链接"
              :inactive-value="false"
              inactive-text="上传"
            ></el-switch>
            <el-upload
              v-if="!upload_type"
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="OnSuccess"
            >
              <img v-if="form.backImg" :src="form.backImg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <el-input type="text" v-if="upload_type" v-model="form.backImg"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="简介内容">
          <el-form-item style="margin:10px 0;">
            <el-button type="primary" native-type="submit" v-if="id">{{ id ? "保存" : "添加" }}</el-button>
          </el-form-item>

          <el-form-item>
            <el-switch
              v-model="type"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="true"
              active-text="TXT"
              :inactive-value="false"
              inactive-text="MD"
            ></el-switch>
          </el-form-item>

          <el-form-item class="Articlecontent" v-if="!type">
            <mavon-editor v-model="form.content"></mavon-editor>
          </el-form-item>
          <el-form-item class="Articlecontent" v-else-if="type">
            <el-input type="textarea" v-model="form.content"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
export default {
  props: { id: {} },
  data() {
    return {
      form: {},
      type: false,
      upload_type: false
    };
  },
  methods: {
    //获取某一文章
    async fetch() {
      if (this.id) {
        const res = await this.$http.post(`/admin/${this.id}`);
        if (res.data.code == -1) {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        } else {
          this.$message({
            type: "success",
            message: "获取该数据成功"
          });
          this.form = Object.assign({}, this.form, res.data.data);
        }
      }
    },
    //图片上传
    OnSuccess(res) {
      this.$set(this.form, "backImg", res.url);
    },
    //添加、编辑按钮事件
    async save() {
      if (this.id) {
        const res = await this.$http.put("/admin/update", this.form);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/");
          return;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      }
      //  else {
      //   console.log(this.form);
      //   const res = await this.$http.post("/common/admin/create", this.form);

      //   if (res.data.code == -1) {
      //     this.$message({
      //       type: "warning",
      //       message: res.data.msg
      //     });
      //   } else {
      //     this.$message({
      //       type: "success",
      //       message: res.data.msg
      //     });

      //     this.$router.push("/");
      //   }
      // }
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.Articlecontent {
  width: 100%;
  min-height: 50vh;
  max-height: 100%;
}
</style>
