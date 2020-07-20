<template>
  <div class="homebotpage">
    <div class="homebotleft">
      <ul class="homebottop">
        <li>服务条款</li>
        <li>隐私政策</li>
        <li>儿童隐私政策</li>
        <li>版权投诉指引</li>
        <li>意见投诉</li>
      </ul>
      <p>
        网易公司版权所有©1997-2020
        <span>杭州乐读科技有限公司运营：浙网文[2018]3506-263号</span>
      </p>
      <p>
        违法和不良信息举报电话：0571-89853516
        <span>举报邮箱：ncm5990@163.com</span>
      </p>
      <p>
        粤B2-20090191-18
        <span>工业和信息化部备案管理系统网站</span>
      </p>
    </div>
    <div class="homebotright">
      <ul>
        <li>
          <div class="img studio"></div>
          <p>Amped Studio</p>
        </li>
        <li>
          <div class="img user"></div>
          <p>用户认证</p>
        </li>
        <li>
          <div class="img musicer"></div>
          <p>独立音乐人</p>
        </li>
        <li>
          <div class="img reward"></div>
          <p>赞赏</p>
        </li>
        <li>
          <div class="img vedio"></div>
          <p>视频奖励</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.homebotpage {
  height: 173px;
  padding: 30px 10% 0px 10%;
  background: #f3f8f6;
  border-top: 1px solid #c8ebdf;
  font-size: 12px;
  display: flex;
  .homebotleft {
    ul {
      color: #666;
      display: flex;
      padding: 5px 0px;
      align-items: center;
      margin-bottom: 10px;
      li {
        line-height: 12px;
        padding: 0px 20px;
        border-right: 1px solid #666;
        height: 12px;
      }
      li:first-child {
        padding-left: 0px;
      }
    }
    p {
      margin-bottom: 10px;
      span {
        margin-left: 20px;
      }
    }
  }
  .homebotright {
    flex-basis: 50%;
    ul {
      display: flex;
      width: 80%;
      float: right;
      justify-content: center;
      li {
        flex: 1;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .img {
          //   background: skyblue;
          width: 50px;
          height: 50px;
          background: url("../assets/footicon.png") no-repeat;
          background-size: 200%;

          &.studio {
            background-position: -55px -430px;
          }
          &.user {
            background-position: -55px -95px;
          }
          &.musicer {
            background-position: 0 3px;
          }
          &.reward {
            background-position: -55px -45px;
          }
          &.vedio {
            background-position: 0 -95px;
          }
        }
        p {
          flex-basis: 100%;
          color: #666;
          font-size: 10px;
          text-align: center;
        }
      }
    }
  }
}
</style>