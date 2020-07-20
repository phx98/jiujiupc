<template>
  <li class="plateCard">
    <div class="thumb">
      <img :src="item.blurPicUrl" />
      <span>
        <img src="../../assets/playaudio2.svg" title="播放" />
      </span>
      <div class="mask"></div>
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
    }
    .mask {
      width: 20px;
      height: 100px;
      position: absolute;
      background: url("../../assets/platebg.png") no-repeat;
      background-size: 290px;
      background-position: -100px 62%;
      top: 0px;
      left: 100px;
    }
  }
  h4 {
    font-size: 12px;
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
