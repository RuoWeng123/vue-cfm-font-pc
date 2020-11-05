---
layout: default
---

<style type="text/css">
  .theme {
    background-color: #eff8ff;
  }
</style>
<template>
  <div class="home-page">
    <div id="particles"
         class="home-page-banner">
      <div class="content">
        <img src="@/assets/home-page/clickplus-logo.png"
             alt="logo"/>
        <h2 class="bounceInUpEffect"
            id="pageTitle">一站式智能运营系统</h2>
        <span class="bar"
              style="float: left;">________________________</span>
        <!--           <ul  id="loopContent">
                    <li class="houmian">集成式一站式解决方案</li>
                    <li class="qianmian">因为智能, 所以高效</li>
                    <li class="xiamian">灵活, 简单, 易用</li>
                  </ul> -->
        <span class="loop-text--3d">
             <div class="loop-text__list"
                  data-state="1">
               <figure>集成式一站式解决方案</figure>
               <figure>因为智能 &nbsp;&nbsp;所以高效</figure>
               <figure>灵活&nbsp;&nbsp;简单&nbsp;&nbsp;易用</figure>
             </div>
          </span>
        <span class="bar"
              style="float: right;">________________________</span>
      </div>
    </div>
    <div class="we-solve">
      <h2 class="page-title bounceInUpEffect"
          style="margin-top: 65px;">您在开展运营工作时是否碰到如下问题?</h2>
      <div class="decorative-block bounceInUpEffect"></div>
      <div class="product-box"
           style="margin-top:30px;padding-top:30px;">

        <div class="question11 bounceInUpEffect">
          <div class="question1"></div>
          <div class="question_text">
            流程冗杂,人员投入多工作效率低
          </div>
        </div>
        <div class="question22 bounceInUpEffect">
          <div class="question2"></div>
          <div class="question_text">
            多种系统采购配置耗时耗力
          </div>
        </div>
        <div class="question33 bounceInUpEffect">
          <div class="question3"></div>
          <div class="question_text">
            流量成本越来越高转化却原地踏步
          </div>
        </div>
        <div class="question44 bounceInUpEffect">
          <div class="question4"></div>
          <div class="question_text">
            技术支持不足无法紧跟市场节奏
          </div>
        </div>
      </div>
    </div>
    <div class="we-product yourElement1"
         id="yourElement1">
      <h2 class="page-title bounceInUpEffect">我们的产品</h2>
      <div class="decorative-block bounceInUpEffect"></div>
      <h2 style="font-size: 18px;line-height: 30px;color: #666;text-align: center;margin: 20px 0;"
          class="bounceInUpEffect">clickplus，是一站式智能运营管理系统，整合了快速页面构建, 数据统计分析，千人千面个性化系统等智能功能,<br>实现高效运营，让人员的工作效率和页面转化效率大幅提升。
      </h2>
    </div>

    <div class="we-product yourElement1"
         id="yourElement2"
         style="background: #fff;">
      <div class="product-box">
        <div class="product-pull-left bounceInUpEffect">
          <h2>强大的页面管理</h2>
          <p>页面管理系统是clickplus的基础系统, 实现了<br>快速构建和管理页面等功能, 是快速搭建运营<br> 的基础。</p>
          <a class="know-morebox"
             href="/features/page">了解更多</a>
        </div>
        <div class="product-pull-right bounceInUpEffect">
          <img src="@/assets/home-page/home-page_04.png"
               alt="强大的页面管理"
               width="400px"
               height="417px"
               style="display: block;margin: 15px auto;"/>
        </div>
      </div>
    </div>
    <div class="we-product"
         style="background: #eff8ff;">
      <div class="product-box">
        <div class="product-pull-left bounceInUpEffect"
             style="float: right;margin-right: -80px;">
          <h2>数据化运营</h2>
          <p>数据系统是clickplus的数据中枢， 可汇集包含页<br>面、渠道等各种来源的数据，并提供数据统计分<br> 析， 可视化, BI等功能, 实现数据化运营。</p>
          <a class="know-morebox"
             href="/features/data">了解更多</a>
        </div>
        <div class="product-pull-right bounceInUpEffect"
             style="float: left;">
          <img src="@/assets/home-page/home-page_03.png"
               alt="数据化运营"
               width="460px"
               height="402px"
               style="display: block;margin: 0 auto;"/>
        </div>
      </div>
    </div>
    <div class="we-product"
         style="background: #fff;">
      <div class="product-box">
        <div class="product-pull-left bounceInUpEffect">
          <h2>智能化运营</h2>
          <p>智能系统是clickplus的指挥中枢， 基于数据<br>系统可实现千人千面，个性化推荐，AB测试<br> 等智能手段, 达到智能化运营.</p>
          <a class="know-morebox"
             href="/features/ai">了解更多</a>
        </div>
        <div class="product-pull-right bounceInUpEffect">
          <img src="@/assets/home-page/home-page_02.png"
               alt="智能化运营"
               width="460px"
               height="428px"
               style="display: block;margin: 0 auto;"/>
        </div>
      </div>
    </div>
    <div class="we-product"
         style="background-color: #eff8ff;">
      <h2 class="page-title">成功案例</h2>
      <div class="decorative-block "></div>
      <div class="product-box"
           style="width: 1190px;">
        <img src="@/assets/home-page/home-page_01.png"
             alt="成功案例"
             width="1190px"
             height="171px"
             style="display: block;margin: 40px auto;"/>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  $(function () {
    var pageTitle = document.getElementById('pageTitle')
    var pageTitleTop = pageTitle.getBoundingClientRect().top//当前元素到可见区域顶部的距离
    if (pageTitleTop < document.documentElement.clientHeight) {
      $('#pageTitle').addClass('g-bounceInUp')
    }
    $(window).scroll(function () {
      $('.bounceInUpEffect').each(function () {
        if ($(this)[0].getBoundingClientRect().top < document.documentElement.clientHeight) {
          $(this).addClass('g-bounceInUp')
        }
      })
    })

    var increment = 0
    var carousel = $('.loop-text__list')
    var loop_func = function () {
      increment++
      carousel.css({
        '-webkit-transform': 'rotateX(' + (increment * 120) + 'deg)',
        '-ms-transform': 'rotateX(' + (increment * 120) + 'deg)',
        '-moz-transform': 'rotateX(' + (increment * 120) + 'deg)'
      })
      var pastSix = 0
      if (increment > 6) {
        increment
      }
      carousel.attr('data-state', (increment % 6) + 1)
    }
    var timer = setInterval(loop_func, 2500)

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState == 'hidden') {
        if (timer) clearInterval(timer)
      } else {
        timer = setInterval(loop_func, 2500)
      }
    })
  })


</script>
