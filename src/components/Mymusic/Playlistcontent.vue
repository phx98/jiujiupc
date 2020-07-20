<template>
  <div class="playlistvue">
    <div class="playlisttop">
      <div class="left">
        <img :src="playlistdetail.coverImgUrl" alt />
        <span class="mask"></span>
      </div>
      <div class="right">
        <h2>
          <span>歌单</span>
          {{playlistdetail.name}}
        </h2>
        <div class="creator" v-if="playlistdetail.creator">
          <img :src="playlistdetail.creator.avatarUrl" alt />
          <span>{{ playlistdetail.creator.nickname }}</span>
          <p>{{changetime(playlistdetail.createTime)}} 创建</p>
        </div>
        <div class="toprightbot">
          <span class="onespan" @click.stop="$emit('translate-defaultplay', mineplaylistSong)">
            <img src="../../assets/playaudio.svg" />
            播放
          </span>
          <span class="onespan">
            <img src="../../assets/add2.svg" />
          </span>
          <el-button type="text">
            <img src="../../assets/addsong4.svg" />
            <span>({{playlistdetail.subscribedCount}})</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/share3.svg" />
            <span>({{playlistdetail.shareCount}})</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/download.svg" />
            <span>下载</span>
          </el-button>
          <el-button type="text">
            <img src="../../assets/news.svg" />
            <span>({{playlistdetail.commentCount}})</span>
          </el-button>
        </div>
      </div>
    </div>
    <div class="playlistcontent">
      <div class="contenttop">
        歌曲列表
        <span>{{playlistdetail.trackCount}}首歌</span>
        <p>
          播放:
          <span>{{playlistdetail.playCount}}</span>次
        </p>
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
                src="../../assets/playaudio5.svg"
                class="playimg"
                v-show="!(showindex == i + 1)"
                @mouseenter.self="showindex = i + 1"
              />
              <img
                src="../../assets/playaudio6.svg"
                class="playimg"
                v-show="showindex == i + 1"
                @mouseout="showindex = 0"
                @click.stop="$emit('translate-song', item.id)"
              />
              <span>{{ item.name }}</span>
            </td>
            <td class="time" v-show="!(showplayaudio == i + 1)">{{ changeduration(item.dt) }}</td>
            <td class="time" v-show="showplayaudio == i + 1">
              <img src="../../assets/add.svg" @click.stop="$emit('add-defaultplay', item)" />
              <img src="../../assets/addsong3.svg" />
              <img src="../../assets/share3.svg" />
              <img src="../../assets/download.svg" />
            </td>
            <td class="singer">{{ item.ar[0].name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    playlistdetail: Object,
    mineplaylistSong: Array
  },
  data: function() {
    return {
      showplayaudio: 0,
      showindex: 0
    };
  },
  methods: {
    changetime(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let mouth = date.getMonth();
      let day = date.getDay();
      return `${year}-${mouth}-${day}`;
    },
    changeduration(time) {
      if (time > 10000) {
        time = (time / 1000).toFixed(0);
      }
      var minute = (time / 60).toFixed(0);
      minute = minute < 10 ? "0" + minute : minute;
      var second = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      return minute + ":" + second;
    }
  }
};
</script>

<style lang="less">
.playlistvue {
  .playlisttop {
    display: flex;
    padding: 40px;
    .left {
      width: 208px;
      height: 208px;
      position: relative;
      border: 1px solid #dbf2ea;
      padding: 3px;
      img {
        width: 200px;
        height: 200px;
      }
    }
    .right {
      margin-left: 30px;
      h2 {
        font-size: 20px;
        color: #333;
        span {
          display: inline-block;
          height: 24px;
          padding: 0px 10px;
          background: #42b983;
          font-size: 12px;
          position: relative;
          color: #fff;
          line-height: 24px;
          margin-right: 20px;
          &::before {
            content: "";
            border: transparent solid 12px;
            border-left: 12px solid #42b983;
            position: absolute;
            right: -24px;
            width: 0px;
            height: 0px;
            display: inline-block;
            top: 0px;
          }
          &::after {
            content: "";
            display: inline-block;
            width: 4px;
            height: 4px;
            position: absolute;
            right: -2px;
            background: #fff;
            border-radius: 50%;
            top: 10px;
          }
        }
      }
      .creator {
        margin-top: 10px;
        display: flex;
        align-items: center;
        img {
          width: 35px;
        }
        span {
          font-size: 12px;
          margin-left: 10px;
          color: #0c73c2;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          margin-left: 15px;
          color: #999;
          font-size: 12px;
        }
      }
      .toprightbot {
        margin-top: 20px;
        display: flex;
        .onespan {
          img {
            width: 18px;
            vertical-align: middle;
            cursor: pointer;
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
  .playlistcontent {
    .contenttop {
      display: flex;
      padding: 10px 0px 10px 30px;
      border-bottom: 2px solid #42b983;
      font-size: 20px;
      color: #333;
      align-items: center;
      & > span {
        color: #666;
        font-size: 12px;
        margin-left: 15px;
        flex-basis: calc(100% - 200px);
        position: relative;
        top: 3px;
      }
      p {
        font-size: 12px;
        color: #666;
        span {
          //   margin-left: 5px;
          color: #c20c0c;
          font-weight: 600;
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
</style>
