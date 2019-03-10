/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/9/19
 */

// const ip = 'http://127.0.0.1:5000';
const ip = "http://tom-jerry.club/TomBlog";
const fileIp = "http://tom-jerry.club/java/filemanage/file/Young";

const apiConfig = {
  admin: {
    adminLogin: ip + '/api/v1.0/auth/login',
    adminGetAllArticle: ip + '/api/v1.0/article/getAllArticle',
    adminGetOneArticle: ip + '/api/v1.0/article/getOneArticle',
    adminDeleteArticle: ip + '/api/v1.0/article/deleteArticle',
    adminPostArticle: ip + '/api/v1.0/article/postArticle',
    adminUpdateArticle: ip + '/api/v1.0/article/updateArticle',
    adminGetArticleByTag: ip + '/api/v1.0/article/getArticleByTag',
    adminGetAllTag: ip + '/api/v1.0/article/getAllTag',
    adminAddImage: ip + '/api/v1.0/image/addImage',
    adminGetAllImage: ip + '/api/v1.0/image/getAllImage',
    adminGetOneImage: ip + '/api/v1.0/image/getOneImage',
    adminDeleteImage: ip + '/api/v1.0/image/deleteImage/',

    adminUploadImage: fileIp + '/upload',
    adminDeleteServiceImage: fileIp + '/delete/'
  },
  user: {
    userGetAllArticle: ip + '/api/v1.0/article/getAllArticle',
    userGetOneArticle: ip + '/api/v1.0/article/getOneArticle',
    userGetArticleByTag: ip + '/api/v1.0/article/getArticleByTag',
    userGetAllTag: ip + '/api/v1.0/article/getAllTag'
  }

}
export default {
  apiConfig
}
