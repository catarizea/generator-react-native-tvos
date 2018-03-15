import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import theme from '../../theme';

const Preloader = ({ color, style }) => {
  const props = {};

  props.color = color || theme.heading;

  if (style) {
    props.style = style;
  }

  return <ActivityIndicator {...props} />;
};

Preloader.propTypes = {
  color: PropTypes.string,
  style: PropTypes.object,
};

Preloader.defaultProps = {
  color: null,
  style: null,
};

export default Preloader;
