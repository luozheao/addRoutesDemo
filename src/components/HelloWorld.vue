<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>{{user.name}}</div>
    <div>{{user.age}}</div>
    <button @click="reset">reset</button>
    <router-link to="/foo">foo</router-link>
    <router-link to="/bar">bar</router-link>
    <router-link to="/test">test</router-link>
    <router-link to="/test2">test2</router-link>
    <button @click="addRoutes">addRoutes</button>
    <button @click="addRoutes2">addRoutes2</button>
    <keep-alive>
      <router-view></router-view>

    </keep-alive>
  </div>
</template>

<script>
import  test from './test.vue'
function deepCopy (obj, cache = []) {

  function find (list, f) {
    return list.filter(f)[0]
  }

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
export default {
  components:{test},
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      user:{
        name:'luozheao',
        age:18
      }
    }
  },
  mounted(){
     console.log(this.$router)
  },
  methods:{
    addRoutes(){
      // this.$router.addRoutes([
      //   {
      //     path:'/',
      //     component:{
      //       template:`<div>test</div>`
      //     },
      //     children:[
      //
      //     ]
      //   }
      // ])
      console.log(this.$router)

      this.$router.options.routes[0].children.push({
          path:'test',
          component:deepCopy(test)
      })
      this.$router.options.routes[0].children.push({
        path:'test2',
        component:deepCopy(test)
      })

      this.$router.addRoutes(this.$router.options.routes)

      // this.$router.push({path:'/test'})  //刷新就没有了
    },
    addRoutes2(){
      console.log(this.$router)
console.log(JSON.parse(JSON.stringify(test)))

      // this.$router.push({path:'/test2'})  //刷新就没有了
    },
    reset(){
       console.log(this,this.$options.data())
       Object.assign(this.$data,this.$options.data())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
