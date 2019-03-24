<template>
  <div>
    {{msg}}
    <input v-model="msg"/>
  </div>
</template>

<script>
  export default {
   data(){
     return {
       msg:'nihao'
     }
   },
   mounted(){},
    methods:{}
  }
</script>

