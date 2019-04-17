// 我们晚点再讨论嵌套路由。
import HelloWorld from "../components/HelloWorld.vue";
import VueRouter from "vue-router";
import Vue from "vue";
 
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: HelloWorld,
    children: [
      { path: "foo", component: r => require.ensure([], () => r(require('../components/hh1.vue')),'abc') },
      { path: "bar", component: r => require.ensure([], () => r(require('../components/hh2.vue')),'def') }
    ]
  }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
let router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
});

export default router;
