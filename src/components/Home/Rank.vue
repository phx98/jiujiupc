<template>
  <div class="rankpage">
    <div class="rankleft" v-if="toplist">
      <h1>云音乐特色榜</h1>
      <Title
        v-for="(item, index) in toplist.slice(0, 4)"
        :item="item"
        :key="index"
        :class="activenum == item.id ? 'activetitle' : ''"
        @change-itemid="activenum = item.id,directupdateFrequency=item.directupdateFrequency"
      ></Title>
      <h1>全球媒体榜</h1>
      <Title
        v-for="(item, i) in toplist.slice(4, 32)"
        :item="item"
        :key="'info2-'+ i"
        :class="activenum == item.id ? 'activetitle' : ''"
        @change-itemid="activenum = item.id,directupdateFrequency=item.directupdateFrequency"
      ></Title>
    </div>
    <div class="rankright">
      <Content
        :listid="activenum"
        v-if="activenum"
        :direction="directupdateFrequency"
        @translate-song="$emit('translate-song', $event)"
        @translate-defaultplay="$emit('translate-defaultplay', $event)"
        @add-defaultplay="$emit('add-defaultplay', $event)"
      ></Content>
    </div>
  </div>
</template>

<script>
import Title from "../Rank/ranktitle";
import Content from "../Rank/rankcontent";
export default {
  components: {
    Title,
    Content
  },
  data: function() {
    return {
      // 各种榜单
      toplist: [],
      // activenum是指第一个榜单
      activenum: 0,
      // 更新描述
      directupdateFrequency: "每天更新"
    };
  },
  computed: {},
  methods: {
    gettoplist() {
      this.axios
        .get("/toplist")
        .then(res => {
          this.toplist = res.data.list;
          this.activenum = this.toplist[0].id;
          window.localStorage.setItem(
            "toplist",
            JSON.stringify({
              val: res.data.list,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checktoplist() {
      let cachetoplist = JSON.parse(window.localStorage.getItem("toplist"));
      if (cachetoplist && cachetoplist.time > Date.now()) {
        this.toplist = cachetoplist.val;
        this.activenum = this.toplist[0].id;
      } else {
        this.gettoplist();
      }
    },
    changeitemid() {
      console.log("发生了点击事件");
    }
  },
  created() {
    this.checktoplist();
  },
  beforeRouteEnter(to, from, next) {
    // console.log(to, from, next);
    next(vm => {
      // vm;
      if (to.query.id) {
        vm.activenum = parseInt(to.query.id);
      }
      window.scrollTo(0, 0);
    });
  }
};
</script>

<style lang="less" scoped>
.rankpage {
  margin: 0px 10%;
  display: flex;
  border: 1px solid #c8ebdf;
  border-bottom: none;
  .rankleft {
    flex-basis: 25%;
    padding: 40px 0px;
    border-right: 1px solid #c8ebdf;
    background: #f3f8f6;
    h1 {
      font-size: 14px;
      font-style: "宋体";
      margin: 20px 0px;
      padding-left: 20px;
    }
    .activetitle {
      background: #dbf2ea;
    }
  }
  .rankright {
    flex-basis: 75%;
  }
}
</style>
