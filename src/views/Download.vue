<template>
  <div class="downloadpage">
    <div class="contentone content">
      <div class="left">
        <h2>在电脑上听</h2>
        <img src="../assets/khd1.png" />
        <div class="contentonebot">
          <button>下载电脑端</button>
        </div>
      </div>
      <div class="right">
        <h2>在手机上听</h2>
        <img src="../assets/khd2.png" />
        <div class="contentonebot">
          <button>下载手机端</button>
        </div>
      </div>
    </div>
    <div class="content contentwo">
      <div class="left">
        <h1>千万曲库 首首CD音质</h1>
        <p>
          囊括百万无损SQ音乐，你在用手机听歌时，
          也能感受到纤毫毕现的CD音质，更能免费离线收听
        </p>
      </div>
      <div class="right">
        <img src="../assets/khd3.jpg" />
      </div>
    </div>
    <div class="content contenthree">
      <div class="left">
        <img src="../assets/khd4.jpg" />
      </div>
      <div class="right">
        <h1>千位明星 亲自推荐音乐</h1>
        <p>
          韩红，戴佩妮等千位明星已入驻，亲自创建私房歌单，录制独
          家DJ节目，推荐他们心中的好音乐
        </p>
      </div>
    </div>
    <div class="content contentfour">
      <div class="left">
        <h1>社交关系 发现全新音乐</h1>
        <p>
          你可以关注明星、DJ和好友，通过浏览他们的动态、收藏和
          分享，发现更多全新好音乐
        </p>
      </div>
      <div class="right">
        <img src="../assets/khd5.jpg" />
      </div>
    </div>
    <div class="content contentfive">
      <div class="left">
        <img src="../assets/khd6.jpg" />
      </div>
      <div class="right">
        <h1>手机电脑 歌单实时同步</h1>
        <p>
          只要一个帐号，你就可以同步在手机、电脑上创建、收藏
          的歌单，随时随地畅享好音乐
        </p>
      </div>
    </div>
    <div class="content contentsix">
      <div class="left">
        <h1>听歌识曲 助你疯狂猜歌</h1>
        <p>
          歌曲很动听却不知道歌名，歌名在嘴边却想不起来……
          用听歌识曲功能，几秒钟就知道歌名
        </p>
      </div>
      <div class="right">
        <img src="../assets/khd7.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.downloadpage {
  border-top: 5px solid #c8ebdf;
  .content {
    padding: 50px 10%;
    display: flex;
    padding-top: 100px;
    align-items: center;
    h1 {
      font-size: 40px;
      margin-bottom: 10px;
      color: #333;
    }
    p {
      font-size: 16px;
      color: #666;
      line-height: 25px;
    }
    & > div {
      flex-basis: 50%;
    }
    .left {
      padding-right: 80px;
    }
    h2 {
      font-size: 22px;
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }
  }
  .contentone {
    background: linear-gradient(to bottom, #c8ebdf, #42b983);
    .right {
      text-align: right;
      img {
        margin-right: 35px;
      }
      h2 {
        text-align: right;
        margin-right: 100px;
      }
    }

    .left {
      .contentonebot {
        text-align: center;
        position: relative;
        left: -5px;
      }
    }
    img {
      height: 273px;
    }
    button {
      width: 300px;
      height: 65px;
      margin: 0 auto;
      border-radius: 65px;
      background: #fff;
      color: #42b983;
      font-size: 22px;
      text-align: center;
      margin-top: 20px;
      cursor: pointer;
      outline: none;
      border: none;
      &:hover {
        background: #2c9572;
      }
    }
  }
  .contenthree,
  .contentfive {
    background: #f8f8f8;
  }
}
</style>
