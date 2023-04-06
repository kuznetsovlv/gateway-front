import 'types';
import { fetchGet, fetchPost, fetchPut, fetchDelete } from './fetch';

const PATH = {
  GATEWAYS: 'gateways',
  GATEWAY: 'gateway',
  DEVICES: 'devices',
  DEVICE: 'device',
  BIND: 'bind',
  UNBIND: 'unbind'
};

/**
 * @return {Promise<SimpleGateway>}
 */
export const getGatewayList = () => fetchGet(PATH.GATEWAYS);

/**
 * @param {string} serial
 * @return {Promise<Gateway>}
 */
export const getGateway = serial =>
  fetchGet(PATH.GATEWAY, { data: { serial } });
