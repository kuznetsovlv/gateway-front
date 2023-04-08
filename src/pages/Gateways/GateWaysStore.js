import 'types';
import 'StoreProvider';
import { makeAutoObservable, observable } from 'mobx';

import { getGatewayList } from 'api';

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
}
