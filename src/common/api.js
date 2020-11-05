import axios from 'axios'
const isProduction = process.env.NODE_ENV === "production"

const http_url = "http://server.test.haokegenjin.com"

const setToken = async function(token){
  if(!token){
    let localToken = window.localStorage.getItem('bingfeng_token')
    if(localToken){
      token = localToken
    }else{
      return
    }
  }else{
    window.localStorage.setItem('bingfeng_token',token)
  }
  axios.defaults.headers.common['Authorization'] = token
}
const AuthLogin = async function(){
  const url = isProduction ? http_url + "/login/user" : "/login/user"
  //await axios.get(url, params)
  return axios({
    url:url,
    methods:'Get'
  })
}

const oAuthLogin = async function(){
  const url = isProduction ? http_url + "/login/app" : "/login/app"
  //await axios.get(url, params)
  return axios({
    url:url,
    methods:'Get'
  })
}
const getWeChatConfig = async function(params){
  const url = isProduction ? http_url + `/api/jssdk?url=${params.url}` : `/api/jssdk?url=${params.url}`
  //await axios.get(url, params)
  return axios({
    url:url,
    methods:'Get'
  })
}
const getUserInfoByToken = async function(){
  setToken()
  const url = isProduction ? http_url + "/api/user/info" :"/api/user/info"
  return axios({
    url:url,
    methods:'Get'
  })
}
const AuthRegistry = async function(){
  const url = http_url + "/auth/corp"
  return axios({
    url:url,
    methods:'Get'
  })
}
const getCustomerList = async function(params){
  setToken()
  const url = isProduction ? http_url + "/api/client/list" : "/api/client/list"
  return axios({
    url:url,
    methods:'Get',
    params
  })
}

const getCustomerOverview = async function(params){
  const url = ""
  return await axios.post(url, params)
}

const getChartOfNew = async function(params){
  const url = ""
  return await axios.post(url, params)
}
const getChartOfLoose = async function(params){
  const url = ""
  return await axios.post(url, params)
}

const getCatetoryList = async function(params){
  setToken()
  const url = isProduction ? http_url + "/api/kanban/users" : "/api/kanban/users"
  let res = await axios.get(url,params)
  return res.data
}

const addCategory = async function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/kanban/status?status=${params.status}` : `/api/kanban/status?status=${params.status}`
  return axios.put(
    url
  )
}
const deleteCategory = async function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/kanban/status?status=${params.status}` : `/api/kanban/status?status=${params.status}`
  return axios.delete(url)
}
const updateCategory = async function(params){
  setToken()
  const url = isProduction ? http_url + '/api/kanban/rename/status' : '/api/kanban/rename/status'
  return axios.post(
    url,
    params
  )
}

const getCategortyOfCustomerList = async function(params){
  const url = ""
  return await axios.post(url, params)
}


const getCustomerById = function(params){
  setToken()
  const url = isProduction ? http_url + "/api/client/detail" : "/api/client/detail"
  return axios({
    url:url,
    methods:'Get',
    params
  })
}
const updateCustomerStatus = function(params){
  setToken()
  const url = isProduction ? http_url + "/api/kanban/client/status" : "/api/kanban/client/status"
  return axios.post(
    url,
    params
  )
}
const updateCustomerBasic = function(params){
  setToken()
  const url = isProduction ? http_url + "/api/client/detail" : "/api/client/detail"
  return axios.put(
    url,
    params
  )
}
const createRecord = function(params){
  setToken()
  const url = isProduction ? http_url + "/api/kanban/record" : "/api/kanban/record"
  return axios.post(
    url,
    params
  )
}
const getRecord = function(params){
  setToken()
  const url = isProduction ? http_url + "/api/kanban/list/record" : "/api/kanban/list/record"
  return axios.post(
    url,
    params
  )
}


const getQuickReplyList = function (params){
  setToken()
  const url = isProduction ? http_url + '/api/msg/groups' : '/api/msg/groups'
  return axios.get(url)
}
const addReplyCategory = function (params){
  setToken()
  const url = isProduction ? http_url + '/api/msg/group' : '/api/msg/group'
  return axios.post(
    url,
    params
  )
}
const editReplyCategory = function (params){
  setToken()
  const url = isProduction ? http_url + '/api/msg/group' : '/api/msg/group'
  return axios.put(
    url,
    params
  )
}
const deleteReplyCategory = function (params){
  setToken()
  const url = isProduction ? `${http_url}/api/msg/group?groupName=${params.name}` : `/api/msg/group?groupName=${params.name}`
  return axios.delete(url)
}

const deleteReplyOfCategory = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/msg/group/item` : `/api/msg/group/item`
  return axios.post(url, params)
}
const updateReplyOfCategory = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/msg/group/item` : `/api/msg/group/item`
  return axios.put(url, params)
}
const createReplyOfCategory = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/msg/group/items` : `/api/msg/group/items`
  return axios.post(url, params)
}
const getReplyOfCategory = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/msg/group?groupName=${params.group_name}` : `/api/msg/group?groupName=${params.group_name}`
  return axios.get(url)
}


const createPersonTag = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/tag/person` : `/api/tag/person`
  return axios.post(url, params)
}

const getPersonTags = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/tag/common?externalUserId=${params.externalUserId}` : `/api/tag/common?externalUserId=${params.externalUserId}`
  return axios.get(url)
}

const deletePersonTag = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/tag?tag=${params.name}` : `/api/tag?tag=${params.name}`
  return axios.delete(url, params)
}
const createCompanyTag = function(params){
  setToken()
  const url = isProduction ? `${http_url}/api/tag/corp` : `/api/tag/corp`
  return axios.put(url, params)
}

export {
  setToken,
  AuthLogin,
  oAuthLogin,
  getUserInfoByToken,
  AuthRegistry,
  getCustomerList,
  getCustomerOverview,
  getChartOfNew,
  getChartOfLoose,
  getCatetoryList,
  addCategory,
  deleteCategory,
  updateCategory,
  getCategortyOfCustomerList,
  getCustomerById,
  updateCustomerStatus,
  createRecord,
  getRecord,
  updateCustomerBasic,
  getQuickReplyList,
  addReplyCategory,
  editReplyCategory,
  deleteReplyCategory,
  deleteReplyOfCategory,
  updateReplyOfCategory,
  createReplyOfCategory,
  getReplyOfCategory,
  createPersonTag,
  getPersonTags,
  deletePersonTag,

  createCompanyTag,
  getWeChatConfig
}
