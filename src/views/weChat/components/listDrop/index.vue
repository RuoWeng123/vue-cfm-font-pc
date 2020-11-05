<template>
  <div class="message_list_box">
    <ul :class="className">
      <li class="message_list_item"
          v-for="(item,key) in list"
          data-type="0"
          :key="key">

        <van-swipe-cell style="width: 100%;margin-bottom: 4px;">
          <template #left>
            <van-button square type="primary" @click="shareItem(item)" text="分享" />
          </template>
          <van-cell :border="false" :title="item.content" @click="skip(item)"  style="background: #F6F6F6;"/>
          <template #right>
            <van-button square  type="default" @click="editItem(item)" text="编辑" />
            <van-button square  type="danger" @click="deleteItem(item)" text="删除" />
          </template>
        </van-swipe-cell>
<!--        <div class="message_wrap"-->
<!--             @touchstart.capture="touchStart"-->
<!--             @touchend.capture="touchEnd"-->
<!--             @click="skip(item)">-->
<!--          <div class="message_Box">-->
<!--            <div class="message_text">{{item.content}}</div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="share"-->
<!--             @click="shareItem(item)"-->
<!--             :data-index="key">分享</div>-->
<!--        <div class="edit"-->
<!--             @click="editItem(item)"-->
<!--             :data-index="key">编辑</div>-->
<!--        <div class="delete"-->
<!--             @click="deleteItem(item)"-->
<!--             :data-index="key">删除</div>-->
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      className: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        startX: 0,
        endX: 0
      }
    },
    methods: {
      // 滑动开始
      touchStart (e) {
        // 记录初始位置
        this.startX = e.touches[0].clientX
      },
      // 滑动结束
      touchEnd (e) {
        // 当前滑动的父级元素
        let parentElement = e.currentTarget.parentElement
        // 记录结束位置
        this.endX = e.changedTouches[0].clientX
        // 左滑
        if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
          this.restSlide()
          parentElement.dataset.type = 1
        }
        // 右滑
        if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
          this.restSlide()
          parentElement.dataset.type = 0
        }
        this.startX = 0
        this.endX = 0
      },
      // 复位滑动状态
      restSlide () {
        let listItems = document.querySelectorAll('.message_list_item')
        // 复位
        for (let i = 0; i < listItems.length; i++) {
          listItems[i].dataset.type = 0
        }
      },
      skip (item) {
        this.$emit('jump', item)
      },
      deleteItem (item) {
        this.$emit('delete', item)
      },
      editItem (item) {
        this.$emit('edit', item)
      },
      shareItem (item) {
        this.$emit('share', item)
      }
    }
  }
</script>

<style lang="less"
       scoped>
  .message_list_box {
    overflow: hidden;
  }

  .message_list_item {
    position: relative;
    height: 3rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    background: #F9F9F9;
    margin-bottom: 8px;
  }

  .message_list_item:last-child {
  }

  .message_list_item[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }

  .message_list_item[data-type="1"] {
    transform: translate3d(-8rem, 0, 0);
  }

  .message_wrap {
    display: flex;
    flex-direction: column;
    padding: 4px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;

    .title {
      flex-shrink: 0;
      height: .4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
      font-size: .3rem;
    }

    .message_Box {
      flex-shrink: 0;
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      .message_text {
        flex: 1;
        color: #999999;
        padding-left: 10px;
        display: -webkit-box;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .message_img {
        width: 1rem;
        height: .8rem;
        margin: 6px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .delete {
    width: 4rem;
    height: 3rem;
    background: #ff4949;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 3rem;
    position: absolute;
    top: 0;
    right: -8rem;
  }
  .edit {
    width: 4rem;
    height: 3rem;
    background: #4C4C4C;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 3rem;
    position: absolute;
    top: 0;
    right: -4.1rem;
  }
</style>
