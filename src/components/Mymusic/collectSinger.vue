<template>
  <li class="collectsingerlistpage">
    <img :src="item.url" />
    <div class="right">
      <h2>{{item.name}}</h2>
      <p>{{item.content}}</p>
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
.collectsingerlistpage {
  padding: 10px 0px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c8ebdf;
  img {
    width: 80px;
    height: 80px;
  }
  .right {
    margin-left: 10px;
    h2 {
      font-size: 16px;
      color: #333;
    }
    p {
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }
  }
}
</style>