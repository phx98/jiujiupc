<template>
  <div class="playlistdetailricard" v-if="simiplaylist">
    <div class="top">相似歌单</div>
    <ul class="simisonglist">
      <li
        v-for="(item,index) in simiplaylist"
        :key="'simi-'+index"
        :item="item"
        @click="toplaylist(item.id)"
      >
        <div class="rli-left">
          <img :src="item.coverImgUrl" alt />
        </div>
        <div class="rli-right">
          <h2>{{item.name}}</h2>
          <p>by {{item.creator.nickname}}</p>
        </div>
      </li>
    </ul>
    <div class="top">玖玖音乐多端下载</div>
    <div class="ri-bot"></div>
    <p class="lastp">同步歌单，随时畅听320k好音乐</p>
  </div>
</template>

<script>
export default {
  props: {
    simiplaylist: Array
  },
  methods: {
    toplaylist(id) {
      this.$router.push({
        path: `/Playlistdetail?id=${id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.playlistdetailricard {
  padding: 20px 40px 40px 30px;
  .top {
    font-size: 12px;
    color: #333;
    font-weight: 600;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }
  .simisonglist {
    padding-top: 20px 0px;
    li {
      display: flex;
      padding: 10px 0px;
      align-items: center;
      .rli-left {
        img {
          width: 50px;
          height: 50px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
      .rli-right {
        flex-basis: calc(100% - 70px);
        width: calc(100% - 70px);
        h2 {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          width: 100%;
          font-size: 14px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        p {
          margin-top: 10px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          color: #666;
          width: 100%;
          font-size: 12px;
        }
      }
    }
  }
  .ri-bot {
    margin-top: 20px;
    height: 65px;
    margin-bottom: 10px;
    background: url("../../assets/threedowloadbg.png") no-repeat;
    background-position: 0 -392px;
  }
  .lastp {
    font-size: 12px;
    color: #999;
  }
}
</style>
