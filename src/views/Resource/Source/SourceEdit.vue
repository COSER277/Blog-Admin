<template>
  <div class="codeEdit">
    <h1>{{ id ? "编辑" : "添加" }}资源链</h1>
    <el-form label-width="200px" @submit.native.prevent="save">
      <el-form-item label="资源链名称">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="资源链描述">
        <el-input type="text" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="资源链地址">
        <el-input type="text" v-model="form.url"></el-input>
      </el-form-item>
      <!-- <el-form-item label="资源链内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>-->
      <el-form-item label="资源链图片">
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
          <img v-if="form.image" :src="form.image" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-input v-model="form.image" v-if="upload_type"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="true"
          active-text="上播"
          :inactive-value="false"
          inactive-text="下架"
        ></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ id ? "保存" : "添加" }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: { id: {} },
  data() {
    return {
      form: {},
      categoriesData: [],
      upload_type: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async fetch() {
      if (this.id) {
        const res = await this.$http.post(`/common/source/${this.id}`);
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
    OnSuccess(res) {
      this.$set(this.form, "image", res.url);
    },
    async save() {
      if (this.id) {
        const res = await this.$http.put("/common/source/update", this.form);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/sources/list");
          return;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        const res = await this.$http.post("/common/source/create", this.form);
        if (res.data.code == -1) {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        } else {
          this.$message({
            type: "success",
            message: res.data.msg
          });
          this.$router.push("/sources/list");
        }
      }
    }
  },
  created() {
    this.fetch();
  },
  mounted() {}
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
</style>
