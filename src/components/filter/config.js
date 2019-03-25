const timeFilter = [
  { text: '不限事件', value: '' },
  { text: '小于一小时', value: '0-1' },
  { text: '1-5小时', value: '1-5' },
  { text: '5-10小时', value: '5-10' },
  { text: '10-24小时', value: '10-24' },
  { text: '大于一天', value: '24-' }
]
const distanceFilter = [
  { text: '不限距离', value: '' },
  { text: '100米以内', value: '0-100' },
  { text: '100-200米', value: '100-200' },
  { text: '200-500米', value: '200-500' },
  { text: '超过500米', value: '500- ' }
]

const typeFilter = [
  { text: '不限类型', value: '' },
  { text: '绿化市容', value: 'lhsr' },
  { text: '环卫市容', value: 'hwsr' },
  { text: '居住卫生', value: 'jzws' },
  { text: '公共设施', value: 'ggss' }
]
export default {
  timeFilter,
  distanceFilter,
  typeFilter
}
