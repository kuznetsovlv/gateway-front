import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Page } from 'components';
import GatewayStore from '../store/GatewayStore';

const Gateway = observer(({ data }) => (
  <Page loading={data.loading} title={`Gateway ${data.name}`}>
    GateWay
  </Page>
));

Gateway.propTypes = { data: PropTypes.instanceOf(GatewayStore).isRequired };

export default Gateway;
