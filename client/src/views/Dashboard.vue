<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  created() {
    this.$router.push('/articles')
  },
}
</script>

<style>

</style>
