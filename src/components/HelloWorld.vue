
<template>
<div>
  {{$t('order','订单23')}}
  <br>
  {{$d}}
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
      name: 'name1234'
    }
  },
  methods:{

  },
  mounted(){

  }
}
</script>
