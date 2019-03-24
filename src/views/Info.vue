<template>
  <div class="info">
    <cube-tab-bar v-model="selectedLabel" showSlider :data="tabs" @change="changeHandler"></cube-tab-bar>
    <div class="time-picker">
      <span>已选时间段:</span>
      <p @click="showDateSegmentPicker">{{time}}</p>
    </div>
  </div>
</template>

<script>
const THIS_YEAR = new Date().getFullYear()
const dateSegmentData = [
  {
    is: 'cube-date-picker',
    title: '起始时间',
    min: new Date(THIS_YEAR, 0, 1),
    max: new Date()
  },
  {
    is: 'cube-date-picker',
    title: '结束时间',
    min: new Date(THIS_YEAR, 0, 1),
    max: new Date()
  }
]
export default {
  name: 'cinfo',
  data() {
    return {
      selectedLabel: 0,
      tabs: [
        {
          label: '未读事件',
          value: 0
        },
        {
          label: '已读事件',
          value: 1
        }
      ],
      time: '2019-01-01 至 2019-01-02'
    }
  },
  mounted() {
    this.dateSegmentPicker = this.$createSegmentPicker({
      data: dateSegmentData,
      onSelect: (selectedDates, selectedVals, selectedTexts) => {
        console.log(selectedDates, selectedVals)
      },
      onNext: (i, selectedDate, selectedValue, selectedText) => {
        dateSegmentData[1].min = selectedDate
        if (i === 0) {
          this.dateSegmentPicker.$updateProps({
            data: dateSegmentData
          })
        }
      }
    })
  },

  methods: {
    changeHandler(val) {
      console.log(val)
    },
    showDateSegmentPicker() {
      this.dateSegmentPicker.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
.time-picker {
  display: flex;
  padding: 6px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

  span {
    flex: 0 0 100px;
  }

  p {
    flex: 1;
    text-align: center;
  }
}
</style>
