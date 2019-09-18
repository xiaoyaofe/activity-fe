<template>
  <div class="personBox">
    <!-- page分页 -->
    <section class="personNameBox">
      <h1 class="title"></h1>
      <span
        :class="['changeBan',spanActiveIndex==index?`spanActive${index+1} spanActive`:'',]"
        v-for="(item,index) in personInfo"
        :key="index"
      >{{item.name}}</span>
      <div class="pagination"></div>
    </section>
    <!-- 轮播 -->
    <section class="rewardContainer">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,msg) in personInfo" :key="msg">
            <section class="personLeft">
              <div :class="'person'+(msg+1)"></div>
            </section>
            <section :class="['personRight',`personRight${msg+1}`]">
              <h1 class="name">
                {{item.name}}
                <span :class="'personLogo'+(msg+1)"></span>
              </h1>

              <p class="line"></p>
              <p class="info1">{{item.info1}}</p>
              <div class="titBox">
                <span :class="'person'+(msg+1)+'Img1'"></span>
                <strong class="titTxt">
                  <p>{{item.title1}}</p>
                  <p>{{item.tit1Info}}</p>
                </strong>
              </div>
              <div class="titBox">
                <span :class="'person'+(msg+1)+'Img2'"></span>
                <strong class="titTxt">
                  <p>{{item.title2}}</p>
                  <p>{{item.tit2Info}}</p>
                </strong>
              </div>
              <p class="info1" style="margin-top:20px">{{item.info2}}</p>
            </section>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Swiper from "swiper";
import "./swiper.scss";

export default Vue.extend({
  name: "Person",
  data() {
    return {
      spanActiveIndex: 0, //轮播高亮下标
      personInfo: [
        {
          name: "Điêu Thuyền",
          info1:
            'Một trong tứ đại mỹ nhân cổ đại, nhan sắc hoa nhường nguyệt thẹn, dùng "Mỹ nhân kế" giúp nghĩa phụ Vương Doãn ly gián Đổng Trác-Lữ Bố',
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: " Nhất Võ Biền Thiên",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Điệp Vũ Thiên Nha",
          info2:
            "Tấn công 576, HP 3000, Vật Phòng 72, Pháp Phòng 290, Tư chất 14"
        },
        {
          name: "Gia Cát Lượng",
          info1:
            "Thừa tướng Thục Hán. Giúp Lưu Bị đưa ra nhiều diệu kế. Cúc cung tận tụy vì Thục Hán.",
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: " Bát Quái Nghi Trận",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Kế Định Càn Khôn",
          info2:
            "Tấn công 480, HP 4224, Vật Phòng 120, Pháp Phòng 210, Tư Chất 1"
        },
        {
          name: "Tào Tháo",
          info1:
            "Nhà quân sự nổi tiếng, trí dũng mưu lược, biết trọng dụng người tài, một đời nam chinh bắc chiến.",
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: "Ỷ Thiên Thần Uy",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Quân Giáng Thiên Hạ",
          info2:
            "Tấn công 432, HP 5280, Vật Phòng 144, Pháp Phòng 120, Tư Chất 1"
        },
        {
          name: "Lữ Bố ",
          info1:
            "Từng nhiều lần đối đầu với 3 anh em Lưu-Quan-Trương ở Hổ Lao Quan, võ nghệ xứng danh đệ nhất thiên hạ.",
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: "Càn Quét Thiên Quân",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Chiến Thần Vô Song",
          info2:
            "Tấn Công 504, HP 4560, Vật Phòng 144, Pháp Phòng 150, Tư Chất 1"
        },
        {
          name: "Chân Cơ ",
          info1:
            "Vợ của Tào Phi, mẹ của Tào Duệ. Nhan sắc khuynh quốc khuynh thành. ",
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: "Phong Tuyết Băng Thiên",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Lạc Thần Giáng Lâm",
          info2:
            "Tấn Công 240, HP 1250, Vật Phòng 30, Pháp Phòng 290, Tư Chất 8"
        },
        {
          name: "Chu Du",
          info1:
            "Danh tướng Đông Ngô, kỳ tài quân sự, đại bại trăm vạn quân Tào tại trận Xích Bích, đặt nền móng tam phân thiên hạ.",
          title1: "Kỹ năng chiến đấu: ",
          tit1Info: "Hỏa Thiêu Xích Bích",
          title2: "Kỹ năng vượt ải:",
          tit2Info: "Phong Hỏa Ngập Trời",
          info2:
            "Tấn Công 240, HP 1250, Vật Phòng 30, Pháp Phòng 290, Tư Chất 14"
        }
      ]
    };
  },
  mounted() {
    // 加载轮播图
    var mySwiper = new Swiper(".swiper-container", {
      autoplay: 2000,
      speed: 1000,
      loop: true,
      autoplayDisableOnInteraction: false,
      pagination: ".pagination",
      grabCursor: true,
      paginationClickable: true
    });
    mySwiper.addCallback("SlideChangeStart", swiper => {
      this.spanActiveIndex = swiper.activeIndex - 1;
      if (swiper.activeIndex == 7) {
        this.spanActiveIndex = 0;
      }
    });
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
  .personBox {
    width: 1200px;
    height: 740px;
    margin: auto;
    position: relative;
    // border: 1px solid red;
    .title {
      width: 1080px;
      height: 131px;
      margin-top: -48px;
      margin-bottom: 15px;
      background: url("./img/tit2.png") no-repeat center;
    }
    .personNameBox {
      width: 1071px;
      height: auto;
      /* margin: auto; */
      position: absolute;
      z-index: 8;
      top: 0;
      left: 65px;
      top: 0;
      .pagination {
        position: absolute;
        top: 96px;
        z-index: 99;
      }
      .changeBan {
        padding: 0 42px;
        display: inline-block;
        border-left: 2px solid;
        text-align: center;
        text-transform: uppercase;
        font-size: 24px;
        color: #fff7dd;
        cursor: pointer;
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
      }
      span:active {
        position: relative;
        top: 2px;
      }
      .spanActive {
        text-decoration: underline;
        font-weight: bold;
      }
      span:nth-child(2) {
        border: none;
        padding-left: 0;
      }
      span:nth-child(7) {
        padding-right: 0;
      }
    }
    .rewardContainer {
      width: 100%;
      height: 740px;
      overflow: hidden;
      // border: 1px solid red;
      .swiper-container {
        width: 1200px;
        height: 100%;
        // border: 1px solid blue;
        .swiper-slide {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .personLeft {
            width: 610px;
            height: 580px;
            float: left;
            // background: paleturquoise;
            .person1 {
              width: 610px;
              height: 560px;
              margin-top: 160px;
              background: url("./img/person1.png") no-repeat center;
              background-position: 54px 5px;
            }
            .person2 {
              width: 610px;
              height: 565px;
              margin-top: 190px;
              background: url("./img/person2.png") no-repeat center;
              background-position: 39px 5px;
            }
            .person3 {
              width: 610px;
              height: 656px;
              margin-top: 145px;
              background: url("./img/person3.png") no-repeat center;
              background-position: 51px 5px;
            }
            .person4 {
              width: 906px;
              height: 801px;
              margin-top: 17px;
              margin-left: -93px;
              background: url("./img/person4.png") no-repeat center;
              background-position: 49px 7px;
            }
            .person5 {
              width: 610px;
              height: 672px;
              margin-top: 125px;
              background: url("./img/person5.png") no-repeat center;
              background-position: 11px 10px;
            }
            .person6 {
              width: 610px;
              height: 627px;
              margin-top: 158px;
              background: url("./img/person6.png") no-repeat center;
              background-position: 38px 4px;
            }
          }
          .personRight {
            width: 523px;
            height: 580px;
            float: left;
            margin-top: 150px;
            // background: antiquewhite;
            .name {
              margin-top: 65px;
              font-size: 50px;
              font-weight: bold;
              text-transform: uppercase;
              color: #fff7dd;
            }
            .personLogo1,
            .personLogo2,
            .personLogo3,
            .personLogo4,
            .personLogo5,
            .personLogo6 {
              width: 128px;
              height: 30px;
              margin-left: 260px;
              display: inline-block;
              background: url("./img/person1Name.png") no-repeat
                center;
            }
            .personLogo2 {
              background: url("./img/person2Name.png") no-repeat
                center;
            }
            .personLogo3 {
              background: url("./img/person3Name.png") no-repeat
                center;
            }
            .personLogo4 {
              background: url("./img/person4Name.png") no-repeat
                center;
            }
            .personLogo5 {
              background: url("./img/person5Name.png") no-repeat
                center;
            }
            .personLogo6 {
              background: url("./img/person6Name.png") no-repeat
                center;
            }
            .line {
              width: 492px;
              height: 1px;
              margin-top: 20px;
              margin-bottom: 10px;
              background: url("./img/line.png");
            }
            .info1 {
              font-size: 18px;
              color: #faecbd;
            }
            .titBox {
              width: 100%;
              height: 75px;
              margin-top: 30px;
              position: relative;
              .person1Img1,
              .person1Img2,
              .person2Img1,
              .person2Img2,
              .person3Img1,
              .person3Img2,
              .person4Img1,
              .person4Img2,
              .person5Img1,
              .person5Img2,
              .person6Img1,
              .person6Img2 {
                width: 75px;
                height: 75px;
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
              }
              .person1Img1 {
                background: url("./img/person1Img1.png") no-repeat
                  center;
              }
              .person1Img2 {
                background: url("./img/person1Img2.png") no-repeat
                  center;
              }
              .person2Img1 {
                background: url("./img/person2Img1.png") no-repeat
                  center;
              }
              .person2Img2 {
                background: url("./img/person2Img2.png") no-repeat
                  center;
              }
              .person3Img1 {
                background: url("./img/person3Img1.png") no-repeat
                  center;
              }
              .person3Img2 {
                background: url("./img/person3Img2.png") no-repeat
                  center;
              }
              .person4Img1 {
                background: url("./img/person4Img1.png") no-repeat
                  center;
              }
              .person4Img2 {
                background: url("./img/person4Img2.png") no-repeat
                  center;
              }
              .person5Img1 {
                background: url("./img/person5Img1.png") no-repeat
                  center;
              }
              .person5Img2 {
                background: url("./img/person5Img2.png") no-repeat
                  center;
              }
              .person6Img1 {
                background: url("./img/person6Img1.png") no-repeat
                  center;
              }
              .person6Img2 {
                background: url("./img/person6Img2.png") no-repeat
                  center;
              }
              .titTxt {
                display: inline-block;
                font-size: 20px;
                color: #fff7dd;
                position: absolute;
                left: 85px;
                top: 13px;
              }
              p:nth-child(1) {
                font-weight: bold;
                text-transform: uppercase;
              }
            }
          }
        }
      }
    }
  }
}
@include mq($mobile) {
  .personBox {
    width: 100%;
    height: 1300px;
    margin: auto;
    position: relative;
    // border: 1px solid yellow;
    .title {
      width: 100%;
      height: 122px;
      margin-bottom: 15px;
      background: url("./img/tit2.png") no-repeat center;
      background-size: 118%;
    }
    .personNameBox {
      width: 100%;
      height: auto;
      position: absolute;
      z-index: 8;
      top: 0;
      top: 0;
      .pagination {
        position: absolute;
        top: 96px;
        z-index: 99;
        margin-top: 40px;
      }
      .changeBan {
        width: 98px;
        height: 98px;
        border-radius: 50%;
        vertical-align: top;
        display: inline-block;
        color: transparent;
        cursor: pointer;
        margin: 0 4px;
      }
      .changeBan:nth-child(2) {
        background: url("./img/mobileperson1.png") no-repeat
          center;
      }
      .changeBan:nth-child(3) {
        background: url("./img/mobileperson2.png") no-repeat
          center;
      }
      .changeBan:nth-child(4) {
        background: url("./img/mobileperson3.png") no-repeat
          center;
      }
      .changeBan:nth-child(5) {
        background: url("./img/mobileperson4.png") no-repeat
          center;
      }
      .changeBan:nth-child(6) {
        background: url("./img/mobileperson5.png") no-repeat
          center;
      }
      .changeBan:nth-child(7) {
        background: url("./img/mobileperson6.png") no-repeat
          center;
      }
      .spanActive1 {
        background: url("./img/mobileperson1a.png") !important;
      }
      .spanActive2 {
        background: url("./img/mobileperson2a.png") !important;
      }
      .spanActive3 {
        background: url("./img/mobileperson3a.png") !important;
      }
      .spanActive4 {
        background: url("./img/mobileperson4a.png") !important;
      }
      .spanActive5 {
        background: url("./img/mobileperson5a.png") !important;
      }
      .spanActive6 {
        background: url("./img/mobileperson6a.png") !important;
      }
      span:nth-child(2) {
        border: none;
        padding-left: 0;
      }
      span:nth-child(7) {
        padding-right: 0;
      }
    }
    .rewardContainer {
      width: 100%;
      height: 1300px;
      overflow: hidden;
      // border: 1px solid red;
      .swiper-container {
        width: 625px;
        height: 100%;
        // border: 1px solid blue;
        .swiper-slide {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .personLeft {
            width: 610px;
            height: 580px;
            // background: paleturquoise;
            .person1 {
              width: 610px;
              height: 560px;
              margin-top: 250px;
              background: url("./img/person1.png") no-repeat center;
              background-position: 54px 5px;
            }
            .person2 {
              width: 610px;
              height: 565px;
              margin-top: 280px;
              background: url("./img/person2.png") no-repeat center;
              background-position: 39px 5px;
            }
            .person3 {
              width: 610px;
              height: 656px;
              margin-top: 235px;
              background: url("./img/person3.png") no-repeat center;
              background-position: 51px 5px;
            }
            .person4 {
              width: 906px;
              height: 801px;
              margin-top: 107px;
              margin-left: -93px;
              background: url("./img/person4.png") no-repeat center;
              background-position: 49px 7px;
            }
            .person5 {
              width: 610px;
              height: 672px;
              margin-top: 215px;
              background: url("./img/person5.png") no-repeat center;
              background-position: 11px 10px;
            }
            .person6 {
              width: 610px;
              height: 627px;
              margin-top: 248px;
              background: url("./img/person6.png") no-repeat center;
              background-position: 38px 4px;
            }
          }
          .personRight {
            width: 586px;
            height: 430px;
            margin: auto;
            .name {
              font-size: 36px;
              font-weight: bold;
              text-transform: uppercase;
              color: #fff7dd;
            }
            .personLogo1,
            .personLogo2,
            .personLogo3,
            .personLogo4,
            .personLogo5,
            .personLogo6 {
              width: 128px;
              height: 30px;
              margin-left: 25px;
              display: inline-block;
              background: url("./img/person1Name.png") no-repeat
                center;
            }
            .personLogo2 {
              background: url("./img/person2Name.png") no-repeat
                center;
            }
            .personLogo3 {
              background: url("./img/person3Name.png") no-repeat
                center;
            }
            .personLogo4 {
              background: url("./img/person4Name.png") no-repeat
                center;
            }
            .personLogo5 {
              background: url("./img/person5Name.png") no-repeat
                center;
            }
            .personLogo6 {
              background: url("./img/person6Name.png") no-repeat
                center;
            }
            .line {
              width: 492px;
              height: 1px;
              margin-top: 20px;
              margin-bottom: 10px;
              background: url("./img/line.png");
            }
            .info1 {
              font-size: 20px;
              color: #faecbd;
            }
            .titBox {
              width: 100%;
              height: 75px;
              margin-top: 30px;
              position: relative;
              .person1Img1,
              .person1Img2,
              .person2Img1,
              .person2Img2,
              .person3Img1,
              .person3Img2,
              .person4Img1,
              .person4Img2,
              .person5Img1,
              .person5Img2,
              .person6Img1,
              .person6Img2 {
                width: 75px;
                height: 75px;
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
              }
              .person1Img1 {
                background: url("./img/person1Img1.png") no-repeat
                  center;
              }
              .person1Img2 {
                background: url("./img/person1Img2.png") no-repeat
                  center;
              }
              .person2Img1 {
                background: url("./img/person2Img1.png") no-repeat
                  center;
              }
              .person2Img2 {
                background: url("./img/person2Img2.png") no-repeat
                  center;
              }
              .person3Img1 {
                background: url("./img/person3Img1.png") no-repeat
                  center;
              }
              .person3Img2 {
                background: url("./img/person3Img2.png") no-repeat
                  center;
              }
              .person4Img1 {
                background: url("./img/person4Img1.png") no-repeat
                  center;
              }
              .person4Img2 {
                background: url("./img/person4Img2.png") no-repeat
                  center;
              }
              .person5Img1 {
                background: url("./img/person5Img1.png") no-repeat
                  center;
              }
              .person5Img2 {
                background: url("./img/person5Img2.png") no-repeat
                  center;
              }
              .person6Img1 {
                background: url("./img/person6Img1.png") no-repeat
                  center;
              }
              .person6Img2 {
                background: url("./img/person6Img2.png") no-repeat
                  center;
              }
              .titTxt {
                display: inline-block;
                font-size: 20px;
                color: #fff7dd;
                position: absolute;
                left: 85px;
                top: 13px;
              }
              p:nth-child(1) {
                font-weight: bold;
                text-transform: uppercase;
              }
            }
          }
          .personRight1 {
            margin-top: 25px;
          }
          .personRight2 {
            margin-top: -4px;
          }
          .personRight3 {
            margin-top: 41px;
          }
          .personRight4 {
            margin-top: 169px;
          }
          .personRight5 {
            margin-top: 62px;
          }
          .personRight6 {
            margin-top: 28px;
          }
        }
      }
    }
  }
}
</style>
