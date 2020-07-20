<template>
  <div class="Songlisttitle">
    <div class="contentleft">
      <img :src="imgurl" @click="$emit('to-rank')" />
    </div>

    <div class="icondesgin">
      <h2 @click="$emit('to-rank')">
        <slot></slot>
      </h2>
      <img
        src="../../assets/playaudio3.svg"
        v-show="showplayaudio"
        @mouseout="showplayaudio = false"
      />
      <img
        src="../../assets/playaudio4.svg"
        v-show="!showplayaudio"
        @mouseover="showplayaudio = true"
      />
      <img src="../../assets/addsong.svg" v-show="!showaddsong" @mouseover="showaddsong = true" />
      <img src="../../assets/addsong3.svg" v-show="showaddsong" @mouseout="showaddsong = false" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgurl: String
  },
  data: function() {
    return {
      showaddsong: false,
      showplayaudio: false
    };
  }
};
</script>

<style lang="less" scoped>
.Songlisttitle {
  padding: 20px 0px 20px 20px;
  // background: skyblue;
  display: flex;
  align-items: center;
  .contentleft {
    img {
      width: 80px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .icondesgin {
    margin-left: 20px;
    h2 {
      font-size: 14px;
      margin-bottom: 10px;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
    img {
      width: 25px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>
