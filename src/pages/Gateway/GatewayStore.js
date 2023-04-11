import 'types';
import 'StoreProvider';
import { makeAutoObservable, observable } from 'mobx';

import {
  getGateway,
  getDeviceList,
  bind,
  unbind,
  deleteGateway,
  deleteDevice
} from 'api';

export default class GatewayStore {
  /**
   * @private
   * @type {string}
   */
  $serial;
  /**
   * @private
   * @type {string|null}
   */
  $name;
  /**
   * @private
   * @type {number|null}
   */ $ip;
  /**
   * @private
   * @type {number[]}
   */
  $deviceList;
  /**
   * @private
   * @type {Map<number, string>}
   */
  $deviceNameMap;
  /**
   * @private
   * @type {boolean}
   */
  $loading;

  /**
   * @param {string} serial
   */
  constructor(serial) {
    makeAutoObservable(this);

    this.$serial = serial;
    this.$name = null;
    this.$ip = null;
    this.$deviceList = observable([]);
    this.$loading = false;
  }

  /**
   * @public
   * @return {string}
   */
  get serial() {
    return this.$serial;
  }
}
