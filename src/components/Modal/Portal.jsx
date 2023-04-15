import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

const Portal = ({ children }) => {
  const [portal, setPortal] = useState(null);

  useEffect(() => {
    const portal = document.createElement('div');
    portal.setAttribute('id', v4());

    document.body.appendChild(portal);

    setPortal(portal);

    return () => document.body.remove(portal);
  }, []);

  return portal ? createPortal(children, portal) : null;
};

Portal.propTypes = { children: PropTypes.node.isRequired };

export default Portal;
