<template>
  <div class="swiperBox">
    <h1 class="tit"></h1>
    <div class="pet"></div>
    <!-- 轮播 -->
    <section class="rewardContainer">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div
            :class="['swiper-slide',`swiper-slide${msg}`]"
            v-for="(item,msg) in 5"
            :key="msg"
          ></div>
        </div>
      </div>
      <!-- page分页 -->
      <section class="personNameBox">
        <div class="swiper-pagation">
          <div class="swiper-wrapper">
            <div
              :class="['swiper-slide',`swiper-slide${msg}`]"
              v-for="(item,msg) in 5"
              :key="msg"
            ></div>
          </div>
        </div>
        <button class="pre" @click="pre"></button>
        <button class="next" @click="next"></button>
        <div class="pagination"></div>
      </section>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import $ from "jquery";
import Swiper from "swiper";
import "./idangerous.swiper.progress";
import "./swiper.scss";

export default Vue.extend({
  name: "Person",
  data() {
    return {
      spanActiveIndex: 0, //轮播高亮下标
      swiper: Object
    };
  },
  mounted() {
    // 加载轮播图
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: 3000,
      speed: 300,
      loop: true,
      pagination: ".pagination",
      paginationClickable: true,
      autoplayDisableOnInteraction: false,
      progress: true,
      onProgressChange: function(swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
          var slide = swiper.slides[i];
          var progress = slide.progress;
          var translate = progress * swiper.width;
          var opacity = 1 - Math.min(Math.abs(progress), 1);
          slide.style.opacity = opacity;
          swiper.setTransform(slide, "translate3d(" + translate + "px,0,0)");
        }
      },
      onTouchStart: function(swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.setTransition(swiper.slides[i], 0);
        }
      },
      onSetWrapperTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
          swiper.setTransition(swiper.slides[i], speed);
        }
      },
      onSlideChangeStart: function(swiper) {
        $(".caption li").removeClass("active");
        $(".caption li")
          .eq(swiper.activeLoopIndex)
          .addClass("active");
      }
    });
    this.swiper = mySwiper;
  },
  methods: {
    pre() {
      let swiper: any = this.swiper;
      swiper.swipePrev();
    },
    next() {
      let swiper: any = this.swiper;
      swiper.swipeNext();
    }
  }
});
</script>
<style lang="scss" scoped>
/*---- variables ----*/
$pc: "screen and (min-width: 751px)";
$mobile: "screen and (max-width: 750px) and (min-width: 0px)";

/*---- Mixins ----*/
@mixin mq($mqString) {
  @media #{$mqString} {
    @content;
  }
}

@include mq($pc) {
  .swiperBox {
    width: 1200px;
    height: 800px;
    margin: auto;
    position: relative;
    // border: 1px solid yellow;
    .tit {
      width: 100%;
      height: 104px;
      margin-top: 40px;
      background: url("./img/tit2.png") no-repeat center;
    }
    .pet {
      width: 543px;
      height: 621px;
      background: url("./img/pet.png") no-repeat;
      position: absolute;
      top: 105px;
      left: -115px;
      z-index: 2;
    }
    .personNameBox {
      width: 100%;
      height: 100px;
      margin-left: 215px;
      margin-top: 50px;
      position: relative;

      .swiper-pagation {
        width: 703px;
        height: 80px;
        margin: auto;
        // border: 1px solid red;
        overflow: hidden;
        .swiper-slide {
          width: 130px;
          height: 80px;
          margin: 0 5px;
        }
        .swiper-slide0 {
          background: url("./img/minImg1.png") no-repeat center;
        }
        .swiper-slide1 {
          background: url("./img/minImg2.png") no-repeat center;
        }
        .swiper-slide2 {
          background: url("./img/minImg3.png") no-repeat center;
        }
        .swiper-slide3 {
          background: url("./img/minImg4.png") no-repeat center;
        }
        .swiper-slide4 {
          background: url("./img/minImg5.png") no-repeat center;
        }
      }
      .pre {
        width: 30px;
        height: 80px;
        background: url("./img/left.png");
        position: absolute;
        top: 0;
        left: 219px;
      }
      .next {
        width: 30px;
        height: 80px;
        background: url("./img/right.png");
        position: absolute;
        top: 0;
        right: 219px;
      }
      .pagination {
        width: 703px;
        height: 80px;
        margin: auto;
        // border: 1px solid yellow;
        overflow: hidden;
        position: absolute;
        left: 249px;
        z-index: 3;
        top: 0;
      }
    }
    .rewardContainer {
      width: 100%;
      height: 550px;
      overflow: hidden;
      // border: 1px solid red;
      position: relative;
      .swiper-container {
        width: 1012px;
        height: 390px;
        margin-left: 186px;
        // border: 1px solid yellow;
        background: url("./img/lunbo.png") no-repeat center;
        .swiper-slide {
          width: 994px;
          height: 369px;
          overflow: hidden;
        }
        .swiper-slide0 {
          background: url("./img/4.png")no-repeat;
          background-size: 98%;
          background-position: 12px 7px;
        }
        .swiper-slide1 {
          background: url("./img/2.png")no-repeat;
          background-size: 98%;
          background-position: 12px 7px;
        }
        .swiper-slide2 {
           background: url("./img/3.png")no-repeat;
          background-size: 98%;
          background-position: 12px 7px;
        }
        .swiper-slide3 {
           background: url("./img/4.png")no-repeat;
          background-size: 98%;
          background-position: 12px 7px;
        }
        .swiper-slide4 {
           background: url("./img/5.png")no-repeat;
          background-size: 98%;
          background-position: 12px 7px;
        }
      }
    }
  }
}
@include mq($mobile) {
  .swiperBox {
    width: 100%;
    height: 680px;
    margin: auto;
    position: relative;
    // border: 1px solid yellow;
    .tit {
      width: 750px;
      height: 104px;
      margin-top: 40px;
      margin-left: -55px;
      background: url("./img/m_tit2.png") no-repeat center;
    }
    .pet {
      width: 281px;
      height: 379px;
      background: url("./img/m_pet.png") no-repeat;
      position: absolute;
      top: 125px;
      left: -55px;
      z-index: 2;
    }
    .personNameBox {
      width: 640px;
      height: 100px;
      margin: auto;
      // margin-left: -20px;
      margin-top: 50px;
      position: relative;

      .swiper-pagation {
        width: 640px;
        height: 80px;
        // margin: auto;
        // border: 1px solid red;
        overflow: hidden;
        .swiper-slide {
          width: 122px;
          height: 76px;
          margin: 0 3px;
        }
        .swiper-slide0 {
          background: url("./img/minImg1.png") no-repeat center;
          background-size:100%;
        }
        .swiper-slide1 {
          background: url("./img/minImg2.png") no-repeat center;
          background-size:100%;

        }
        .swiper-slide2 {
          background: url("./img/minImg3.png") no-repeat center;
          background-size:100%;

        }
        .swiper-slide3 {
          background: url("./img/minImg4.png") no-repeat center;
          background-size:100%;

        }
        .swiper-slide4 {
          background: url("./img/minImg5.png") no-repeat center;
          background-size:100%;

        }
      }
      .pre {
        width: 30px;
        height: 80px;
        background: url("./img/left.png");
        position: absolute;
        top: 0;
        left: -36px;
      }
      .next {
        width: 30px;
        height: 80px;
        background: url("./img/right.png");
        position: absolute;
        top: 0;
        right: -36px;
      }
      .pagination {
        width: 100%;
        height: 80px;
        margin: auto;
        // border: 1px solid yellow;
        overflow: hidden;
        position: absolute;
        // left: 249px;
        z-index: 3;
        top: 0;
      }
    }
    .rewardContainer {
      width: 716px;
      height: 550px;
      margin-left: -38px;
      // border: 1px solid green;
      position: relative;
      .swiper-container {
        width: 100%;
        height: 392px;
        // margin-left: -38px;
        // border: 1px solid yellow;
        background: url("./img/m_lunbo.png") no-repeat center;
        .swiper-slide {
          width: 702px;
          height: 369px;
          overflow: hidden;
        }
        .swiper-slide0 {
          background: url("./img/m_1.png")no-repeat;
          background-size: 98%;
          background-position: 8px 8px;
        }
        .swiper-slide1 {
          background: url("./img/m_2.png")no-repeat;
          background-size: 98%;
          background-position: 8px 8px;
        }
        .swiper-slide2 {
           background: url("./img/m_3.png")no-repeat;
           background-size: 98%;
           background-position: 8px 8px;
        }
        .swiper-slide3 {
           background: url("./img/m_4.png")no-repeat;
          background-size: 98%;
           background-position: 8px 8px;
        }
        .swiper-slide4 {
           background: url("./img/m_5.png")no-repeat;
            background-size: 98%;
           background-position: 8px 8px;
        }
      }
    }
  }
}
</style>
