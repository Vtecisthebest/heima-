import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import ToutiaoIcon from "@/components/ToutiaoIcon.vue";
//加载引入flexible插件
import "amfe-flexible";
//注册vant
import Vant from "vant";
//引入vant样式
import "vant/lib/index.less";
// 测试axios接口是否可以使用
import request from "@/Utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res);
});

//使用vant
Vue.use(Vant);
Vue.component("ToutiaoIcon", ToutiaoIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
