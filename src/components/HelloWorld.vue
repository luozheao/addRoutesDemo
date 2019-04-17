
<template>
<div>
  {{$t('order','订单')}}
  <router-link to="/foo">foo</router-link>
  <router-link to="/bar">bar</router-link>
  <br>
  {{$d}}
  <router-view></router-view>
</div>
</template>

<script>

const extend = {
  data () {
    return {
      name: 'extend name'
    }
  },
  methods:{
    haha(){
      console.log('extend methods')
    }
  }
}
const mixin1 = {
  data () {
    return {
      name: 'mixin1 name'
    }
  },
   methods:{
    haha(){
      console.log('mixin1 methods')
    }
  }
}
const mixin2 = {
  data () {
    return {
      name2: 'mixin2 name'
    }
  },
   methods:{

  }
}

export default {
  mixins: [mixin1, mixin2],
  extends: extend,
  name: 'app',
  data () {
    return {
      name: 'name12345'
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>
