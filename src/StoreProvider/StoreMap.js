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
   * @return {observable}
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

  /**
   * @param {string} id
   * @return {boolean}
   */
  has(id) {
    return this.$map.has(id);
  }
}
