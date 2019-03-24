<template>
  <div class="card">
    <div class="left">
      <h2>{{title}}</h2>
      <slot name="content"></slot>
      <cube-button outline inline primary>{{btn}}</cube-button>
    </div>
    <slot name="right"></slot>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: '查看案件'
    }
  }
}
</script>

<style lang="stylus" scoped>
.card {
  display: flex;
  width: 90%;
  margin: 10px auto;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.left {
  flex: 1;
}

h2 {
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
