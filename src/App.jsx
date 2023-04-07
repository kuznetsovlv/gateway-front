import React from 'react';

import StoreProvider from './StoreProvider';
import ErrorHandler from './ErrorHandler';
import Layout from './Layout';

export default () => (
  <StoreProvider>
    <ErrorHandler>
      <Layout />
    </ErrorHandler>
  </StoreProvider>
);
