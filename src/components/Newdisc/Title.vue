<template>
  <div class="recommendtitle">
    <h4>
      <slot></slot>
    </h4>
    <div class="hotmore">
      更多
      <img src="../../assets/more.svg" />
    </div>
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
  padding-bottom:10px ;
  h4 {
    display: flex;
    font-size: 24px;
    ul {
      display: flex;
      align-items: center;
      margin-left: 15px;
      position: relative;
      top: 5px;
      li {
        font-size: 12px;
        height: 12px;
        color: #666;
        line-height: 12px;
        padding: 0px 10px;
        border-right: 1px solid #ccc;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        &:last-child {
          border: none;
        }
      }
    }
  }
  .hotmore {
    font-size: 10px;
    position: absolute;
    top: 0px;
    right: 20px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
    img {
      width: 10px;
      vertical-align: middle;
    }
  }
}
</style>
