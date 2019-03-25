<template>
  <div class="footer">
    <cube-tab-bar
      @change="changeHandler"
      v-model="selectedLabel"
    >
      <cube-tab
        :key="item.label"
        :label="item.label"
        v-for="(item) in tabs"
      >
        <!-- name为icon的插槽 -->
        <i
          :class="item.icon"
          slot="icon"
        ></i>
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
      console.log(val)
      this.selectedLabel = val || 'home'
    }
  },
  mounted() {
    this.selectedLabel = this.$route.name || 'home'
    console.log(this.$route.name)
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
