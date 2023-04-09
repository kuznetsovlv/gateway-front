import React, { lazy } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Lazy } from 'components';

const CreateGateway = lazy(() => import('./CreateGateway'));
const Gateway = lazy(() => import('./Gateway'));

export default () => {
  const [searchParams] = useSearchParams();

  const serial = searchParams.get('serial');

  return serial ? (
    <Lazy>
      <Gateway serial={serial} />
    </Lazy>
  ) : (
    <Lazy>
      <CreateGateway />
    </Lazy>
  );
};
