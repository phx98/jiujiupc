<template>
  <div class="playlistdetailpage" v-if="playlistdata">
    <div class="playlistleft">
      <Title :playlistdata="playlistdata" :pcomment="playlistcomment.total"></Title>
      <div class="leftcontent">
        <div class="leftcontentitle">
          <h2>
            歌曲列表
            <span class="tracklenght">{{playlistdata.trackCount}}首歌</span>
          </h2>

          <div class="link">
            <img src="../assets/music.svg" />
            生成外部链接
          </div>
          <div class="playingcount">
            播放:
            <span>{{playlistdata.playCount}}</span>
            次
          </div>
        </div>
        <table class="tablecontent">
          <thead>
            <tr>
              <th class="one"></th>
              <th class="title">标题</th>
              <th class="time">时长</th>
              <th class="singer">歌手</th>
            </tr>
          </thead>
          <tbody v-if="mineplaylistSong">
            <tr
              v-for="(item, i) in mineplaylistSong"
              :key="'track-' + i"
              @mouseenter="showplayaudio = i + 1"
              @mouseleave="showplayaudio = 0"
            >
              <td class="one">{{ i + 1 }}</td>
              <td class="title">
                <img
                  src="../assets/playaudio5.svg"
                  class="playimg"
                  v-show="!(showindex == i + 1)"
                  @mouseenter.self="showindex = i + 1"
                />
                <img
                  src="../assets/playaudio6.svg"
                  class="playimg"
                  v-show="showindex == i + 1"
                  @mouseout="showindex = 0"
                  @click.stop="$emit('translate-song', item.id)"
                />
                <span @click.stop="tosongdetail(item.id)">{{ item.name }}</span>
              </td>
              <td class="time" v-show="!(showplayaudio == i + 1)">{{ changeduration(item.dt) }}</td>
              <td class="time" v-show="showplayaudio == i + 1">
                <img src="../assets/add.svg" />
                <img src="../assets/addsong3.svg" />
                <img src="../assets/share3.svg" />
                <img src="../assets/download.svg" />
              </td>
              <td class="singer">{{ item.ar[0].name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="playlistright">
      <Card :simiplaylist="simiplaylist"></Card>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Playlistdetail/Lefttop";
import Card from "@/components/Playlistdetail/RightCard";
export default {
  components: {
    Title,
    Card
  },
  data: function() {
    return {
      playlistid: 0,
      playlistdata: {},
      playlistcomment: {},
      showplayaudio: 0,
      showindex: 0,
      songids: "",
      mineplaylistSong: [],
      simiplaylist: []
    };
  },
  computed: {
    trackIds: function() {
      return this.playlistdata.trackIds;
    }
  },
  methods: {
    //获取歌单详情
    getPlaylist() {
      this.axios
        .get("/playlist/detail", {
          params: {
            id: this.playlistid
          }
        })
        .then(response => {
          // 判断拿取数据是否正确，反爬虫
          this.playlistdata = response.data.playlist;
          // 放入本地存储数据里面，设置过期时间
          window.localStorage.setItem(
            "pl-" + this.playlistid,
            JSON.stringify({
              val: this.playlistdata,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
          // 获取ids
          this.getplaylistsongids();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkPlaylist() {
      let cachePlaylist = JSON.parse(
        window.localStorage.getItem("pl-" + this.playlistid)
      );
      // 拿取歌单
      if (cachePlaylist && cachePlaylist.time > Date.now()) {
        this.playlistdata = cachePlaylist.val;
        // 获取ids
        this.getplaylistsongids();
      } else {
        this.getPlaylist();
      }
    },
    // 获取歌单评论
    getplaycomment() {
      this.axios
        .get("/comment/playlist", {
          params: {
            id: this.playlistid
          }
        })
        .then(response => {
          // 判断拿取数据是否正确，反爬虫
          this.playlistcomment = response.data;
          // 放入本地存储数据里面，设置过期时
          window.localStorage.setItem(
            "plcomment-" + this.playlistid,
            JSON.stringify({
              val: this.playlistcomment,
              time: Date.now() + 6 * 60 * 60 * 1000
            })
          );
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkplaycomment() {
      let cachePlaylist = JSON.parse(
        window.localStorage.getItem("plcomment-" + this.playlistid)
      );
      // 拿取歌单
      if (cachePlaylist && cachePlaylist.time > Date.now()) {
        this.playlistcomment = cachePlaylist.val;
      } else {
        this.getplaycomment();
      }
    },
    // 获得歌曲总时长
    changeduration(time) {
      if (time > 10000) {
        time = (time / 1000).toFixed(0);
      }
      var minute = (time / 60).toFixed(0);
      minute = minute < 10 ? "0" + minute : minute;
      var second = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      return minute + ":" + second;
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
    },
    // 获取歌单的相似歌单
    getsimiplaylist() {
      this.axios
        .get("/related/playlist", {
          params: {
            id: this.playlistid
          }
        })
        .then(res => {
          this.simiplaylist = res.data.playlists;
          window.localStorage.setItem(
            "simipl-" + this.playlistid,
            JSON.stringify({
              val: res.data.playlists,
              time: Date.now() + 6 * 60 * 60 * 1000
            })
          );
        });
    },
    checksimiplaylist() {
      let cachesimiPlaylist = JSON.parse(
        window.localStorage.getItem("simipl-" + this.playlistid)
      );
      // 拿取歌单
      if (cachesimiPlaylist && cachesimiPlaylist.time > Date.now()) {
        this.simiplaylist = cachesimiPlaylist.val;
      } else {
        this.getsimiplaylist();
      }
    },
    // 前往歌曲详情
    tosongdetail(id) {
      this.$router.push({
        path: `/Songdetail?id=${id}`
      });
    }
  },
  created() {
    if (this.playlistid != 0) {
      this.checkPlaylist();
    }
  },
  watch: {
    playlistid: function() {
      this.checkPlaylist();
      this.checkplaycomment();
      this.checksimiplaylist();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.playlistid = to.query.id;
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.playlistid = to.query.id;
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style lang="less" scoped>
.playlistdetailpage {
  margin: 0px 10%;
  display: flex;
  border-left: 1px solid #c8ebdf;
  border-right: 1px solid #c8ebdf;
  border-bottom: none;
  .playlistleft {
    flex-basis: 80%;
    padding: 40px;
    border-right: 1px solid #c8ebdf;
    .leftcontent {
      margin-top: 20px;
      .leftcontentitle {
        display: flex;
        color: #333;
        border-bottom: 2px solid #42b983;
        padding-bottom: 10px;
        font-size: 12px;
        align-items: flex-end;
        h2 {
          font-size: 20px;
          flex-basis: 60%;
          span {
            font-size: 12px;
            color: #666;
            margin-left: 20px;
          }
        }

        .link {
          text-decoration: underline;
          color: #0c73c2;
          cursor: pointer;
          img {
            width: 15px;
            vertical-align: middle;
          }
        }
        .playingcount {
          color: #666;
          margin-left: 15px;
          span {
            color: #c20c0c;
          }
        }
      }
      .tablecontent {
        border: 1px solid #c8ebdf;
        width: 100%;
        tr {
          display: flex;
          // background: #f3f8f6;
          background: linear-gradient(to top, #c8ebdf, #f3f8f6);
          font-size: 12px;
          width: 100%;
          font-weight: 500;
          align-items: center;
          th {
            padding: 10px 0px;
            border-right: 1px solid #e0e0e0;
            font-weight: 500;
          }
          .one {
            flex-basis: 10%;
            text-align: center;
            font-size: 14px;
            color: #666;
          }
          .title {
            padding-left: 5px;
            flex-basis: 40%;
          }
          .time {
            padding-left: 5px;
            flex-basis: 15%;
            color: #666;
            img {
              width: 15px;
            }
            img:nth-child(2) {
              margin: 0px 5px;
            }
          }
          .singer {
            padding-left: 5px;
            flex-basis: 35%;
          }
        }
        tbody {
          color: #333;
          tr:nth-child(odd) {
            background: #f3f8f6;
          }
          tr:nth-child(even) {
            background: #fff;
          }
          tr:nth-child(n + 4) {
            padding: 6px 10px;
          }
          tr:nth-child(-n + 3) {
            padding: 10px;
          }
          .title {
            display: flex;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            .blurimg {
              width: 50px;
            }
            .playimg {
              width: 18px;
              margin: 0 15px;
              cursor: pointer;
            }
            span {
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
  .playlistright {
    flex-basis: 30%;
    width: 30%;
    padding: 20px 40px 40px 30px;
  }
}
</style>
