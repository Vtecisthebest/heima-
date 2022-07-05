import Vue from "vue";
import VueRouter from "vue-router";
// 页面同步加载（import）会一次性加载全部页面，会影响用户第一次打开软件的速度，如果页面比较多就会比较慢
//页面懒加载（ component: () => import("@/views/login")）会直接让客户第一次只打开一个页面，有助于用户体验

Vue.use(VueRouter);

const routes = [
  { path: "/login", name: "login", component: () => import("@/views/login") },
];

const router = new VueRouter({
  routes,
});

export default router;
