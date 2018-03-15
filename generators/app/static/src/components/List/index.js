import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';
import Container from '../Container';
import Preloader from '../Preloader';
import Category from '../Category';
import Featured from '../Featured';
import Poster from '../Poster';
import theme from '../../theme';
import { CategoryBox, PosterBox } from './style';

class List extends Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
    this.getContainerHeight = this.getContainerHeight.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.items.length !== this.props.items.length) {
      return true;
    }

    return false;
  }

  getContainerHeight() {
    const { childType } = this.props;

    if (childType === 'category') {
      return 100;
    } else if (childType === 'featured') {
      return theme.featured.box.outerHeight;
    }

    return theme.poster.box.outerHeight;
  }

  renderItem(item, index) {
    const {
      childType,
      navigator,
      items,
      horizontal,
      navigateToRoute,
    } = this.props;

    const it = { item };
    const nav = { navigator };
    const first = index === 0 && horizontal && childType === 'featured'
      ? { first: true } : {};
    const last = index === items.length - 1
      && horizontal && childType === 'featured' ? { last: true } : {};

    const props = { ...it, ...nav, ...first, ...last, ...{ navigateToRoute } };

    if (childType === 'category') {
      return <Category {...props} />;
    } else if (childType === 'featured') {
      return <Featured {...props} />;
    }

    return <Poster {...props} />;
  }

  render() {
    const {
      items,
      horizontal,
      loadMoreItems,
      onEndReachedThreshold,
      childType,
      uniqueKey,
      numColumns,
    } = this.props;

    let content = (
      <Container horizontalCentered height={this.getContainerHeight()}>
        <Preloader />
      </Container>
    );

    let noColumns = {};
    if (numColumns) {
      noColumns = { numColumns };
    }

    if (items.length) {
      const list = (
        <FlatList
          data={items}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          keyExtractor={item => `${childType}-${uniqueKey}-${item.id}`}
          horizontal={horizontal}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={onEndReachedThreshold}
          removeClippedSubviews={false}
          {...noColumns}
        />
      );

      let listContent;
      if (childType === 'category') {
        listContent = (
          <CategoryBox>
            {list}
          </CategoryBox>
        );
      }

      if (childType === 'poster') {
        listContent = (
          <PosterBox>
            {list}
          </PosterBox>
        );
      }

      content = (
        <Container horizontal>
          {listContent || list}
        </Container>
      );
    }

    return content;
  }
}

List.propTypes = {
  horizontal: PropTypes.bool,
  items: PropTypes.array.isRequired,
  loadMoreItems: PropTypes.func,
  childType: PropTypes.oneOf(['featured', 'poster', 'category']).isRequired,
  onEndReachedThreshold: PropTypes.number,
  navigator: PropTypes.object.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  numColumns: PropTypes.number,
  navigateToRoute: PropTypes.object.isRequired,
};

List.defaultProps = {
  horizontal: false,
  loadMoreItems: () => {},
  onEndReachedThreshold: 1,
  numColumns: null,
};

export default List;
