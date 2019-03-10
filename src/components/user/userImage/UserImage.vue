<template>
  <div id="main-div" style="width: 80%;z-index: 1;">
    <div style="display: flex; flex-wrap: wrap;padding:20px 0 20px 0;">
      <Card class="demo-upload-list" v-for="(image,index) in imageList" :key="index" style="width: 305px;height: 185px;margin:15px 10px 0 5px;">
        <img style="height: 150px" :src="image.image_url">
        <div class="demo-upload-list-cover">
          <div style="width: 100%; height: 100%; display: flex;align-items: center; justify-content: center">
            <Icon size="48" type="ios-eye-outline" style="margin-right: 20px" @click.native="handleView(image)"></Icon>
          </div>
        </div>
      </Card>
      <Modal class-name="picture-model" width="84vw" v-model="visible" :footer-hide="true" :styles="{height:'100vh', top:'0px'}">
        <p slot="header" style="text-align:center;font-size: 16px;color: white">
          <span>{{modelImage.image_name}}</span>
        </p>
        <img v-if="visible" style="width: 65vw" :src="modelImage.image_url">
      </Modal>
    </div>
    <Page :total="total" :page-size="pageSize" show-elevator show-sizer style="margin:30px 0 70px 0"
          @on-change="changePage" :current="currengPage" @on-page-size-change="(pageSize) => {this.pageSize=pageSize;this.getAllImages(this.currengPage, this.pageSize)}"/>
  </div>
</template>

<script>
  export default {
    name: "user-image",
    data () {
      return {
        visible: false,
        imageList:[{}],
        modelUrl:'',
        total:0,
        pageSize:20,
        currengPage:1,
        modelImage:{}
      }
    },
    methods: {
      handleView (image) {
        this.modelImage= image;
        this.visible = true;
      },
      getAllImages (page, pageSize){
        this.$http.get(this.GlobalVar.apiConfig.admin.adminGetAllImage+'?page='+page+'&per_page='+pageSize)
          .then(
            res => {
              this.imageList = res.data.data.images;
              this.total = res.data.data.total;
              console.log(this.imageList, this.total);
            }
          )
      },
      changePage(page){
        this.getAllImages(page, this.pageSize)
      }
    },
    mounted () {
      this.getAllImages(1, this.pageSize);
    }
  }
</script>

<style lang="less">
  .ivu-modal{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .picture-model{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .demo-upload-list{
    display: inline-block;
    text-align: center;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
  }
  .demo-upload-list img{
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .ivu-modal-body{
    width: 100%;
  }
  .picture-model{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ivu-modal-header{
    background-color: #4d4d4d;
    color: white;
  }
</style>
