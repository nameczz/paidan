<template>
  <ul class="filter">
    <li @click="showPicker('time')">{{time}}</li>
    <li @click="showPicker('distance')">{{distance}}</li>
    <li @click="showPicker('type')">{{type}}</li>
  </ul>
</template>
<script>
import Filters from './config'
export default {
  data() {
    return {
      time: '不限时间',
      distance: '不限距离',
      key: '',
      type: '不限类型',
      values: {
        time: '',
        distance: '',
        type: ''
      }
    }
  },
  methods: {
    reset() {
      this.time = '不限时间'
      this.distance = '不限距离'
      this.type = '不限类型'
      this.values = {
        time: '',
        distance: '',
        type: ''
      }
    },
    showPicker(type) {
      this.key = type
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '请选择',
          data: [Filters[`${type}Filter`]],
          onSelect: this.selectHandle
        })
      } else {
        this.picker.$updateProps({
          data: [Filters[`${type}Filter`]]
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedText)
      this[this.key] = selectedText[0]
      this.values[this.key] = selectedVal[0]
      this.$emit('filter-change', this.values)
    }
  }
}
</script>

<style lang="stylus" scoped>
.filter {
  display: flex;
  justify-content: space-between;
  height: 18px;
  line-height: 18px;
  color: #666;
  padding: 6px 0;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
  font-size: 10px;

  li {
    flex: 1;
    text-align: center;
  }
}
</style>
