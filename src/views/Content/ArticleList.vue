<template>
  <div class="categoryCreate">
    <h1>文章列表</h1>
    <el-table :data="Data" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline>
            <!-- <el-form-item label="文章内容">
              <span>{{ props.row.content }}</span>
            </el-form-item> -->
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="文章主图">
              <span>{{ props.row.image }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="所属标签">
              <span>{{ props.row.tags }}</span>
            </el-form-item>
          </el-form>
          <el-form label-position="left" inline>
            <el-form-item label="所属分类">
              <span>{{ props.row.categories }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="文章ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.edited_time | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属分类" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.categories[0] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所属标签" width="100" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.tags }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="文章主图" width="100">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            style="border-radius:50%;"
            width="40"
            height="40"
          />
        </template>
      </el-table-column>
      <el-table-column label="文章标题" width="180">
        <template slot-scope="scope">
          <el-tag effect="plain" type="danger">{{ scope.row.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="文章状态" width="100">
        <template slot-scope="scope">
          <el-tag
            effect="plain"
            :type="scope.row.status == 0 ? 'danger' : 'success'"
            >{{ scope.row.status == 0 ? "草稿" : "发布" }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="留言权限" width="100">
        <template slot-scope="scope">
          <el-tag effect="plain" type="danger">
            {{ scope.row.commentStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot="header">
          <el-autocomplete
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            :fetch-suggestions="querySearchAsync"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            @click="$router.push(`/preview/${scope.row._id}`)"
            type="success"
            size="small"
            >预览</el-button
          >
          <el-button
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button type="danger" @click="remove(scope.row)" size="small"
            >删 除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      Data: [],
      search: ""
    };
  },
  watch: {},
  filters: {
    formateTime(now) {
      if (now == null) {
        return 0;
      }
      var Timer = new Date(now);
      var y = Timer.getFullYear();
      var m = Timer.getMonth() + 1;
      var d = Timer.getDay();
      var hh = Timer.getHours();
      var mm = Timer.getMinutes();
      var ss = Timer.getSeconds();
      return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    }
  },
  computed: {},
  methods: {
    querySearchAsync(queryString, callback) {},

    async fetch() {
      const res = await this.$http.get("/common/article/list");
      if (res.data.code == 0) {
        this.$message({
          type: "success",
          message: "获取列表数据成功!"
        });
        this.Data = res.data.data;
      } else {
        this.$message({
          type: "warning",
          message: "获取列表数据失败!"
        });
      }
    },

    remove(row) {
      this.$confirm(
        `此操作将永久删除?
        <${row.name}>`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const res = await this.$http.delete(
            `/common/article/remove/${row._id}`
          );
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.fetch();
            return;
          } else {
            this.$message({
              type: "warning",
              message: res.data.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  async created() {
    this.fetch();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
