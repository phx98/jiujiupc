<template>
  <div class="anchortpage">
    <div class="anchortop">
      <img src="../../assets/prev.svg" class="prev" @click="prev()" />
      <template>
        <el-carousel
          ref="anchortop"
          :autoplay="false"
          :loop="false"
          arrow="never"
          indicator-position="none"
        >
          <el-carousel-item>
            <ul class="swiperone" v-if="slideiconlist[0]">
              <li
                class="flexdiv"
                v-for="(item,index) in slideiconlist[0]"
                :key="index"
                :class="clickli == index + 1 ? 'acitveli' : ''"
                @click="clickli = index + 1"
              >
                <div class="fleximg" :style="{ backgroundImage: `url(${item.url})` }"></div>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </el-carousel-item>
          <el-carousel-item>
            <ul class="swiperone swipertwo" v-if="slideiconlist[1]">
              <li
                class="flexdiv"
                v-for="(item, i) in slideiconlist[1]"
                :key="'info-' + i"
                :class="clickli == i + 19 ? 'acitveli' : ''"
                @click="clickli = i + 19"
              >
                <div class="fleximg" :style="{ backgroundImage: `url(${item.url})` }"></div>
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
      </template>
      <img src="../../assets/next.svg" class="next" @click="next()" />
    </div>
    <div class="anchortcontentone">
      <div class="left" v-if="restationlist">
        <AnchorTitle>推荐节目</AnchorTitle>
        <ul>
          <li
            class="restation"
            v-for="(item,index) in restationlist"
            :key="index"
            @mouseenter="showrecommendplay = index + 1"
            @mouseleave="showrecommendplay = 0"
          >
            <div class="restationleftimg">
              <img
                src="../../assets/playaudio4.svg"
                class="playing"
                v-show="showrecommendplay == index + 1"
              />
              <img :src="item.blurCoverUrl" />
            </div>

            <div class="content">
              <h2>{{item.name}}</h2>
              <p>{{item.radio.name}}</p>
            </div>
            <span>{{item.radio.category}}</span>
          </li>
        </ul>
      </div>
      <div class="right" v-if="programlist">
        <AnchorTitle>节目排行榜</AnchorTitle>
        <ul>
          <li
            class="programlist"
            v-for="(item, i) in programlist"
            :key="'right-' + i"
            @mouseenter="showprogramlist = i + 1"
            @mouseleave="showprogramlist = 0"
          >
            <div class="programindex">{{ changeindex(i + 1) }}</div>
            <div class="programlistleftimg">
              <img
                src="../../assets/playaudio4.svg"
                class="playing"
                v-show="showprogramlist == i + 1"
              />
              <img :src="item.program.coverUrl" />
            </div>
            <div class="content">
              <h2>{{item.program.name}}</h2>
              <p>{{item.program.radio.name}}</p>
            </div>
            <span>{{item.program.radio.category}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="anchortcontentwo">
      <div class="musicsong">
        <AnchorTitle>音乐故事·电台</AnchorTitle>
        <div class="contentwo_content" v-if="musicsonglist">
          <div v-for="(item,index) in musicsonglist.slice(0, 4)" :key="'music-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="beautyread">
        <AnchorTitle>美文读物·电台</AnchorTitle>
        <div class="contentwo_content" v-if="beautyreadlist">
          <div v-for="(item,index) in beautyreadlist.slice(0, 4)" :key="'beauty-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="talkshow">
        <AnchorTitle>脱口秀·电台</AnchorTitle>
        <div class="contentwo_content" v-if="talkshowlist">
          <div v-for="(item,index) in talkshowlist.slice(0, 4)" :key="'talk-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="emotion">
        <AnchorTitle>情感调频·电台</AnchorTitle>
        <div class="contentwo_content" v-if="emotionlist">
          <div v-for="(item,index) in emotionlist.slice(0, 4)" :key="'emotion-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="coverversion">
        <AnchorTitle>创作|翻唱·电台</AnchorTitle>
        <div class="contentwo_content" v-if="coverversionlist">
          <div v-for="(item,index) in coverversionlist.slice(0, 4)" :key="'coverversion-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="history">
        <AnchorTitle>人文历史·电台</AnchorTitle>
        <div class="contentwo_content" v-if="historylist">
          <div v-for="(item,index) in historylist.slice(0, 4)" :key="'history-'+ index">
            <img :src="item.picUrl" alt />
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnchorTitle from "../Anchor/AnchorTitle";
export default {
  components: {
    AnchorTitle
  },
  data: function() {
    return {
      slideiconlist: [
        [
          {
            name: "创作|翻唱",
            url:
              "http://p1.music.126.net/cCogGBNagepu5uAd-OuCKQ==/19119407695444318.jpg"
          },
          {
            name: "3D|电子",
            url:
              "http://p1.music.126.net/BVIacbDdjw90QjU4z7mZIw==/3389794351757648.jpg"
          },
          {
            name: "情感调频",
            url:
              "http://p1.music.126.net/RuluBZUC94KRYjx0eF7aHQ==/3223768093383533.jpg"
          },
          {
            name: "音乐故事",
            url:
              "http://p1.music.126.net/fNsFzMtgDByvOnpA0Kfehg==/3242459791054876.jpg"
          },
          {
            name: "二次元",
            url:
              "http://p1.music.126.net/2jEyq6KuPUv0GgFOeDB0rA==/7731765766567381.jpg"
          },
          {
            name: "有声书",
            url:
              "http://p1.music.126.net/jQo83vj8D0r3g0ydL1ujag==/18555358232264878.jpg"
          },
          {
            name: "知识技能",
            url:
              "http://p1.music.126.net/OQ-1zApxCjSxieFf63irwA==/19212866183939953.jpg"
          },
          {
            name: "商业财经",
            url:
              "http://p1.music.126.net/27_UywB9VT7qTicVaUL2Ww==/19052337486286044.jpg"
          },
          {
            name: "人文历史",
            url:
              "http://p1.music.126.net/fxNHDWCNVvRFa_3KAsBw6w==/3242459791054879.jpg"
          },
          {
            name: "日语世界",
            url:
              "http://p1.music.126.net/tNg9R3kjzSAvYRU439sV-A==/18996262393228947.jpg"
          },
          {
            name: "亲子宝贝",
            url:
              "http://p1.music.126.net/WtEmxKotqvrOx02c7RwbdQ==/19167786207164648.jpg"
          },
          {
            name: "相声曲艺",
            url:
              "http://p1.music.126.net/DZV3wnLcYoc32YLnxoVCOg==/3240260767799323.jpg"
          },
          {
            name: "美文读物",
            url:
              "http://p1.music.126.net/svlzt2aNhbHcAVRG1ae9nw==/19199672044369951.jpg"
          },
          {
            name: "脱口秀",
            url:
              "http://p1.music.126.net/QdPlGPCPc-QDdaIKuVq3RQ==/3236962232922745.jpg"
          },
          {
            name: "广播剧",
            url:
              "http://p2.music.126.net/MkrVCkXoJ7v29QXLBluUkw==/19167786207164651.jpg"
          },
          {
            name: "明星做主播",
            url:
              "http://p2.music.126.net/Jnx0K_M3Nc0Uk5YBXPifqw==/3249056860670081.jpg"
          },
          {
            name: "娱乐影视",
            url:
              "http://p2.music.126.net/8yoy33lYuvviDbcg1AOLUw==/3242459791054877.jpg"
          },
          {
            name: "科技科学",
            url:
              "http://p2.music.126.net/RLir9qUUGNolaxtMz-mPNA==/18896206835140215.jpg"
          }
        ],
        [
          {
            name: "校园|教育",
            url:
              "https://p4.music.126.net/AxVxXIdgRXcpDGlkDehsCw==/3249056862536456.jpg"
          },
          {
            name: "旅途城市",
            url:
              "https://p3.music.126.net/Y0RoVx8oMTDyukbiqbizAA==/3223768093383535.jpg"
          }
        ]
      ],
      clickli: 0,
      restationlist: [],
      showrecommendplay: 0,
      programlist: [],
      showprogramlist: 0,
      musicsonglist: [],
      beautyreadlist: [],
      talkshowlist: [],
      emotionlist: [],
      coverversionlist: [],
      historylist: []
    };
  },
  methods: {
    prev() {
      this.$refs.anchortop.prev();
    },
    next() {
      this.$refs.anchortop.next();
    },
    getrecommend() {
      this.axios.get("/program/recommend").then(res => {
        this.restationlist = res.data.programs;
        window.localStorage.setItem(
          "restationlist",
          JSON.stringify({
            val: res.data.programs,
            time: Date.now() + 2 * 60 * 60 * 1000
          })
        );
      });
    },
    checkrecommend() {
      let cachestationlist = JSON.parse(
        window.localStorage.getItem("restationlist")
      );
      if (cachestationlist && cachestationlist.time > Date.now()) {
        this.restationlist = cachestationlist.val;
      } else {
        this.getrecommend();
      }
    },
    getprogramlist() {
      this.axios.get("/dj/program/toplist?limit=10").then(res => {
        this.programlist = res.data.toplist;
        window.localStorage.setItem(
          "programlist",
          JSON.stringify({
            val: res.data.toplist,
            time: Date.now() + 2 * 60 * 60 * 1000
          })
        );
      });
    },
    checkprogramlist() {
      let cacheprogramlist = JSON.parse(
        window.localStorage.getItem("programlist")
      );
      if (cacheprogramlist && cacheprogramlist.time > Date.now()) {
        this.programlist = cacheprogramlist.val;
      } else {
        this.getprogramlist();
      }
    },
    changeindex(index) {
      return index < 10 ? "0" + index : index;
    },
    getrecommendtype(type, callback) {
      this.axios
        .get("/dj/recommend/type", {
          params: {
            type
          }
        })
        .then(res => {
          callback(res);
        });
    },
    checktyperecommendlist(str, type, callback) {
      let cachelocal = JSON.parse(window.localStorage.getItem(str));
      if (cachelocal && cachelocal.time > Date.now()) {
        callback(cachelocal.val);
      } else {
        this.getrecommendtype(type, res => {
          window.localStorage.setItem(
            str,
            JSON.stringify({
              val: res.data.djRadios,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
          callback(res.data.djRadios);
        });
      }
    }
  },
  created() {
    this.checkrecommend();
    this.checkprogramlist();
    // 音乐电台musicsonglist: [],
    this.checktyperecommendlist("musicsonglist", 2, res => {
      this.musicsonglist = res;
    });
    // 美文电台beautyreadLlist: [],
    this.checktyperecommendlist("beautyreadlist", 6, res => {
      this.beautyreadlist = res;
    });
    // 脱口秀电台talkshowlist: [],
    this.checktyperecommendlist("talkshowlist", 5, res => {
      this.talkshowlist = res;
    });
    // 情感电台emotionlist: [],
    this.checktyperecommendlist("emotionlist", 3, res => {
      this.emotionlist = res;
    });
    // 创作翻唱电台coverversionlist: [],
    this.checktyperecommendlist("coverversionlist", 2001, res => {
      this.coverversionlist = res;
    });
    // 历史电台historylist: []
    this.checktyperecommendlist("historylist", 11, res => {
      this.historylist = res;
    });
  }
};
</script>

<style lang="less" scoped>
.anchortpage {
  margin: 0px 10%;
  border-left: 1px solid #c8ebdf;
  border-right: 1px solid #c8ebdf;
  padding: 40px;
  .anchortop {
    // background: #f3f8f6;
    margin-bottom: 20px;
    height: 190px;
    position: relative;
    .el-carousel__item .swiperone {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      &.swipertwo {
        justify-content: start;
      }
      li {
        width: 70px;
        height: 70px;
        flex-basis: 8%;
        margin-right: 3%;
        text-align: center;
        margin-top: 10px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: #c8ebdf;
          color: #999;
        }
        &:nth-child(9n + 0) {
          margin-right: 0px;
        }
        .fleximg {
          width: 48px;
          height: 48px;
          margin: 0 auto;
          background-position: 0px 0px;
        }
        &.acitveli {
          background-color: #c8ebdf;
          color: #d35b5b;
          .fleximg {
            background-position: -48px 0px;
          }
        }
      }
    }
    .prev {
      left: -34px;
    }
    .next {
      right: -35px;
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
  .anchortcontentone {
    display: flex;
    justify-content: space-between;
    & > div {
      flex-basis: 48%;
    }
    .left {
      ul {
        border: 1px solid #f3f8f6;
        border-top: none;
      }
    }
    .restation,
    .programlist {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12px;
      padding: 10px 20px;
      width: 100%;
      margin: 0px;
      &.programlist {
        padding: 10px 20px 10px 0px;
      }
      .programindex {
        font-size: 12px;
        color: #333;
        width: 40px;
        position: relative;
        left: 3px;
        text-align: center;
      }
      &:nth-child(-n + 3) {
        .programindex {
          color: red;
        }
      }
      &:nth-child(even) {
        background: #f3f8f6;
      }
      &:hover {
        background: #dbf2ea;
      }
      .restationleftimg,
      .programlistleftimg {
        position: relative;
        img {
          width: 40px;
        }
        .playing {
          width: 20px;
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
        }
      }
      .content {
        margin-left: 10px;
        width: 55%;
        h2 {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333;
          width: 100%;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          color: #999;
          margin-top: 5px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      span {
        margin-left: 20px;
        padding: 1px 5px;
        border: 1px #ccc solid;
        color: #666;
        cursor: pointer;
        &:hover {
          border: 1px #666 solid;
          color: #333;
        }
      }
    }
    .right {
      ul {
        border: 1px solid #f3f8f6;
        border-top: none;
      }
    }
  }
  .anchortcontentwo {
    & > div {
      margin-top: 20px;
    }
    .contentwo_content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      & > div {
        flex-basis: 48%;
        padding: 20px 0px;
        img {
          width: 120px;
          height: 120px;
          vertical-align: top;
        }
        span {
          font-size: 18px;
          margin-left: 20px;
          top: 20px;
          position: relative;
          color: #333;
          font-weight: bold;
        }
      }
      & > div:nth-child(-n + 2) {
        border-bottom: 1px solid #f3f8f6;
      }
    }
  }
}
</style>
