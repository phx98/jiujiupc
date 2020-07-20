<template>
  <div class="recommendpage">
    <!-- <h1>这是recommend页面</h1> -->
    <div class="bantop" v-if="bannerlist">
      <div class="mask" :style="{backgroundImage:`url(${bannerbg})`}"></div>
      <div class="block bancontent">
        <swiper :options="bannerswiper" ref="bannerSwiper">
          <swiper-slide class="swiper-slide" v-for="(item, index) in bannerlist" :key="index">
            <img :src="item.imageUrl" v-if="item.imageUrl" />
          </swiper-slide>
          <div class="swiper-pagination" id="pagination" slot="pagination"></div>
        </swiper>
        <div class="swiper-button-next" slot="button-prev"></div>
        <div class="swiper-button-prev" slot="button-next"></div>
      </div>
      <div class="banright"></div>
    </div>
    <div class="recommentcontent">
      <div class="commentleft">
        <div class="hotrecomment" v-if="hotrecommentlist">
          <Title>
            热门推荐
            <ul class="smalltag">
              <li>华语</li>
              <li>流行</li>
              <li>摇滚</li>
              <li>民谣</li>
              <li>电子</li>
            </ul>
          </Title>
          <div class="hotcontent">
            <Cards
              v-for="(item, index) in hotrecommentlist"
              :key="index"
              :item="item"
              @to-playlistdetail="toplaylistdetail($event)"
            ></Cards>
          </div>
        </div>
        <div class="invalidrecomment" v-if="albumlist">
          <Title>新碟上架</Title>
          <div class="albumcontent">
            <img src="../../assets/prev.svg" class="prev" @click="prev()" />
            <template>
              <el-carousel
                indicator-position="none"
                :autoplay="false"
                arrow="never"
                height="180px"
                ref="carousel"
                :loop="false"
              >
                <el-carousel-item>
                  <plateCard v-for="(item, index) in albumone" :key="index" :item="item"></plateCard>
                </el-carousel-item>
                <el-carousel-item>
                  <plateCard v-for="(item, index) in albumtwo" :key="index" :item="item"></plateCard>
                </el-carousel-item>
              </el-carousel>
            </template>
            <img src="../../assets/next.svg" class="next" @click="next()" />
          </div>
        </div>
        <div class="Songlist">
          <Title @click-more="toplaylist(19723756)">榜单</Title>
          <div class="Songlistcontent">
            <div class="contentone" v-if="Soaringlist.tracks">
              <Songlisttitle
                :imgurl="Soaringlist.coverImgUrl"
                @to-rank="toplaylist(19723756)"
                @translate-defaultplay="$emit('translate-defaultplay', Soaringlist.tracks.slice(0, 10))"
              >云音乐飙升榜</Songlisttitle>
              <SonglistMusic
                v-for="(item, index) in Soaringlist.tracks.slice(0, 10)"
                :key="index"
                :item="item"
                :index="index"
                @translate-song="$emit('translate-song', $event)"
                @add-defaultplay="$emit('add-defaultplay', $event)"
              ></SonglistMusic>
              <div class="songlistbot">
                <span @click="toplaylist(19723756)">查看全部></span>
              </div>
            </div>
            <div class="contenttwo" v-if="newsonglist.tracks">
              <Songlisttitle
                :imgurl="newsonglist.coverImgUrl"
                @to-rank="toplaylist(3779629)"
                @translate-defaultplay="$emit('translate-defaultplay', newsonglist.tracks.slice(0, 10))"
              >云音乐新歌榜</Songlisttitle>
              <SonglistMusic
                v-for="(item, index) in newsonglist.tracks.slice(0, 10)"
                :key="index"
                :item="item"
                :index="index"
                @translate-song="$emit('translate-song', $event)"
                @add-defaultplay="$emit('add-defaultplay', $event)"
              ></SonglistMusic>
              <div class="songlistbot">
                <span @click="toplaylist(3779629)">查看全部></span>
              </div>
            </div>
            <div class="contentthree" v-if="originallist.tracks">
              <Songlisttitle
                :imgurl="originallist.coverImgUrl"
                @to-rank="toplaylist(2884035)"
                @translate-defaultplay="$emit('translate-defaultplay', originallist.tracks.slice(0, 10))"
              >网易云原创歌曲榜</Songlisttitle>
              <SonglistMusic
                v-for="(item, index) in originallist.tracks.slice(0, 10)"
                :key="index"
                :item="item"
                :index="index"
                @add-defaultplay="$emit('add-defaultplay', $event)"
              ></SonglistMusic>
              <div class="songlistbot">
                <span @click="toplaylist(2884035)">查看全部></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="commentright">
        <div class="commentrighttop" v-if="!username">
          <p>登录玖玖音乐,可以享受无限收藏的乐趣,并且无限同步到手机</p>
          <button>用户登录</button>
        </div>
        <div class="rightcontent">
          <div class="fixedsinger">
            <div class="top">
              入驻歌手
              <span @click="toSingerlist(0,1)">查看全部></span>
            </div>
            <ul class="fixedsingercontent" v-if="fixedsingerlist">
              <li v-for="(item, index) in fixedsingerlist" :key="index">
                <img :src="item.picUrl" />
                <div>
                  <h2>{{ item.name }}</h2>
                  <p>{{item.name}}专栏</p>
                </div>
              </li>
            </ul>
            <button class="aply">申请成为网易音乐人</button>
          </div>
          <div class="anchorlist">
            <div class="top">热门主播</div>
            <ul class="anchorcontent" v-if="anchorlist">
              <li v-for="(item,index) in anchorlist" :key="index">
                <img :src="item.picUrl" />
                <div>
                  <h2>
                    {{item.name}}
                    <span>
                      <img src="../../assets/vip.svg" alt />
                    </span>
                  </h2>
                  <p>{{item.rcmdtext}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import Title from "@/components/Recommend/Recommendtitle";
import Cards from "@/components/public/Cards";
import plateCard from "@/components/public/plateCard";
import Songlisttitle from "@/components/Recommend/Songlisttitle";
import SonglistMusic from "@/components/Recommend/SonglistMusic";
export default {
  components: {
    Swiper,
    SwiperSlide,
    Title,
    Cards,
    plateCard,
    Songlisttitle,
    SonglistMusic
  },
  data: function() {
    let that = this;
    return {
      bannerlist: [],
      bannerbg: "",
      bannerswiper: {
        preventClicks: false,
        //自动轮播
        autoplay: {
          delay: 3000,
          // 当用户滑动图片后继续自动轮播
          disableOnInteraction: false
        },
        navigation: {
          nextEl: ".swiper-button-next", //前进按钮的css选择器或HTML元素。
          prevEl: ".swiper-button-prev" //后退按钮的css选择器或HTML元素。
        },
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true
        },
        effect: "fade",
        fade: {
          crossFade: true
        },
        loop: true,
        on: {
          click() {
            let id = that.bannerlist[this.activeIndex - 1].targetId;
            // that.$emit("translate-song", id);
            that.$router.push({
              path: `/Songdetail?id=${id}`
            });
          },
          slideChangeTransitionEnd: function() {
            if (that.bannerlist[0]) {
              if (
                this.activeIndex <= that.bannerlist.length &&
                that.bannerlist[this.activeIndex - 1].imageUrl
              ) {
                that.bannerbg = that.bannerlist[this.activeIndex - 1].imageUrl;
              } else {
                this.bannerbg = that.bannerlist[0].imageUrl;
              }
            }
          }
        }
      },
      hotrecommentlist: [],
      selfrecommentlist: [],
      albumlist: [],
      albumone: [],
      albumtwo: [],
      // 云音乐飙升榜
      Soaringlist: {},
      // 云音乐新歌榜
      newsonglist: {},
      // 网易原创歌曲榜
      originallist: {},
      // 入驻歌手名单
      fixedsingerlist: [],
      anchorlist: []
    };
  },
  props: {
    userinfo: Object
  },
  computed: {
    username: function() {
      return this.userinfo.username;
    }
  },
  methods: {
    getbanner() {
      this.axios
        .get("/banner", {
          params: {
            type: 0
          }
        })
        .then(res => {
          this.bannerlist = res.data.banners;
          window.localStorage.setItem(
            "recommendbanner",
            JSON.stringify({
              val: res.data.banners,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checknewsong() {
      let cacheNewsong = JSON.parse(
        window.localStorage.getItem("recommendbanner")
      );
      if (cacheNewsong && cacheNewsong.time > Date.now()) {
        this.bannerlist = cacheNewsong.val;
      } else {
        this.getbanner();
      }
    },
    gethotplay() {
      this.axios
        .get("/personalized", {
          params: {
            limit: 8
          }
        })
        .then(response => {
          // 判断拿取数据是否正确，反爬虫
          this.hotrecommentlist = response.data.result;
          // 放入本地存储数据里面，设置过期时间
          window.localStorage.setItem(
            "hotrecommentlist",
            JSON.stringify({
              val: this.hotrecommentlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkhotplay() {
      const cachehotplay = JSON.parse(
        window.localStorage.getItem("hotrecommentlist")
      );
      if (cachehotplay && cachehotplay.time > Date.now()) {
        this.hotrecommentlist = cachehotplay.val;
      } else {
        this.gethotplay();
      }
    },
    getselfplay() {
      // this.axios.get("/recomment/")
    },
    getalbum() {
      this.axios
        .get("/top/album", {
          params: {
            limit: 10
          }
        })
        .then(res => {
          this.albumlist = res.data.albums;
          this.albumone = this.albumlist.slice(0, 5);
          this.albumtwo = this.albumlist.slice(5, 10);
          window.localStorage.setItem(
            "albumlist",
            JSON.stringify({
              val: this.albumlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkalbum() {
      const cacheablumlist = JSON.parse(
        window.localStorage.getItem("albumlist")
      );
      if (cacheablumlist && cacheablumlist.time > Date.now()) {
        this.albumlist = cacheablumlist.val;
        this.albumone = this.albumlist.slice(0, 5);
        this.albumtwo = this.albumlist.slice(5, 10);
      } else {
        this.getalbum();
      }
    },
    prev() {
      this.$refs.carousel.prev();
    },
    next() {
      this.$refs.carousel.next();
    },
    getsonglist(num, callback) {
      this.axios
        .get("/top/list", {
          params: {
            idx: num
          }
        })
        .then(res => {
          callback(res.data.playlist);
        });
    },
    checkSoaringlist() {
      const cacheSoaringlist = JSON.parse(
        window.localStorage.getItem("Soaringlist")
      );
      if (cacheSoaringlist && cacheSoaringlist.time > Date.now()) {
        this.Soaringlist = cacheSoaringlist.val;
      } else {
        this.getsonglist(3, res => {
          this.Soaringlist = res;
          window.localStorage.setItem(
            "Soaringlist",
            JSON.stringify({
              val: this.Soaringlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        });
      }
    },
    checknewsonglist() {
      const cacheNewsonglist = JSON.parse(
        window.localStorage.getItem("Newsonglist")
      );
      if (cacheNewsonglist && cacheNewsonglist.time > Date.now()) {
        this.newsonglist = cacheNewsonglist.val;
      } else {
        this.getsonglist(0, res => {
          this.newsonglist = res;
          window.localStorage.setItem(
            "Newsonglist",
            JSON.stringify({
              val: this.newsonglist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        });
      }
    },
    checkoriginallist() {
      const cacheoriginallist = JSON.parse(
        window.localStorage.getItem("originallist")
      );
      if (cacheoriginallist && cacheoriginallist.time > Date.now()) {
        this.originallist = cacheoriginallist.val;
      } else {
        this.getsonglist(2, res => {
          this.originallist = res;
          window.localStorage.setItem(
            "originallist",
            JSON.stringify({
              val: this.originallist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        });
      }
    },
    getanchorlist() {
      this.axios
        .get("/dj/hot", {
          params: {
            limit: 5
          }
        })
        .then(res => {
          this.anchorlist = res.data.djRadios;
          window.localStorage.setItem(
            "anchorlist",
            JSON.stringify({
              val: this.anchorlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checksingerlist() {
      const cachesingerlist = JSON.parse(
        window.localStorage.getItem("fixedsingerlist")
      );
      if (cachesingerlist && cachesingerlist.time > Date.now()) {
        this.fixedsingerlist = cachesingerlist.val;
      } else {
        this.getfixedsingerlist();
      }
    },
    getfixedsingerlist() {
      this.axios
        .get("/artist/list", {
          params: {
            cat: 5001,
            limit: 5
          }
        })
        .then(res => {
          this.fixedsingerlist = res.data.artists;
          window.localStorage.setItem(
            "fixedsingerlist",
            JSON.stringify({
              val: this.fixedsingerlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkanchorlist() {
      const cacheanchorlist = JSON.parse(
        window.localStorage.getItem("anchorlist")
      );
      if (cacheanchorlist && cacheanchorlist.time > Date.now()) {
        this.anchorlist = cacheanchorlist.val;
      } else {
        this.getanchorlist();
      }
    },
    toplaylist(id) {
      this.$router.push({
        path: `/Home/Rank?id=${id}`
      });
    },
    toplaylistdetail(id) {
      this.$router.push({
        path: `/Playlistdetail?id=${id}`
      });
    },
    // 前往入驻歌手
    toSingerlist(pindex, cindex) {
      this.$router.push({
        path: `/Home/Singer?pid=${pindex}&cindex=${cindex}`
      });
    }
  },
  created() {
    this.checknewsong();
    this.checkhotplay();
    this.checkalbum();
    this.checkSoaringlist();
    this.checknewsonglist();
    this.checkoriginallist();
    this.checksingerlist();
    this.checkanchorlist();
  }
};
</script>

<style lang="less" scoped>
// @import url("../assets/css/swiper.min.css");

.recommendpage {
  .bantop {
    height: 285px;
    display: flex;
    position: relative;
    width: 100%;
    overflow: hidden;
    .mask {
      position: absolute;
      width: 150%;
      height: 150%;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% auto;
      top: -5%;
      left: -5%;
      z-index: -1;
      filter: blur(40px);
    }
    .bancontent {
      width: calc(80% - 255px);
      margin-left: 10%;
      z-index: 5;
      border: none;
      .swiper-button-next,
      .swiper-button-prev {
        outline: none;
      }
      .swiper-button-prev {
        left: 5%;
      }
      .swiper-button-next {
        right: 5%;
      }
      .swiper-slide {
        height: 285px;
        position: relative;
        &::after {
          width: 100%;
          height: 100%;
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          box-shadow: 0 0 1px 1px #ffffff inset;
        }
      }
      img {
        height: 100%;
        width: 100%;
      }
    }
    .banright {
      width: 255px;
      background: url(../../assets/client.png) no-repeat;
      background-position: 0 0;
      height: 100%;
      margin-right: 10%;
    }
  }
  .recommentcontent {
    margin: 0px 10%;
    display: flex;
    border: 1px solid #c8ebdf;
    border-bottom: none;
    .commentleft {
      width: calc(100% - 255px);
      padding: 20px 20px 40px;
      border-right: 1px solid #c8ebdf;
      border-top: 1px solid #ccc;
      .hotrecomment {
        position: relative;

        .hotcontent {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-top: 20px;
          & > div {
            flex-basis: 20%;
            margin-bottom: 40px;
            margin-right: 20px;
          }
          & > div:nth-child(4n + 4) {
            margin-right: 0px;
          }
        }
      }
      .invalidrecomment {
        .albumcontent {
          background: #f3f8f6;
          border: 1px solid #d2e1dc;
          margin: 20px 0px;
          height: 180px;
          position: relative;
          padding: 0px 25px;
          .el-carousel__item {
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
              width: 100px;
              height: 150px;
            }
          }
          .prev {
            left: 0px;
          }
          .next {
            right: 0px;
          }
          .prev,
          .next {
            width: 30px;
            padding: 5px;
            position: absolute;
            cursor: pointer;
            top: 70px;
          }
        }
      }
      .Songlistcontent {
        background: #f3f8f6;
        margin: 20px 0px;
        position: relative;
        display: flex;
        border: 1px solid #c8ebdf;

        & > div {
          flex: 1;
        }
        .contenttwo {
          border-left: 1px solid #c8ebdf;
          border-right: 1px solid #c8ebdf;
        }
        .contentone,
        .contenttwo,
        .contentthree {
          li:nth-child(even) {
            background: #dbf2ea;
          }
          li:hover {
            background: #c8ebdf;
          }
          .songlistbot {
            height: 32px;
            text-align: right;
            padding-right: 20px;
            line-height: 32px;
            font-size: 12px;
            background: #dbf2ea;
            span:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
    }

    .commentright {
      width: 255px;
      height: 600px;
      .commentrighttop {
        // height: 126px;
        padding: 30px 40px;
        background: #f3f8f6;
        font-size: 12px;
        text-align: center;
        border: 1px #dbf2ea solid;
        border-radius: 4px;
        box-shadow: 1px 1px -1px #ccc;
        p {
          text-align: left;
          line-height: 1.5em;
          color: #2e9976;
        }
        button {
          border-radius: 5px;
          margin-top: 20px;
          padding: 8px 30px;
          background: #42b983;
          color: #fff;
          font-size: 12px;
          outline: none;
          border: none;
          text-align: center;
          box-shadow: -2px 2px 2px #d7f1e6;
        }
      }
      .rightcontent {
        padding: 15px 20px;
        font-size: 12px;
        .fixedsinger {
          .top {
            border-bottom: 1px solid #c8ebdf;
            padding: 5px;
            span {
              color: #68c79c;
              float: right;
              cursor: pointer;
            }
          }
          .fixedsingercontent {
            li {
              border: 1px solid #dbf2ea;
              display: flex;
              height: 62px;
              align-items: center;
              margin-top: 20px;
              background: #f3f8f6;
              & > div {
                margin-left: 20px;
                h2 {
                  font-size: 14px;
                  font-weight: 500;
                  margin-bottom: 5px;
                }
                p {
                  color: #666;
                }
              }
              img {
                height: 60px;
                width: 60px;
                filter: brightness(0.5) blur(0.8);
              }
            }
          }
          .aply {
            padding: 5px 0px;
            width: 100%;
            text-align: center;
            border-radius: 5px;
            margin-top: 20px;
            border: 2px solid #c8ebdf;
            background: #f3f8f6;
            font-size: 12px;
            outline: none;
            &:hover {
              background: #dbf2ea;
            }
            cursor: pointer;
          }
        }
        .anchorlist {
          margin-top: 40px;
          .top {
            border-bottom: 1px solid #c8ebdf;
            padding: 5px;
          }
          .anchorcontent {
            font-size: 12px;
            margin-top: 20px;
            li {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
              & > img {
                width: 40px;
                height: 40px;
                cursor: pointer;
              }
              & > div {
                margin-left: 20px;
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
                img {
                  width: 11px;
                  vertical-align: middle;
                }
                p {
                  color: #666;
                  margin-top: 5px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  display: -webkit-box;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="less" module>
:root {
  --swiper-theme-color: #42b983;
}
</style>
