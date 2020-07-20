<template>
  <div class="loginvue" @mousewheel.prevent>
    <div class="bigcontent" v-show="loginshow == 1">
      <h2>
        登录
        <img src="../assets/close.svg" @click="$emit('close-login')" />
      </h2>
      <div class="loginleft">
        <img src="../assets/login.png" alt />
        <el-button type="primary" class="cellphone" @click="loginshow = 2">用户名登录</el-button>
        <el-button @click="loginshow = 3">注册</el-button>
        <p>
          <input type="checkbox" />
          同意
          <span>《服务条款》</span>
          <span>《隐私政策》</span>
          <span>《儿童隐私政策》</span>
        </p>
      </div>
      <div class="loginright">
        <div>
          <img src="../assets/weixin.svg" />
          微信登录
        </div>
        <div>
          <img src="../assets/qq.svg" />
          QQ登录
        </div>
        <div>
          <img src="../assets/weibo.svg" />
          微博登录
        </div>
        <div>
          <img src="../assets/starmusic.svg" />
          玖玖登录
        </div>
      </div>
    </div>

    <div class="registercontent" v-show="loginshow == 3">
      <h2>
        用户名注册
        <img src="../assets/close.svg" @click="$emit('close-login')" />
      </h2>
      <div class="inputtitle">用户名:</div>
      <div class="cellphonediv">
        <input type="text" name="cellphone" v-model="cellphone" placeholder="请输入手机号" />
      </div>
      <div class="inputtitle">密码:</div>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="设置登录密码,不少于6位"
        class="passwordinput"
      />
      <div class="error" v-show="error">注册失败,请注意信息填写</div>
      <div class="loginbtn">
        <button @click="toregister">注册</button>
      </div>
      <div class="logincontentbottom">
        <span @click="loginshow = 2,error = false">返回登录</span>
      </div>
    </div>

    <div class="logincontent" v-show="loginshow == 2">
      <h2>
        用户名登录
        <img src="../assets/close.svg" @click="$emit('close-login')" />
      </h2>
      <div>
        <input
          type="text"
          name="cellphone"
          v-model="cellphone"
          placeholder="请输入用户名"
          class="cellphoneinput"
        />
      </div>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="请输入密码"
        class="passwordinput"
      />
      <div class="autologin">
        <label for="autologin">
          <input type="checkbox" name="autologin" id="autologin" /> 自动登录
        </label>
        <a>忘记密码?</a>
      </div>
      <div class="error" v-show="error">登录失败,请注意信息填写</div>
      <div class="loginbtn">
        <button @click="tologin()">登录</button>
      </div>
      <div class="logincontentbottom">
        <span @click="loginshow = 1">其他登录方式</span>
        <a href="#" @click="loginshow = 3,error = false">没有账号? 免费注册 ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      loginshow: 1,
      cellphone: "",
      password: "",
      error: false
    };
  },
  methods: {
    // 注册
    toregister() {
      this.$axios
        .get(this.apilist[1] + "/register", {
          params: {
            username: this.cellphone,
            password: this.password
          }
        })
        .then(response => {
          // console.log(response);
          if (response.data == 200) {
            this.loginshow = 2;
            this.error = false;
          } else {
            this.error = true;
            window.localStorage.setItem(
              "login",
              JSON.stringify({
                val: {
                  username: this.cellphone,
                  password: this.password
                }
              })
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tologin() {
      this.$axios
        .get(this.apilist[1] + "/login", {
          params: {
            username: this.cellphone,
            password: this.password
          }
        })
        .then(response => {
          // console.log(response);
          if (response.data == 200) {
            let userinfo = {
              username: this.cellphone,
              password: this.password
            };
            window.localStorage.setItem(
              "login",
              JSON.stringify({
                val: userinfo
              })
            );
            this.$emit("close-login");
            location.reload();
          } else {
            this.error = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.loginvue {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.2);
  z-index: 10;
  input {
    outline: none;
  }
  & > div {
    width: 40%;
    position: fixed;
    top: 100px;
    left: 30%;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    h2 {
      flex-basis: 100%;
      font-weight: bold;
      color: #ffffff;
      background: #42b983;
      height: 38px;
      line-height: 38px;
      font-size: 14px;
      padding-left: 20px;
      img {
        float: right;
        top: 10px;
        right: 20px;
        position: relative;
        width: 15px;
        cursor: pointer;
      }
    }
  }
  .bigcontent {
    .loginleft {
      flex-basis: 60%;
      text-align: center;
      padding: 40px 35px;
      .el-button {
        width: 100%;
        padding: 10px 0px;
        font-size: 12px;
        margin-top: 10px;
        margin-left: 0px;
        // outline: none;
      }
      .cellphone {
        background: #42b983;
        border: none;
      }
      p {
        margin-top: 20px;
        font-size: 9px;
        input {
          width: 10px;
          height: 10px;
          vertical-align: middle;
        }
        span {
          color: #2e7ecb;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .loginright {
      margin: 40px 0px;
      border-left: 2px dotted #c8ebdf;
      padding: 0px 35px;
      div {
        font-size: 12px;
        margin: 10px 0px;
        img {
          width: 30px;
          vertical-align: middle;
          margin-right: 15px;
        }
      }
    }
  }
  .registercontent,
  .logincontent {
    justify-content: center;
    & > div {
      flex-basis: 100%;
      text-align: center;
      margin-top: 40px;
    }
    .error {
      color: red;
      margin-top: 10px;
      font-size: 12px;
    }
    .phonetitle {
      border: 1px solid #ccc;
      font-size: 12px;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      height: 30px;
      display: inline-block;
      line-height: 30px;
      position: relative;
      top: 2px;
      border-right: none;
      padding: 0px 10px;
    }
    input {
      height: 30px;
      font-size: 12px;
      line-height: 30px;
      width: 195px;
      border-radius: 3px;
      border: 1px solid #cccccc;
      margin-bottom: 10px;
      text-indent: 0.5em;
    }
    .autologin {
      margin: 0px;
      margin-top: 0px;
      font-size: 12px;
      margin: 0px calc(50% - 92px);
      text-align: left;
      input {
        width: 12px;
        height: 12px;
        line-height: 12px;
        margin: 0px;
        vertical-align: middle;
        cursor: pointer;
      }
      a {
        float: right;
        cursor: pointer;
      }
    }
    .loginbtn {
      margin: 0px calc(50% - 95px);
      margin-top: 20px;
      button {
        background: #42b983;
        padding: 5px 0px;
        width: 100%;
        border: none;
        color: #c8ebdf;
        border-radius: 3px;
        outline: none;
        cursor: pointer;
      }
    }
    .logincontentbottom {
      border-top: 2px solid #c8ebdf;
      height: 50px;
      font-size: 12px;
      text-align: left;
      line-height: 50px;
      span {
        color: #2e7ecb;
        margin-left: 20px;
        cursor: pointer;
      }
      a {
        float: right;
        margin-right: 20px;
        text-decoration: none;
        color: #ccc;
      }
    }
  }
  .registercontent {
    .inputtitle {
      font-size: 12px;
      color: #ccc;
      text-align: left;
      margin: 0px calc(50% - 95px);
    }
    h2 {
      margin-bottom: 40px;
    }
    .cellphonediv {
      margin-top: 0px;
    }
  }
}
</style>
