import 'types';
import { makeAutoObservable, observable } from 'mobx';

import './DeviceStore';

export default class DeviceMapStore {
  /**
   * @private
   * @type {Map<number, DeviceStore>}
   */
  $map;

  constructor() {
    makeAutoObservable(this);

    this.$map = observable(new Map());
  }

  /**
   * @public
   * @param {number} uid
   * @return {DeviceStore}
   */
  get(uid) {
    return this.$map.get(uid);
  }

  /**
   * @param {number} uid
   * @param {DeviceStore} device
   */
  set(uid, device) {
    this.$map.set(uid, device);
  }

  /**
   * @param {number} uid
   * @return {boolean}
   */
  has(uid) {
    return this.$map.has(uid);
  }

  /**
   * @public
   * @param {number} uid
   */
  delete(uid) {
    this.$map.delete(uid);
  }
}
