<template>
  <div class="singerpage">
    <div class="singerpageleft" v-if="titlelist">
      <div class="singerleftcontent" v-for="(item,index) in titlelist" :key="index">
        <ul>
          <h2>{{item.name}}</h2>
          <li
            v-for="(it, i) in item.content"
            :key="index + '00' + i"
            :class="{ active: index == pindex && i == childindex }"
            @click="changeli(item.pid, i, index)"
          >
            <span class="dot"></span>
            {{it}}
          </li>
        </ul>
      </div>
    </div>
    <div class="singerpageright" :key="activetitle">
      <div class="singercontentone" v-show="activetitle == '5000'">
        <Title>入驻歌手</Title>
        <Content
          :list="entersingerlist.slice(0, 10)"
          v-if="entersingerlist && activetitle == '5000'"
        ></Content>
        <Title>热门歌手</Title>
        <Content
          :list="hotersingerlist.slice(0, 10)"
          v-if="hotersingerlist && activetitle == '5000'"
        ></Content>
      </div>
      <div class="singercontentone" v-show="activetitle != '5000'">
        <Title>{{titlelist[pindex].content[childindex]}}</Title>
        <Content :list="singerlist" v-if="singerlist && activetitle != '5000'"></Content>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Anchor/AnchorTitle";
import Content from "@/components/Singer/Content";
export default {
  components: {
    Title,
    Content
  },
  data: function() {
    return {
      titlelist: [
        {
          name: "推荐",
          content: ["推荐歌手", "入驻歌手"],
          pid: 5
        },
        {
          name: "华语",
          content: ["华语男歌手", "华语女歌手", "华语组合/乐队"],
          pid: 1
        },
        {
          name: "欧美",
          content: ["欧美男歌手", "欧美女歌手", "欧美组合/乐队"],
          pid: 2
        },
        {
          name: "日本",
          content: ["日本男歌手", "日本女歌手", "日本组合/乐队"],
          pid: 6
        },
        {
          name: "韩国",
          content: ["韩国男歌手", "韩国女歌手", "韩国组合/乐队"],
          pid: 7
        },
        {
          name: "其他",
          content: ["其他男歌手", "其他女歌手", "其他组合/乐队"],
          pid: 4
        }
      ],
      activetitle: "5000",
      pindex: 0,
      childindex: 0,
      entersingerlist: [],
      hotersingerlist: [],
      singerlist: []
    };
  },
  methods: {
    changeli(pid, i, index) {
      if (index == 0 && i == 0) {
        this.activetitle = "5000";
      } else if (index == 0 && i == 1) {
        this.activetitle = "5001";
      } else {
        this.activetitle = pid + "00" + (i + 1);
      }
      this.pindex = index;
      this.childindex = i;
    },
    getsinglist(cat, callback) {
      this.axios
        .get("/artist/list", {
          params: {
            cat: cat
          }
        })
        .then(res => {
          callback(res);
        });
    },
    checksinglist(cat, callback) {
      let cachelocal = JSON.parse(
        window.localStorage.getItem("singerlist" + cat)
      );
      if (cachelocal && cachelocal.time > Date.now()) {
        callback(cachelocal.val);
      } else {
        this.getsinglist(cat, res => {
          window.localStorage.setItem(
            "singerlist" + cat,
            JSON.stringify({
              val: res.data.artists,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
          callback(res.data.artists);
        });
      }
    },
    gethotsingerlist() {
      this.axios
        .get("/top/artists", {
          params: {
            limit: 10
          }
        })
        .then(res => {
          this.hotersingerlist = res.data.artists;
          window.localStorage.setItem(
            "hotersingerlist",
            JSON.stringify({
              val: res.data.artists,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkhotsingerlist() {
      let cachehotsinger = JSON.parse(
        window.localStorage.getItem("hotersingerlist")
      );
      if (cachehotsinger && cachehotsinger.time > Date.now()) {
        this.hotersingerlist = cachehotsinger.val;
      } else {
        this.gethotsingerlist();
      }
    }
  },
  watch: {
    activetitle: function() {
      if (this.activetitle == "5000") {
        this.checksinglist("5001", res => {
          this.entersingerlist = res;
        });
        this.checkhotsingerlist();
      } else {
        this.checksinglist(this.activetitle, res => {
          this.singerlist = res;
        });
      }
    }
  },
  created() {
    this.checksinglist("5001", res => {
      this.entersingerlist = res;
    });
    this.checkhotsingerlist();
  },
  beforeRouteUpdate(to, from, next) {
    this.pindex = to.query.pid;
    this.childindex = to.query.cindex;
    this.activetitle = "5001";
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.pindex = to.query.pid;
      vm.childindex = to.query.cindex;
      vm.activetitle = "5001";
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style lang="less" scoped>
.singerpage {
  margin: 0px 10%;
  border-left: 1px solid #c8ebdf;
  border-right: 1px solid #c8ebdf;
  display: flex;
  .singerpageleft {
    flex-basis: 20%;
    padding: 40px 10px;
    background: #f3f8f6;
    .singerleftcontent {
      ul {
        padding: 10px 0px;
        border-bottom: 1px solid #c8ebdf;
        h2 {
          font-size: 14px;
          padding-left: 15px;
          height: 25px;
          line-height: 25px;
          font-weight: 600;
        }
        li {
          height: 30px;
          line-height: 30px;
          list-style: none;
          font-size: 12px;
          color: #333;
          padding: 0px 10px;
          cursor: pointer;
          .dot {
            display: inline-block;
            height: 5px;
            width: 5px;
            background: #c8ebdf;
            margin-right: 10px;
            position: relative;
            top: -2px;
          }
          &.active {
            border: 1px solid #c8ebdf;
            background: linear-gradient(to top, #c8ebdf, #ffffff);
            border-radius: 3px;
            color: #42b983;
            .dot {
              background: #42b983;
            }
          }
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
  .singerpageright {
    flex-basis: 80%;
    padding: 40px;
  }
}
</style>
