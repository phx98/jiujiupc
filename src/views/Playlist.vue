<template>
  <div class="playlistpage">
    <div class="playlistcontent">
      <Title>全部</Title>
      <ul class="playlistul" v-show="playlist" key="offsetnum">
        <li v-for="(item, i) in playlist" :key="i">
          <plateCard :item="item"></plateCard>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          :background="true"
          layout="prev, pager, next"
          :total="380"
          @current-change="changeoffset"
          @prev-click="offsetnum = offsetnum - 1"
          @next-click="offsetnum = offsetnum + 1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Playlist/Title";
import plateCard from "@/components/Playlist/plateCard";
export default {
  components: {
    Title,
    plateCard
  },
  data: function() {
    return {
      offsetnum: 1,
      playlist: [],
      updatetime: 0
    };
  },
  methods: {
    getplaylist(updatetime, callback) {
      this.axios
        .get("/top/playlist", {
          params: {
            offset: updatetime,
            limit: 35
          }
        })
        .then(res => {
          callback(res);
        });
    },
    checkplaylist(offset, updatetime, callback) {
      let cachelocal = JSON.parse(
        window.localStorage.getItem("totalplaylist-" + offset)
      );
      if (cachelocal && cachelocal.time > Date.now()) {
        callback(cachelocal.val);
      } else {
        this.getplaylist(updatetime, res => {
          window.localStorage.setItem(
            "totalplaylist-" + offset,
            JSON.stringify({
              val: res.data.playlists,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
          callback(res.data.playlists);
        });
      }
    },
    changeoffset(e) {
      // console.log("点击页码", e);
      this.offsetnum = e;
    }
  },
  created() {
    this.checkplaylist(this.offsetnum, this.updatetime, res => {
      this.playlist = res;
      this.updatetime = this.offsetnum * 35;
      // this.updatetime = res[res.length - 1].updateTime;
    });
  },
  watch: {
    offsetnum() {
      this.checkplaylist(this.offsetnum, this.updatetime, res => {
        this.playlist = res;
        // this.updatetime = res[res.length - 1].updateTime;

        this.updatetime = this.offsetnum * 35;
        console.log(this.updatetime);
      });
    }
  }
};
</script>

<style lang="less">
.playlistpage {
  border-top: 5px solid #c8ebdf;
  .playlistcontent {
    margin: 0px 10%;
    border-left: 1px solid #c8ebdf;
    border-right: 1px solid #c8ebdf;
    padding: 40px;
    .playlistul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding-top: 20px;
      li {
        flex-basis: 17%;
        padding-bottom: 30px;
        // padding-left: 30px;
      }
    }
    .pagination {
      text-align: center;
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #42b983;
        background-color: #42b983;
      }
    }
  }
}
</style>
