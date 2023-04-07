/**
 *
 * @param {string} str
 * @return {string}
 */
export const capitalizeFirstLetter = str =>
  str ? [str[0].toUpperCase(), str.slice(1)].join('') : '';

/**
 *
 * @param {string} world
 * @return {string}
 */
export const toCamelCaseWorld = world =>
  world
    .split('_')
    .map((str, i) => (i ? capitalizeFirstLetter(str) : str))
    .join('');

/**
 * Converts all object's prop names to camelCase
 * @param {*} obj
 * @return {{}|*}
 */
export const toCamelCaseProps = obj => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCaseProps(item));
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toCamelCaseWorld(key), value])
  );
};
