<template>
  <div class="rankcontentvue" v-if="songlist">
    <div class="ranktop">
      <div class="topleft">
        <img :src="songlist.coverImgUrl" />
      </div>

      <div class="topright">
        <h2>{{songlist.name}}</h2>
        <p>
          <img src="../../assets/time.svg" />
          最近更新:{{ changetime(songlist.trackUpdateTime) }}
          <span>{{ direction }}</span>
        </p>
        <div class="toprightbot">
          <span class="onespan" @click="$emit('translate-defaultplay',songlist.tracks)">
            <img src="../../assets/playaudio.svg" />
            播放
          </span>
          <span class="onespan">
            <img src="../../assets/add2.svg" />
          </span>
          <el-button type="text">
            <img src="../../assets/addsong4.svg" />
            <span>({{changecount(songlist.subscribedCount)}})</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/share3.svg" />
            <span>({{changecount(songlist.shareCount)}})</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/download.svg" />
            <span>下载</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/news.svg" />
            <span>({{changecount(songlist.commentCount)}})</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="rankcontent">
      <div class="contenttitle">
        <h2>歌曲列表</h2>
        <span class="songcount">{{songlist.trackCount}}首歌</span>
        <div class="contenttitleright">
          播放:
          <span>{{songlist.playCount}}</span>
          次
        </div>
      </div>
      <table class="content">
        <thead>
          <tr>
            <th class="one"></th>
            <th class="title">标题</th>
            <th class="time">时长</th>
            <th class="singer">歌手</th>
          </tr>
        </thead>
        <tbody v-if="songlist.tracks">
          <tr
            v-for="(item, index) in songlist.tracks.slice(0, 3)"
            :key="index"
            @mouseenter="showplayaudio = index + 1"
            @mouseleave="showplayaudio = 0"
          >
            <td class="one">{{ index + 1 }}</td>
            <td class="title">
              <img :src="item.album.blurPicUrl" class="blurimg" />
              <img
                src="../../assets/playaudio5.svg"
                class="playimg"
                v-show="!(showindex == index + 1)"
                @mouseenter.self="showindex = index + 1"
              />

              <img
                src="../../assets/playaudio6.svg"
                class="playimg"
                v-show="showindex == index + 1"
                @mouseout="showindex = 0"
                @click.stop="$emit('translate-song', item.id)"
              />
              <span @click.stop="tosongdetail(item.id)">{{ item.name }}</span>
            </td>
            <td
              class="time"
              v-show="!(showplayaudio == index + 1)"
            >{{ changeduration(item.duration) }}</td>
            <td class="time" v-show="showplayaudio == index + 1">
              <img src="../../assets/add.svg" @click="$emit('add-defaultplay',item)" />
              <img src="../../assets/addsong3.svg" />
              <img src="../../assets/share3.svg" />
              <img src="../../assets/download.svg" />
            </td>
            <td class="singer">{{ item.artists[0].name }}</td>
          </tr>

          <tr
            v-for="(item, i) in songlist.tracks.slice(3)"
            :key="'track-' + i"
            @mouseenter="showplayaudio = i + 4"
            @mouseleave="showplayaudio = 0"
          >
            <td class="one">{{ i + 4 }}</td>
            <td class="title">
              <img
                src="../../assets/playaudio5.svg"
                class="playimg"
                v-show="!(showindex == i + 4)"
                @mouseenter.self="showindex = i + 4"
              />
              <img
                src="../../assets/playaudio6.svg"
                class="playimg"
                v-show="showindex == i + 4"
                @mouseout="showindex = 0"
                @click.stop="$emit('translate-song', item.id)"
              />
              <span @click.stop="tosongdetail(item.id)">{{ item.name }}</span>
            </td>
            <td class="time" v-show="!(showplayaudio == i + 4)">{{ changeduration(item.duration) }}</td>
            <td class="time" v-show="showplayaudio == i + 4">
              <img src="../../assets/add.svg" />
              <img src="../../assets/addsong3.svg" />
              <img src="../../assets/share3.svg" />
              <img src="../../assets/download.svg" />
            </td>
            <td class="singer">{{ item.artists[0].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listid: Number,
    direction: String
  },
  data: function() {
    return {
      songlist: Object,
      showplayaudio: 0,
      showindex: 0
    };
  },
  methods: {
    getsonglist() {
      // https://music.163.com/api/playlist/detail?id=19723756
      const API_PROXY = "https://bird.ioliu.cn/v1/?url=";
      this.$axios
        .get(API_PROXY + this.apilist[0] + "/playlist/detail", {
          params: {
            id: this.listid
          }
        })
        .then(res => {
          this.songlist = res.data.result;
          window.localStorage.setItem(
            "sl" + this.listid,
            JSON.stringify({
              val: res.data.result,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checksonglist() {
      let cachesonglist = JSON.parse(
        window.localStorage.getItem("sl" + this.listid)
      );
      if (cachesonglist && cachesonglist.time > Date.now()) {
        this.songlist = cachesonglist.val;
      } else {
        this.getsonglist();
      }
    },
    changetime(time) {
      let date = new Date(time);
      let mouth = date.getMonth();
      let day = date.getDay();
      return `${mouth}月${day}日`;
    },
    changeduration(time) {
      if (time > 10000) {
        time = (time / 1000).toFixed(0);
      }
      var minute = (time / 60).toFixed(0);
      minute = minute < 10 ? "0" + minute : minute;
      var second = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      return minute + ":" + second;
    },
    tosongdetail(id) {
      this.$router.push({
        path: `/Songdetail?id=${id}`
      });
    },
    changecount(count) {
      return count > 10000 ? (count / 10000).toFixed(0) + "万" : count;
    }
  },
  watch: {
    listid: function() {
      this.checksonglist();
    }
  },
  created() {
    this.checksonglist();
  }
};
</script>

<style lang="less" scoped>
.rankcontentvue {
  padding: 40px;
  .ranktop {
    display: flex;
    align-items: center;
    .topleft {
      width: 152px;
      height: 152px;
      padding: 1px;
      border: 1px solid #dbf2ea;
      img {
        width: 150px;
      }
    }
    .topright {
      margin-left: 20px;
      h2 {
        font-size: 20px;
        font-style: "宋体";
        margin-bottom: 10px;
      }
      p {
        font-size: 12px;
        img {
          width: 13px;
          vertical-align: middle;
        }
        span {
          color: #666;
        }
      }
      .toprightbot {
        margin-top: 20px;
        display: flex;
        .onespan {
          img {
            width: 18px;
            vertical-align: middle;
          }
          font-size: 12px;
          background: #67c79c;
          line-height: 32px;
          padding: 0px 10px;
          color: #fff;
          cursor: pointer;
          &:first-child {
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            border-right: 1px solid #c8ebdf;
          }
          &:nth-child(2) {
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            margin-right: 20px;
          }
        }

        .el-button {
          border: 1px solid #42b983;
          padding: 5px 8px;
          span {
            margin-left: 5px;
            position: relative;
            top: 1px;
          }
          font-size: 12px;
          color: #666;
          img {
            width: 15px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .rankcontent {
    margin-top: 40px;
    .contenttitle {
      display: flex;
      padding-bottom: 5px;
      border-bottom: 2px solid #42b983;
      font-size: 12px;
      color: #666;
      align-items: flex-end;
      .songcount {
        margin-left: 20px;
      }
      h2 {
        font-size: 20px;
        color: #000;
      }
      .contenttitleright {
        margin-left: auto;
        span {
          color: #c20c0c;
          font-weight: bold;
        }
      }
    }
    .content {
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
            cursor: pointer;
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
          span {
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .playimg {
            width: 18px;
            margin: 0 15px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
