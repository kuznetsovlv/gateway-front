import React, { lazy, memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Lazy } from 'components';
import { GATEWAYS_ROUTE, GATEWAY_ROUTE, ROOT_ROUTE } from 'routes';

const Gateway = lazy(() => import('pages/Gateway'));
const Gateways = lazy(() => import('pages/Gateways'));
const NotFound = lazy(() => import('pages/NotFound'));
const Root = lazy(() => import('pages/Root'));

export default memo(() => (
  <BrowserRouter>
    <Routes>
      <Route
        path={ROOT_ROUTE}
        element={
          <Lazy>
            <Root />
          </Lazy>
        }
      />
      <Route
        path={GATEWAY_ROUTE}
        element={
          <Lazy>
            <Gateway />
          </Lazy>
        }
      />
      <Route
        path={GATEWAYS_ROUTE}
        element={
          <Lazy>
            <Gateways />
          </Lazy>
        }
      />
      <Route
        path="*"
        element={
          <Lazy>
            <NotFound />
          </Lazy>
        }
      />
    </Routes>
  </BrowserRouter>
));
