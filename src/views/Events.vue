<template>
  <div class="events">
    <cube-tab-bar
      :data="tabs"
      @change="changeHandler"
      showSlider
      v-model="selectedLabel"
    ></cube-tab-bar>
    <p-filter
      @filter-change="filterChange"
      ref="filter"
    ></p-filter>
    <div
      class="scroll-wrapper"
      v-if="allEvents.length"
    >
      <cube-scroll
        :data="events"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
        ref="scroll"
      >
        <card
          :key="item.id"
          :title="item.name"
          v-for="item in events"
        >
          <template slot="content">
            <p v-if="item.address">事件位置：{{item.address}}</p>
            <p v-if="item.time">报警时间：{{item.time}}</p>
          </template>
          <!-- <template slot="right">
            <div class="right">
              <img src="~common/img/logo.png">
            </div>
          </template>-->
        </card>
      </cube-scroll>
    </div>
    <p
      class="no-data"
      v-else
    >无数据</p>
  </div>
</template>

<script>
import PFilter from 'components/filter/filter'
import Map from '@/api/map'

export default {
  name: 'events',
  components: { PFilter },
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
        },
        {
          label: '已处理事件',
          value: 2
        }
      ],
      events: [],
      allEvents: [],
      pullDownRefresh: true,
      pullDownRefreshThreshold: 60,
      pullDownRefreshStop: 40,
      pullDownRefreshTxt: '刷新成功',
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据'
    }
  },
  computed: {
    options() {
      return {
        pullDownRefresh: this.pullDownRefreshObj,
        pullUpLoad: this.pullUpLoadObj,
        scrollbar: true
      }
    },
    pullDownRefreshObj: function() {
      return this.pullDownRefresh
        ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            // Do not need to set stop value, but you can if you want
            // stop: parseInt(this.pullDownRefreshStop),
            txt: this.pullDownRefreshTxt
          }
        : false
    },
    pullUpLoadObj: function() {
      return this.pullUpLoad
        ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {
              more: this.pullUpLoadMoreTxt,
              noMore: this.pullUpLoadNoMoreTxt
            }
          }
        : false
    }
  },
  methods: {
    async getUnreceived() {
      const res = await Map.getUnreceived(this.params)
      this.allEvents = res
      this.events = this.allEvents.splice(0, 10)
    },
    async getProcessEvents() {
      const res = await Map.getProcessEvents(this.params)
      this.allEvents = res
      this.events = this.allEvents.splice(0, 10)
    },
    async changeHandler(val, flag) {
      if (!flag) {
        this.$refs.filter.reset()
        this.params = {
          time: '',
          distance: '',
          type: ''
        }
      }
      switch (val) {
        case 0:
          this._fetchData('getUnreceived')
          break
        case 1:
          this._fetchData('getProcessEvents')
          break
        default:
          break
      }
    },
    onPullingDown() {
      if (this.allEvents.length) {
        // 如果有新数据
        this.changeHandler(this.selectedLabel)
      } else {
        // 如果没有新数据
        this.$refs.scroll.forceUpdate()
      }
    },

    onPullingUp() {
      // 模拟更新数据
      if (this.allEvents.length) {
        // 如果有新数据
        this.events.push(...this.allEvents.splice(0, 10))
      } else {
        // 如果没有新数据
        this.$refs.scroll.forceUpdate()
      }
    },
    filterChange(data) {
      this.params = data
      this.changeHandler(this.selectedLabel, true)
    }
  },
  mounted() {
    this.params = {
      time: '',
      distance: '',
      type: ''
    }
    this._fetchData('getUnreceived')
  }
}
</script>
<style lang="stylus" scoped>
.right {
  flex: 0 0 60px;

  img {
    width: 100%;
  }
}

.content {
  margin-bottom: 8px;
}

.scroll-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 50px;
  overflow: hidden;

  p {
    margin-bottom: 8px;
    line-height: 1.4;
  }
}

.no-data {
  margin-top: 40px;
  font-size: 18px;
  text-align: center;
}
</style>
