<template>

</template>

<script>
  export default {
    name: 'user-tool',
    created(){
      this.$router.push({
        name:'user-detail',
        query:{
          articleID:this.$route.query.articleID
        }
      })
    }
  }
</script>

<style scoped>

</style>
