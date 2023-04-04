import React, { Suspense } from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';

const Lazy = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

Lazy.propTypes = {
  children: PropTypes.node.isRequired
};

export default Lazy;
