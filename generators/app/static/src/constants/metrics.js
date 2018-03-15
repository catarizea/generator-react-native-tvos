import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const device = {
  width,
  height,
};
