import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = ({ children }) => (
  <div>{children}</div>
);

DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]).isRequired
};

export default DefaultLayout;
