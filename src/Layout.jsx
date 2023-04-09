import React, { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Lazy } from 'components';
import {
  DEVICE_ROUTE,
  GATEWAYS_ROUTE,
  GATEWAY_ROUTE,
  ROOT_ROUTE
} from './routes';

const Device = lazy(() => import('pages/Device'));
const Gateway = lazy(() => import('pages/Gateway'));
const Gateways = lazy(() => import('pages/Gateways'));
const NotFound = lazy(() => import('pages/NotFound'));
const Root = lazy(() => import('pages/Root'));

export default () => (
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
        path={DEVICE_ROUTE}
        element={
          <Lazy>
            <Device />
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
);
