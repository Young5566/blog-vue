/**
 * @author: Young
 * @QQ:403353323
 * @date:2018/9/19
 */

const ip = 'http://127.0.0.1:5000'
const apiConfig = {
  admin: {
    adminLogin: ip + '/api/v1.0/auth/login',
    adminGetAllArticle: ip + '/api/v1.0/article/getAllArticle',
    adminGetOneArticle: ip + '/api/v1.0/article/getOneArticle',
    adminDeleteArticle: ip + '/api/v1.0/article/deleteArticle',
    adminPostArticle: ip + '/api/v1.0/article/postArticle',
    adminGetArticleByTag: ip + '/api/v1.0/article/getArticleByTag',
    adminGetAllTag: ip + '/api/v1.0/article/getAllTag'
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
