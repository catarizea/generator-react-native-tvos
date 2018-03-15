/* eslint react/jsx-closing-tag-location: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import CacheableImage from 'react-native-cacheable-image';
import moment from 'moment';
import { truncate } from 'lodash';
import deviceInfo from '../../../constants/deviceInfo';
import { device } from '../../../constants/metrics';
import PreloaderScreen from '../../../components/PreloaderScreen';
import Button from '../../../components/Button';
import { videoRoute } from '../../../navigator/routes';
import {
  HorizontalContainer,
  ImageOuterContainer,
  ImageInnerContainer,
  TextOuterContainer,
  TextInnerContainer,
  Title,
  Plot,
  InfoLabel,
  InfoText,
  InfoLabelContainer,
} from './style';
import theme from '../../../theme';
import messages from './messages';

const Details = props => {
  const { intl: { formatMessage } } = props;
  const { selectedMovie, box, navigator } = props;

  const scale = [6, 4];
  const ratio = scale[0] / (scale[0] + scale[1]);
  const innerRatio = 0.85;

  const handlePlay = () => {
    if (selectedMovie && selectedMovie.trailer) {
      videoRoute.passProps = {
        videoUri: selectedMovie.trailer,
        navigator,
      };
      navigator.push(videoRoute);
    }
  };

  let content = <PreloaderScreen />;

  if (selectedMovie) {
    const width = Math.floor(device.width * ratio * innerRatio);
    const height = Math.floor(device.height * innerRatio);

    const coverImage = (
      <ImageInnerContainer>
        <CacheableImage
          source={{ uri: selectedMovie.cover }}
          resizeMode={'cover'}
          style={{
            width,
            height,
          }}
          bundleIdentifier={deviceInfo.bundleId}
        />
      </ImageInnerContainer>
    );

    let textContent;
    if (selectedMovie) {
      textContent = (
        <TextInnerContainer height={Math.floor(device.height * innerRatio)}>
          <Title>{selectedMovie.title}</Title>
          <Plot>
            {truncate(selectedMovie.plot, {
              length: theme.details.truncateAt,
              separator: ' ',
            })}
          </Plot>
          <InfoLabelContainer style={{ marginTop: 20 }}><InfoLabel>
            {formatMessage(messages.cast)}
          </InfoLabel></InfoLabelContainer>
          <InfoLabelContainer><Plot style={{ marginBottom: 20 }}>
            {truncate(selectedMovie.actors, {
              length: theme.details.truncateAt,
              separator: ' ',
            })}
          </Plot></InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.released)}</InfoLabel>
            <InfoText>{moment(selectedMovie.released).format('LL')}</InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.genre)}</InfoLabel>
            <InfoText>{selectedMovie.genre}</InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer>
            <InfoLabel>{formatMessage(messages.rated)}</InfoLabel>
            <InfoText>{selectedMovie.rated}</InfoText>
            <InfoLabel style={{ marginLeft: 20 }}>{formatMessage(messages.runtime)}</InfoLabel>
            <InfoText>
              {formatMessage(messages.runtimeMins, { minutes: selectedMovie.runtime })}
            </InfoText>
          </InfoLabelContainer>
          <InfoLabelContainer style={{ marginBottom: 20 }}>
            <InfoLabel>{formatMessage(messages.country)}</InfoLabel>
            <InfoText>{selectedMovie.country}</InfoText>
          </InfoLabelContainer>
          <Button
            item={{ title: formatMessage(messages.play) }}
            box={box}
            icon={{ name: 'play', size: 30, color: theme.category.h1 }}
            handlePress={() => handlePlay()}
          />
        </TextInnerContainer>
      );
    }

    content = (
      <HorizontalContainer>
        <ImageOuterContainer
          flex={scale[0]}
          style={selectedMovie ? { shadowOffset: { width: 0, height: 6 } } : {}}
        >
          {coverImage}
        </ImageOuterContainer>
        <TextOuterContainer flex={scale[1]}>
          {textContent}
        </TextOuterContainer>
      </HorizontalContainer>
    );
  }

  return content;
};

Details.propTypes = {
  intl: PropTypes.object.isRequired,
  selectedMovie: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]).isRequired,
  box: PropTypes.object,
  navigator: PropTypes.object.isRequired,
};

Details.defaultProps = {
  box: theme.details.box,
};

export default injectIntl(Details);
