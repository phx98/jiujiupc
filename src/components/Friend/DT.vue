<template>
  <div class="dtvue">
    <div class="top">
      <img
        src="http://p1.music.126.net/KxePid7qTvt6V2iYVy-rYQ==/109951165050882728.jpg?param=45y45"
      />
      <div class="dttopright">
        <p>
          网易云音乐
          <img src="../../assets/vip.svg" />
        </p>
        <span>18:59</span>
      </div>
    </div>
    <div class="midcontent">
      <p>
        <span>@惘闻乐队</span> 彩排照奉上！
      </p>
      <p>
        <span>#点亮现场行动##惘闻五千个在哪里#</span>国内器乐摇滚领军者惘闻乐队2020首场线上音乐会——一场海平面以下的超现实演出马上开始，
        点击观看>>>
      </p>
      <div class="midcontentwo">
        <p>【温馨提示】</p>
        <p>为保证观演顺利，请一定将“网易云音乐”APP更新至版本 7.1.50以上 哦~</p>
      </div>
    </div>
    <div class="botcontent">
      <img
        src="http://p4.music.126.net/KhRfs2wKjLxkPT6j_YxW9Q==/109951165110219383.jpg?param=110y110&quality=100"
      />
      <img
        src="http://p4.music.126.net/oGq8zR07qZ6wmmak0IaOgg==/109951165110221389.jpg?param=110y110&quality=100"
      />
      <img
        src="http://p4.music.126.net/qYMfh5G-IEH-K-6CodfHSQ==/109951165110229117.jpg?param=110y110&quality=100"
      />
      <img
        src="http://p3.music.126.net/Qy1Ud3w6UpOUGYpuaOt5vw==/109951165110220455.jpg?param=110y110&quality=100"
      />
      <img
        src="http://p3.music.126.net/kNjsn7ZaZlU1nWrJSV46aw==/109951165110226694.jpg?param=110y110&quality=100"
      />
      <img
        src="http://p4.music.126.net/9r_88FooS02cC0IGIC_yRA==/109951165110223745.jpg?param=110y110&quality=100"
      />
    </div>
    <div class="bottomcontent">
      <span>
        <img src="../../assets/zan.svg" />(106)
      </span>
      <span>转发(2)</span>
      <span>评论(2)</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.dtvue {
  margin-top: 20px;
  .top {
    display: flex;
    align-items: start;
    img {
      width: 45px;
      height: 45px;
    }
    .dttopright {
      margin-left: 10px;
      p {
        color: #0c73c2;
        font-size: 14px;
        img {
          width: 12px;
          height: 12px;
          vertical-align: middle;
        }
      }
      span {
        margin-top: 5px;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .midcontent {
    margin-left: 50px;
    margin-top: 20px;
    font-size: 14px;
    color: #333;
    span {
      color: #0c73c2;
    }
    .midcontentwo {
      margin-top: 40px;
    }
  }
  .botcontent {
    margin-left: 50px;
    width: 350px;
    margin-top: 10px;
    img {
      width: 110px;
      height: 110px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .bottomcontent {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    text-align: right;
    span {
      font-size: 12px;
      color: #68c79c;
      padding: 0px 10px;
      border-right: 1px solid #ccc;
      cursor: pointer;
      img {
        width: 12px;
        margin-right: 5px;
        vertical-align: middle;
        cursor: pointer;
        position: relative;
        top: -1px;
      }
    }
    span:last-child {
      border: none;
    }
  }
}
</style>
