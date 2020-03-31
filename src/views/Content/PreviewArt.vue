<template>
  <div class="previewArticle" style="background:#F4F5F5;">
    <el-header
      style="position: relative;
   height: 4rem;background:#fff;"
    ></el-header>
    <el-container class="main-container">
      <el-row class="view-container">
        <el-col class="area-wrapper">
          <article class="article">
            <div class="header">
              <div class="author">
                <img
                  src="https://user-gold-cdn.xitu.io/2019/12/16/16f0c501d649585a?imageView2/1/w/1304/h/734/q/85/format/webp/interlace/1"
                  class="avatar"
                  alt
                />
                <div class="info">
                  <div class="username">
                    Coser
                    <div class="level">
                      <span>{{ article.level }}</span>
                    </div>
                  </div>
                  <div class="descr">
                    <span class="descr-item"
                      ><span class="item-title">发布时间</span>
                      {{ article.created_time }}</span
                    >
                    <span class="descr-item"
                      ><span class="item-title">阅读</span> 3148</span
                    >
                    <span class="descr-item"
                      ><span class="item-title">点赞</span> 152</span
                    >
                    <span class="descr-item"
                      ><span class="item-title">分享</span> 50</span
                    >
                  </div>
                </div>
              </div>
              <!-- <div class="in">更多</div> -->
            </div>
            <div class="content">
              <img
                class="image"
                v-if="article.image"
                :src="article.image"
                alt
              />

              <div class="content-main">
                <h1>{{ article.title }}</h1>
                <p v-html="article.content"></p>
              </div>
            </div>
          </article>
          <div class="tag-list">tag-list-{{ article.tags }}</div>
          <div class="tag-list">category-list-{{ article.categories }}</div>
        </el-col>
        <!-- <el-col :span="8" class="right-wrapper">
          <div class="authBox">关于作者</div>
          <div class="bookBox">相关书籍</div>
          <div class="articleBox">推荐文章</div>
          <div class="muluBox">文章目录</div>
        </el-col> -->
      </el-row>
    </el-container>
  </div>
</template>

<script>
export default {
  props: { id: {} },
  data() {
    return {
      article: {}
    };
  },
  methods: {
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
          this.article = Object.assign({}, this.article, res.data.data);
          console.log(this.article);
        }
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style lang="scss">
.main-container {
  position: relative;
  margin: 0 auto;
  margin-top: 1.767rem;
  width: 100%;
  max-width: 960px;
  box-sizing: border-box;
  //background: #fff;
  .view-container {
    width: 100%;

    padding: 0 0 4rem;
    display: flex;
    flex-direction: row;

    .area-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      width: 700px;
      max-width: 100%;
      min-height: 40rem;
      background-color: #fff;
      border-radius: 2px;

      margin-bottom: 1.5rem;
      /* margin-right: 2rem; */
      padding: 0 1rem;

      //margin: 0 2rem;
      .article {
        width: 100%;
        height: 100%;
        background: #fff;
        /* border: 1px solid #000; */
        margin-bottom: 3rem;
        padding: 2rem 0 0;

        .header {
          display: flex;
          .author {
            flex: 1;
            display: flex;
            align-items: center;
            margin-bottom: 2rem;
            .avatar {
              display: block;
              width: 40px;
              height: 40px;
              margin: 0 10px;
              text-align: center;
              text-decoration: none;
              cursor: pointer;
              color: #909090;
              border-radius: 50%;
            }
            .info {
              .username {
                font-size: 1rem;
                display: flex;
                font-family: Arial, Helvetica, sans-serif;
                font-weight: 700;
                .level {
                  height: 20px;
                  margin: 0 5px;
                  font-weight: 900;
                  font-family: "Courier New", Courier, monospace;
                  font-size: 12px;
                  background: #5078fd;
                  color: #fff;
                  box-sizing: content-box;
                  border-radius: 5px;
                  padding: 0 2px;
                  span {
                    position: relative;
                    top: 3px;
                    left: 0;
                    transform: translate(-50%, -50%);
                    margin: 0 auto;
                    text-align: center;
                  }
                }
              }
              .descr {
                font-size: 0.9rem;
                color: #909090;

                .descr-item {
                  display: inline-block;
                  margin-right: 3px;
                  text-align: center;
                  vertical-align: bottom;
                  /* display: flex;
                flex-direction: row; */
                  .item-title {
                    display: inline-block;
                    text-align: center;
                    font-weight: 900;
                    font-family: "Courier New", Courier, monospace;
                    font-size: 10px;
                    border-radius: 5px;
                    background: #6eb3c9;
                    color: #fff;
                    padding: 1px 3px;
                    margin-right: 3px;
                  }
                }
              }
            }
          }
        }
        .content {
          width: 100%;

          img {
            width: 100%;
            scale: 0.3;
          }
          /* code {
            white-space: normal;
          } */
          .image {
            margin-bottom: 2rem;
            width: 100%;
          }
          .content-main {
            white-space: normal;
            line-height: 1.5;
          }
        }
      }
    }
    .right-wrapper {
      width: 10rem;
      border: 1px solid #000;
      background: #fff;
    }
  }
}
</style>
