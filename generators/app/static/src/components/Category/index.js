/* eslint no-console: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import theme from '../../theme';

class Category extends Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  handlePress() {
    const { item, navigator, navigateToRoute } = this.props;

    navigateToRoute.passProps = { item };
    navigator.push(navigateToRoute);
  }

  render() {
    const {
      item,
      box,
    } = this.props;

    return (
      <Button box={box} item={item} handlePress={this.handlePress} />
    );
  }
}

Category.propTypes = {
  item: PropTypes.object.isRequired,
  navigator: PropTypes.object.isRequired,
  box: PropTypes.object,
  navigateToRoute: PropTypes.object.isRequired,
};

Category.defaultProps = {
  box: theme.category.box,
};

export default Category;
