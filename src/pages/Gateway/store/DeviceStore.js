import 'types';
import 'StoreProvider';
import { makeAutoObservable } from 'mobx';

import { getDevice, putDevice } from 'api';

export default class DeviceStore {
  /**
   * @private
   * @type {number|null}
   */
  $uid;
  /**
   * @private
   * @type {string}
   */
  $vendor;
  /**
   * @private
   * @type {string}
   */
  $editedVendor;
  /**
   * @private
   * @type {number|null}
   */
  $dateCreated;
  /**
   * @private
   * @type {Status}
   */
  $status;
  /**
   * @private
   * @type {Status}
   */
  $editedStatus;
  /**
   * @private
   * @type {boolean}
   */
  $loading;
  /**
   * @private
   * @type {boolean}
   */
  $forceFetch;
  /**
   * @private
   * @type {ErrorProcessor}
   */
  $errorProcessor;

  /**
   * @param {number|null} [uid = null]
   * @param {ErrorProcessor} errorProcessor
   */
  constructor({ uid = null, errorProcessor }) {
    makeAutoObservable(this);
    this.$uid = uid;
    this.$vendor = this.$editedVendor = '';
    this.$dateCreated = null;
    this.$status = this.$editedStatus = 'offline';
    this.$loading = false;
    this.$forceFetch = false;
    this.$errorProcessor = errorProcessor;

    this.fetchData = this.fetchData.bind(this);
    this.save = this.save.bind(this);

    if (this.$uid) {
      this.fetchData();
    }
  }

  /**
   * @public
   * @return {number|null}
   */
  get uid() {
    return this.$uid;
  }

  /**
   * @public
   * @return {string}
   */
  get originalVendor() {
    return this.$vendor;
  }

  /**
   * @public
   * @return {string|null}
   */
  get vendor() {
    return this.$editedVendor ?? this.$vendor;
  }

  /**
   * @public
   * @param {string} vendor
   */
  set vendor(vendor) {
    this.$editedVendor = vendor;
  }

  /**
   * @public
   * @return {number|null}
   */
  get dateCreated() {
    return this.$dateCreated;
  }

  /**
   * @public
   * @return {Status}
   */
  get originalStatus() {
    return this.$status;
  }

  /**
   * @public
   * @return {Status}
   */
  get status() {
    return this.$editedStatus ?? this.$status;
  }

  /**
   * @public
   * @param {Status} status
   */
  set status(status) {
    this.$editedStatus = status;
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
   * @return {boolean}
   */
  get saveDisabled() {
    return (
      !this.$editedVendor ||
      (this.$editedVendor === this.$vendor &&
        this.$editedStatus === this.$status)
    );
  }

  /**
   * @public
   * @return {Generator<Promise<Device>, void, *>}
   */
  *fetchData() {
    if (!this.$forceFetch && (this.$loading || !this.$uid)) {
      return;
    }

    this.$loading = true;

    try {
      const { uid, vendor, status, date_created } = yield getDevice(this.$uid);

      if (this.$uid !== uid) {
        throw new Error('Loading device data failed');
      }

      this.$vendor = this.$editedVendor = vendor;
      this.$dateCreated = date_created;
      this.$status = this.$editedStatus = status;
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$forceFetch = false;
    this.$loading = false;
  }

  /**
   * @public
   * @return {Generator<Promise<number>, void, *>}
   */
  *save() {
    if (this.$loading || this.saveDisabled) {
      return;
    }

    this.$loading = true;

    try {
      const data = { vendor: this.$editedVendor, status: this.$editedStatus };
      if (this.$uid) {
        data.uid = this.uid;
      }
      const uid = yield putDevice(data);

      if (!this.$uid) {
        this.$uid = uid;
      } else if (this.$uid !== uid) {
        throw new Error('Saving device data error');
      }
      this.$forceFetch = true;
      this.fetchData();
    } catch (error) {
      this.$errorProcessor.putError(error);
      this.$loading = false;
    }
  }
}
