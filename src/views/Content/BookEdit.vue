<template>
  <div class="categoryCreate">
    <h1>{{ id ? "编辑" : "添加" }}书籍</h1>
    <el-form label-width="200px" @submit.native.prevent="save">
      <el-form-item label-width="0px">
        <el-button :type="id ? 'danger' : 'success'" native-type="submit">{{
          id ? "修改书本" : "添加书本"
        }}</el-button>
        <el-button @click="addTab(editableTabsValue)" type="success">
          增加章节
        </el-button>
      </el-form-item>
      <el-tabs>
        <el-tab-pane label="基础信息">
          <el-form-item label-width="50px" label="书  名:">
            <el-input v-model="form.bookname" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label-width="50px" label="作  者:">
            <el-input v-model="form.publisher" style="width:500px"></el-input>
          </el-form-item>
          <el-form-item label-width="50px" label="状  态:">
            <el-switch
              v-model="form.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              active-text="发布"
              inactive-value="0"
              inactive-text="草稿"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="书本封面" label-width="50px">
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
        </el-tab-pane>
        <el-tab-pane label="章节内容">
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
          >
            <el-tab-pane
              v-for="(item, index) in form.tabs"
              :key="index"
              :label="item.title"
              :name="item.name"
            >
              <mavon-editor v-model="item.content"></mavon-editor>
              <!-- {{ item.content }} -->
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: { id: {} },
  data() {
    return {
      form: {
        tabs: [
          //不需要声明 不然就有一个空的对象
          // {
          //   title: "",
          //   name: "",
          //   content: ""
          // }
        ]
      },
      categoriesData: [],
      editableTabsValue: "1",
      tabIndex: 0,
      upload_type: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    async fetch() {
      if (this.id) {
        const res = await this.$http.post(`/common/book/${this.id}`);
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
        const res = await this.$http.put("/common/book/update", this.form);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push("/books/list");
          return;
        } else {
          this.$message({
            type: "warning",
            message: res.data.msg
          });
        }
      } else {
        if (this.form.bookname === "") {
          this.$message({
            type: "warning",
            message: "书名不能为空！！！"
          });
          return;
        }
        const res = await this.$http.post("/common/book/create", this.form);
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
          this.$router.push("/books/list");
        }
      }
    },
    //增加章节
    addTab(targetName) {
      this.tabIndex = this.form.tabs.length + 1;
      var newTabName = this.tabIndex + "";
      this.form.tabs.push({
        title: "第" + this.tabIndex + "章",
        name: newTabName + "",
        content: ""
      });
      this.editableTabsValue = newTabName;
    },
    //移除章节
    removeTab(targetName) {
      let tabs = this.form.tabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.form.tabs = tabs.filter(tab => tab.name !== targetName);
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
    }
  },
  created() {
    // this.fetchcategories();
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
  border: 1px solid #000;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
