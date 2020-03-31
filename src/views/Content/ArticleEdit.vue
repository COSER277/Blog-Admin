<template>
  <div class="categoryCreate">
    <h1>{{ id ? "编辑" : "添加" }}文章</h1>
    <el-form
      label-width="80px"
      @submit.native.prevent="save"
      label-position="top"
    >
      <el-tabs tab-position="left">
        <el-tab-pane label="文章信息">
          <el-form-item label="文章主图">
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

            <el-input v-if="upload_type" v-model="form.image"></el-input>
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select
              v-model="form.categories"
              placeholder="请选择该属分类"
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
          <el-form-item label="所属标签">
            <el-select
              v-model="form.tags"
              placeholder="请选择该属标签"
              multiple
              clearable
            >
              <el-option
                v-for="item in tagsData"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <!-- 文章内容 -->
        <el-tab-pane label="文章内容">
          <el-form-item label="文章标题:">
            <el-input
              type="text"
              v-model="form.title"
              style="width:500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章来源:">
            <el-input
              type="text"
              v-model="form.level"
              style="width:500px"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章内容:" class="Articlecontent">
            <mavon-editor v-model="form.content"></mavon-editor>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="文章发布">
          <el-form-item label="文章状态:">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              active-text="发布"
              inactive-value="0"
              inactive-text="草稿"
            ></el-switch>
          </el-form-item>
          <el-form-item label="留言权限:">
            <el-tooltip
              :content="
                '当前的值: ' + form.commentStatus == 0
                  ? '禁止'
                  : form.commentStatus == 1
                  ? '允许'
                  : '禁止'
              "
              placement="top"
            >
              <el-switch
                v-model="form.commentStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              ></el-switch>
            </el-tooltip>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">
              {{ id ? "保存" : "添加" }}
            </el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  components: {},
  data() {
    return {
      form: {
        category: [],
        tag: [],
        image: "",
        title: "",
        level: "原创",
        content: "",
        status: "",
        commnetStatus: ""
      },
      upload_type: false,
      categoriesData: [],
      tagsData: []
    };
  },
  methods: {
    //获取某一文章
    async fetch() {
      if (this.id) {
        const res = await this.$http.post(`/common/article/${this.id}`);
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
      this.$set(this.form, "image", res.url);
    },
    //添加、编辑按钮事件
    async save() {
      if (this.id) {
        const res = await this.$http.put("/common/article/update", this.form);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/articles/list");
          return;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        console.log(this.form);
        const res = await this.$http.post("/common/article/create", this.form);

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
          this.$router.push("/articles/list");
        }
      }
    },
    //获取分类
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
    async fetchtags() {
      const res = await this.$http.get("/common/tag/list");
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: "获取数据成功!"
        });
        this.tagsData = res.data.data;
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
    this.fetchtags();
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
