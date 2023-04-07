import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

import init from './init';
import StoreMap from './StoreMap';
import ErrorProcessor from './ErrorProcessor';

export const ERROR_PROCESSOR_KEY = 'ERROR_PROCESSOR_KEY';

const storeMap = new StoreMap();
const errorProcessor = new ErrorProcessor();
storeMap.set(ERROR_PROCESSOR_KEY, errorProcessor);

init(errorProcessor);

const StoreContext = createContext(storeMap);

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => (
  <StoreContext.Provider value={storeMap}>{children}</StoreContext.Provider>
);

StoreProvider.propTypes = { children: PropTypes.node.isRequired };

export default StoreProvider;
