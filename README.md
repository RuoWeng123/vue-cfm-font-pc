# bingfeng-cfm

## Docker镜像build和push上传
发布的时候：
```./docker-build-push-image.sh```

若只是build image，可以把docker-build-push-image.sh 里面的```push_images```注释掉

## Docker日常自己测试的时候：

1.  build   
    ```docker build -t haokegenjin_front_pc:v1.0 -f ./Dockerfile_test .```
2.  run 
    ```docker run -p 3000:80 -d --name haokegenjin_front_pc haokegenjin_front_pc:v1.0```
3.  local test  
    浏览器直接打开“http://localhost:3000/”
4.  查看docker运行情况  
    `docker exec -it haokegenjin_front_pc sh`



## 本项目开发环境和测试环境是一台服务器 不需要配置开发环境了
[参考](https://www.jb51.net/article/185255.htm)
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


