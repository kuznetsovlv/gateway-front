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
import { numIPToStrIp } from 'utils';

/**
 * @param serial
 * @return {Promise<[Gateway, SimpleDevice[]]>}
 */
const getGatewayData = serial =>
  Promise.all([getGateway(serial), getDeviceList(serial)]);

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
   * @private
   * @type {ErrorProcessor}
   */
  $errorProcessor;

  /**
   * @param {string} serial
   * @param {ErrorProcessor} errorProcessor
   */
  constructor(serial, errorProcessor) {
    makeAutoObservable(this);

    this.$serial = serial;
    this.$errorProcessor = errorProcessor;
    this.$name = null;
    this.$ip = null;
    this.$deviceList = observable([]);
    this.$deviceNameMap = observable(new Map());
    this.$loading = false;

    this.$fetch = this.$fetch.bind(this);
    this.$removeDevise = this.$removeDevise.bind(this);
    this.fetchDeviceList = this.fetchDeviceList.bind(this);
    this.delete = this.delete.bind(this);
    this.deleteDevice = this.deleteDevice.bind(this);
    this.bindDevices = this.bindDevices.bind(this);
    this.unbindDevices = this.unbindDevices.bind(this);

    this.$fetch();
  }

  /**
   * @public
   * @return {string}
   */
  get serial() {
    return this.$serial;
  }

  /**
   * @public
   * @return {string|null}
   */
  get name() {
    return this.$name ?? this.$serial;
  }

  /**
   * @public
   * @return {string|null}
   */
  get ip() {
    return numIPToStrIp(this.$ip);
  }

  /**
   * @public
   * @return {{vendor: string, uid: number}[]}
   */
  get devices() {
    return this.$deviceList.map(uid => ({
      uid,
      vendor: this.$deviceNameMap.has(uid)
        ? this.$deviceNameMap.get(uid)
        : String(uid)
    }));
  }

  /**
   * @public
   * @return {boolean}
   */
  get loading() {
    return this.$loading;
  }

  /**
   * @private
   * @return {Generator<Promise<[Gateway,SimpleDevice[]]>, void, *>}
   */
  *$fetch() {
    this.$loading = true;

    try {
      const [{ serial, name, ip, devises }, deviceEntries] =
        yield getGatewayData(this.$serial);

      this.$serial = serial;
      this.$name = name;
      this.$ip = ip;
      this.$deviceList = devises;

      this.$deviceNameMap.clear();

      deviceEntries.forEach(({ uid, vendor }) =>
        this.$deviceNameMap.set(uid, vendor)
      );
    } catch (error) {
      this.$errorProcessor.putError(error);
    }
    this.$loading = false;
  }

  /**
   * @private
   * @param {number} uid
   */
  $removeDevise(uid) {
    this.$deviceNameMap.delete(uid);
    const index = this.$deviceList.findIndex(device => device === uid);
    this.$deviceList.splice(index, 1);
  }

  /**
   * @public
   * @param {boolean} [force = false]
   * @return {Generator<Promise<SimpleDevice[]>, void, *>}
   */
  *fetchDeviceList(force = false) {
    if (!force && this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      const list = yield getDeviceList(this.$serial);

      this.$deviceNameMap.clear();

      list.forEach(({ uid, vendor }) => this.$deviceNameMap.set(uid, vendor));
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @public
   * @return {Generator<Promise<void>, void, *>}
   */
  *delete() {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      yield deleteGateway(this.$serial);
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @param {number} uid
   * @return {Generator<Promise<void>, void, *>}
   */
  *deleteDevice(uid) {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      yield deleteDevice(uid);
      this.$removeDevise(uid);
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @param {number[]} uids
   * @return {Generator<Promise<number[]>, void, *>}
   */
  *bindDevices(...uids) {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      const bound = yield bind(this.$serial, uids);
      if (bound.length) {
        this.fetchDeviceList(true);
      }
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @public
   * @param {number[]} uids
   * @return {Generator<Promise<void>, void, *>}
   */
  *unbindDevices(...uids) {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      yield unbind(this.$serial, uids);
      this.fetchDeviceList(true);
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }
}
