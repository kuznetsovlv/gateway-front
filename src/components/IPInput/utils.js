const BYTE_MASK = 0xff << 0;
const INT_MASK = 0xffffffff << 0;
const BYTE_SIZE = 8;

/**
 * @param {number|null} num
 * @return {string|null}
 */
export const numToStr = num => {
  if (!Number.isInteger(num)) {
    return null;
  }

  num &= INT_MASK;

  const bites = [];

  for (let i = 0; i < 4; ++i) {
    bites.push(num & BYTE_MASK);
    num >>= 8;
  }

  return bites.reverse().join('.');
};

export const strToNum = str => {
  if (!/^(?:\d{1,3})(?:\.(?:\d{1,3})){3}$/.test(str)) {
    return null;
  }

  const bytes = str.split('.');

  let ip = 0;

  for (let byte of bytes) {
    byte = Number(byte);
    if (byte > BYTE_MASK) {
      return null;
    }

    ip <<= BYTE_SIZE;
    ip |= byte;
  }

  return ip;
};
