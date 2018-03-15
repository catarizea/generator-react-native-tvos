import React from 'react';
import PropTypes from 'prop-types';
import Container from '../../../components/Container';
import PreloaderScreen from '../../../components/PreloaderScreen';
import Heading from '../../../components/Heading';
import List from '../../../components/List';
import ScrollContainer from '../../../components/ScrollContainer';
import { VerticalListContainer } from './style';

const Category = props => {
  const {
    searchedMovies,
    item,
    numColumns,
    navigator,
    navigateToRoute,
  } = props;

  let content = <PreloaderScreen />;
  if (searchedMovies.length) {
    content = (
      <Container>
        <Heading>{item.title}</Heading>
        <ScrollContainer>
          <VerticalListContainer>
            <List
              items={searchedMovies}
              navigator={navigator}
              childType={'poster'}
              uniqueKey={'category'}
              numColumns={numColumns}
              navigateToRoute={navigateToRoute}
            />
          </VerticalListContainer>
        </ScrollContainer>
      </Container>
    );
  }

  return content;
};

Category.propTypes = {
  navigator: PropTypes.object.isRequired,
  searchedMovies: PropTypes.array,
  item: PropTypes.object.isRequired,
  numColumns: PropTypes.number.isRequired,
  navigateToRoute: PropTypes.object.isRequired,
};

Category.defaultProps = {
  searchedMovies: null,
};

export default Category;
