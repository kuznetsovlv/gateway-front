import 'types';
import 'StoreProvider';
import { makeAutoObservable, observable } from 'mobx';

import { getDeviceList, deleteDevice } from 'api';
import { MAX_DEVICES_PER_GATEWAY } from 'globalConstants';

export default class DeviceListStore {
  /**
   * @private
   * @type {Map<number, SimpleDevice>}
   */
  $deviceMap;
  /**
   * @private
   * @type {number[]}
   */
  $list;
  /**
   * @private
   * @type {Set<number>}
   */
  $bound;
  /**
   * @private
   * @type {Set<number>}
   */
  $selected;
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
   * @param {number[]} bound
   * @param {$errorProcessor} errorProcessor
   */
  constructor({ bound, errorProcessor }) {
    makeAutoObservable(this);

    this.$bound = observable(new Set(bound));
    this.$selected = observable(new Set(bound));
    this.$errorProcessor = errorProcessor;
    this.$list = observable([]);
    this.$deviceMap = observable(new Map());
    this.$loading = false;

    this.fetchData = this.fetchData.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @public
   * @return {(SimpleDevice&{bound: boolean, disabled: boolean, selected: *})[]}
   */
  get list() {
    const addDisabled = this.$selected.size >= MAX_DEVICES_PER_GATEWAY;
    return this.$list.map(uid => {
      const selected = this.$selected.has(uid);
      const bound = this.$bound.has(uid);
      const disabled = addDisabled && !selected;

      return { ...this.$deviceMap.get(uid), selected, bound, disabled };
    });
  }

  /**
   * @public
   * @return {boolean}
   */
  get loading() {
    return this.$loading;
  }

  /**
   * @public
   * @return {number[]}
   */
  get selected() {
    return Array.from(this.$selected);
  }

  /**
   * @public
   * @return {boolean}
   */
  get saveDisabled() {
    return (
      this.$bound.size === this.$selected.size &&
      Array.from(this.$selected).every(uid => this.$bound.has(uid))
    );
  }

  /**
   * @public
   * @return {Generator<Promise<SimpleDevice[]>, void, *>}
   */
  *fetchData() {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      const list = yield getDeviceList();
      this.$list = observable([]);
      this.$deviceMap.clear();

      for (const { uid, vendor } of list) {
        this.$list.push(uid);
        this.$deviceMap.set(uid, { uid, vendor });
      }
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @public
   * @param uid
   * @return {Generator<Promise<void>, void, *>}
   */
  *delete(uid) {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      yield deleteDevice(uid);
      this.$deviceMap.delete(uid);
      this.$selected.delete(uid);
      //We are not meant to delete devices that are bound to current gateway, so we do not call this.$bound.delete(uid);
      const index = this.$list.indexOf(uid);
      if (index >= 0) {
        this.$list.splice(index, 1);
      }
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }
}
