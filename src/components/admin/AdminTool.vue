<template>

</template>

<script>
  export default {
    name: 'admin-tool',
    created(){
      this.$router.replace({
        name:'admin-detail',
        query:{
           articleID:this.$route.query.articleID
        }
      })
    }
  }
</script>

<style scoped>

</style>
