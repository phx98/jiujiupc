import Vue from "vue";
import "./plugins/axios";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import vueSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

Vue.config.productionTip = false;
Vue.prototype.apilist = ["https://music.163.com/api", "http://jiujiup.xyz:3001"];
Vue.prototype._$axios = axios;
Vue.use(ElementUI);
Vue.use(vueSwiper);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
