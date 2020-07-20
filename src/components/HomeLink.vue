<template>
  <div class="homeLinkpage">
    <Login v-show="showlogin" @close-login="showlogin = false,$emit('appclose-login')"></Login>
    <div class="logo">
      <img src="../assets/musiclogo.svg" alt />
      玖玖音乐
    </div>
    <ul>
      <li>
        <router-link to="/Home">发现音乐</router-link>
      </li>
      <li>
        <router-link to="/Mymusic">我的音乐</router-link>
      </li>
      <li>
        <router-link to="/Friend">朋友</router-link>
      </li>
      <li>
        <router-link to="/Playlist">
          歌单
          <span>R</span>
        </router-link>
      </li>
      <li>
        <router-link to="/Download">下载客户端</router-link>
      </li>
    </ul>

    <div class="homelinkright">
      <div class="searchinput">
        <span>
          <img src="../assets/search1.svg" alt />
        </span>
        <input
          type="text"
          placeholder="音乐/视频/电台/用户"
          v-model="searchtext"
          v-on:keyup.enter="searchsubmit(searchtext)"
        />
        <ul v-if="searchsuggest" class="inputul">
          <li
            v-for="(item, index) in searchsuggest"
            :key="index"
            @click="searchsubmit(item.keyword)"
          >
            <p>{{ item.keyword }}</p>
          </li>
        </ul>
        <ul v-if="showresult" class="inputul resultinput">
          <li
            class="searcheresultli"
            @click="tosongdetail(song.id)"
            v-for="(song, index) in resultlist.slice(0, 10)"
            :key="index"
          >{{song.name}}</li>
        </ul>
      </div>
      <span class="framer">创作者中心</span>
      <img src="../assets/portrait.png" class="userheader" v-if="iflogin" />
      <h4 v-if="!iflogin" @click="showlogin = true">登录</h4>
      <h4 v-if="iflogin">{{ username }}</h4>
    </div>
  </div>
</template>

<script>
import Login from "@/components/Login";
export default {
  components: {
    Login
  },
  data: function() {
    return {
      searchtext: "",
      showlogin: false,
      searchsuggest: [],
      showresult: false,
      resultlist: [],
      showsuggest: false
    };
  },
  props: {
    username: String,
    homelinklogin: Boolean
  },
  methods: {
    // 按下确认之后触发的事件
    searchsubmit(text) {
      this.showresult = true;
      this.searchsuggest = [];
      this.getsearchresult(text);
      this.searchtext = "";
    },
    // 分别获得搜索建议和搜索结果
    getSearchsuggest() {
      this.axios
        .get("/search/suggest", {
          params: {
            keywords: this.searchtext,
            type: "mobile"
          }
        })
        .then(response => {
          this.searchsuggest = response.data.result.allMatch;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getsearchresult(text) {
      this.axios
        .get("/search", {
          params: {
            keywords: text
          }
        })
        .then(response => {
          // console.log(response.data.result.songs);
          this.resultlist = response.data.result.songs;
          // console.log(this.hotlist);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tosongdetail(id) {
      this.showresult = false;
      this.$router.push({
        path: `/Songdetail?id=${id}`
      });
    }
  },
  computed: {
    iflogin: function() {
      return this.username ? true : false;
    }
  },
  watch: {
    homelinklogin: function() {
      if (this.homelinklogin == true) {
        this.showlogin = true;
      }
    },
    searchtext: function(newvalue) {
      if (newvalue == "") {
        this.searchsuggest = [];
        this.showsuggest = false;
      } else {
        this.getSearchsuggest();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.homeLinkpage {
  height: 70px;
  background: #42b983;
  width: 100%;
  display: flex;
  align-items: center;
  .logo {
    flex-basis: 20%;
    text-align: right;
    font-size: 22px;
    color: #bbe6d6;
    padding-right: 20px;
    padding: 15px 10px;
    img {
      width: 30px;
      border-radius: 50%;
      vertical-align: middle;
      position: relative;
      bottom: 3px;
    }
  }
  ul {
    display: flex;
    flex-basis: 45%;
    height: 70px;
    align-items: center;
    li {
      flex: 1;
      text-align: center;
      cursor: pointer;
      height: 70px;
      a {
        line-height: 40px;
        padding: 15px 10px;
        height: 100%;
        width: 100%;
        display: inline-block;
        color: #c8ebdf;
        font-size: 14px;
        text-decoration: none;
        position: relative;
        span {
          position: absolute;
          font-size: 8px;
          border: 1px solid #c8ebdf;
          display: inline-block;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          // background: skyblue;
          line-height: 9px;
          top: 20px;
        }
      }
      .active {
        position: relative;
        background: linear-gradient(to top, #248867, #43be95);
        a {
          color: #fff;
          display: inline-block;
        }
        &::before {
          content: "";
          width: 0px;
          height: 0px;
          display: inline-block;
          position: absolute;
          bottom: 0px;
          left: calc(50% - 5px);
          border: 5px solid transparent;
          border-bottom: 5px solid #c8ebdf;
          z-index: 2;
        }
      }
      &:hover {
        position: relative;
        a {
          color: #fff;
          background: linear-gradient(to top, #248867, #43be95);
        }
      }
    }
  }
  .homelinkright {
    padding: 15px 0px;
    flex-basis: 35%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    .searchinput {
      display: flex;
      position: relative;
      span {
        height: 32px;
        background: #fff;
        width: 35px;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        justify-content: flex-end;
        align-items: center;
        display: flex;
        img {
          vertical-align: middle;
          width: 20px;
          border-radius: 0px;
        }
      }

      input {
        height: 32px;
        border: none;
        outline: none;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        width: 120px;
        font-size: 12px;
        color: #333;
      }
      input::placeholder {
        font-size: 12px;
      }
    }
    .inputul {
      position: absolute;
      top: 40px;
      left: 0px;
      display: inline;
      background: #fff;
      font-size: 12px;
      height: auto;
      min-width: 180px;
      max-width: 300px;
      text-align: left;
      border-radius: 5px;
      padding: 0px 10px;
      z-index: 9;
      &.resultinput {
        z-index: 10;
      }
      li {
        padding: 10px 0px;
        border-bottom: 1px solid #c4e5da;
        margin: 0px;
        height: auto;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      li:last-child {
        border: none;
      }
    }
    .framer {
      font-size: 12px;
      border: 1px solid #e4f5ef;
      display: inline-block;
      padding: 5px 10px;
      border-radius: 20px;
      color: #fff;
      margin-left: 20px;
      height: 30px;
    }
    .userheader {
      margin-left: 20px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
    }
    h4 {
      color: #c8ebdf;
      font-size: 14px;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
</style>
