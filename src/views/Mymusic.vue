<template>
  <div class="mymusicpage">
    <div class="unlogincontent" v-if="!username">
      <div class="bg"></div>
      <div class="jiujiu">
        <h2>登录玖玖的音乐网站</h2>
        <p>查看并管理你收藏的私房音乐,方便地随时随地收听</p>
        <div class="unloginimgcontent">
          <img src="../assets/smallphone.svg" class="smallphone" />
          <img src="../assets/bigphone.svg" class="bigphone" />
          <img src="../assets/compute.svg" class="compute" />
          <img src="../assets/tv.svg" class="tv" />
        </div>
        <div class="tologin">
          <button @click="$emit('send-login')">立即登录</button>
        </div>
      </div>
    </div>
    <div class="logincontent" v-if="username">
      <div class="loginleft">
        <ul class="bigul">
          <li @click="activeli = 0" :class="{'activeli':activeli== 0}" class="one">
            <h2>我的歌手</h2>
          </li>
          <li class="collectplaylist" @click="activeli = 1" :class="{'activeli':activeli== 1}">
            <h2>
              <img
                src="../assets/hidden.svg"
                class="listtitle"
                v-show="!showlilist"
                @click="showlilist = true"
              />
              <img
                src="../assets/show.svg"
                class="listtitle"
                v-show="showlilist"
                @click="showlilist = false"
              />
              创建的歌单
              <span>R</span>
              ({{ collectplaylist.length}})
              <button>+新建</button>
            </h2>
            <transition
              name="draw"
              enter-active-class="animated slideInDown"
              leave-active-class="animated fadeOut"
            >
              <ul class="collectlist" v-show="showlilist">
                <Card
                  v-for="(item,index) in collectplaylist"
                  :key="index"
                  :item="item"
                  @change-activeid="activeplaylistid = item.id"
                ></Card>
              </ul>
            </transition>
          </li>
        </ul>
      </div>
      <div class="loginright">
        <!-- 歌手的页面 -->
        <div class="loginrightone" v-show="activeli == 0">
          <Title>我的歌手(4)</Title>
          <ul class="collectsingerlist">
            <SingerCard v-for="(item,i) in collectsingerlist" :key="i" :item="item"></SingerCard>
          </ul>
        </div>
        <!-- 歌单的页面 -->
        <div class="loginrightwo" v-show="activeli == 1" :key="activeplaylistid">
          <Playlistcontent
            @translate-song="$emit('translate-song', $event)"
            :playlistdetail="playlistdetail"
            :mineplaylistSong="mineplaylistSong"
            @translate-defaultplay="$emit('translate-defaultplay', $event)"
            @add-defaultplay="$emit('add-defaultplay', $event)"
          ></Playlistcontent>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Mymusic/MymusicCard";
import Title from "@/components/Mymusic/Title";
import SingerCard from "@/components/Mymusic/collectSinger";
import Playlistcontent from "@/components/Mymusic/Playlistcontent";
export default {
  components: {
    Card,
    Title,
    SingerCard,
    Playlistcontent
  },
  data: function() {
    return {
      collectplaylist: [],
      showlilist: false,
      activeli: 0,
      playlistdetail: {},
      collectsingerlist: [
        {
          id: 34600279,
          url:
            "https://p1.music.126.net/uhE83HOrvDSWoVAX2GqqVA==/109951164095562328.jpg?param=80y80",
          content: "1个专辑",
          name: "up初相识"
        },
        {
          id: 768306,
          url:
            "https://p1.music.126.net/9L5ZOJ2DJQsmS8yMJX88Eg==/109951165054567043.jpg?param=80y80",
          content: "13个专辑",
          name: "网易云音乐"
        },
        {
          id: 14960,
          url:
            "https://p1.music.126.net/rTT-TdO672Tghd_ZTSsr5A==/6034119813444543.jpg?param=80y80",
          content: "宗次郎",
          name: "18个专辑"
        },
        {
          id: 123825,
          url:
            "https://p1.music.126.net/Lj_LlJMv-0hHfbw5q8QIag==/879609302244569.jpg?param=80y80",
          content: "35个专辑",
          name: "July 줄라이"
        }
      ],
      activeplaylistid: 0,
      songids: "",
      mineplaylistSong: []
    };
  },
  props: {
    userinfo: Object
  },
  computed: {
    username: function() {
      return this.userinfo.username;
    },
    trackIds: function() {
      return this.playlistdetail.trackIds;
    }
  },
  methods: {
    // 获取用户歌单
    getuserplaylist() {
      this.$axios
        .get("/user/playlist", {
          params: {
            uid: 1611107228
          }
        })
        .then(res => {
          this.collectplaylist = res.data.playlist;
          this.activeplaylistid = this.collectplaylist[
            this.collectplaylist.length - 1
          ].id;
          window.localStorage.setItem(
            "usercollectplaylist",
            JSON.stringify({
              val: res.data.playlist
            })
          );
        });
    },
    // 检查用户歌单是否已经存到本地
    checkuserplaylist() {
      let checkplaylist = JSON.parse(
        window.localStorage.getItem("usercollectplaylist")
      );
      if (checkplaylist) {
        this.collectplaylist = checkplaylist.val;
        this.activeplaylistid = this.collectplaylist[
          this.collectplaylist.length - 1
        ].id;
      } else {
        this.getuserplaylist();
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getmineplaylist() {
      this.axios
        .get("/playlist/detail", {
          params: {
            id: this.activeplaylistid
          }
        })
        .then(res => {
          //   console.log(res);
          this.playlistdetail = res.data.playlist;
          window.localStorage.setItem(
            "mineplaylist-" + this.id,
            JSON.stringify({
              val: res.data.playlist
            })
          );
          // 获取ids
          this.getplaylistsongids();
        })
        .catch(error => {
          console.log(this.id);
          console.log(error, "访问失败");
        });
    },
    checklocalmineplay() {
      let checkplaylist = JSON.parse(
        window.localStorage.getItem("mineplaylist-" + this.activeplaylistid)
      );
      if (checkplaylist) {
        this.activeplaylistid = checkplaylist.val;
        // 获取ids
        this.getplaylistsongids();
      } else {
        this.getmineplaylist();
      }
    },
    // 获取歌单里面的id列表
    getplaylistsongids() {
      let arr = [];
      this.trackIds.map(item => {
        arr.push(item.id);
      });
      this.songids = arr.join(",");
      this.getPlaylistSong();
    },
    // 获取歌单里面的歌曲详情
    getPlaylistSong() {
      this.$axios
        .get("/song/detail?ids=" + this.songids)
        .then(res => {
          // console.log(res.data.songs[100]);
          this.mineplaylistSong = res.data.songs;
          window.localStorage.setItem(
            "playlistSong" + this.id,
            JSON.stringify({
              val: res.data.songs
            })
          );
        })
        .catch(error => {
          console.log("访问失败", error);
        });
    }
  },
  watch: {
    activeplaylistid: function() {
      this.checklocalmineplay();
      // this.getPlaylistSong();
    }
  },
  created() {
    this.checkuserplaylist();
  }
};
</script>

<style lang="less">
.mymusicpage {
  border-top: 5px solid #c8ebdf;
  background: #f3f8f6;
  .unlogincontent {
    margin: 0px 10%;
    border-left: 1px solid #c8ebdf;
    border-right: 1px solid #c8ebdf;
    padding: 40px;
    height: 700px;
    display: flex;
    background: #ffffff;
    padding-top: 70px;
    .bg {
      width: 470px;
      height: 270px;
      background: url("../assets/unloginbg.png") no-repeat;
      margin-left: 80px;
    }
    .jiujiu {
      margin-left: 20px;
      position: relative;
      top: 30px;
      h2 {
        color: #333;
        font-size: 30px;
        font-family: "楷体";
        margin-bottom: 20px;
      }
      p {
        width: 250px;
        color: #666;
        font-family: "楷体";
        font-size: 18px;
        line-height: 30px;
      }
      .unloginimgcontent {
        img {
          width: 20px;
          margin-left: 10px;
          vertical-align: bottom;
        }
        .bigphone {
          width: 30px;
        }
        .compute {
          width: 50px;
        }
        .tv {
          width: 60px;
          margin-left: 15px;
          position: relative;
          top: 8px;
        }
      }
      .tologin {
        margin-top: 25px;
        button {
          padding: 10px 50px;
          color: #fff;
          background: #42b983;
          border: none;
          border-radius: 5px;
          margin-left: 40px;
          font-size: 16px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
  .logincontent {
    margin: 0px 10%;
    border-left: 1px solid #c8ebdf;
    border-right: 1px solid #c8ebdf;
    display: flex;
    .loginleft {
      border-right: 1px solid #c8ebdf;
      padding: 80px 0px;
      background: #f3f8f6;
      flex-basis: 25%;
      .bigul {
        .activeli {
          background: #e4f5ef;
        }
        li {
          padding: 10px 20px;
          cursor: pointer;
          h2 {
            font-size: 14px;
            color: #333;
            font-family: "黑体";
            font-weight: 500;
            margin-left: 15px;
          }
        }
        .collectplaylist {
          position: relative;
          overflow: hidden;
          height: auto;
          h2 {
            .listtitle {
              position: absolute;
              top: 15px;
              left: 20px;
              width: 15px;
            }
            span {
              font-size: 8px;
              border: 1px solid #666;
              color: #333;
              border-radius: 50%;
              position: relative;
              top: -8px;
              left: -5px;
              display: inline-block;
              width: 10px;
              height: 10px;
              line-height: 8px;
              text-align: center;
            }
            z-index: 6;
            padding: 5px 0px;
            button {
              font-size: 12px;
              position: absolute;
              top: 12px;
              right: 15px;
              padding: 1px 5px;
              border-radius: 5px;
              color: #fff;
              cursor: pointer;
              border: none;
              outline: none;
              background: linear-gradient(to bottom, #42b983, #68c79c);
            }
          }
          .collectlist {
            position: relative;
            top: 0px;
            left: 0px;
            font-size: 12px;
            // background: #e4f5ef;
            width: 100%;
            z-index: 1;
            padding-top: 20px;
            li {
              padding: 10px 10px;
            }
          }
        }
      }
    }
    .loginright {
      flex-basis: 80%;
      overflow-y: scroll;
      height: 500px;
      &::-webkit-scrollbar {
        display: none;
      }
      background: #fff;
      .loginrightone {
        padding: 40px;
        height: 700px;
      }
    }
  }
}
</style>
