<template>
  <div id="app">
    <router-view v-if="isLogin"></router-view>
    <layout v-else></layout>
  </div>
</template>
<script>
import Layout from 'components/layout/layout'

export default {
  components: { Layout },
  computed: {
    isLogin() {
      return this.$route.path === '/' || this.$route.path === '/login'
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
