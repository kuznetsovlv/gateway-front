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

/**
 * @param {string} [serial]
 * @param {string} name
 * @param {number} ip
 * @param {number[]} [devices = []]
 * @return {Promise<*>}
 */
export const putGateway = ({ serial, name, ip, devices = [] }) => {
  const data = { name, ip: ip << 0, devices };
  if (serial) {
    data.serial = serial;
  }
  return fetchPut(PATH.GATEWAY, { data });
};

/**
 * @param {string} serial
 * @return {Promise<void>}
 */
export const deleteGateway = serial =>
  fetchDelete(PATH.GATEWAY, { data: { serial } });
