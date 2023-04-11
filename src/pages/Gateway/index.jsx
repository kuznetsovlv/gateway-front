import React, { lazy, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Lazy } from 'components';
import GatewayStore from 'pages/Gateway/GatewayStore';

const CreateGateway = lazy(() => import('./CreateGateway'));
const Gateway = lazy(() => import('./Gateway'));

export default memo(() => {
  const [searchParams] = useSearchParams();

  const serial = searchParams.get('serial');

  if (!serial) {
    return (
      <Lazy>
        <CreateGateway />
      </Lazy>
    );
  }

  return (
    <Lazy>
      <Gateway data={new GatewayStore(serial)} />
    </Lazy>
  );
});
