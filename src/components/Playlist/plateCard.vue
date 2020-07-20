<template>
  <li class="plateCard">
    <div class="thumb" @click="toplaylistdetail">
      <img :src="item.coverImgUrl" />
      <span>
        <div class="thumbspanleft">
          <img src="../../assets/headset.svg" />
          {{changecount(item.playCount)}}
        </div>
        <img
          src="../../assets/playaudio2.svg"
          title="播放"
          class="playaudio"
          v-show="!showplayaudio"
          @mouseover="showplayaudio = true"
        />
        <img
          src="../../assets/playaudio.svg"
          title="播放"
          class="playaudio"
          v-show="showplayaudio"
          @mouseout="showplayaudio = false"
        />
      </span>
      <div class="masktwo"></div>
    </div>
    <h4 :title="item.name">{{ item.name }}</h4>
    <p :title="item.creator.nickname">by{{item.creator.nickname}}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  },
  data: function() {
    return {
      showplayaudio: false
    };
  },
  methods: {
    changecount(num) {
      if (num / 100000000 > 1) {
        let count = (num / 100000000).toFixed(1) + "亿";
        return count;
      } else if (num / 10000 > 1) {
        let count = (num / 10000).toFixed(1) + "万";
        return count;
      } else {
        let count = num;
        return count;
      }
    },
    toplaylistdetail() {
      this.$router.push({
        path: `/Playlistdetail?id=${this.item.id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.plateCard {
  list-style: none;
  .thumb {
    position: relative;
    width: 132px;
    height: 132px;
    span {
      position: absolute;
      left: 0px;
      bottom: 0px;
      left: 0;
      height: 32px;
      padding: 4px;
      width: 130px;
      display: inline-block;
      font-size: 12px;
      color: #ccc;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      div {
        flex-basis: 70%;
        img {
          width: 12px;
          position: relative;
          top: -1px;
          cursor: default;
        }
        margin-left: 10px;
      }
      img {
        width: 16px;
        height: auto;
        border: none;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    img {
      cursor: pointer;
      width: 130px;
      height: 130px;
      border: 1px solid #999;
    }
    .masktwo {
      background: url("../../assets/platebg.png");
      width: 132px;
      height: 132px;
      background-position: 0 0px;
      top: 0;
      left: 0;
      cursor: pointer;
      position: absolute;
      z-index: 4;
    }
  }
  h4 {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    width: 130px;
    cursor: pointer;
    margin-top: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    font-size: 12px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
