<template>
  <li class="mymusicCardpage" @click="$emit('change-activeid')">
    <div class="leftcontent">
      <img :src="item.coverImgUrl" alt />
    </div>
    <div class="rightcontent">
      <h3>{{ item.name }}</h3>
      <p>{{ item.trackCount }}首</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style lang="less" scoped>
.mymusicCardpage {
  display: flex;
  padding: 0px;
  cursor: pointer;
  .leftcontent {
    width: 40px;
    img {
      width: 40px;
      height: 40px;
    }
  }

  .rightcontent {
    flex-basis: calc(100% - 60px);
    font-size: 12px;
    margin-left: 10px;
    h3 {
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      padding: 0px;
    }
    p {
      color: #ccc;
      margin-top: 10px;
    }
  }
}
</style>