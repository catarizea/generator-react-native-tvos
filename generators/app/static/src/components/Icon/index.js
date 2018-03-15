import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import { Container } from './style';

const Icon = props => <Container><FontIcon {...props} /></Container>;

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default Icon;
