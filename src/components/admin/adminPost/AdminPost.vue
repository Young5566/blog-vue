<template>
  <Card style="width:90%;margin-top: 20px;height: 110vh;z-index: 1">
    <div slot="title">
      <label>
        <Icon type="md-clipboard" color="white" size="30"/>
        <label style="margin-left: 7px;font-size: 17px;color:white;font-weight: 600">编 辑 博 客</label>
      </label>
      <Button class="post-button" style="margin-left: 40vw;" @click="commit">
        <label class="button-label">提交</label>
      </Button>
    </div>
    <div>
      <Row type="flex" justify="center">
        <mu-text-field style="width:60%;margin-top: 4px" color="#667aa6" underline-color="#4d4d4d" v-model="article.title" placeholder="标题">
        </mu-text-field>
      </Row>
      <Row style="margin-top: -10px">
        <Form inline>
          <FormItem prop="">
            <mu-select color="#4d4d4d" placeholder="分类" underline-color="#4d4d4d" v-model="article.tags">
              <mu-option v-for="city,index in citys" :key="city" :label="city" :value="city"></mu-option>
            </mu-select>
          </FormItem>
          <FormItem prop="">
            <mu-text-field color="#667aa6" underline-color="#4d4d4d" v-model="article.secondTags" placeholder="标签"></mu-text-field>
          </FormItem>
        </Form>
      </Row>
      <Row type="flex" justify="center" style="margin-top: -30px">
        <mu-text-field style="width:80%;margin-top: 4px" multi-line :rows="2" color="#667aa6" underline-color="#4d4d4d" v-model="article.abstract" placeholder="摘要">
        </mu-text-field>
      </Row>
    </div>
    <div style="overflow:scroll; width:100%; height:63vh;margin-top: 40px">
      <mavon-editor style="z-index: 999" @change="changeData" ref="mavonEditor" :ishljs="true" :toolbarsFlag="toolbarsFlagBoo" :subfield="subfieldStr" :default_open="previewStr" v-model="article.content"/>
    </div>
  </Card>
</template>

<script>
  export default {
    name: 'admin-post',
    data(){
      return{
        html:'',
        article:{
          content:'## 这里是标题测试 \n' +
          '|column1|column2|column3|\n' +
          '|-|-|-|\n' +
          '|content1|content2|content3|\n' +
          '这里是内容\n' +
          '```javaScript\n' +
          'console.log(\'这里是代码测试\');\n' +
          '```',
          title:'',
          tags:'',
          secondTags:'',
          abstract:''
        },
        previewStr:'preview',
        subfieldStr: true,
        toolbarsFlagBoo: true,
        citys: [
          'Python','JavaScript','Html','Java'
        ],
      }
    },
    methods:{
      commit(){
        if(this.article.tags==='' || this.article.title==='' || this.article.secondTags ===''){
          this.warnning()
        }else {
          this.$http.post(this.GlobalVar.apiConfig.admin.adminPostArticle, this.article).then(
            res => {
              console.log(res.data);
              if(res.data.code === 200){
                  this.$router.push({name:"admin-home"})
              }
            }
          )
        }
      },
      changeData(value, render){
        this.html = render
      },
      warnning(){
        this.$Modal.warning({
          title:'警告',
          content:'<p>请输入博客完整信息！</p>'
        })
      }
    }
  }
</script>

<style scoped>
  .edit-main{
    /*margin-top: 0px;*/
    height: 100vh;
    width: 100vw;
    /*background-image: url("../../../assets/images/login_back.jpg");*/
    /*background-size: 100%;*/
  }
  .post-button{
    background-color: white;
    left: 1220px;
    width: 100px;
    height: 38px
  }
  .button-label{
    color: #4d4d4d;
    font-size: 16px
  }
</style>
