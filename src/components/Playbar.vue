<template>
  <div class="playbarpage">
    <transition
      name="ifplaybar"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        class="ifplaybar showplaybar"
        @mouseenter="playbarcontent = true"
        v-show="!playbarcontent"
      >
        <div class="lock">
          <img :src="lockimg" @click="changelock" />
        </div>
      </div>
    </transition>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
    >
      <div
        v-show="playbarcontent"
        @mouseleave="
          fixation ? (playbarcontent = true) : (playbarcontent = false)
        "
        class="bigcontent"
      >
        <div class="ifplaybar">
          <div class="lock">
            <img :src="lockimg" @click="changelock" />
          </div>
        </div>
        <div class="playbarcontent">
          <div class="barleft">
            <span class="lastaudio">
              <img
                src="../assets/prevplay.svg"
                @mousemove.self="showprevplay = true"
                v-if="!showprevplay"
              />
              <img
                src="../assets/prevplay2.svg"
                @mouseout.self="showprevplay = false"
                v-if="showprevplay"
                @click.stop="prevplayaudio"
              />
            </span>
            <span class="playaudio">
              <img :src="playaudio" @click="switchplayaudio" />
            </span>
            <span class="nextaudio">
              <img
                src="../assets/nextplay.svg"
                @mousemove.self="shownextplay = true"
                v-if="!shownextplay"
              />
              <img
                src="../assets/nextplay2.svg"
                @mouseout.self="shownextplay = false"
                v-if="shownextplay"
                @click.stop="nextplayaudio"
              />
            </span>
          </div>
          <div class="barimg">
            <img :src="song.al.picUrl" v-if="song.al" />
            <img src="../assets/portrait.png" v-if="!song.al" />
          </div>
          <div class="barinput">
            <h2 v-if="song">
              <span class="songname" v-if="song.name">{{song.name}}</span>
              <span class="songname" v-if="!song.name">为霜</span>
              <span v-if="song.ar">{{song.ar[0].name}}</span>
              <span v-if="!song.ar">羽肿</span>
              <img
                src="../assets/connect.svg"
                @mousemove.self="showconnectimg = true"
                v-show="!showconnectimg"
              />
              <img
                src="../assets/connect2.svg"
                @mouseout.self="showconnectimg = false"
                v-show="showconnectimg"
              />
            </h2>
            <div class="inputtime" v-if="song">
              <input
                type="range"
                v-model="audiotime"
                class="inputrange"
                max="100"
                name="inputrange"
              />
              <audio :src="currentSongUrl" autoplay controls height="30"></audio>
              <span class="presenttime">{{ arrangetime(audioprogress) }}</span>
              <span class="totaltime">/ {{ arrangetime(song.dt) }}</span>
            </div>
          </div>
          <div class="add-share">
            <img
              src="../assets/addsong2.svg"
              class="addsong"
              v-show="showaddsong"
              @mouseout="showaddsong = false"
              title="收藏"
            />
            <img
              src="../assets/addsong.svg"
              class="addsong"
              v-show="!showaddsong"
              @mousemove.self="showaddsong = true"
            />
            <img
              src="../assets/share2.svg"
              v-show="showshare"
              @mouseout="showshare = false"
              title="分享"
            />
            <img src="../assets/share.svg" v-show="!showshare" @mousemove.self="showshare = true" />
          </div>
          <div class="songmenu">
            <img src="../assets/trumpet.svg" @mouseover="showtrumpet = true" v-show="!showtrumpet" />
            <img src="../assets/trumpet2.svg" @mouseout="showtrumpet = false" v-show="showtrumpet" />
            <img :src="audiomodel" @click="switchaudiomodel" :title="audiomodelname" />
            <span
              class="songlist"
              @mouseover="showsongimg = true"
              @mouseout="showsongimg = false"
              @click="showdefaultplay = !showdefaultplay"
            >
              <img src="../assets/songlist.svg" v-show="!showsongimg" />
              <img src="../assets/songlist2.svg" v-show="showsongimg" />
              <span>{{defaultPlay.length}}</span>
            </span>
          </div>
        </div>
        <transition
          name="defaultsonglist-transition"
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <div class="defaultsonglist" @scroll.prevent v-show="showdefaultplay">
            <div class="defaulttop">
              <div class="top-left">
                播放列表({{defaultPlay.length}})
                <span>
                  <img src="../assets/addsong2.svg" />收藏全部
                </span>
                <span>
                  <img src="../assets/trash.svg" />清除
                </span>
              </div>
              <div class="top-right">
                {{song.name}}
                <img src="../assets/del.svg" @click="showdefaultplay = false" />
              </div>
            </div>
            <div class="defaultleft">
              <dl v-if="defaultPlay">
                <dd
                  v-for="(item,index) in defaultPlay"
                  :key="index"
                  @click.stop="$emit('translate-song',item.id)"
                  :class="item.id == song.id? 'activedd':''"
                >
                  <h5>{{item.name}}</h5>
                  <p>{{item.ar[0].name}}</p>
                  <span v-if="item.dt">{{arrangetime(item.dt)}}</span>
                  <img src="../assets/connect.svg" />
                </dd>
              </dl>
            </div>
            <div class="defaultright">
              <ul class="scroll">
                <li
                  v-for="(item, index) in parsedLyric"
                  :class="{ active: index === currentLyricIndex }"
                  :key="index"
                  :style="{
                  transform: `translateY(${-currentLyricIndex * 36}px)`
                 }"
                >{{ processlyric(item.text) }}</li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    song: Object,
    defaultPlay: Array,
    currentLyric: String
  },
  data: function() {
    return {
      playing: false,
      playaudio: require("../assets/playaudio.svg"),
      audiotime: 0,
      audioprogress: 0,
      showprevplay: false,
      shownextplay: false,
      showconnectimg: false,
      showaddsong: false,
      showshare: false,
      showtrumpet: false,
      audiomodel: require("../assets/singlecycle.svg"),
      audiomodelname: "单曲循环",
      showsongimg: false,
      playbarcontent: false,
      lockimg: require("../assets/unlock.svg"),
      fixation: false,
      showdefaultplay: false,
      currentLyricIndex: 0
    };
  },
  computed: {
    currentSongUrl: function() {
      if (this.song)
        return `https://music.163.com/song/media/outer/url?id=${this.song.id}.mp3`;
      else return "https://music.163.com/song/media/outer/url?id=535517304.mp3";
    },
    parsedLyric: function() {
      if (this.currentLyric) {
        return this.currentLyric.split("\n").map(item => {
          // console.log(item);
          var regex = /\d{2}:\d{2}\.\d+/i;
          if (item.search(regex) !== -1) {
            var time = item.match(regex)[0];
            var m = time.substr(0, 2);
            var s = time.substr(3, 2);
            var n = time.substr(5);
            return {
              time: Number(m) * 60 + Number(s) + Number(n),
              text: item.substr(11) || "---------"
            };
          } else {
            return {};
          }
        });
      } else {
        return [{ time: 0, text: "暂时没有歌词" }];
      }
    }
  },
  methods: {
    // 点击播放和暂停按钮
    switchplayaudio() {
      if (this.playaudio == require("../assets/playaudio.svg")) {
        this.playaudio = require("../assets/pauseaudio.svg");
        this.playing = true;
      } else if (this.playaudio == require("../assets/pauseaudio.svg")) {
        this.playaudio = require("../assets/playaudio.svg");
        this.playing = false;
      }
    },
    // input进度条的变化
    rangestyle() {
      var range = this.$el.querySelectorAll("input");
      // console.log(range[0].style);
      range[0].style.background = `linear-gradient(to right,
       #278d6c ${this.audiotime}%,
       #c8ebdf ${this.audiotime}%,
       #c8ebdf ${100 - this.audiotime}%)`;
    },
    // 选择切换播放模式
    switchaudiomodel() {
      // 单曲循环
      if (this.audiomodel == require("../assets/singlecycle.svg")) {
        this.audiomodel = require("../assets/randomplay.svg");
        this.audiomodelname = "随机播放";
      } else if (this.audiomodel == require("../assets/randomplay.svg")) {
        // 随机播放
        this.audiomodel = require("../assets/loopplay.svg");
        this.audiomodelname = "列表循环";
      } else if (this.audiomodel == require("../assets/loopplay.svg")) {
        // 列表循环
        this.audiomodel = require("../assets/singlecycle.svg");
        this.audiomodelname = "单曲循环";
      }
    },
    // 固定播放器或取消固定
    changelock() {
      if (this.lockimg == require("../assets/unlock.svg")) {
        this.lockimg = require("../assets/lock.svg");
        this.fixation = true;
      } else {
        this.lockimg = require("../assets/unlock.svg");
        this.fixation = false;
      }
    },
    // 给音频标签绑定监听事件
    addEventListeners() {
      var audio = this.$el.querySelector("audio");
      audio.addEventListener("timeupdate", this._currentTime);
    },
    // 移除音频标签的监听事件
    removeEventListeners() {
      var audio = this.$el.querySelector("audio");
      audio.removeEventListener("timeupdate", this._currentTime);
    },
    // 监听音频的播放进度
    _currentTime() {
      var audio = this.$el.querySelector("audio");
      this.audioprogress = parseInt(audio.currentTime);
    },
    // 修改时间显示
    arrangetime(time) {
      if (time > 10000) {
        time = (time / 1000).toFixed(0);
      }
      var minute = (time / 60).toFixed(0);
      minute = minute < 10 ? "0" + minute : minute;
      var second = time % 60 < 10 ? "0" + (time % 60) : time % 60;
      return minute + ":" + second;
    },
    prevplayaudio() {
      let i;
      if (this.audiomodel == require("../assets/randomplay.svg")) {
        i = Math.floor(Math.random() * this.defaultPlay.length);
      } else {
        this.defaultPlay.map((item, index) => {
          if (item.id == this.song.id) {
            i = index;
          }
        });
        if (i == 0) {
          i = this.defaultPlay.length - 1;
        } else {
          i = i - 1;
        }
      }
      this.$emit("translate-song", this.defaultPlay[i].id);
    },
    nextplayaudio() {
      let i;
      // 如果是单曲循环或者是列表循环,就按照歌单里面的顺序来,如果不是,就随机播放
      if (this.audiomodel == require("../assets/randomplay.svg")) {
        i = Math.floor(Math.random() * this.defaultPlay.length);
      } else {
        this.defaultPlay.map((item, index) => {
          if (item.id == this.song.id) {
            i = index;
          }
        });
        if (i + 1 >= this.defaultPlay.length) {
          i = 0;
        } else {
          i = i + 1;
        }
      }
      this.$emit("translate-song", this.defaultPlay[i].id);
    },
    playaudiomodel() {
      if (this.audiomodel == require("../assets/singlecycle.svg")) {
        //  单曲循环
        this.playing = true;
      } else if (this.audiomodel == require("../assets/randomplay.svg")) {
        // 随机播放
        let i = Math.floor(Math.random() * this.defaultPlay.length);
        this.$emit("translate-song", this.defaultPlay[i].id);
      } else if (this.audiomodel == require("../assets/loopplay.svg")) {
        // 列表循环
        this.nextplayaudio();
      }
    },
    // 歌词的加工去掉前面的时间字符
    processlyric(text) {
      // console.log(text);
      var x = text;
      if (text != undefined) {
        x = text.replace(/\[.*:.*\]/, "");
      }
      return x;
    },
    lyrichighlight() {
      let index = 0;
      if (!this.parsedLyric.length) {
        this.currentLyricIndex = index;
        return;
      }
      for (let i = 0; i < this.parsedLyric.length; i++) {
        if (this.audioprogress < this.parsedLyric[i].time) {
          // console.log(this.audioprogress + 0.2, this.parsedLyric[i].time);
          index = i - 1;
          break;
        }
      }
      if (index === undefined) {
        index = this.parsedLyric.length - 1;
      }
      // console.log(this.currentLyricIndex, index);
      this.currentLyricIndex = index;
    }
    // 歌词的高亮更新
  },
  watch: {
    audiotime: function(newvalue, oldvalue) {
      var audio = this.$el.querySelector("audio");
      if (newvalue - oldvalue >= 5 || oldvalue - newvalue >= 5) {
        audio.currentTime = (newvalue * audio.duration) / 100;
      }
      this.rangestyle();
    },
    audioprogress: function() {
      var audio = this.$el.querySelector("audio");
      this.audiotime = (this.audioprogress / audio.duration) * 100;
      if (audio.duration - this.audioprogress <= 2) {
        this.audiotime = 0;
        this.playing = false;
        this.playaudiomodel();
      }
      // 歌词高亮显示
      this.lyrichighlight();
    },
    playing: function(value) {
      var audio = this.$el.querySelector("audio");
      if (value) {
        audio.play();
        this.playaudio = require("../assets/pauseaudio.svg");
      } else {
        audio.pause();
        this.playaudio = require("../assets/playaudio.svg");
      }
    },
    song: function() {
      // this.getLyric();
    }
  },
  mounted() {
    // this.rangestyle();
    var audio = this.$el.querySelector("audio");
    audio.onplay = () => {
      this.playing = true;
    };
    audio.onpause = () => {
      this.playing = false;
    };
    this.addEventListeners();
  },
  created() {
    // this.getLyric()
  },
  beforeDestroyed() {
    this.removeEventListeners();
  }
};
</script>

<style lang="less" scoped>
.playbarpage {
  width: 100%;
  audio {
    display: none;
  }
  ifplaybar-duration: 1s;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
  .bigcontent {
    width: 100%;
    position: fixed;
    bottom: 0px;
    z-index: 9999;
  }
  .playbarcontent {
    height: 50px;
    display: flex;
    padding: 0px 10%;
    align-items: center;
    justify-content: center;
    background: rgba(66, 185, 131, 0.8);
    flex-wrap: wrap;
    width: 100%;
    position: relative;
    .barleft {
      img {
        width: 35px;
        vertical-align: middle;
      }
    }
    .barimg {
      width: 40px;
      overflow: hidden;
      margin-left: 20px;
      border-radius: 5px;
      height: 40px;
      border: #258b69 solid 1px;
      img {
        width: 100%;
      }
    }
    .barinput {
      margin-left: 15px;
      flex-basis: 55%;
      h2 {
        .songname {
          color: #ffffff;
          margin-left: 0px;
        }
        span {
          margin-left: 10px;
          color: #c8ebdf;
          font-size: 12px;
          cursor: pointer;
          &:hover {
            border-bottom: 1px dashed #c8ebdf;
          }
        }
        img {
          width: 15px;
          vertical-align: middle;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .inputtime {
        font-size: 12px;
        position: relative;
        top: -1px;
        .inputrange {
          -webkit-appearance: none;
          /*去除默认样式*/
          width: 80%;
          background: #c8ebdf;
          border-radius: 5px;
          height: 8px;
          outline: none;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            border-radius: 50%;
            height: 15px;
            width: 15px;
            background: #278d6c;
            border: 4px #fff solid;
          }
        }
        .presenttime {
          margin-left: 10px;
          color: #fff;
        }
        .totaltime {
          margin-left: 5px;
          color: #c8ebdf;
        }
      }
    }
    .add-share {
      img {
        width: 20px;
        vertical-align: middle;
        margin-left: 10px;
      }
      .addsong {
        margin-left: 0px;
      }
    }
    .songmenu {
      margin-left: 20px;
      padding-left: 20px;
      border-left: 1px solid #000;
      // border-width: 1px;
      border-image: linear-gradient(to top, #42b983, #43be95) 1 1;
      img {
        width: 22px;
        vertical-align: middle;
        margin-right: 10px;
      }
      .songlist {
        cursor: pointer;
        img {
          margin: 0px;
          width: 22px;
        }
        span {
          font-size: 10px;
          background: #c8ebdf;
          color: #34a47f;
          padding: 3px 8px;
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
          line-height: 22px;
          position: relative;
          left: -4px;
        }
      }
    }
  }
  .ifplaybar {
    width: 100%;
    height: 2px;
    box-shadow: 0px -1px 2px #c4e5da;
    background: #c4e5da;
    position: relative;
    .lock {
      position: absolute;
      right: 5%;
      top: -22px;
      background: #c4e5da;
      padding: 1px 15px;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      img {
        width: 15px;
        vertical-align: middle;
      }
      &::after {
        content: "";
        width: 0px;
        height: 0px;
        border: 9px solid transparent;
        border-right: 9px solid #c4e5da;
        border-bottom: 9px solid #c4e5da;
        position: absolute;
        left: -17px;
        top: 6px;
      }
      &::before {
        content: "";
        width: 0px;
        height: 0px;
        border: 9px solid transparent;
        border-left: 9px solid #c4e5da;
        border-bottom: 9px solid #c4e5da;
        position: absolute;
        left: 44px;
        top: 6px;
      }
    }
  }
  .showplaybar {
    z-index: 8888;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
  .defaultsonglist {
    position: absolute;
    top: -300px;
    width: 80%;
    height: 300px;
    overflow: hidden;
    left: 10%;
    background: rgba(66, 185, 131, 0.8);
    border-radius: 3px;
    display: flex;
    flex-wrap: wrap;
    .defaulttop {
      height: 40px;
      display: flex;
      background: rgba(66, 185, 131, 0.9);
      // line-height: 40px;
      width: 100%;
      .top-left {
        flex-basis: 50%;
        padding: 10px 20px;
        font-size: 14px;
        color: #fff;
        span {
          float: right;
          font-size: 12px;
          img {
            width: 16px;
            vertical-align: middle;
            margin-left: 10px;
            margin-right: 5px;
            position: relative;
            top: -1px;
          }
        }
      }
      .top-right {
        flex-basis: 50%;
        color: #fff;
        text-align: center;
        font-size: 14px;
        padding: 10px 0px;
        img {
          width: 18px;
          float: right;
          margin-right: 15px;
        }
      }
    }
    .defaultleft {
      flex-basis: 50%;
      border-right: 1px solid #c8ebdf;
      height: calc(100% - 40px);
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      dl {
        .activedd {
          color: #fff;
          background: rgba(66, 185, 131, 0.9);
        }
        dd {
          padding: 5px 0px;
          padding-left: 20px;
          position: relative;
          cursor: pointer;
          color: #c8ebdf;
          display: flex;
          &:hover {
            background: rgba(66, 185, 131, 0.9);
          }
          h5 {
            font-size: 12px;
            flex-basis: 50%;
            width: 50%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
            margin-right: 20px;
          }
          p {
            font-size: 12px;
            flex-basis: 20%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -webkit-line-clamp: 1;
          }
          span {
            flex-basis: 10%;
            font-size: 12px;
            margin-left: 20px;
          }
          img {
            width: 15px;
            position: absolute;
            right: 20px;
          }
        }
      }
    }
    .defaultright {
      flex-basis: 50%;
      text-align: center;
      position: relative;
      overflow: hidden;
      .scroll {
        width: 100%;
        text-align: center;
        top: 30%;
        margin-top: 3em;
        transition: transform 0.3s;
        li {
          line-height: 3em;
          font-size: 12px;
          height: 3em;
          color: #c8ebdf;
          &.active {
            font-size: 14px;
            color: white;
          }
        }
      }
    }
  }
}
</style>
