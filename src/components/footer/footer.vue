<template>
  <div class="footer">
    <cube-tab-bar v-model="selectedLabel" @change="changeHandler">
      <cube-tab v-for="(item) in tabs" :key="item.label" :label="item.label">
        <!-- name为icon的插槽 -->
        <i slot="icon" :class="item.icon"></i>
        <!-- 默认插槽 -->
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedLabel: 'home',
      tabs: [
        {
          label: 'home',
          icon: 'iconfont icon-ditumap30'
        },
        {
          label: 'events',
          icon: 'iconfont icon-iconfontcaidan'
        },
        {
          label: 'info',
          icon: 'iconfont icon-wodexiaoxi'
        },
        {
          label: 'tongji',
          icon: 'iconfont icon-xiazai7'
        }
      ]
    }
  },
  methods: {
    changeHandler(name) {
      this.$router.push({ name })
    }
  },
  watch: {
    '$route.name'(val) {
      this.selectedLabel = val || 'home'
    }
  }
}
</script>
<style lang="stylus" scoped>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 44px;
  line-height: 44px;
  color: #fff;

  .cube-tab {
    padding: 0;

    .iconfont {
      font-size: 30px;
      color: #fff;
    }

    &.cube-tab_active {
      .iconfont {
        color: #e8864c;
      }
    }
  }
}
</style>
