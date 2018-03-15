import React from 'react';
import PropTypes from 'prop-types';
import { NavigatorIOS } from 'react-native';

const Navigator = props => {
  const { initialRoute } = props;

  return (
    <NavigatorIOS
      initialRoute={initialRoute}
      style={{ flex: 1 }}
      navigationBarHidden
    />
  );
};

Navigator.propTypes = {
  initialRoute: PropTypes.shape({
    component: PropTypes.func,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Navigator;
