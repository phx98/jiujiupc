<template>
  <li class="plateCard">
    <div class="thumb">
      <img :src="item.picUrl" />
      <span>
        <img src="../../assets/playaudio2.svg" title="播放" />
      </span>
      <div class="mask"></div>
      <div class="masktwo"></div>
    </div>
    <h4 :title="item.name">{{item.name}}</h4>
    <p :title="item.artist.name">{{item.artist.name}}</p>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style lang="less" scoped>
.plateCard {
  list-style: none;
  .thumb {
    position: relative;
    span {
      position: absolute;
      right: 5px;
      bottom: 5px;
      display: none;
      img {
        width: 22px;
      }
    }
    &:hover span {
      display: inline-block;
    }
    img {
      cursor: pointer;
      width: 130px;
      height: 130px;
    }
    .mask {
      width: 153px;
      height: 130px;
      position: absolute;
      background: url("../../assets/platebg.png") no-repeat;
      background-position: 0 -845px;
      top: 0px;
      left: 0px;
    }
    .masktwo {
      background: url("../../assets/platebg.png");
      left: 94px;
      width: 28px;
      background-position: 0 -140px;
      right: 10px;
      bottom: 5px;
      cursor: pointer;
    }
  }
  h4 {
    font-size: 14px;
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
