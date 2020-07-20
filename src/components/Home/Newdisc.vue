<template>
  <div class="newdiscpage">
    <Title>新碟上架</Title>
    <ul class="newdisccontentone" v-show="albumlist">
      <li v-for="(item, index) in albumlist" :key="index">
        <plateCard :item="item"></plateCard>
      </li>
    </ul>
    <div class="newdisccontentwo">
      <Title>
        全部新碟
        <ul class="smalltag">
          <li>全部</li>
          <li>华语</li>
          <li>欧美</li>
          <li>韩国</li>
          <li>日本</li>
        </ul>
      </Title>
      <ul class="newdisccontentone" v-show="totalalbumlist" key="offsetnum">
        <li v-for="(item, i) in totalalbumlist" :key="i">
          <plateCard :item="item"></plateCard>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          :background="true"
          layout="prev, pager, next"
          :total="150"
          @current-change="changeoffset"
          @prev-click="offsetnum = offsetnum - 1"
          @next-click="offsetnum = offsetnum + 1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Newdisc/Title";
import plateCard from "@/components/Newdisc/plateCard";
export default {
  components: {
    Title,
    plateCard
  },
  data: function() {
    return {
      albumlist: [],
      totalalbumlist: [],
      offsetnum: 1
    };
  },
  methods: {
    getalbum() {
      this.axios
        .get("/top/album", {
          params: {
            limit: 10
          }
        })
        .then(res => {
          this.albumlist = res.data.albums;
          window.localStorage.setItem(
            "albumlist",
            JSON.stringify({
              val: this.albumlist,
              time: Date.now() + 4 * 60 * 60 * 1000
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    checkalbum() {
      const cacheablumlist = JSON.parse(
        window.localStorage.getItem("albumlist")
      );
      if (cacheablumlist && cacheablumlist.time > Date.now()) {
        this.albumlist = cacheablumlist.val;
      } else {
        this.getalbum();
      }
    },
    getalbumlist(offset, callback) {
      this.axios
        .get("/top/album", {
          params: {
            offset: offset,
            limit: 30
          }
        })
        .then(res => {
          callback(res);
        });
    },
    checkalbumlist(offset, callback) {
      let cachelocal = JSON.parse(
        window.localStorage.getItem("totalalbum-" + offset)
      );
      if (cachelocal && cachelocal.time > Date.now()) {
        callback(cachelocal.val);
      } else {
        this.getalbumlist(offset, res => {
          window.localStorage.setItem(
            "totalalbum-" + offset,
            JSON.stringify({
              val: res.data.albums,
              time: Date.now() + 2 * 60 * 60 * 1000
            })
          );
          callback(res.data.albums);
        });
      }
    },
    changeoffset(e) {
      // console.log("点击页码", e);
      this.offsetnum = e;
    }
  },
  created() {
    this.checkalbum();
    this.checkalbumlist(this.offsetnum, res => {
      this.totalalbumlist = res;
    });
  },
  watch: {
    offsetnum() {
      this.checkalbumlist(this.offsetnum, res => {
        this.totalalbumlist = res;
      });
    }
  }
};
</script>

<style lang="less">
.newdiscpage {
  margin: 0px 10%;
  border-left: 1px solid #c8ebdf;
  border-right: 1px solid #c8ebdf;
  padding: 40px;
  .newdisccontentone {
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
  .newdisccontentwo {
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
