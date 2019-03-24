// 我们晚点再讨论嵌套路由。
import  HelloWorld from '../components/HelloWorld.vue'
import  VueRouter from 'vue-router'
import Vue from 'vue'
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
Vue.use(VueRouter)

const routes = [
  { path:'/',component:HelloWorld,
    children:[
      { path: 'foo', component: Foo },
      { path: 'bar', component: Bar }
    ]
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
let router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

export default router
