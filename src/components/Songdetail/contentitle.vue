<template>
  <div class="songdetailcontentitlevue">
    评论
    <span>
      共
      <slot></slot>条评论
    </span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.songdetailcontentitlevue {
  padding-bottom: 10px;
  font-size: 20px;
  color: #333;
  border-bottom: 2px solid #42b983;
  span {
    margin-left: 20px;
    font-size: 12px;
    color: #666;
  }
}
</style>
