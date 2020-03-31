<template>
  <div class="categoryCreate">
    <h1>{{ id ? "编辑" : "添加" }}分类</h1>
    <el-form label-width="200px" @submit.native.prevent="save">
      <el-form-item label="分类名称">
        <el-input type="text" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图标">
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
          <img v-if="form.icon" :src="form.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-input type="text" v-if="upload_type" v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="父属分类" label-width="200px">
        <el-select
          v-model="form.categories"
          placeholder="请选择该属文章"
          multiple
          clearable
        >
          <el-option
            v-for="item in categoriesData"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="该属文章" label-width="200px">
        <el-select
          v-model="form.articles"
          placeholder="请选择该属文章"
          multiple
          clearable
          style="width:500px;height:auto;"
        >
          <el-option
            v-for="item in articlesData"
            :key="item._id"
            :label="item.title"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{
          id ? "保存" : "添加"
        }}</el-button>
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
      articlesData: [],
      upload_type: false
    };
  },

  watch: {
    upload_type() {
      // console.log(this.upload_type,"....");
    }
  },
  computed: {},
  methods: {
    async fetch() {
      if (this.id) {
        const res = await this.$http.post(`/common/category/${this.id}`);
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
      this.$set(this.form, "icon", res.url);
    },
    async save() {
      if (this.id) {
        const res = await this.$http.put("/common/category/update", this.form);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/categories/list");
          return;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        const res = await this.$http.post("/common/category/create", this.form);
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
          this.$router.push("/categories/list");
        }
      }
    },
    async fetchcategories() {
      const res = await this.$http.get("/common/category/list");
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: "获取数据成功!"
        });
        this.categoriesData = res.data.data;
      } else {
        this.$message({
          type: "warning",
          message: "获取数据失败!"
        });
      }
    },
    async fetcharticles() {
      const res = await this.$http.get("/common/article/list");
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: "获取数据成功!"
        });
        this.articlesData = res.data.data;
      } else {
        this.$message({
          type: "warning",
          message: "获取数据失败!"
        });
      }
    }
  },
  created() {
    this.fetchcategories();
    this.fetcharticles();
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
