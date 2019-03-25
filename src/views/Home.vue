<template>
  <div class="home">
    <cube-tab-bar
      :data="tabs"
      @change="changeHandler"
      showSlider
      v-model="selectedLabel"
    ></cube-tab-bar>
    <p-filter @filter-change="filterChange"></p-filter>
    <big-map
      :posData="mapData"
      :text="title"
      :totalNum="total"
    ></big-map>
  </div>
</template>

<script>
import PFilter from 'components/filter/filter'
import BigMap from 'components/map/big-map'
import Map from '@/api/map'
export default {
  name: 'home',
  components: { PFilter, BigMap },
  data() {
    return {
      selectedLabel: 0,
      tabs: [
        {
          label: '可接单事件',
          value: 0
        },
        {
          label: '待处理事件',
          value: 1
        }
      ],
      total: 0,
      mapData: []
    }
  },
  computed: {
    title() {
      return this.selectedLabel ? '待处理事件数' : '可接单事件数'
    }
  },
  methods: {
    async getUnreceived() {
      const res = await Map.getUnreceived(this.params)
      this.total = res.length
      this.mapData = res
    },
    async getProcessEvents() {
      const res = await Map.getProcessEvents(this.params)
      this.total = res.length
      this.mapData = res
    },
    async fetchData() {
      await Promise.all([this.getUnreceived()])
    },
    filterChange(data) {
      this.params = data
      console.log(this.params)
      this.changeHandler(this.selectedLabel)
    },
    changeHandler(val) {
      if (val) {
        this._fetchData('getProcessEvents')
        return
      }
      this._fetchData('getUnreceived')
    }
  },
  created() {
    this.params = {
      time: '',
      distance: '',
      type: ''
    }
    this._fetchData()
  }
}
</script>
<style lang="stylus" scoped>
</style>
