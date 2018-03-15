import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  ContainerCentered,
  ContainerHorizontal,
  ContainerHorizontalCentered,
} from './style';

const ContainerComponent = props => {
  const {
    children,
    centered,
    horizontal,
    horizontalCentered,
    height,
    width,
  } = props;

  const size = {};
  if (height) {
    size.height = height;
  }

  if (width) {
    size.width = width;
  }

  if (centered) {
    return (
      <ContainerCentered style={size}>
        {children}
      </ContainerCentered>
    );
  }

  if (horizontal) {
    return (
      <ContainerHorizontal style={size}>
        {children}
      </ContainerHorizontal>
    );
  }

  if (horizontalCentered) {
    return (
      <ContainerHorizontalCentered style={size}>
        {children}
      </ContainerHorizontalCentered>
    );
  }

  return (
    <Container style={size}>
      {children}
    </Container>
  );
};

ContainerComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  centered: PropTypes.bool,
  horizontal: PropTypes.bool,
  horizontalCentered: PropTypes.bool,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

ContainerComponent.defaultProps = {
  children: null,
  centered: false,
  horizontal: false,
  horizontalCentered: false,
  height: null,
  width: null,
};

export default ContainerComponent;
