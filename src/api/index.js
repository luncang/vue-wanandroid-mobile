const api = {
  Login: '/user/login',
  Register: '/user/register',
  UserInfo: '/user/userinfo',
  UserName: '/user/name',
  Banner: '/banner/json',
  HotKey: '/hotkey/json',
  Search: '/article/query/{0}/json',
  ArticleList: '/project/list/{0}/json?cid={1}',
  ActicleTree:'/project/tree/json',//项目分类


  // article/listproject/0/json //项目列表
// /project/tree/json //项目分类列表
//   project/list/1/json?cid=402 //分类下的项目列表
}

export default api
