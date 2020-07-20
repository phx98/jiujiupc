<template>
  <div id="app">
    <HomeLink
      :username="userinfo.username"
      :homelinklogin="homelinklogin"
      @appclose-login="homelinklogin = false"
      @translate-song="(songid = $event), checkgetsongdetail()"
    ></HomeLink>
    <keep-alive>
      <router-view
        @send-login="tologin"
        :userinfo="userinfo"
        @translate-song="(songid = $event), checkgetsongdetail()"
        :song="songdetails"
        :currentLyric="currentLyric"
        :songcomment="songcomment"
        @translate-defaultplay="changedefaultplay($event)"
        @add-defaultplay="adddefaultplay($event)"
      ></router-view>
    </keep-alive>
    <HomeBot></HomeBot>
    <Playbar
      :song="songdetails"
      :defaultPlay="defaultPlayList"
      @translate-song="(songid = $event), checkgetsongdetail()"
      :currentLyric="currentLyric"
    ></Playbar>
  </div>
</template>
<script>
import HomeLink from "@/components/HomeLink";
import HomeBot from "@/components/HomeBot";
import Playbar from "@/components/Playbar";
export default {
  components: {
    HomeLink,
    Playbar,
    HomeBot
  },
  data: function() {
    return {
      loginuid: Number,
      userinfo: {
        username: "",
        password: ""
      },
      homelinklogin: false,
      songid: 535517304,
      songdetails: {},
      currentLyric: "",
      songcomment: {},
      defaultPlayList: [
        {
          id: 1446522140,
          name: "最好的幸运(翻自 李凯馨)",
          ar: [
            {
              name: "拾三叁",
              picUrl:
                "http://p2.music.126.net/eWM25ErjeQhar6VKtt3vgQ==/109951165015331223.jpg?param=130y130"
            }
          ]
        },
        {
          id: 1398850429,
          name: "夜的钢琴曲5",
          ar: [
            {
              name: "文武贝",
              picUrl:
                "http://p2.music.126.net/GNKtRK8w7edPw3jAsavL2A==/5980243743832365.jpg?param=130y130"
            }
          ]
        },
        {
          id: 393685,
          name: "故乡的原风景",
          ar: [
            {
              name: "宗次郎",
              picUrl:
                "http://p1.music.126.net/qHKvdeYzTqIOxcGKnrfaPQ==/72567767449767.jpg?param=130y130"
            }
          ]
        }
      ]
    };
  },
  methods: {
    getlogin() {
      this.axios
        .get("/login/cellphone", {
          params: {
            phone: "18218437099",
            password: "PHx983232"
          },
          xhrFields: {
            withCredentials: true
          }
        })
        .then(res => {
          this.loginuid = res.data.account.id;
          window.localStorage.setItem(
            "loginmine",
            JSON.stringify({
              val: res.data.account
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checklocalloginmine() {
      let checkloginmine = JSON.parse(window.localStorage.getItem("loginmine"));
      if (checkloginmine) {
        this.loginuid = checkloginmine.val.id;
      } else {
        this.getlogin();
      }
    },
    tologin() {
      this.homelinklogin = true;
    },
    // 获取歌曲详情
    getsongdetail() {
      this.axios
        .get("/song/detail", {
          params: {
            ids: this.songid
          }
        })
        .then(response => {
          this.songdetails = response.data.songs[0];
          window.localStorage.setItem(
            this.songid + "details",
            JSON.stringify({
              val: this.songdetails
            })
          );
          let isExist = this.defaultPlayList.some(item => {
            return item.id == this.songid;
          });
          if (!isExist) this.defaultPlayList.push(this.songdetails);
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
        this.songdetails = cacheSongdetail.val;
        let isExist = this.defaultPlayList.some(item => {
          return item.id == this.songid;
        });
        // console.log(isExist);
        if (!isExist) this.defaultPlayList.push(this.songdetails);
      } else {
        this.getsongdetail();
      }
    },
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
    },
    // 删除歌曲
    deleteplaylist(id) {
      let isExist = this.defaultPlayList.some((item, index) => {
        if (item.id == id) {
          return index;
        }
      });
      // console.log(isExist);
      this.defaultPlayList.splice(isExist, 1);
      if (this.songid == id) {
        console.log("此时删除的就是正在播放的歌");

        if (this.defaultPlayList[isExist] == undefined) {
          isExist = 0;
          if (this.defaultPlayList[0] == undefined) {
            this.$router.go(0);
          }
        }
        this.songid = this.defaultPlayList[isExist].id;
      }
    },
    // 播放歌单
    changedefaultplay(list) {
      let Issong = true;
      for (let key in list[0]) {
        if (key == "album") {
          Issong = false;
          break;
        }
      }
      if (!Issong) {
        let newArr = [];
        let key = ["al", "alia", "ar", "dt", "id", "name"];
        let oldkey = ["album", "alias", "artists", "duration", "id", "name"];
        list.forEach(item => {
          let newObj = {};
          for (var i = 0; i < key.length; i++) {
            newObj[key[i]] = item[oldkey[i]];
          }
          newArr.push(newObj);
        });
        this.defaultPlayList = newArr;
      } else {
        this.defaultPlayList = list;
      }
      this.songid = this.defaultPlayList[0].id;
      this.checkgetsongdetail();
    },
    adddefaultplay(song) {
      let Issong = true;
      for (let key in song) {
        if (key == "album") {
          Issong = false;
          break;
        }
      }
      if (!Issong) {
        let newObj = {};
        let key = ["al", "alia", "ar", "dt", "id", "name"];
        let oldkey = ["album", "alias", "artists", "duration", "id", "name"];
        for (var i = 0; i < key.length; i++) {
          newObj[key[i]] = song[oldkey[i]];
        }
        this.defaultPlayList.push(newObj);
      } else {
        this.defaultPlayList.push(song);
      }
    }
  },
  watch: {
    songid: function() {
      this.checkgetsongdetail();
      this.getLyric();
      this.checkcomment();
    }
  },
  created() {
    this.checklocalloginmine();
    this.checkgetsongdetail();
    this.getLyric();
    this.checkcomment();
    let cacheLogin = JSON.parse(window.localStorage.getItem("login"));
    if (cacheLogin) {
      this.userinfo = cacheLogin.val;
    }
  }
};
</script>
<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
}
#app {
  // height: 100%;
}
</style>
