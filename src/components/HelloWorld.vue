
<template>
<div>
   {{name2}}
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
import b from './b.js'
export default {
  mixins: [mixin1, mixin2],
  extends: extend,
  name: 'app',
  data () {
    return {
      name: 'name'
    }
  },
  methods:{
   
  },
  mounted(){
    console.log(b,1111233311113)
  }
}
</script>
