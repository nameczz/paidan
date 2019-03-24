<template>
  <div class="header">
    <span class="title">{{title}}</span>
    <span class="iconfont icon-iconfontcaidan" @click="showMenu"></span>

    <cube-drawer ref="drawer" :data="menu" @select="selectHandler">
      <span slot="title">菜单</span>
      <cube-drawer-panel v-for="(panel,index) in menu" :key="index" :index="index" :data="panel">
        <cube-drawer-item v-for="(item, i) in panel" :key="item.name" :index="i" :data="item">
          <span>{{item.name}}</span>
        </cube-drawer-item>
      </cube-drawer-panel>
    </cube-drawer>
  </div>
</template>
<script>
export default {
  computed: {
    title() {
      return this.$route.meta.title || ''
    }
  },
  data() {
    return {
      menu: [
        [
          { name: '事件地图', path: 'map' },
          { name: '事件列表', path: 'list' },
          { name: '消息列表', path: 'info' }
        ]
      ]
    }
  },
  methods: {
    selectHandler() {
      const index = arguments[1][0]
      const { path } = this.menu[0][index]
      console.log(path)
    },

    showMenu() {
      this.$refs.drawer.show()
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable';

.header {
  height: 44px;
  text-align: center;
  line-height: 44px;
  color: #fff;
}

.iconfont {
  position: absolute;
  top: 0;
  right: 0px;
  font-size: 26px;
  padding: 0 10px;
}

.title {
  font-size: 18px;
}
</style>
