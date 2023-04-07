import { makeAutoObservable, observable } from 'mobx';

export default class StoreMap {
  /**
   * @private
   * @type Map<string, Observable>
   */
  $map;
  constructor() {
    makeAutoObservable(this);

    this.$map = observable(new Map());
  }

  /**
   * @param {string} id
   * @return {Observable}
   */
  get(id) {
    return this.$map.get(id);
  }

  /**
   * @param {string} id
   * @param {observable} obj
   */
  set(id, obj) {
    this.$map.set(id, obj);
  }
}
