const timeFilter = [
  { text: '不限事件', value: '不限事件' },
  { text: '小于一小时', value: '小于一小时' },
  { text: '1-5小时', value: '1-5小时' },
  { text: '5-10小时', value: '5-10小时' },
  { text: '10-24小时', value: '10-24小时' },
  { text: '大于一天', value: '大于一天' }
]
const distanceFilter = [
  { text: '不限距离', value: '不限距离' },
  { text: '100米以内', value: '100米以内' },
  { text: '100-200米', value: '100-200米' },
  { text: '200-500米', value: '200-500米' },
  { text: '超过500米', value: '超过500米' }
]

const typeFilter = [
  { text: '不限类型', value: '不限类型' },
  { text: '绿化市容', value: '绿化市容' },
  { text: '环卫市容', value: '环卫市容' },
  { text: '居住卫生', value: '居住卫生' },
  { text: '公共设施', value: '公共设施' }
]
export default {
  timeFilter,
  distanceFilter,
  typeFilter
}
