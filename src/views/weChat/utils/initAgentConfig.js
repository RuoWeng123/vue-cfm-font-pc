
var wechatObj = null

let isFirst = true

// 初始化微信用户对象， 相当于agentConfig（）方法， 该方法修改的wechatObj是后续分享方法的基石
const initAgentConfig = async function(config){
  window.wx.config({
    beta: true,
    debug: true,
    appId: config.appId, // 必填，企业微信的corpid，必须与当前登录的企业一致
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature,// 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: ['selectExternalContact','getCurExternalContact','sendChatMessage'], //必填
    success: function(res) {
      // 回调
      console.log("注册成功")
    },
    fail: function(res) {
      if(res.errMsg.indexOf('function not exist') > -1){
        alert('版本过低请升级')
      }
    }
  })
  wx.ready(function(){
    console.log("config注入成功了 ")
  })
  wx.error(function(){
    console.log("config注入失败了")
  })

}

//获取当前用户的user_id
const getUserId = async function(){
  wx.checkJsApi({
    jsApiList: ['getCurExternalContact'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
    success: function(res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      console.log("检查接口结果",res)
    }
  })
}

//分享消息到会话接口
const shareMessageToWeChat = function(message){
  wx.sendChatMessage({
    type:'text',
    text:{
      content: message
    }
  }).then(res =>{
    console.log("回调结果",res)
  }).catch(err =>{
    console.log(err)
  })
}

export {
  initAgentConfig,
  getUserId,
  shareMessageToWeChat
}
