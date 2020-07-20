<template>
  <div class="friendpage">
    <div class="unfriendcontent" v-if="!username">
      <div class="friendbg"></div>
      <div class="jiujiu">
        <h2>关注明星 发现精彩</h2>
        <p>你可以关注明星和好友品味他们的私房歌单 通过他们的动态发现更多精彩音乐</p>
        <div class="tologin">
          <button @click="$emit('send-login')">立即登录</button>
        </div>
      </div>
    </div>
    <div class="friendcontentlogin" v-if="username">
      <div class="contentleft">
        <div class="contenttop">
          动态
          <span>
            <img src="../assets/vlog.svg" />
            发布视频
          </span>
          <span>
            <img src="../assets/write.svg" />
            发动态
          </span>
        </div>
        <div class="wyydt">
          <DT></DT>
        </div>
      </div>
      <div class="contentright">
        <div class="righttop">
          <div class="topone">
            <span>
              <img src="../assets/portrait.png" />
            </span>
            <span class="username">{{username}}</span>
          </div>
          <div class="toptwo">
            <div>
              <h4>0</h4>
              <p>动态</p>
            </div>
            <div>
              <h4>4</h4>
              <p>关注</p>
            </div>
            <div>
              <h4>0</h4>
              <p>粉丝</p>
            </div>
          </div>
        </div>
        <Staruser></Staruser>
      </div>
    </div>
  </div>
</template>

<script>
import Staruser from "@/components/Friend/Friendstar";
import DT from "@/components/Friend/DT";
export default {
  components: {
    Staruser,
    DT
  },
  props: {
    userinfo: Object
  },
  computed: {
    username: function() {
      return this.userinfo.username;
    }
  }
};
</script>

<style lang="less" scoped>
.friendpage {
  border-top: 5px solid #c8ebdf;
  .unfriendcontent {
    margin: 0px 10%;
    border-left: 1px solid #c8ebdf;
    border-right: 1px solid #c8ebdf;
    padding: 40px;
    height: 500px;
    display: flex;
    background: #ffffff;
    padding-top: 20px;
    align-items: center;
    .friendbg {
      background: url("../assets/friendbg.jpg") no-repeat;
      width: 530px;
      height: 380px;
      margin-left: 50px;
    }
    .jiujiu {
      margin-left: 20px;
      position: relative;
      top: 30px;
      h2 {
        color: #333;
        font-size: 30px;
        font-family: "微软雅黑";
        margin-bottom: 20px;
      }
      p {
        width: 250px;
        color: #666;
        font-family: "楷体";
        font-size: 16px;
        line-height: 30px;
      }
      .tologin {
        margin-top: 50px;
        button {
          padding: 10px 50px;
          color: #fff;
          background: #42b983;
          border: none;
          border-radius: 5px;
          margin-left: 40px;
          font-size: 16px;
          outline: none;
          cursor: pointer;
        }
      }
    }
  }
  .friendcontentlogin {
    margin: 0px 10%;
    display: flex;
    height: 700px;
    border-left: 1px solid #c8ebdf;
    border-right: 1px solid #c8ebdf;
    .contentleft {
      flex-basis: 70%;
      padding: 20px 30px;
      .contenttop {
        font-size: 24px;
        color: #333;
        padding-bottom: 5px;
        border-bottom: 2px solid #42b983;
        // background: skyblue;
        span {
          float: right;
          margin-left: 10px;
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 20px;
          border: 1px solid #c8ebdf;
          cursor: pointer;
          img {
            width: 15px;
            vertical-align: middle;
          }
          &:hover {
            background: #f3f8f6;
          }
        }
      }
    }
    .contentright {
      flex-basis: 30%;
      border-left: 1px solid #c8ebdf;
      .righttop {
        padding: 40px 0px 20px 30px;
        background: #f3f8f6;
        border-bottom: 1px solid #c8ebdf;
        .topone {
          span {
            padding: 2px;
            border: 1px solid #c8ebdf;
            display: inline-block;
            width: 74px;
            height: 74px;
            background: #fff;
            img {
              width: 68px;
              vertical-align: top;
            }
          }
          .username {
            margin-left: 10px;
            background: #f3f8f6;
            color: #333;
            font-size: 14px;
            font-weight: 600;
            border: none;
          }
        }
        .toptwo {
          display: flex;
          margin-top: 20px;
          & > div {
            padding: 0px 30px;
            text-align: center;
            border-right: 1px solid #ccc;
            color: #666;
            h4 {
              font-size: 20px;
            }
            p {
              font-size: 12px;
              margin-top: 10px;
            }
          }
          & > div:last-child {
            border: none;
          }
        }
      }
    }
  }
}
</style>
