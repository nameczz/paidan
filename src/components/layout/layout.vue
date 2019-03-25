<template>
  <div class="layout">
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
import Storage from 'good-storage'
import { mapMutations } from 'vuex'
export default {
  components: { PHeader, PFooter },
  created() {
    const userToken = Storage.get('token')
    const userId = Storage.get('userId')
    const username = Storage.get('username')
    if (userToken) this.setUser({ userToken, userId, username })
  },
  methods: {
    ...mapMutations(['setUser'])
  }
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
