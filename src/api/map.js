import BaseModel from './base-model'
import { formatDate } from 'common/js/utils'
export default class Map extends BaseModel {
  static UNRECEIVED_EVENT = '/case/pre/list'
  static PROCESS_EVENT = '/case/list'

  static getUnreceived(params) {
    return super.findAll(params, this.UNRECEIVED_EVENT)
  }
  static getProcessEvents(params) {
    return super.findAll(params, this.PROCESS_EVENT)
  }

  get position() {
    if (this.lat && this.lng) {
      return [this.lng, this.lat]
    }
    return [0, 0]
  }

  get time() {
    return this.eventTime ? formatDate(parseInt(this.eventTime) * 1000) : ''
  }
}
