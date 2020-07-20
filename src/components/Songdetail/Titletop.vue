<template>
  <div class="songdetailtoppage" v-if="song.al">
    <div class="left">
      <img :src="song.al.picUrl" class="picurl" />
      <div class="mask"></div>
      <div class="link">
        <img src="../../assets/music.svg" alt />
        生成外部链接
      </div>
    </div>

    <div class="right">
      <h2>
        <span>单曲</span>
        {{song.name}}
      </h2>
      <div class="creator" v-if="song.ar">
        歌手:
        <span>{{song.ar[0].name}}</span>
      </div>
      <div class="creator">
        所属专辑
        <span>{{song.al.name}}</span>
      </div>
      <div class="toprightbot">
        <span class="onespan" @click.self="$emit('translate-song', song.id)">
          <img src="../../assets/playaudio.svg" />
          播放
        </span>
        <span class="onespan twospan">
          <img src="../../assets/add2.svg" />
        </span>
        <el-button type="text">
          <img src="../../assets/addsong4.svg" />
          <span>收藏</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/share3.svg" />
          <span>分享</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/download.svg" />
          <span>下载</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/news.svg" />
          <span>({{ changecount(comment)}})</span>
        </el-button>
      </div>
      <div class="Lyric">
        <ul :class="{ show: showhidden }">
          <li v-for="(item,index) in parsedLyric" :key="index">{{item.text}}</li>
        </ul>
        <div class="more">
          <div class="packup" v-if="!showhidden" @click="showhidden = true">
            收起
            <img src="../../assets/packup.svg" />
          </div>
          <div class="packdown" v-if="showhidden" @click="showhidden = false">
            展开
            <img src="../../assets/packdown.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    psong: Object,
    pcomment: Number,
    pLyric: String
  },
  data: function() {
    return {
      showhidden: true
    };
  },
  methods: {
    // 歌词的加工
    processlyric(text) {
      // console.log(text);
      var x = text;
      if (text != undefined) {
        x = text.replace(/\[.*:.*\]/, "");
      }
      return x;
    },
    changecount(count) {
      return count > 10000 ? (count / 10000).toFixed(0) + "万" : count;
    }
  },
  computed: {
    parsedLyric: function() {
      if (this.Lyric) {
        return this.Lyric.split("\n").map(item => {
          // console.log(item);
          var regex = /\d{2}:\d{2}\.\d+/i;
          if (item.search(regex) !== -1) {
            var time = item.match(regex)[0];
            var m = time.substr(0, 2);
            var s = time.substr(3, 2);
            var n = time.substr(5);
            return {
              time: Number(m) * 60 + Number(s) + Number(n),
              text: item.substr(11) || "---------"
            };
          } else {
            return {};
          }
        });
      } else {
        return [{ time: 0, text: "暂时没有歌词" }];
      }
    },
    song: function() {
      return this.psong;
    },
    comment: function() {
      return this.pcomment;
    },
    Lyric: function() {
      return this.pLyric;
    }
  }
};
</script>

<style lang="less" scoped>
.songdetailtoppage {
  display: flex;
  padding-bottom: 40px;
  .left {
    width: 198px;
    height: 198px;
    position: relative;
    padding: 3px;
    text-align: center;
    .mask {
      position: absolute;
      background: url("../../assets/platebg.png");
      width: 205px;
      height: 204px;
      top: -4px;
      left: -4px;
      border-radius: 50%;
      background-position: -140px -580px;
    }
    .picurl {
      width: 131px;
      height: 131px;
      margin: 31px;
    }
    .link {
      position: absolute;
      top: 230px;
      font-size: 12px;
      text-decoration: underline;
      left: 50px;
      color: #0c73c2;
      img {
        width: 15px;
        vertical-align: middle;
      }
    }
  }
  .right {
    padding-left: 30px;
    h2 {
      font-size: 20px;
      color: #333;
      margin-bottom: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      width: 350px;
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
        top: -1px;
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
      font-size: 12px;
      color: #999;
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
        }
        font-size: 12px;
        background: #67c79c;
        line-height: 32px;
        padding: 0px 5px;
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
          margin-right: 5px;
        }
      }
      .twospan {
        padding: 0px 5px;
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
    .Lyric {
      width: 100%;
      margin-top: 30px;
      height: auto;
      line-height: 23px;
      font-size: 12px;
      color: #333;
      font-family: Arial, Helvetica, sans-serif;
      white-space: normal;
      ul.show {
        height: 276px;
        overflow: hidden;
      }
      .more {
        margin-top: 10px;
        color: #0c73c2;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        img {
          width: 15px;
          vertical-align: middle;
          margin-left: 2px;
        }
      }
    }
  }
}
</style>
