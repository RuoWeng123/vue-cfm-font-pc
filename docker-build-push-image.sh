#构建生产环境和测试环境的docker


# build production
# DOCKER_REPOSITORY_production="registry.cn-shanghai.aliyuncs.com/bfengtech/molishangtaijie_web_production"
# TAG_production="v1.0"
# docker build -t ${DOCKER_REPOSITORY_production}:${TAG_production} -f ./Dockerfile_production .


# build test
DOCKER_REPOSITORY_test="ccr.ccs.tencentyun.com/haoke/haokegenjin_front_pc"
TAG_test="v-pc-1.0"
docker build -t ${DOCKER_REPOSITORY_test}:${TAG_test} -f ./Dockerfile_test .


function push_image(){
    docker push $1
}

function push_images(){
    #login
    sudo docker login --username=912611428 -p '!@#Lk456' ccr.ccs.tencentyun.com
    # push_image ${DOCKER_REPOSITORY_production}:${TAG_production}
    push_image ${DOCKER_REPOSITORY_test}:${TAG_test}
}

push_images #若本地构建不push，只需要把本行注释即可
