import 'types';
import 'StoreProvider';
import { makeAutoObservable, observable } from 'mobx';

import './GatewayStore';

export default class GateWayMapStore {
  /**
   * @private
   * @type {Map<string, GatewayStore>}
   */
  $map;

  constructor() {
    makeAutoObservable(this);

    this.$map = observable(new Map());
  }

  /**
   * @public
   * @param {string} serial
   * @return {GatewayStore|null}
   */
  get(serial) {
    return this.$map.get(serial) ?? null;
  }

  /**
   * @public
   * @param {string} serial
   * @param {GatewayStore} gateway
   */
  set(serial, gateway) {
    this.$map.set(serial, gateway);
  }

  /**
   * @public
   * @param {string} serial
   * @return {boolean}
   */
  has(serial) {
    return this.$map.has(serial);
  }
}
