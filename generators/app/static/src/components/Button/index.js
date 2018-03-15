/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight } from 'react-native';
import Icon from '../Icon';
import theme from '../../theme';
import { Label, OuterBox, InnerBox } from './style';

class Button extends Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const {
      item,
      tvParallaxProps,
      box: { innerWidth, innerHeight, outerWidth, outerHeight, labelSize },
      handlePress,
      icon,
    } = this.props;

    let iconContent;
    if (icon) {
      iconContent = (
        <Icon {...icon} />
      );
    }

    return (
      <OuterBox
        outerWidth={outerWidth}
        outerHeight={outerHeight}
        style={{ shadowOffset: { width: 0, height: 6 } }}
      >
        <TouchableHighlight
          activeOpacity={1}
          tvParallaxProperties={tvParallaxProps}
          style={{
            width: innerWidth,
            height: innerHeight,
          }}
          underlayColor={'transparent'}
          onPress={() => handlePress()}
        >
          <InnerBox
            innerWidth={innerWidth}
            innerHeight={innerHeight}
          >
            {iconContent}
            <Label labelSize={labelSize || 25}>{item.title}</Label>
          </InnerBox>
        </TouchableHighlight>
      </OuterBox>
    );
  }
}

Button.propTypes = {
  item: PropTypes.object.isRequired,
  tvParallaxProps: PropTypes.object,
  box: PropTypes.object,
  handlePress: PropTypes.func,
  icon: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number,
    name: PropTypes.string,
  }),
};

Button.defaultProps = {
  tvParallaxProps: {
    enabled: true,
    shiftDistanceX: 2.0,
    shiftDistanceY: 2.0,
    tiltAngle: 0.04,
    magnification: 1.3,
  },
  box: theme.category.box,
  handlePress: () => {},
  icon: null,
};

export default Button;
