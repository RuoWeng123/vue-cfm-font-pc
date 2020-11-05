const path = require('path')
const config = require('./config')
const jsonServer = require('json-server')
const rules = require('./routes')
const dbfile = require(config.db_file)

const {
  ip,
  port,
  db_file
} = config


const server = jsonServer.create()
const router = jsonServer.router(dbfile())
const middlewares = jsonServer.defaults()

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.use((req, res, next) => {
  res.header('X-TOKEN', 'this is token  string')
  next()
})

router.render = (req, res) => {
  res.jsonp(
     res.locals.data
  )
} 
//  http://127.0.0.1:4000/bingfeng-api/customers
server.use("/", router)
server.use(jsonServer.rewriter(rules))
server.use(router)

server.listen({
  host: ip,
  port: port
}, function () {
  console.log(JSON.stringify(jsonServer))
  console.log(`JSON Server is running in http://${ip}:${port}`)
})
