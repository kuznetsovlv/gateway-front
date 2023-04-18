import 'types';
import 'StoreProvider';
import { makeAutoObservable } from 'mobx';
import { fromUnixTime, format } from 'date-fns';

import { getDevice, putDevice } from 'api';

export default class DeviceStore {
  /**
   * @private
   * @type {number|null}
   */
  $uid;
  /**
   * @private
   * @type {string|null}
   */
  $vendor;
  /**
   * @private
   * @type {number|null}
   */
  $dateCreated;
  /**
   * @private
   * @type {Status|null}
   */
  $status;
  /**
   * @private
   * @type {boolean}
   */
  $loadin;
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
    this.$vendor = null;
    this.$dateCreated = null;
    this.$status = null;
    this.$loadin = false;
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
   * @return {string|null}
   */
  get vendor() {
    return this.$vendor;
  }

  /**
   * @public
   * @param {string} vendor
   */
  set vendor(vendor) {
    this.$vendor = vendor;
  }

  /**
   * @public
   * @return {null|string}
   */
  get dateCreated() {
    return this.$dateCreated === null
      ? null
      : format(fromUnixTime(this.$dateCreated), 'yyyy-MMM-dd HH:mm:ss');
  }

  /**
   * @public
   * @return {Status|null}
   */
  get status() {
    return this.$status;
  }

  /**
   * @public
   * @param {Status} status
   */
  set status(status) {
    this.$status = status;
  }

  /**
   * @public
   * @return {boolean}
   */
  get loading() {
    return this.$loadin;
  }

  /**
   * @public
   * @return {Generator<Promise<Device>, void, *>}
   */
  *fetchData() {
    if (this.$loadin || !this.$uid) {
      return;
    }

    this.$loadin = true;

    try {
      const { uid, vendor, status, date_created } = yield getDevice(this.$uid);

      if (this.$uid !== uid) {
        throw new Error('Loading device data failed');
      }

      this.$vendor = vendor;
      this.$dateCreated = date_created;
      this.$status = status;
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loadin = false;
  }

  /**
   * @public
   * @return {Generator<Promise<number>, void, *>}
   */
  *save() {
    if (this.$loadin) {
      return;
    }

    this.$loadin = true;

    try {
      const data = { vendor: this.$vendor, status: this.$status };
      if (this.$uid) {
        data.uid = this.uid;
      }
      const uid = yield putDevice(data);

      if (!this.$uid) {
        this.$uid = uid;
      } else if (this.$uid !== uid) {
        throw new Error('Saving device data error');
      }
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loadin = false;
  }
}
