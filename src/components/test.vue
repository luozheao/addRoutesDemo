<template>
  <div>
    {{msg}}
    <input v-model="msg"/>
  </div>
</template>

<script>
  export default {
    name:'test',
   data(){
     return {
       msg:'nihao'
     }
   },
   mounted(){},
    methods:{}
  }
</script>

