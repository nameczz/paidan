<template>
  <div class="home">
    <cube-tab-bar v-model="selectedLabelDefault" showSlider :data="tabs" @change="changeHandler"></cube-tab-bar>
    <p-filter></p-filter>
  </div>
</template>

<script>
import PFilter from 'components/filter/filter'

export default {
  name: 'cubeic-home',
  components: { PFilter },
  data() {
    return {
      selectedLabelDefault: 0,
      tabs: [
        {
          label: '可接单事件',
          value: 0
        },
        {
          label: '待处理事件',
          value: 1
        }
      ]
    }
  },
  methods: {
    changeHandler(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
