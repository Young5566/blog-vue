<template>
  <Card style="width:90%;margin-top: 20px;height: 107vh;z-index: 1">
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
        <Input class="article-message" v-model="article.title" style="width:60%;margin-top: 4px" placeholder="标题"></Input>
      </Row>
      <Row style="margin-top: 10px">
        <Form inline>
          <FormItem prop="">
            <Select class="article-message" style="width: 200px" v-model="article.tags">
              <Option v-for="city,index in citys" :key="city" :label="city" :value="city">{{city}}</Option>
            </Select>
          </FormItem>
          <FormItem prop="">
            <Input class="article-message" v-model="article.secondTags" style="width:100px" placeholder="标签"></Input>
          </FormItem>
          <FormItem prop="">
            <Input v-model="article.image_uuid" placeholder="图片" clearable style="width: 300px">
              <Button slot="append" style="background-color: #4d4d4d; color: white" icon="md-add" @click="Choose"></Button>
            </Input>
          </FormItem>
        </Form>
      </Row>
      <Row type="flex" justify="center" style="margin-top: -10px">
        <mu-text-field style="width:80%;margin-top: 4px" multi-line :rows="2" color="#667aa6" underline-color="#4d4d4d" v-model="article.abstract" placeholder="摘要">
        </mu-text-field>
      </Row>
    </div>
    <div style="overflow:scroll; width:100%; height:63vh;margin-top: 40px">
      <mavon-editor style="z-index: 999" @change="changeData" ref="mavonEditor" :ishljs="true" :toolbarsFlag="toolbarsFlagBoo" :subfield="subfieldStr" :default_open="previewStr" v-model="article.content"/>
    </div>
    <Modal v-model="modal" fullscreen :footer-hide="true">
      <p slot="header" style="text-align:center;font-size: 16px;color: white">
        <span>选 择 图 片</span>
      </p>
      <choose-image ref="chooseImage" :article="article" @chooseImage="chooseImage"/>
    </Modal>
  </Card>
</template>

<script>
  import ChooseImage from './childs/ChooseImage'
  export default {
    name: 'admin-post',
    components: {ChooseImage},
    comments:[
      ChooseImage
    ],
    data(){
      return{
        modal:false,
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
          abstract:'',
          image_uuid:'',
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
              // console.log(res.data);
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
      },
      Choose(){
        this.modal=true;
        this.$refs.chooseImage.currentPage=1;
        this.$refs.chooseImage.getAllImages(1, this.$refs.chooseImage.pageSize);
        console.log('dwadsadwda')
      },
      chooseImage(image){
        this.article.image_uuid = image.image_uuid;
        this.modal = false;
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
