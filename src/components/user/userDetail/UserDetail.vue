<template>
  <div style="width: 100%;display: flex;justify-content: center">
    <mu-paper style="margin-top: 30px;width: 85%;margin-bottom: 40px;z-index: 1" class="article-detail" :z-depth="3">
      <div style="background-color: #4d4d4d;padding-left: 5px;margin-right: 5px">
        <Row style="width: 100%; background-color: white;display: flex;justify-content: center">
          <Col span="22" :md="{span:20}" style="padding: 25px 0 10px 0">
          <Row style="text-align: left">
            <label
              style="font-family: Microsoft YaHei;font-size: 34px;letter-spacing: 1px;color: #212121;">{{article.title}}</label>
          </Row>
          <Row style="text-align: right;margin-top: 1px">
            <label style="color: #757575">
              <Icon type="md-calendar" size="24"/>
              {{article.pub_time}}</label>
          </Row>
          </Col>
        </Row>
      </div>
      <Row style="display: flex;justify-content: center;padding:0 5px 50px 5px">
        <Col span="22" :md="{span:20}">
          <img style="height: 60vh;width: 100%" :src="article.article_img"/>
          <div
            style="font-size: 16px;text-align: left;margin-top: 30px;line-height: 32px;color:#424242;font-family: STHeiti Light"
            v-html="html"></div>
          <mavon-editor @change="changeData" v-show="false" v-model="article.content"/>
        </Col>
      </Row>
    </mu-paper>
    <BackTop></BackTop>
  </div>
</template>

<script>
  export default {
    name: 'user-detail',
    data () {
      return {
        html: '',
        content: '## 这里是标题测试 \n' +
        '|column1|column2|column3|\n' +
        '|-|-|-|\n' +
        '|content1|content2|content3|\n' +
        '这里是内容\n' +
        '```javaScript\n' +
        'console.log(\'这里是代码测试\');\n' +
        '```',
        article: {},
        previewStr: 'preview',
        subfieldStr: true,
        toolbarsFlagBoo: true,
        citys: [
          'Python', 'JavaScript', 'Html', 'Java'
        ],
      }
    },
    mounted () {
      // console.log(this.$route.params.articleID)
      document.body.scrollTop = document.documentElement.scrollTop = 0
      this.getArticleDetail(this.$route.query.articleID)
    },
    methods: {
      getArticleDetail (articleID) {
        this.$http.get(this.GlobalVar.apiConfig.user.userGetOneArticle + '/' + articleID).then(
          res => {
            console.log('userDetail->getArticleDetail', res.data)
            this.article = res.data.data
          },
          err => {
            console.log('userDetail->getArticleDetail', err)
          }
        )
      },
      changeData (value, render) {
        this.html = render
      }
    }
  }
</script>

<style scoped>

</style>
