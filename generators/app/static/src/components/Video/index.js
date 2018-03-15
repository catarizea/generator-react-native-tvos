import React from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';

const Video = props => {
  const { videoUri, navigator } = props;
  return (
    <VideoPlayer
      source={{ uri: videoUri }}
      resizeMode={'contain'}
      repeat={false}
      style={{
        backgroundColor: '#000000',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
      navigator={navigator}
      disableVolume
      disableBack
      onEnd={() => navigator.pop()}
    />
  );
};

Video.propTypes = {
  videoUri: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
};

export default Video;
