<template>
  <div class="ranktitlevue" @click="$emit('change-itemid')">
    <img :src="item.coverImgUrl" />
    <div class="right">
      <h2>{{item.name}}</h2>
      <p>{{item.updateFrequency}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
};
</script>

<style lang="less" scoped>
.ranktitlevue {
  display: flex;
  padding: 10px 20px;
  height: 62px;
  font-size: 12px;
  align-items: center;
  cursor: pointer;
  img {
    width: 40px;
  }
  .right {
    margin-left: 15px;
    p {
      margin-top: 5px;
      color: #666;
    }
  }
  &:hover {
    background: #dbf2ea;
  }
}
</style>
