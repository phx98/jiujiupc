<template>
  <div class="anchortitle">
    <h2>
      <slot></slot>
    </h2>
    <span>更多></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.anchortitle {
  padding: 10px 0px;
  border-bottom: 2px solid #42b983;
  h2 {
    font-size: 20px;
    color: #333;
    margin: 0px;
    padding: 0px;
  }
  span {
    float: right;
    position: relative;
    top: -15px;
    font-size: 12px;
    color: #98e0c7;
  }
}
</style>
