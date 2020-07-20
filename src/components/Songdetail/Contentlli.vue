<template>
  <div class="songdetailcontentlivue">
    <div class="left">
      <img :src="item.user.avatarUrl" />
    </div>
    <div class="right">
      <h2>
        <span>{{item.user.nickname}}</span>
        :{{item.content}}
      </h2>
      <div>
        <span class="time">{{changetime(item.time)}}</span>
        <span class="reset">回复</span>
        <span class="zancount">
          <img src="../../assets/zan.svg" alt />
          ({{item.likedCount}})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    changetime(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let mouth = date.getMonth();
      let day = date.getDay();
      return `${year}-${mouth}-${day}`;
    }
  }
};
</script>

<style lang="less" scoped>
.songdetailcontentlivue {
  padding: 15px 0px;
  border-top: 1px dotted #ccc;
  display: flex;
  .left {
    img {
      width: 50px;
      height: 50px;
    }
  }
  .right {
    flex-basis: calc(100% - 55px);
    margin-left: 10px;
    h2 {
      span {
        color: #0c73c2;
      }
    }
    div {
      margin-top: 20px;
      font-size: 12px;
      color: #999;

      .reset {
        float: right;
      }
      .zancount {
        float: right;
        margin-right: 10px;
        padding-right: 10px;
        color: #333;
        &::after {
          content: "";
          border-right: 1px solid #ccc;
          position: relative;
          height: 12px;
          display: inline-block;
          right: -10px;
          top: 1px;
        }
        height: 10px;
        img {
          width: 15px;
          vertical-align: middle;
          position: relative;
          top: -1px;
        }
      }
    }
  }
}
</style>
