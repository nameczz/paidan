<template>
  <div class="events">
    <cube-tab-bar v-model="selectedLabelDefault" showSlider :data="tabs" @change="changeHandler"></cube-tab-bar>
    <p-filter></p-filter>
    <div class="scroll-wrapper">
      <cube-scroll
        ref="scroll"
        :data="events"
        :options="options"
        @pulling-down="onPullingDown"
        @pulling-up="onPullingUp"
      >
        <card title="测试" v-for="item in events" :key="item.id">
          <template slot="content">
            <div class="content">
              <p v-for="content in item.content" :key="content">{{content}}</p>
            </div>
          </template>
          <template slot="right">
            <div class="right">
              <img src="~common/img/logo.png">
            </div>
          </template>
        </card>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import PFilter from 'components/filter/filter'

export default {
  name: 'events',
  components: { PFilter },
  data() {
    return {
      selectedLabelDefault: 1,
      tabs: [
        {
          label: '可接单事件',
          value: 1
        },
        {
          label: '待处理事件',
          value: 2
        },
        {
          label: '已处理事件',
          value: 3
        }
      ],
      events: [
        { title: '测试', content: ['123', '456', '234'], id: 1 },
        { title: '测试', content: ['123', '456', '234'], id: 2 },
        { title: '测试', content: ['123', '456', '234'], id: 3 },
        { title: '测试', content: ['123', '456', '234'], id: 4 },
        { title: '测试', content: ['123', '456', '234'], id: 5 },
        { title: '测试', content: ['123', '456', '234'], id: 6 }
      ],
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
    changeHandler(label) {
      console.log(label)
    },
    onPullingDown() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          console.log('更新')
          this.$refs.scroll.forceUpdate()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    },
    onPullingUp() {
      // 模拟更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          console.log('更新')
          this.$refs.scroll.forceUpdate()
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
    }
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
}
</style>
