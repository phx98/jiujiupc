<template>
  <div class="homepage">
    <div class="topnav">
      <ul>
        <li>
          <router-link to="/Home/Recommend">
            <span>推荐</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Home/Rank">
            <span>排行榜</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Home/Anchor">
            <span>主播电台</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Home/Singer">
            <span>歌手</span>
          </router-link>
        </li>
        <li>
          <router-link to="/Home/Newdisc">
            <span>新碟上架</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div>
      <router-view
        @translate-song="$emit('translate-song', $event)"
        :userinfo="userinfo"
        @translate-defaultplay="$emit('translate-defaultplay', $event)"
        @add-defaultplay="$emit('add-defaultplay', $event)"
      ></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  },
  props: {
    userinfo: Object
  }
};
</script>

<style lang="less" scoped>
.homepage {
  //   border-top: 5px solid #c8ebdf;
  .topnav {
    ul {
      padding-left: 20%;
      height: 35px;
      background: #c8ebdf;
      display: flex;
      li {
        height: 35px;
        text-align: center;
        a {
          height: 35px;
          padding: 5px 35px;
          font-size: 12px;
          line-height: 25px;
          display: inline-block;
          color: #2b9371;
          text-decoration: none;
          span {
            padding: 2px 10px;
            border-radius: 10px;
          }
        }
        .active {
          color: #fff;
          span {
            background: linear-gradient(to top, #248867, #43be95);
          }
        }

        &:hover {
          a {
            color: #fff;
            span {
              background: linear-gradient(to top, #248867, #43be95);
            }
          }
        }
      }
    }
  }
}
</style>
