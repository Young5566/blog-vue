<template>
  <div id="main-div" style="width: 80%;z-index: 1;">
    <div style="display: flex; flex-wrap: wrap;padding:20px 0 20px 0;">
      <Card :dis-hover="true"
            style="width: 305px;height: 185px;margin:15px 10px 0 5px;; display: flex;justify-content: center;align-items: center;background-color: rgba(255,255,255,0.6)"
      >
        <Upload
          name="file"
          ref="upload"
          :show-upload-list="false"
          :on-success="handleSuccess"
          :format="['jpg','jpeg','png']"
          :on-format-error="handleFormatError"
          :before-upload="handleBeforeUpload"
          type="drag"
          :action="this.GlobalVar.apiConfig.admin.adminUploadImage"
          style="display: inline-block;width:100px;">
          <div style="width: 100px;height:100px;line-height: 100px;">
            <Icon type="ios-camera" size="48"></Icon>
          </div>
        </Upload>
      </Card>
      <Card class="demo-upload-list" v-for="(image,index) in imageList" :key="index" style="width: 305px;height: 185px;margin:15px 10px 0 5px;">
        <img style="height: 150px" :src="image.image_url">
        <div class="demo-upload-list-cover">
          <div style="width: 100%; height: 100%; display: flex;align-items: center; justify-content: center">
            <Icon size="48" type="ios-eye-outline" style="margin-right: 20px" @click.native="handleView(image)"></Icon>
            <Icon size="48" type="ios-trash-outline" @click.native="handleRemove(image)"></Icon>
          </div>
        </div>
      </Card>
      <el-dialog
        :title="modelImage.image_name"
        :visible.sync="visible"
        center
        width="55vw"
        :lock-scroll="false"
        :modal = "false"
        top="1vw">
        <div>
          <img style="width: 100%" :src="modelImage.image_url"/>
        </div>
      </el-dialog>
    </div>
    <Page :total="total" :page-size="pageSize" show-elevator show-sizer style="margin:30px 0 70px 0"
          @on-change="changePage" :current="currengPage" @on-page-size-change="(pageSize) => {this.pageSize=pageSize;this.getAllImages(this.currengPage, this.pageSize)}"/>
  </div>
</template>

<script>
  export default {
    name: "admin-image",
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
      handleRemove (image) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>确定删除 <span style="color:#ed4014">'+image.image_name+'</span>?</p>',
          onOk: () => {
            this.$http.delete(this.GlobalVar.apiConfig.admin.adminDeleteServiceImage+image.file_uuid)
              .then(
                res => {
                  if(res.data.code===200){
                    this.successModal('成功删除图床上的'+image.image_name+'图片!');
                    console.log(this.GlobalVar.apiConfig.admin.adminDeleteImage,image.image_uuid);
                    this.$http.delete(this.GlobalVar.apiConfig.admin.adminDeleteImage+image.image_uuid)
                      .then(
                        res => {
                          if(res.data.code===200){
                            this.successModal('成功删除'+image.image_name+'图片');
                            for(let index=0; index<this.imageList.length; index++){
                              if(this.imageList[index].image_uuid===image.image_uuid){
                                this.imageList.splice(index, 1);
                                break
                              }
                            }
                          } else {
                            this.errorModal('删除'+image.image_name + '失败!')
                          }
                        }
                      )
                  }else {
                    this.errorModal('删除图床上的'+image.image_name + '失败!')
                  }
                }
              )
          }
        })
      },
      handleSuccess (res, file) {
        // console.log('admin-picture ----->',res,file);
        if(res.code===200){
          this.successModal('上传成功!');
          let message = {
            fileUuid: res.data.uuid,
            name: file.name,
            groupName:res.data.groupName,
            remoteFileId:res.data.remoteFileId,
            storageIp:res.data.storageIp,
            size:file.size,
            imageUrl:res.data.fileUrl
          };
          this.$http.post(this.GlobalVar.apiConfig.admin.adminAddImage, message)
            .then(
              res => {
                if(res.data.code === 200){
                  this.successModal('添加成功!');
                  this.imageList.unshift({
                    file_uuid: message.fileUuid,
                    image_name:message.name,
                    image_url:message.imageUrl,
                    image_uuid:res.data.data,
                    remote_file_id:message.remoteFileId
                  })
                } else {
                  this.errorModal('添加失败!')
                }
              },
              err => {
                console.log(err)
              }
            )
        } else {
          this.errorModal('上传失败!')
        }
      },
      handleFormatError (file) {
        this.warnModal('File format of ' + file.name + ' is incorrect, please select jpg or png.')
      },
      handleBeforeUpload () {
        return true;
      },
      getAllImages (page, pageSize){
        this.$http.get(this.GlobalVar.apiConfig.admin.adminGetAllImage+'?page='+page+'&per_page='+pageSize)
          .then(
            res => {
              this.imageList = res.data.data.images;
              this.total = res.data.data.total;
              // console.log(this.imageList, this.total);
            }
          )
      },
      changePage(page){
        this.getAllImages(page, this.pageSize)
      }
    },
    mounted () {
      this.getAllImages(1, this.pageSize);
      let mainDiv = document.getElementById('main-div');
      // console.log(mainDiv.offsetHeight, window.innerHeight);
      if(mainDiv.offsetHeight < window.innerHeight){
        mainDiv.style.height = window.innerWeight || document.documentElement.clientWidth || document.body.clientWidth;
        mainDiv.style.overflowY = scroll;
      }
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
