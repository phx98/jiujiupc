<template>
  <ul class="singercontentpage">
    <li v-for="(item,index) in list" class="licontent" :key="index" v-show="list">
      <div class="image">
        <img :src="item.img1v1Url" />
        <div class="mask"></div>
      </div>

      <div class="lititle">
        <span>{{ item.name }}</span>
        <img src="../../assets/person.svg" :title="item.name + '的主页'" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data: function() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.singercontentpage {
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  .licontent {
    flex-basis: 20%;
    // padding: 0px 0px 30px 15px;
    padding-bottom: 30px;
    text-align: center;
    .image {
      border: 1px solid #dbf2ea;
      width: 132px;
      height: 132px;
      position: relative;
      .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0;
        background: url("../../assets/platebg.png");
        background-position: 0 -680px;
        cursor: pointer;
      }
    }
    .lititle {
      width: 130px;
      font-size: 12px;
      margin-top: 5px;
      color: #333;
      height: 20px;
      text-align: left;
      line-height: 20px;
      span {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
      img {
        width: 18px;
        float: right;
        vertical-align: middle;
        cursor: pointer;
      }
    }
  }
}
</style>
