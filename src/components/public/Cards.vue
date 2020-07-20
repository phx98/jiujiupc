<template>
  <div class="cardsvue">
    <div class="thumb" @click="$emit('to-playlistdetail', item.id)">
      <img :src="item.picUrl" :title="item.name" />
      <div class="thumb-btn">
        <img src="../../assets/headset.svg" class="headset" />
        <span>{{ playlistcount() }}</span>
        <img src="../../assets/playaudio2.svg" class="playaudio" />
      </div>
    </div>
    <h4 :title="item.name" @click="$emit('to-playlistdetail', item.id)">{{ item.name }}</h4>
    <!-- <p>根据你的口味生成,每天6:00更新</p> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    playlistcount() {
      if (this.item.playCount / 100000000 > 1) {
        this.count = (this.item.playCount / 100000000).toFixed(1) + "亿";
        return this.count;
      } else if (this.item.playCount / 10000 > 1) {
        this.count = (this.item.playCount / 10000).toFixed(1) + "万";
        return this.count;
      } else {
        this.count = this.item.playCount;
        return this.count;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.cardsvue {
  .thumb {
    position: relative;
    border: 1px solid #eee;
    img {
      width: 100%;
      vertical-align: middle;
      filter: brightness(0.9) blur(0.8);
      cursor: pointer;
    }
    .thumb-btn {
      height: 27px;
      display: flex;
      background: rgba(0, 0, 0, 0.6);
      align-items: center;
      font-size: 12px;
      position: absolute;
      bottom: 0;
      width: 100%;
      color: #ccc;
      span {
        flex-basis: 60%;
      }
      .headset {
        width: 12px;
        margin-left: 10px;
        margin-right: 5px;
      }
      .playaudio {
        width: 16px;
      }
    }
  }
  h4 {
    font-size: 14px;
    margin-top: 10px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  p {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
  }
}
</style>