import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import GatewayStore from 'pages/Gateway/store/GatewayStore';

const Gateway = observer(({ data }) => <>Gateway {data.serial}</>);

Gateway.propTypes = { data: PropTypes.instanceOf(GatewayStore).isRequired };

export default Gateway;
