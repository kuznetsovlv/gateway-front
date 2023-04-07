import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { getGatewayList, getGateway } from 'api';
// import { useStore, ERROR_PROCESSOR_KEY } from 'StoreProvider';

export default observer(() => {
  useEffect(() => {
    getGateway('ffdfd').then(res => {
      console.log(res);
    }, console.log);
    getGatewayList().then(console.log);
  }, []);

  return <>Gateways</>;
});
