<template>
  <li class="songlistmusic" :title="item.name" @click="tosongdetail(item.id)">
    <span :class="{active:active}">{{ index + 1 }}</span>
    <h2>{{ item.name }}</h2>
    <div class="imgdiv">
      <img src="../../assets/playaudio3.svg" @click.stop="$emit('translate-song', item.id)" />
      <img src="../../assets/add.svg" @click.stop="$emit('add-defaultplay', item)" />
      <img src="../../assets/addsong3.svg" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number
  },
  computed: {
    active: function() {
      return this.index < 3 ? true : false;
    }
  },
  methods: {
    tosongdetail(id) {
      this.$router.push({
        path: `/Songdetail?id=${id}`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.songlistmusic {
  display: flex;
  height: 32px;
  align-items: center;
  cursor: pointer;
  .active {
    color: #c10d0c;
  }
  &:hover {
    h2 {
      text-decoration: underline;
    }
    .imgdiv {
      display: inline-block;
    }
  }
  span {
    flex-basis: 20%;
    font-size: 16px;
    text-align: center;
    padding-left: 10px;
  }
  h2 {
    font-size: 12px;
    max-width: 80%;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  .imgdiv {
    margin-right: 20px;
    display: none;
    img {
      width: 22px;
    }
    img:nth-child(2) {
      margin: 0px 5px;
    }
  }
}
</style>
