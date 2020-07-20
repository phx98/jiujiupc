<template>
  <div class="friendstarvue">
    <div class="top">
      明星用户
      <span>换一批</span>
    </div>
    <ul>
      <li v-for="(item,index) in singeruser" :key="index">
        <img :src="item.url" />
        <div class="mid">
          <h4>{{item.name}}</h4>
          <p>{{item.content}}</p>
        </div>
        <div class="right">
          <button>+ 关注</button>
        </div>
      </li>
    </ul>
    <div class="dot">
      <p>添加微博好友,和他们分享音乐</p>

      <button class="bdwb">
        <img src="../../assets/weibo.svg" />
        绑定新浪微博
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      singeruser: [
        {
          name: "戴佩妮",
          content: "创作型华语女歌手",
          url:
            "http://p1.music.126.net/GnMukOWNujsqVOsUbzqEEQ==/2761973208994063.jpg?param=45y45"
        },
        {
          name: "CJohnny",
          content: "MiC男团成员池约翰",
          url:
            "http://p1.music.126.net/ZiunEuTwf4dDoGNL6hUiow==/7943971511006826.jpg?param=45y45"
        },
        {
          name: "袁弘",
          content: "演员",
          url:
            "http://p1.music.126.net/fd6Ht-roq3m5vfJfgWTd8Q==/5978044720474757.jpg?param=45y45"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.friendstarvue {
  padding: 30px 20px;
  .top {
    font-size: 12px;
    color: #333;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    font-weight: 600;
    span {
      float: right;
      font-weight: 500;
      color: #666;
      font-size: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  ul {
    li {
      padding: 10px 0px;
      font-size: 12px;
      display: flex;
      align-items: center;
      img {
        width: 45px;
      }
      .mid {
        margin-left: 10px;
        flex-basis: 50%;
        h4 {
          color: #333;
        }
        p {
          margin-top: 10px;
          color: #9b9b9b;
        }
      }
      .right {
        button {
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 5px;
          color: #fff;
          cursor: pointer;
          border: none;
          outline: none;
          background: linear-gradient(to bottom, #c8ebdf, #68c79c);
          cursor: pointer;
        }
      }
    }
  }
  .dot {
    font-size: 12px;
    color: #333;
    p {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .bdwb {
      width: 100%;
      text-align: center;
      background: #f3f8f6;
      padding: 5px 0px;
      border-radius: 5px;
      border: 1px #ccc solid;
      outline: none;
      img {
        width: 15px;
        vertical-align: middle;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>
