<template>
  <div class="playdetailtoppage" v-if="playlistdata">
    <div class="left">
      <img :src="playlistdata.coverImgUrl" class="picurl" />
      <div class="mask"></div>
    </div>
    <div class="right">
      <h2>
        <span>歌单</span>
        {{playlistdata.name}}
      </h2>
      <div class="creator" v-if="playlistdata.creator">
        <img :src="playlistdata.creator.avatarUrl" alt />
        <span>{{ playlistdata.creator.nickname }}</span>
        <p>{{changetime(playlistdata.createTime)}} 创建</p>
      </div>
      <div class="toprightbot">
        <span class="onespan">
          <img src="../../assets/playaudio.svg" />
          播放
        </span>
        <span class="twospan onespan">
          <img src="../../assets/add2.svg" />
        </span>
        <el-button type="text">
          <img src="../../assets/addsong4.svg" />
          <span>({{changecount(playlistdata.subscribedCount)}})</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/share3.svg" />
          <span>({{changecount(playlistdata.shareCount)}})</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/download.svg" />
          <span>下载</span>
        </el-button>
        <el-button type="text">
          <img src="../../assets/news.svg" />
          <span>({{changecount(playlistdata.commentCount)}})</span>
        </el-button>
      </div>
      <div class="tag">
        标签:
        <span v-for="(item,index) in playlistdata.tags" :key="index">{{item}}</span>
      </div>
      <div class="description">
        <p>{{playlistdata.description}}</p>
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
    playlistdata: Object,
    pcomment: Number
  },
  data: function() {
    return {
      showhidden: true
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
    changecount(count) {
      return count > 10000 ? (count / 10000).toFixed(0) + "万" : count;
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.playdetailtoppage {
  display: flex;
  padding-bottom: 40px;
  justify-content: space-between;
  .left {
    width: 200px;
    height: 200px;
    position: relative;
    text-align: center;
    .mask {
      position: absolute;
      background: url("../../assets/platebg.png");
      width: 208px;
      height: 208px;
      top: -4px;
      left: -4px;
      background-position: 0px -1285px;
    }
    .picurl {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex-basis: 65%;
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
          margin-right: 10px;
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
    .tag {
      margin-top: 20px;
      font-size: 12px;
      color: #666;
      span {
        margin-left: 10px;
        padding: 2px 8px;
        border: 1px solid #c8ebdf;
        background: #f3f8f6;
        border-radius: 10px;
      }
    }
    .description {
      width: 100%;
      margin-top: 30px;
      height: auto;
      line-height: 18px;
      font-size: 12px;
      color: #333;
      font-family: Arial, Helvetica, sans-serif;
      white-space: normal;
      ul.show {
        height: 72px;
        overflow: hidden;
      }
      .more {
        margin-top: 10px;
        color: #0c73c2;
        text-align: right;
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
