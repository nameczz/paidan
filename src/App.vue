<template>
  <div id="app">
    <p-header></p-header>
    <div class="main">
      <router-view/>
    </div>
    <p-footer></p-footer>
  </div>
</template>
<script>
import PHeader from 'components/header/header'
import PFooter from 'components/footer/footer'
export default {
  components: { PHeader, PFooter }
}
</script>

<style lang="stylus" scoped>
.main {
  position: fixed;
  top: 44px;
  bottom: 44px;
  width: 100%;
  background: #fff;
}
</style>
