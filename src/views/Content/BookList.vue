<template>
  <div class="categoryCreate">
    <h1>书籍列表</h1>
    <el-table :data="Data" style="width: 100%">
      <el-table-column label="书籍ID" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改日期" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.edited_time | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="书本名称" width="180">
        <template slot-scope="scope">
          <el-tag effect="plain" type="danger">{{ scope.row.bookname }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="作者名称" width="180">
        <template slot-scope="scope">
          <el-tag effect="plain" type="primary">{{ scope.row.publisher }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="封面" width="180">
        <template slot-scope="scope">
          <img
            :src="scope.row.image"
            style="border-radius:50%;"
            width="40"
            height="40"
          />
        </template>
      </el-table-column>
      <el-table-column label="书本状态" width="100">
        <template slot-scope="scope">
          <el-tag
            effect="plain"
            :type="scope.row.status == 0 ? 'danger' : 'success'"
            >{{ scope.row.status == 0 ? "草稿" : "发布" }}</el-tag
          >
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
            @click="$router.push(`/books/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("/common/book/list");
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

    async remove(row) {
      this.$confirm(
        `此操作将永久删除?
        <${row.bookname}>`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const res = await this.$http.delete(`/common/book/remove/${row._id}`);
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
