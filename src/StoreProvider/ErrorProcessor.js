import { makeAutoObservable, observable } from 'mobx';
import { v4 } from 'uuid';

const MAX_SIZE = 10;

export default class ErrorProcessor {
  /**
   * @private
   * @type {Map<string, string>}
   */
  $errorMap;

  /**
   * @private
   * @type {string[]}
   */
  $order;

  constructor() {
    makeAutoObservable(this);

    this.$errorMap = observable(new Map());
    this.$order = observable([]);

    this.putError = this.putError.bind(this);
    this.removeError = this.removeError.bind(this);
  }

  /**
   * @public
   * @param {Error} error
   */
  putError(error) {
    const uuid = v4();
    this.$order.push(uuid);
    this.$errorMap.set(uuid, error.message);

    while (this.$order.length > MAX_SIZE) {
      const uuidToDel = this.$order.shift();
      this.$errorMap.delete(uuidToDel);
    }
  }

  /**
   * @public
   * @param uuid
   */
  removeError(uuid) {
    const index = this.$order.indexOf(uuid);
    if (index >= 0) {
      this.$order.splice(index, 1);
      this.$errorMap.delete(uuid);
    }
  }

  /**
   * @public
   * @return {{id: string, text: string}[]}
   */
  get list() {
    return this.$order.map(uuid => ({
      id: uuid,
      text: this.$errorMap.get(uuid)
    }));
  }
}
