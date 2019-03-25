<template>
  <div
    class="map"
    ref="map"
  >
    <div class="text">{{text}}</div>
    <div class="total">{{totalNum}}</div>
    <div
      @click="resetPosition"
      class="pic"
      ref="pic"
    ></div>
    <div
      @click="resetPosition"
      class="refresh"
    ></div>
  </div>
</template>
<script>
export default {
  props: {
    posData: {
      type: Array,
      default: function() {
        return []
      }
    },
    text: {
      type: String,
      default: '可接单案件数'
    },
    totalNum: {
      type: Number,
      default: 888
    }
  },
  computed: {
    defaultCenter() {
      console.log(this.posData)
      return this.posData.length
        ? this.posData[0].position
        : [121.458354, 31.233602]
    }
  },
  methods: {
    renderClusterMarker(context) {
      var factor = Math.pow(context.count / this.count, 1 / 18)
      var div = document.createElement('div')
      var Hue = 180 - factor * 180
      var bgColor = 'hsla(' + Hue + ',100%,50%,0.7)'
      var fontColor = 'hsla(' + Hue + ',100%,20%,1)'
      var borderColor = 'hsla(' + Hue + ',100%,40%,1)'
      var shadowColor = 'hsla(' + Hue + ',100%,50%,1)'
      div.style.backgroundColor = bgColor
      var size = Math.round(
        30 + Math.pow(context.count / this.count, 1 / 5) * 20
      )
      div.style.width = div.style.height = size + 'px'
      div.style.border = 'solid 1px ' + borderColor
      div.style.borderRadius = size / 2 + 'px'
      div.style.boxShadow = '0 0 1px ' + shadowColor
      div.innerHTML = context.count
      div.style.lineHeight = size + 'px'
      div.style.color = fontColor
      div.style.fontSize = '14px'
      div.style.textAlign = 'center'
      context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2))
      context.marker.setContent(div)
    },
    addCluster(markers) {
      if (this.MarkerClusterer) this.MarkerClusterer.clearMarkers()
      this.map.plugin(['AMap.MarkerClusterer'], () => {
        this.MarkerClusterer = new AMap.MarkerClusterer(
          this.map, // 地图实例
          markers, // 海量点组成的数组
          {
            gridSize: 80,
            renderClusterMarker: this.renderClusterMarker
          }
        )
      })
    },
    addMassPoint(data) {
      const markers = []
      data.forEach(item => {
        if (item.position[0]) {
          const marker = new AMap.Marker({
            extData: item.id,
            position: item.position,
            content:
              '<div style="background-color: #409EFF; opacity:0.8; height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
            offset: new AMap.Pixel(-15, -15)
          })
          marker.on('click', this.markerClick)
          markers.push(marker)
        }
      })
      this.count = markers.length
      this.addCluster(markers)
    },
    resetPosition() {
      this.map.setZoomAndCenter(14, this.defaultCenter)
    }
  },
  watch: {
    posData(val) {
      if (val.length) {
        this.map.setZoomAndCenter(14, this.defaultCenter)
        this.addMassPoint(this.posData)
      }
    }
  },
  mounted() {
    this.map = new AMap.Map(this.$refs.map, {
      resizeEnable: false,
      center: this.defaultCenter,
      zoom: 14,
      mapStyle: 'amap://styles/122ba0bf427ce792886b71a97d5fa0a7'
    })
    this.addMassPoint(this.posData)
  }
}
</script>
<style lang="stylus" scoped>
.map {
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  bottom: 0;
  color: #fff;
}

.text {
  position: absolute;
  left: 20px;
  top: 20px;
  font-size: 20px;
  z-index: 100;
}

.total {
  position: absolute;
  left: 20px;
  top: 50px;
  font-size: 48px;
  z-index: 100;
}

.pic {
  position: absolute;
  width: 38px;
  height: 38px;
  background: url('./img/back-current.png');
  bottom: 15px;
  right: 10px;
  z-index: 100;
}

.refresh {
  position: absolute;
  width: 36px;
  height: 36px;
  background: url('./img/refresh.png');
  right: 11px;
  bottom: 63px;
  z-index: 100;
}
</style>
