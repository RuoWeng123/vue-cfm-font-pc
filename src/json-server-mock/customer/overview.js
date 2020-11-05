let Mock = require('mockjs')
let Random = Mock.Random

let customers = []

for(let i =0; i< 24; i++){
  let temp = {
    id: i,
    wechatName: Random.name(),
    realName: Random.cname(), 
    state: Random.natural(1,9),
    telephone: Mock.mock('@integer(13000000000, 13999999999)'),
    sex: Random.boolean() ? '男' : '女',
    company: Random.title()
  }
  customers.push(temp)
}

module.exports = {
  customers
} 
