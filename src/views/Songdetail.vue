<template>
  <div class="songdetailpage">
    <div class="songdetailleft" v-if="song">
      <Title
        :psong="song"
        :pcomment="songcomment.total"
        :pLyric="currentLyric"
        @translate-song="$emit('translate-song', $event)"
      ></Title>
      <Contentitle>{{songcomment.total}}</Contentitle>
      <div class="usercomment">
        <img src="../assets/portrait.png" class="userheader" />
        <div class="usercommentright">
          <textarea cols="30" rows="10" placeholder="评论"></textarea>
          <div class="rightbot">
            <img src="../assets/face.svg" alt />
            <img src="../assets/@.svg" alt />
            <button>评论</button>
          </div>
        </div>
      </div>
      <div class="hotcommentitle">精彩评论</div>
      <Contentlli v-for="(item,indexone) in songcomment.hotComments" :item="item" :key="indexone"></Contentlli>
      <div class="hotcommentitle">最新评论</div>
      <Contentlli
        v-for="(item,indextwo) in songcomment.comments"
        :item="item"
        :key="'two-'+ indextwo"
      ></Contentlli>
    </div>
    <div class="songdetailright">
      <div class="top">相似歌曲</div>
      <ul class="simisonglist">
        <li v-for="(item,index) in simisonglist" :key="'simi-'+index" :item="item">
          <div class="rli-left">
            <h2>{{item.name}}</h2>
            <p>{{item.artists[0].name}}</p>
          </div>
          <div class="rli-mid">
            <img src="../assets/hidden.svg" @click.stop="$emit('translate-song', item.id)" />
          </div>
          <div class="rli-right">
            <img src="../assets/add3.svg" alt />
          </div>
        </li>
      </ul>
      <div class="top">玖玖音乐多端下载</div>
      <div class="ri-bot"></div>
      <p class="lastp">同步歌单，随时畅听320k好音乐</p>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Songdetail/Titletop";
import Contentitle from "@/components/Songdetail/contentitle";
import Contentlli from "@/components/Songdetail/Contentlli";
export default {
  components: {
    Title,
    Contentitle,
    Contentlli
  },
  props: {
    // song: Object,
  },
  data: function() {
    return {
      simisonglist: [],
      songid: this.$route.query.id,
      song: {},
      currentLyric: "",
      songcomment: {}
    };
  },
  methods: {
    // 获得相似歌曲
    getsimisong() {
      this.axios
        .get("/simi/song", {
          params: {
            id: this.songid
          }
        })
        .then(res => {
          this.simisonglist = res.data.songs;
          window.localStorage.setItem(
            "simisonglist-" + this.songid,
            JSON.stringify({
              val: res.data.songs,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checksimisong() {
      let cachesimisonglist = JSON.parse(
        window.localStorage.getItem("simisonglist-" + this.song.id)
      );
      if (cachesimisonglist && cachesimisonglist.time > Date.now()) {
        this.simisonglist = cachesimisonglist.val;
      } else {
        this.getsimisong();
      }
    },
    //获取歌曲详情
    getsongdetail() {
      this.axios
        .get("/song/detail", {
          params: {
            ids: this.songid
          }
        })
        .then(response => {
          this.song = response.data.songs[0];
          window.localStorage.setItem(
            this.songid + "details",
            JSON.stringify({
              val: this.song
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkgetsongdetail() {
      let cacheSongdetail = JSON.parse(
        window.localStorage.getItem(this.songid + "details")
      );
      if (cacheSongdetail) {
        this.song = cacheSongdetail.val;
      } else {
        this.getsongdetail();
      }
    },
    // 获取歌曲歌词
    // 获取歌曲歌词
    getLyric() {
      var cachedLyric = window.localStorage.getItem("lyric" + this.songid);
      if (cachedLyric) {
        this.currentLyric = cachedLyric;
      } else {
        window.axios
          .get("/lyric", {
            params: {
              id: this.songid
            }
          })
          .then(response => {
            if (response.data.lrc) {
              this.currentLyric = response.data.lrc.lyric;
              window.localStorage.setItem(
                "lyric" + this.songid,
                response.data.lrc.lyric
              );
            } else {
              this.currentLyric = "[00:00.000] 纯音乐请欣赏";
              window.localStorage.setItem(
                "lyric" + this.songid,
                "[00:00.000] 纯音乐请欣赏"
              );
            }
          });
      }
    },
    // 获取歌曲评论
    getcomment() {
      this.axios
        .get("/comment/music", {
          params: {
            id: this.songid
          }
        })
        .then(response => {
          this.songcomment = response.data;
          window.localStorage.setItem(
            "comment-" + this.songid,
            JSON.stringify({
              val: this.songcomment,
              time: Date.now() + 6 * 60 * 60 * 1000
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 检查是否获取歌曲评论在本地
    checkcomment() {
      let cachesongcomment = JSON.parse(
        window.localStorage.getItem("comment-" + this.songid)
      );
      // 拿取歌单
      if (cachesongcomment && cachesongcomment.time > Date.now()) {
        this.songcomment = cachesongcomment.val;
      } else {
        this.getcomment();
      }
    }
  },
  created() {
    this.checkgetsongdetail();
    this.getLyric();
    this.checkcomment();
    this.checksimisong();
  },
  watch: {
    // keep-alive 保存存活 组件完成之后就不会消耗 组件创建完成之后不会销毁
    songid: function() {
      this.checkgetsongdetail();
      this.getLyric();
      this.checkcomment();
      this.checksimisong();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.songid = to.query.id;
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.songid = to.query.id;
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style lang="less" scoped>
.songdetailpage {
  display: flex;
  margin: 0 10%;
  border-left: 1px solid #c8ebdf;
  border-right: 1px solid #c8ebdf;
  font-size: 12px;
  color: #333;
  .songdetailleft {
    flex-basis: 80%;
    padding: 40px;
    border-right: 1px solid #c8ebdf;
    .usercomment {
      display: flex;
      margin-top: 20px;
      .userheader {
        width: 50px;
        height: 50px;
      }
      .usercommentright {
        margin-left: 20px;
        textarea {
          height: 70px;
          display: block;
          padding: 5px 6px 6px;
          border: 1px solid #999;
          line-height: 19px;
          overflow: auto;
          font-size: 12px;
          color: #333;
          outline: none;
          width: 550px;
          resize: none;
        }
        .rightbot {
          margin-top: 10px;
          img {
            width: 25px;
            margin-right: 10px;
          }
          button {
            background: #3282ce;
            color: #fff;
            float: right;
            line-height: 25px;
            width: 46px;
            height: 25px;
            text-align: center;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 2px;
            border: 1px solid #eee;
            font-size: 12px;
          }
        }
      }
    }
    .hotcommentitle {
      margin-top: 40px;
      padding-bottom: 5px;
      border-bottom: 1px solid #000;
      border-bottom: 1px solid #cfcfcf;
      font-weight: 600;
    }
  }
  .songdetailright {
    flex-basis: 30%;
    width: 30%;
    padding: 20px 40px 40px 30px;
    .top {
      font-size: 12px;
      color: #333;
      font-weight: 600;
      padding-bottom: 5px;
      border-bottom: 1px solid #ccc;
    }
    .simisonglist {
      padding-top: 20px 0px;
      li {
        display: flex;
        padding: 10px 0px;
        align-items: center;
        .rli-left {
          flex-basis: 70%;
          font-size: 12px;
          width: 70%;
          h2 {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            width: 70%;
            color: #333;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          p {
            margin-top: 5px;
            color: #999;
          }
        }
        img {
          width: 15px;
        }
        .rli-mid {
          margin-right: 15px;
        }
      }
    }
    .ri-bot {
      margin-top: 20px;
      height: 65px;
      margin-bottom: 10px;
      background: url("../assets/threedowloadbg.png") no-repeat;
      background-position: 0 -392px;
    }
    .lastp {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
