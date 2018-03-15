import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from './style';

const HeadingComponent = props => {
  const { children } = props;

  return (
    <Heading>
      {children}
    </Heading>
  );
};

HeadingComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default HeadingComponent;
