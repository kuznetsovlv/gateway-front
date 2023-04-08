import 'types';
import 'StoreProvider';
import { makeAutoObservable, observable } from 'mobx';

import { getGatewayList, deleteGateway } from 'api';

export default class GateWaysStore {
  /**
   * @private
   * @type {SimpleGateway[]}
   */
  $list;
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

  constructor(errorProcessor) {
    makeAutoObservable(this);

    this.$list = observable([]);
    this.$loading = false;
    this.$errorProcessor = errorProcessor;

    this.fetchData = this.fetchData.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @return {SimpleGateway[]}
   */
  get list() {
    return [...this.$list];
  }

  /**
   * @return {boolean}
   */
  get loading() {
    return this.$loading;
  }

  /**
   * @return {Generator<Promise<SimpleGateway>, void>}
   */
  *fetchData() {
    if (this.$loading) {
      return;
    }

    this.$loading = true;

    try {
      const list = yield getGatewayList();

      this.$list = observable(list ?? []);
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }

  /**
   * @param serial
   * @return {Generator<Promise<void>, void>}
   */
  *delete(serial) {
    if (this.$loading || !serial) {
      return;
    }

    this.$loading = true;

    try {
      yield deleteGateway(serial);

      const index = this.$list.findIndex(item => item.serial === serial);

      if (index >= 0) {
        this.$list.splice(index, 1);
      }
    } catch (error) {
      this.$errorProcessor.putError(error);
    }

    this.$loading = false;
  }
}
