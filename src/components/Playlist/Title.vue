<template>
  <div class="recommendtitle">
    <span></span>
    <h4>
      <slot></slot>
    </h4>
    <div class="hotmore">热门</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.recommendtitle {
  height: 35px;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #42b983;
  position: relative;
  padding-bottom: 10px;
  span {
    display: inline-block;
    background: #fff;
    width: 15px;
    height: 15px;
    border: 5px solid #42b983;
    border-radius: 50%;
    margin-right: 10px;
  }
  h4 {
    display: flex;
    font-size: 24px;
  }
  .hotmore {
    font-size: 12px;
    position: absolute;
    top: 0px;
    right: 20px;
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    // background: #42b983;
    background: linear-gradient(to bottom, #42b983, #68c79c);
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
